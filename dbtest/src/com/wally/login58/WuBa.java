package com.wally.login58;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class WuBa {

	private static final String path = "D:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp1/wtpwebapps/dbtest/js/wuba.js";

	public String test(String name, String pass) throws Exception {

		// 读取JS文件
		BufferedReader buf = new BufferedReader(new InputStreamReader(new FileInputStream(new File(path))));

		// 调用js。。这里是关键 啊
		ScriptEngineManager scriptManager = new ScriptEngineManager();
		ScriptEngine js = scriptManager.getEngineByExtension("js");
		// 执行JS
		js.eval(buf);
		long date = new Date().getTime();
		String time = String.valueOf(date).substring(5, 11);
		Invocable inv2 = (Invocable) js;

		/**
		 * timespan = 1387957269523 - new Date().getTime() timesign = new
		 * Date().getTime() + timespan timesign - 1387957269523 1:58:43 5:58:43
		 * $("#p3").val(encryptString(timesign+encodeURIComponent($("#password").val()),"010001",
		 * "008baf14121377fc76eaf7794b8a8af17085628c3590df47e6534574efcfd81ef8635fcdc67d141c15f51649a89533df0db839331e30b8f8e4440ebf7ccbcc494f4ba18e9f492534b8aafc1b1057429ac851d3d9eb66e86fce1b04527c7b95a2431b07ea277cde2365876e2733325df04389a9d891c5d36b7bc752140db74cb69f"
		 * )); 验证码:http://passport.58.com/validatecode?temp=123
		 * 
		 */
		Map<String, String> paramsValue = parse("");
		for (String s : paramsValue.keySet())
		{
			System.out.println(s + ":-----------" + paramsValue.get(s));
			
		}
	    
		
		
		
		

		// p1的获取 执行js中的方法
		String p1 = (String) inv2.invokeFunction("getm32str", pass, time);

		// p2的获取
		String m32 = (String) inv2.invokeFunction("hex_md5", pass);
		m32 = m32.substring(8, 24);

		String result = "";
		for (int i = m32.length() - 1; i >= 0; i--) {
			result += m32.charAt(i);
		}

		String p2 = (String) inv2.invokeFunction("getm16str", result, time);
		
		String p3 = "";

		// 组装参数
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("isweak", "1");
		params.put("path","http://xa.58.com/?utm_source=pinpaizhuanqu&utm_medium=wf&utm_campaign=bp-title");// http://my.58.com/?pts=1388020803227
		params.put("p1", p1);
		params.put("p2", p2);
		params.put("p3", p3);
		params.put("timesign", String.valueOf(date));
		params.put("ptk", "手机号");
		params.put("cd", "手机号");
		params.put("username", name);
		params.put("password", "password");
		// params.put("validatecode", "de22q");
		params.put("mcresult", "password");
		params.put("remember", "on");
		// 发送请求并获取cookie dounionlogin
		String cookie = SendRequest.sendGet("http://passport.58.com/dounionlogin", null, params, "utf-8").getCookie();
		return cookie;
	}

	public static void main(String[] args) throws Exception {
		String cookie = new WuBa().test("363306725@qq.com", "6239219");
		HashMap<String, String> header = new HashMap<String, String>();
		header.put("Cookie", cookie);

		// 登陆我的中心 验证是否登陆成功！
//		System.out.println(EntityUtils.toString(
//				SendRequest.sendGet("http://my.58.com/", header, null, "utf-8")
//						.getHttpEntity(), "utf-8"));

	}
	
	
	
	static Map<String, String> parse(String html)
	{
		Map<String, String> params = new HashMap<String, String>();
//		Document doc = Jsoup.parse(html);
		
		Document doc = null;
		try 
		{
			doc = Jsoup.connect("http://passport.58.com/login").get();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Elements inputs = doc.select("input[name]");
		for (Iterator iterator = inputs.iterator(); iterator.hasNext();) 
		{
			Element element = (Element) iterator.next();
			
			params.put(element.attr("name"), element.attr("value"));
		}
		
		return params;
	}
	
	
	
	
	
	/**
	 * 获取网页内容
	 * @param url
	 * @return
	 */
	static String get(String url)
	{
		String html = null;
		HttpClient client = new DefaultHttpClient();
		
		HttpGet get = new HttpGet(url);
		HttpResponse response;
		try {
			response = client.execute(get);
			
			System.out.println(response.getStatusLine());
			HttpEntity entity = response.getEntity();
			
			BufferedReader br = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"));
			
			html = IOUtils.toString(br);
			
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return html;
	}

}
