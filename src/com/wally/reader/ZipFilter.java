package com.wally.reader;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * zip文件格式过滤器
 * @author wally
 */
public class ZipFilter implements FileFilter
{
	public ZipFilter() {
	}
	
    public boolean accept(File f)
    {
    	boolean b = false;
    	String name = f.getName().toLowerCase();
    	//判断是否是zip文件
        if (f != null && name.endsWith(".zip"))
        {
        	name = name.replace(".zip", "");
        	Pattern pattern = Pattern.compile("[0-9]*");
        	Matcher match=pattern.matcher(name);
        	// 判断名字中是否还有字母
        	if(match.matches())
        	{
        		try 
        		{
        			// 判断zip文件里面是否含有文件夹
					FileInputStream fi = new FileInputStream(f);
	        		ZipInputStream input = new ZipInputStream(fi);
	        		ZipEntry zipEntry = input.getNextEntry();
	        		if(!zipEntry.isDirectory())
	        		{
	        			b = true;
	        		}
					
				} catch (FileNotFoundException e) 
				{
					System.out.println(f.getName() + "文件找不到！");
				}catch (IOException ioe) 
				{
					System.out.println(f.getName() + "文件转换错误！");
				}
        	}
        }
        
        return b;
    }

    public String getDescription()
    {
        return "Filter for all txt files.";
    }
}