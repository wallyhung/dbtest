package com.wally.reader;

import java.io.File;
import java.io.FileFilter;



public class ExtFileFilter implements FileFilter
{
	private String type;
	
	public ExtFileFilter() {
	}
	
	public ExtFileFilter(String type) {
		this.setType(type);
	}

	public boolean accept(File f) 
	{
		boolean b = false;
    	String name = f.getName().toLowerCase();
    	//判断是否是type文件
        if (f != null && name.endsWith(type))
        {
        	b = true;
        }
        return b;
	}

	public String getDescription() 
	{
		return null;
	}

	///~~~ getter and setter
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	

}
