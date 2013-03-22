package com.wally.test;

/**
 * 中国银行支付网关---银行回调的接口
 * @svncode svn://10.210.71.10/sinapay_bank/src/java/cn/com/sina
 * @package cn.com.sina.pay.Bank.BOC
 * @author yuchao1@staff.sina.com.cn
 * @date 20101014
 * @access limited by password
 * @reference cn.com.sina.pay.ICBC
 * 
 */
import java.io.IOException;
import java.io.StringReader;
import java.util.List;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.http.HttpStatus;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.Namespace;
import org.jdom2.input.SAXBuilder;
import org.xml.sax.InputSource;
/**
 * 最简单的HTTP客户端,用来演示通过GET或者POST方式访问某个页面
 * @author yuchao
 */
public class HttpClient1{
    public static void main(String[] args) throws IOException
    {
    	String merchantNo = "104110053004253";
    	String orderNo = "101023416806";
    	String signData = "SDJFALSF";
    	
    	HttpClient client = new HttpClient();
	        
	        //使用POST方法
			PostMethod postMethod = new PostMethod("https://ebspay.boc.cn/PGWPortal/QueryOrder.do");
	        /**
	         * 使用POST方式提交数据
	         */
	      NameValuePair[] orderInfo = {new NameValuePair("merchantNo",merchantNo),new NameValuePair("orderNos",orderNo),
	    		  new NameValuePair("signData",signData),};
	      postMethod.setRequestBody(orderInfo);

	      client.executeMethod(postMethod);
	      
	      int code = postMethod.getStatusCode();  
	      if (code == HttpStatus.SC_OK){
            String info = null;
            info = new String(postMethod.getResponseBodyAsString());
          }
	      
	      /**
	       * 打印服务器返回的状态
	       */
	      System.out.println("the post return value"+postMethod.getStatusLine());
	      /**
	       * 打印结果页面
	       */
	      String response =   new String(postMethod.getResponseBodyAsString().getBytes("UTF-8"));
	       /**
	        * 打印返回的信息
	        */
	      System.out.println("the getBytes() xml is:"+response);
	       //打印返回的信息
	     String resCode = postMethod.getResponseBodyAsString();
	     System.out.println("the is my other xml:"+resCode);
	       //释放连接
	     postMethod.releaseConnection();
    	
     
     
     StringReader read = new StringReader(resCode);
     InputSource source = new InputSource(read);
     SAXBuilder sb = new SAXBuilder();
     
     try{
     	Document doc = sb.build(source);
     	Element root = doc.getRootElement();
     	
     	System.out.println("the getName is:"+root.getName());
     	List jiedian = root.getChildren();
     	//获得XML中的命名空间（XML中未定义可不写）
     	Namespace ns = root.getNamespace();
     	Element et = null;
     	List orderList = null;
     	
     	for (int i=0;i<jiedian.size();i++)
  		{
  			et = (Element)jiedian.get(i);
  			
  			if(et.getName().equals("header")){
  				System.out.println(et.getChild("merchantNo", ns).getText());
  				System.out.println(et.getChild("exception", ns).getText());
        	}
        	
        	if(et.getName().equals("body")){
        		orderList = et.getChildren();
        	System.out.println(et.getChild("orderTrans", ns).getChild("orderStatus").getText());
  			}
  			
  		}
  		for (int i=0;i<orderList.size();i++)
  		{
  			et = (Element)orderList.get(i);
  			
  			if(et.getName().equals("orderTrans")){
  				System.out.println(et.getChild("payTime", ns).getText());         		
        	}
  			
  		}
  		}catch(JDOMException e){
      		e.printStackTrace();
      }catch(IOException e){
      		e.printStackTrace();
    	}
   }
}