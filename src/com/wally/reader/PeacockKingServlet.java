package com.wally.reader;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;

public class PeacockKingServlet extends HttpServlet {

	private static final long serialVersionUID = 4290432071139561998L;
	
	private static String FILE_ADD = "D:/bin/apache-tomcat-6.0.35/webapps/dbtest/peacock/content";
	//D:/bin/apache-tomcat-6.0.35/webapps/dbtest/peacock
	// D:/bin/apache-tomcat-6.0.35/webapps/dbtest/peacock/update
	private static String APP_ADD = "D:/bin/apache-tomcat-6.0.35/webapps/dbtest/peacock/update";
	//"D:/workspace/dbtest/WebContent/peacock/update"
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PeacockKingServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		JSONObject jo = new JSONObject();
		PrintWriter out = response.getWriter();
		
		String clientFiles = request.getParameter("chapter");
		//版本更新
		String version = request.getParameter("version");
		String model = request.getParameter("model");
		try 
		{
			//客户端请求内容更新
			boolean b = true;
			if(StringUtils.trimToNull(version) != null)
			{
				String path = getUpdatePath(version, model, request, response);
				if(StringUtils.trimToNull(path) == null)
				{
					b = false;
				}
				jo.put("path", path);
			}
			else //客户端请求软件更新
			{
				// 组装下载文件
				List<FileEntity> needDownFiles = getUpdateFiles(clientFiles,request,response);
				JSONArray array = JSONArray.fromObject(needDownFiles);
				if(needDownFiles.size()==0)
				{
					b = false;
				}
				jo.put("files", array);
			}
			jo.put("update", b);
			
		} catch (Exception e) 
		{
			System.out.println("json组装错误！");
		}
		System.out.println(jo);
		out.print(jo);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		this.doGet(request, response);
	}
	
	/**
	 * 获取项目路径
	 * @param request
	 * @param response
	 * @return
	 */
	private static String getProjectPath(HttpServletRequest request, HttpServletResponse response)
	{
		// 获取项目名称
		String path = request.getContextPath();
		String basePath = request.getScheme() + "://" + request.getServerName()	+ ":" + request.getServerPort() + path + "/";
		return basePath;
	}
	
	
	/**
	 * 获取版本更新路径
	 * @param version 版本号
	 * @param model   机型
	 * @return
	 */
	private static String getUpdatePath(String version,String model,HttpServletRequest request, HttpServletResponse response)
	{
		String path = "";
		File file = new File(APP_ADD);
		if(!file.exists()) return null;
		else
		{
			ExtFileFilter filter = null;
			if(model.equals("android"))
			{
				filter = new ExtFileFilter(".apk");
			}
			else 
			{
				filter = new ExtFileFilter(".ipa");
			}
			File[] childFiles = file.listFiles(filter);
			String peacockName = childFiles[0].getName();
			peacockName = peacockName.substring(0,peacockName.length()-4);
			
			int apkNum =  Integer.parseInt(version);
			int srcNum =  Integer.parseInt(peacockName);
			if(srcNum > apkNum)
			{
				path = getProjectPath(request, response) + "peacock/update/" + childFiles[0].getName();
			}
		}
		return path;
	}
	
	
	/**
	 * 返回没有下载文件的列表
	 * @param content 客户端已下载的文件参数
	 * @return
	 */
	private static List<FileEntity> getUpdateFiles(String content,HttpServletRequest request, HttpServletResponse response)
	{
		File file = new File(FILE_ADD);
		if(!file.exists()) return null;
		else
		{
			List<FileEntity> list = new ArrayList<FileEntity>();
			
			ZipFilter filter = new ZipFilter();
			File[] childFiles = file.listFiles(filter);
			// 获取客户端已存在的资源列表
			String[] clientFiles = content.split(",");
			for (File child : childFiles) 
			{
				if(!hasFiles(clientFiles, child.getName()))
				{
					FileEntity entity = new FileEntity();
				//	entity.setName(child.getName());
					//获取文件大小
					Long ll = child.length();
					float size = ll.floatValue()/1048576;
					BigDecimal decimal = new BigDecimal(size);
					Double length = decimal.setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
					entity.setSize(length.toString());
					
					String path = getProjectPath(request, response) + "peacock/content/";
					entity.setUrl(path + child.getName());
					
					String cover = child.getName().replaceAll(".zip", ".png");
					entity.setCover(path + cover); 
					
					//添加时间
					String date = TimeUtil.getFileCreateDate(child);
					entity.setDate(date.replace("/", "-"));
					list.add(entity);
				}
			}
			return list;
		}
	}
	
	
	/**
	 * 判断客户端是否下载该文件
	 * @param files 客户端文件列表
	 * @param name  服务器资源文件
	 * @return
	 */
	private static boolean hasFiles(String[] files,String name)
	{
		int end  = name.indexOf(".zip");
		name = name.substring(0,end);
		boolean b = false;
		for (String str : files) 
		{
			if(name.equals(str))
			{
				b = true;
				break;
			}
		}
		return b;
	}

}
