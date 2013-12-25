package com.wally.login58;

/**
 *  主方法
 * @author Legend、
 *
 */
public class BaiduMain {
 
     
public static void main(String[] args) throws Exception {
         
    //验证账号并获取cookie
        String cookie  =  BaiduTieBaNDWS.testAccount("hongwei2007", "daredo!@#$ESZ");
        //发帖
        String info = BaiduTieBaNDWS.reply("测试实施！！", "http://tieba.baidu.com/p/1193625840", cookie);
        //打印返回信心
        System.out.println(info);
    }
}