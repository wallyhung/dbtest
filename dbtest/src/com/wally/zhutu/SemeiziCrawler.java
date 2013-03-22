package com.wally.zhutu;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
/**
 * http://sejie.wanxun.org/post/2012-09-25/40039413449
 * @author Administrator
 *
 */
public class SemeiziCrawler {
	private static final String BASEHOST = "http://sejie.wanxun.org/";
	private static DefaultHttpClient client = ConnectionManager.getHttpClient();
	static String url = "http://sejie.wanxun.org/post/2012-09-25/40039413449";
	private static String IMGPATH = "D:\\sexpicture\\色戒美眉图"+File.separator+StringUtil.getDate();
	static int STARTPAGE = 1;
	static int PAGECOUNT = 100;

	public static void main(String[] args) {
		File f = new File(IMGPATH);
		if(!f.exists()){
			f.mkdirs();
		}
		String host = BASEHOST ;
		for(int i=STARTPAGE;i<PAGECOUNT;i++){
			if(i != 1){
				host = BASEHOST+"page/"+i;
			}
			System.out.println("进入第"+i+"页");
			String pageContext = getResultByUrl(host);
//			System.out.println(pageContext);
			List<String>articleURLS = getArticleURL(pageContext);
			for(String articleURL:articleURLS){
				String articleContext = getResultByUrl(articleURL);
				List<String> ImgURLS = getImgURLS(articleContext);
				for(String ImgURL:ImgURLS){
					savepic(ImgURL);
				}
			}
		}
//		String articleContext = getResultByUrl(url);
//		List<String> strs = getImgURLS(articleContext);
//		for(String str:strs){
//			System.out.println(str);
//		}
	}
	/**
	 * 根据url获取页面
	 * @param url
	 * @return
	 */
	public static String getResultByUrl(String url){
		System.out.println("打开网页"+url);
		HttpGet get = new HttpGet(url);
		HttpEntity entity = null;
		HttpResponse response = null;
		try {
			response = client.execute(get);
			entity = response.getEntity();
			if(entity != null){
				InputStream is = entity.getContent();
				StringWriter sw = new StringWriter();
				IOUtils.copy(is, sw, "UTF-8");
				is.close();
				sw.close();
				return sw.toString();
			}
		} catch (Exception e) {
			System.out.println("网页打开出错");
			return null;
		}finally{
			get.abort();
			try {
				EntityUtils.consume(entity);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	/**
	 * 找出当前页面中所有帖子的地址
	 * @param pageStr  网页字符串
	 * @return
	 */
	public static List<String> getArticleURL(String pageContext){
		if(pageContext == null){
			return null;
		}
		List<String> articleURLS = new ArrayList<String>();
		System.out.println("寻找帖子...........");
		try {
			Document doc = Jsoup.parseBodyFragment(pageContext);
			Elements es = doc.select("div.post"); 
			es = es.select("div[class=post-item type-photo]");
			es = es.select("div.meta a:containsOwn(全文)");
			for(Element e:es){
				articleURLS.add(e.attr("href"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return articleURLS;
	}
	/**
	 * 获取帖子的图片地址
	 * @param articleURLS
	 * @return
	 */
	public static List<String> getImgURLS(String articleContext){
		List<String>ImgURLS = new ArrayList<String>();
		if(articleContext == null){
			return null;
		}
		System.out.println("获取图片地址-----------");
		Document doc = Jsoup.parse(articleContext);
		Elements es = doc.select("a[target=_blank] img[src]");
		 for(Iterator<Element> i=es.iterator();i.hasNext();){
				Element e = i.next();
				ImgURLS.add(e.attr("src"));
             }
		return ImgURLS;
	}
	/**
	 * 保存图片
	 * @param ImgURL
	 */
	public static void savepic(String ImgURL){
		if(ImgURL == null){
			return ;
		}
		HttpGet get = new HttpGet(ImgURL);
		String[] strs = ImgURL.split("/");
		String fileName = strs[strs.length-1];
	    String savePath = IMGPATH+File.separator+fileName;
		HttpEntity entity = null;
		try {
			HttpResponse response = client.execute(get);
			entity = response.getEntity();
			System.out.println("保存图片>>>>.>>>>>>"+fileName);
			InputStream is = entity.getContent();
			OutputStream os = new FileOutputStream(savePath);
			IOUtils.copy(is, os);
			IOUtils.closeQuietly(os);
			IOUtils.closeQuietly(is);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("图片保存失败");
			return ;
		}
	}
}