var array={indexOf:function(c,d){for(var b=0,a=c.length;b<a;b++){if(c[b]==d){return b;}}return -1;},find:function(e,c){var d,b,a=e.length;if("function"==typeof c){for(b=0;b<a;b++){d=e[b];if(true===c.call(e,d,b)){return d;}}}return null;},filter:function(g,e){var c=[],b=0,a=g.length,f,d;if("function"==typeof e){for(d=0;d<a;d++){f=g[d];if(true===e.call(g,f,d)){c[b++]=f;}}}return c;}};var js={cache:[],loglist:[],push:function(d,b,a,c){if(arguments.length==1&&fe.isObject(arguments[0])){this.cache.push(arguments[0]);}else{this.cache.push({src:d,onsuccess:b,onerror:a});}},flush:function(){var a=this;fe.array.each(this.cache,function(b){a.appendScript(b);});},append:function(d,b,a,c){if(arguments.length==1&&fe.isObject(arguments[0])){this.appendScript(arguments[0]);}else{this.appendScript({src:d,onsuccess:b,onerror:a});}},appendScript:function(f){var k,n=this,f=f||{},b=f.src,o=f.onsuccess,j=f.onerror,i=f.refresh,d=false,e=window,g=e.document,h=g.head||g.getElementsByTagName("head")[0],l=/loaded|complete|undefined/i,a=g.dispatchEvent?"onload":"onreadystatechange";if(fe.isEmpty(b)){return;}if(f.type=="jsonp"){var c=f.callbackName||"callback",m=f.callback||fe.id("jsonp");b.indexOf("?")==-1?b+="?":b+="&";b+=c+"="+m;window[m]=function(){d=true;f.onsuccess&&f.onsuccess.call(this,arguments);n.log("success","script脚本正确加载,callback被正确调用",[this,arguments]);};}if(i===true){if(b.indexOf("?")==-1){b+="?";}else{b+="&";}b+="refreah="+Math.random();}k=document.createElement("script");k.charset="utf-8";k.type="text/javascript";k.defer=true;k.async=true;k.onerror=function(){j&&j.apply(this,arguments);n.log("error","script脚本加载失败",[this,arguments]);n.removeScript(this);};k[a]=function(){if(l.test(this.readyState)){if(f.type=="jsonp"){!d&&j&&j.apply(this,arguments);n.log("error","script脚本正确加载，但是callback没有被正确调用",[this,arguments]);}else{o&&o.apply(this,arguments);n.log("success","script脚本正确加载",[this,arguments]);}n.removeScript(this);}};k.src=b;h.insertBefore(k,h.firstChild);},removeScript:function(a){var d=window,c=d.document,e=c.dispatchEvent?"onload":"onreadystatechange",b=a.parentNode;if(b&&b.nodeType===1){a.clearAttributes?a.clearAttributes():a[e]=a.onerror=null;a.parentNode.removeChild(a);}},log:function(b,c,a){this.loglist.push([b,c,a]);}};var boot={initConfig:function(b){try{var d="http://static.58.com/js/v6/source/",c=this.getConfigPath(b),f=b.configs[c],a=f.version||b.version;this.configpath=c;this.config=b;if(f){if(f.jsFiles){if(f.jsFiles.just){window.document.writeln('<script type="text/javascript" src="'+d+f.jsFiles.just+"?version="+a+'"><\/script>');}if(f.jsFiles.domload){boot.domload(function(){js.append(d+f.jsFiles.domload+"?version="+a);});}}}}catch(g){if(!boot.isReady){boot.init(function(){boot.initConfig(b);});}}},getConfigPath:function(c){var e=____json4fe,d=e.modules,f=[],h=[],a,b=[];for(var n in c.configs){b.push(n);}if(e.catentry.length){for(var g=0,o=e.catentry.length;g<o;g++){f.push(e.catentry[g].listname);}}else{f.push(e.catentry.listname);}if(e.locallist.length){for(var g=0,o=e.locallist.length;g<o;g++){h.push(e.locallist[g].listname);}}else{h.push(e.locallist.listname);}var l,k;for(var g=0,o=f.length;g<o;g++){l=array.filter(b,function(i){return(i&&array.indexOf(i.split("_")[1].split("|"),f[g])>=0);});if(l&&l.length){break;}}if(l.length==0){l=array.filter(b,function(i){return(i&&i.split("_")[1]=="");});}for(var g=0,o=h.length;g<o;g++){k=array.filter(l,function(i){return(i&&array.indexOf(i.split("_")[2].split("|"),h[g])>=0);});if(k&&k.length){break;}}if(k.length==0){k=array.filter(l,function(i){return(i&&i.split("_")[2]=="");});}if(k&&k.length){return k[0];}else{return null;}},domload:function(a){this.init(a);},isReady:false,readyList:[],DOMContentLoaded:null,readyBound:false,readyWait:1,ready:function(d){if(d===true){this.readyWait--;}if(!this.readyWait||(d!==true&&!this.isReady)){if(!document.body){return setTimeout(this.ready,1);}this.isReady=true;if(d!==true&&--this.readyWait>0){return;}if(this.readyList){var c,a=0,b=this.readyList;this.readyList=null;while((c=b[a++])){c.call(document,boot);}}}},bindReady:function(){if(this.readyBound){return;}this.readyBound=true;if(document.readyState==="complete"){return setTimeout(this.ready,1);}if(document.addEventListener){document.addEventListener("DOMContentLoaded",this.DOMContentLoaded,false);window.addEventListener("load",this.ready,false);}else{if(document.attachEvent){document.attachEvent("onreadystatechange",this.DOMContentLoaded);window.attachEvent("onload",this.ready);var a=false;try{a=window.frameElement==null;}catch(b){}if(document.documentElement.doScroll&&a){doScrollCheck_boot();}}}},init:function(a){this.bindReady();if(this.isReady){a.call(document,boot);}else{if(this.readyList){this.readyList.push(a);}}return;}};if(document.addEventListener){boot.DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",boot.DOMContentLoaded,false);boot.ready();};}else{if(document.attachEvent){boot.DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",boot.DOMContentLoaded);boot.ready();}};}}function doScrollCheck_boot(){if(boot.isReady){return;}try{document.documentElement.doScroll("left");}catch(a){setTimeout(doScrollCheck_boot,1);return;}boot.ready();}boot.initConfig({"version":1333620623105,"configs":{"passport___":{"version":"0.1.13","css":"","jsFiles":{"just":"f01f02dc906c8e6734ed04749e5db7cb.js"}}}});