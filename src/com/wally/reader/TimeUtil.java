package com.wally.reader;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class TimeUtil {
	
	/**
     * 获取文件 创建时间
     * @param _file
     * @return
     */
    public static  String getFileCreateDate(File _file) {

        File file = _file;

        try {

            Process ls_proc = Runtime.getRuntime().exec(

                    "cmd.exe /c dir " + file.getAbsolutePath() + " /tc");  
            BufferedReader br = new BufferedReader(new InputStreamReader(ls_proc.getInputStream()));

            for (int i = 0; i < 5; i++) {

              br.readLine(); 

            }

            String stuff = br.readLine();

            StringTokenizer st = new StringTokenizer(stuff);

            String dateC = st.nextToken()+" ";

            String time = st.nextToken();

            String datetime = dateC.concat(time);

            br.close();

            return datetime;

        } catch (Exception e) {

            return null;
        }

    }

}
