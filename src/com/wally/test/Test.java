package com.wally.test;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.json.JSONException;


public class Test {
	public static void main(String[] args) {
		String a = "1195";//输入数值 
		BigInteger src = new BigInteger(a);//转换为BigInteger类型 
		System.out.println(src.toString(2));//转换为2进制并输出结果 
		
		
		String b = "10010101011";//输入数值 
		BigInteger tt = new BigInteger(b, 2);//转换为BigInteger类型 
		System.out.println(tt.toString());//转换为2进制并输出结果 
		
		jsonChange();
		
		JSONToObject();
	}
	
	
	public static void jsonChange()
	{
		List<TimeData> datas = new ArrayList<TimeData>();
		List<TimeData> datas1 = new ArrayList<TimeData>();
		TimeData data = new TimeData();
		data.setAge("12");
		data.setBirthDate("2012-03-23");
		data.setGander("f");
		data.setName("ming");
		data.setPass("ming_pass");
		
		datas.add(data);
		datas1.add(data);
		
		TimeData data1 = new TimeData();
		data1.setAge("15");
		data1.setBirthDate("2012-03-21");
		data1.setGander("m");
		data1.setName("qiang");
		data1.setPass("qiang_pass");
		
		datas.add(data1);
		datas1.add(data1);
		
		JSONObject jo = JSONObject.fromObject(data);
		
		JSONArray array = JSONArray.fromObject(datas);
		JSONArray array1 = JSONArray.fromObject(datas1);
		
		JSONObject jj = new JSONObject();
		jj.put("a", array);
		jj.put("a1", array1);
		
		System.out.println(jo);
		System.out.println(array);
		System.out.println(jj);
		
	}
	
	public static void JSONToObject()
	{
		String result = "[{\"username\": \"your name\", \"user_json\": {\"username\": \"your name\", \"nickname\": \"your nickname\"}}]";

		// 根据字符串生成JSON对象
		org.json.JSONArray resultArray;
		try 
		{
			/* {
			  "username": "your name", 
			  "user_json": [
			    {
			      "username": "your name", 
			      "nickname": "your nickname"
			    }
			  ]
			} */
			resultArray = new org.json.JSONArray(result);
			org.json.JSONObject resultObj = resultArray.optJSONObject(0);
			
			 //获取数据项
			 String username = resultObj.getString("username");
			 
			 System.out.println(username);
			 
			 //获取数据对象
			 org.json.JSONObject user = resultObj.getJSONObject("user_json");
			 String nickname = user.getString("nickname");
			 
			 System.out.println(nickname);
			 
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		
		 
		
		 
		 
	}
	
	
	
	
	
	

}
