(function(){
	var $obj = $('#conleft');
	var size = 2;
	var num = Math.floor(Math.random()*size);
	var style = '<style>#login-welcome-bg{background:url(https://passport.58.com/pic2/ui6/my/images/login-2014chunjie_' + num + '.png?1) no-repeat 0 0;display:block;} #login-welcome-bg:hover{opacity:0.9;filter:alpha(opacity=90);}</style>';
	var inner = '<a id="login-welcome-bg" href="http://static.58.com/zt/2014chunjie/index.html?from=login" target="_blank"></a>'
	$obj.html(style+inner);
})();