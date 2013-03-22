package com.wally.path;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PathServlet extends HttpServlet {
    private static final long serialVersionUID = 4443655831011903288L;
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        Path path = new Path();
        request.setAttribute("path", path.getPath());
        PrintWriter out = response.getWriter();
        out.println("Class.getResource('/').getPath():" + path.getPath());
    }
 
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}
