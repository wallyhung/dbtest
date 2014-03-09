<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.net.URLEncoder" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
	function downloadFile(url) {
		var elemIF = document.createElement("iframe");
		elemIF.src = url;
		elemIF.style.display = "none";
		document.body.appendChild(elemIF);
	}
	
	function a()
	{
		alert(1);
	}
	
	
	
	/* Ext.Ajax.request({  
	    url:'getPath.action',  
	    success:function(res){  
	        var obj = Ext.decode(res.responseText);  
	        //console.log(obj);//可以到火狐的firebug下面看看obj里面的结构  
	        //加入getPath返回的json为{'path':'upload/abc.jpg'}  
	        window.location.href = obj.path;//这样就可以弹出下载对话框了  
	    }  
	}); */  
	
</script>
<title>下载文件</title>
</head>
<body>
	<%
		String filename = null;
		session.setAttribute("java.rar", filename);
		//取得文件名
		// filename=getFilepath().substring(mb.getFilepath().lastIndexOf("\\")+1);
		out.println("<td><a href=download?filename=java.txt>5.1下载书--java</a></td>");//java.rar这个可以改成变量
		out.println("<td><a href=download?filename=dos.rar>dos视频教程</a></td>");
		out.println("<td><a href=download?filename=常用DOS命令.rar>常用DOS命令</a></td>");
		out.println("</tr>");
		// }
	%>
	
	<a href="java.txt" target="_blank">下载</a>
	
	<a href="#" onClick="download()">下载文件</a> 
	<iframe id="downloadURL" height="0" width="0" src="">
	</iframe> <script language="javascript"> function download(){ document.getElementById("downloadURL").src="test.rmvb"; }</script> 
	
	<!-- -第二种下载方法 -->


	<%-- <%
		response.setContentType("application/x-download");//设置为下载application/x-download 
		String filedownload = "/要下载的文件名";//即将下载的文件的相对路径 
		String filedisplay = "最终要显示给用户的保存文件名";//下载文件时显示的文件保存名称 
		String filenamedisplay = URLEncoder.encode(filedisplay, "UTF-8");
		response.addHeader("Content-Disposition", "attachment;filename="
				+ filedisplay);

		try {
			RequestDispatcher dis = application
					.getRequestDispatcher(filedownload);
			if (dis != null) {
				dis.forward(request, response);
			}
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}
	%> --%>
	
	
	<input onkeyup="a();">

</body>
</html>