package com.wally.path;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class Path {
    public String getPath() throws IOException
    {
        InputStream is = this.getClass().getResourceAsStream("/a.txt");
        
        System.out.println("获取的路径"+this.getClass().getResource("/").getPath());
        File file = new File(Path.class.getResource("/").getPath()+"/b.txt");
        OutputStream os = new FileOutputStream(file);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead = is.read(buffer, 0, 8192)) != -1) {
            os.write(buffer, 0, bytesRead);
        }
        os.close();
        is.close();
        return this.getClass().getResource("/").getPath();
    }
}