<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<div id="navMenu">
		<div class="top">
		<span id=toplogo></span>
		<span id=toptitle></span>
		</div>
      <div class="navparam">
           
                 <span id="st">11</span>
				 <span id="ll">22</span>
				 <span id="pl">33</span> 
				 <span id="yg">44</span>
		 
      </div>
		<div class="navTop">
			<ul class="left">
				<li class="onelink"><a href='./main.jsp'>首页</a></li>
				<li><a href='/pages/realCurve.jsp'>实时曲线</a></li>
				<li><a href='/pages/hisCurve.jsp'>历史曲线</a></li>
				<li><a href='/pages/report.jsp'>报表统计</a></li>
				<li class="active"><a href='#'>资料管理</a></li>
				<li><a href='/jsp/logout.jsp'>退出系统</a></li>
			</ul>
			
		</div>
		<div class="subnav">
			<span id="dt" class="fleft"> <script type="text/javascript">
                        var d = new Date();  
                       var weekday = new Array(7); 
                       weekday[0] = "星期日";
                       weekday[1] = "星期一"; 
                       weekday[2] = "星期二"; 
                       weekday[3] = "星期三"; 
                       weekday[4] = "星期四"; 
                       weekday[5] = "星期五"; 
                       weekday[6] = "星期六"; 
                        var m = d.getMonth() + 1; 
                        document.write("今天是"+d.getFullYear()+"年"+m+"月"+d.getDate()+"日 "+weekday[d.getDay()]);              
                    </script>
                     </span>
				<span class="fr"> <span>欢迎<font color="yellow"><%=session.getAttribute("uname")%></font>光临,</span>
				<span>您是第<%=session.getAttribute("count")%>位访客!</span> </span>


		</div>
	</div>

	<!--content-->
	<div class="content">
      <div class="contentTop">
      <span >
     参数选择: <input id="znoteSel" type="text" readonly value="请选择要查看资料" onclick="showMenu();" />
		</span>
        <span>
		<button id="ok1">查询</button>
		</span>
          </div>
		<!--ztree设置-->
		 <div  class="conTop" id="menuContent">
            <%--  <%
          DOM4JReader doj=new DOM4JReader();
             String zNodes=doj.getzNode("zTreeNodes.xml","zDataM");
    %>

                 <ul id="treeDemo" class="ztree" ></ul>
      <script type="text/javascript"> 
      var z =<%=zNodes%> --%>
      $(document).ready(setzTree(z)); 
              </script> 
             </div>
             
             
		<!--主区域，用于显示曲线，报表等-->
		
		
<!-- 			<div id="report_frame" ></div> -->
	</div>
	
	<iframe id="report_frame"></iframe>
	<div id="foot">北京四方继保自动化股份有限公司  版权所有 </div>
	
</body>
</html>