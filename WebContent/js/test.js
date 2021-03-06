window.undefined = window.undefined;
window.fe = function(a, c) {
};
fe.apply = function(e, f, d) {
	if (d) {
		fe.apply(e, d);
	}
	if (e && f && typeof f == "object") {
		for ( var a in f) {
			e[a] = f[a];
		}
	}
	return e;
};
(function() {
	var idSeed = 0, ua = navigator.userAgent.toLowerCase(), check = function(r) {
		return r.test(ua);
	}, isStrict = document.compatMode == "CSS1Compat", isOpera = check(/opera/), isChrome = check(/chrome/), isWebKit = check(/webkit/), isSafari = !isChrome
			&& check(/safari/), isSafari3 = isSafari && check(/version\/3/), isSafari4 = isSafari
			&& check(/version\/4/), isIE = !isOpera && check(/msie/), isIE6 = isIE
			&& check(/msie 6/), isIE7 = isIE && check(/msie 7/), isIE8 = isIE
			&& check(/msie 8/), isIE9 = isIE && check(/msie 9/), isGecko = !isWebKit
			&& check(/gecko/), isGecko3 = isGecko && check(/rv:1\.9/), isBorderBox = isIE
			&& !isStrict, isWindows = check(/windows|win32/), isMac = check(/macintosh|mac os x/), isAir = check(/adobeair/), isLinux = check(/linux/), isSecure = /^https/i
			.test(window.location.protocol);
	if (isIE && !(isIE7 || isIE8)) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {
		}
	}
	var feid = Math.floor(Math.random() * 10000);
	fe
			.apply(
					fe,
					{
						isStrict : isStrict,
						isSecure : isSecure,
						isOpera : isOpera,
						isWebKit : isWebKit,
						isChrome : isChrome,
						isSafari : isSafari,
						isSafari3 : isSafari3,
						isSafari4 : isSafari4,
						isSafari2 : isSafari && !isSafari3,
						isIE : isIE,
						isIE6 : isIE6,
						isIE7 : isIE7,
						isIE8 : isIE8,
						isIE9 : isIE9,
						isGecko : isGecko,
						isGecko2 : isGecko && !isGecko3,
						isGecko3 : isGecko3,
						isBorderBox : isBorderBox,
						isLinux : isLinux,
						isWindows : isWindows,
						isMac : isMac,
						isAir : isAir,
						enableGarbageCollector : true,
						enableListenerCollection : false,
						USE_NATIVE_JSON : false,
						TRUE : true,
						FALSE : false,
						emptyFn : function() {
						},
						isEmpty : function(v, allowBlank) {
							return v === null || v === undefined
									|| ((fe.isArray(v) && !v.length))
									|| (!allowBlank ? v === "" : false);
						},
						isArray : function(v) {
							return Object.prototype.toString.apply(v) === "[object Array]";
						},
						isObject : function(v) {
							return v && typeof v == "object";
						},
						isPrimitive : function(v) {
							var t = typeof v;
							return t == "string" || t == "number"
									|| t == "boolean";
						},
						isFunction : function(v) {
							return typeof v == "function";
						},
						isDefined : function(v) {
							return typeof v !== "undefined";
						},
						isDate : function(v) {
							return toString.apply(v) === "[object Date]";
						},
						isObject : function(v) {
							return !!v
									&& Object.prototype.toString.call(v) === "[object Object]";
						},
						isPrimitive : function(v) {
							return fe.isString(v) || fe.isNumber(v)
									|| fe.isBoolean(v);
						},
						isFunction : function(v) {
							return toString.apply(v) === "[object Function]";
						},
						isNumber : function(v) {
							return typeof v === "number" && isFinite(v);
						},
						isString : function(v) {
							return typeof v === "string";
						},
						isBoolean : function(v) {
							return typeof v === "boolean";
						},
						isElement : function(v) {
							return v ? !!v.tagName : false;
						},
						id : function(qualifier) {
							if (qualifier) {
								return qualifier + (feid++);
							} else {
								return feid++;
							}
						},
						newGuid : function() {
							var guid = "";
							for ( var i = 1; i <= 32; i++) {
								var n = Math.floor(Math.random() * 16)
										.toString(16);
								guid += n;
								if ((i == 8) || (i == 12) || (i == 16)
										|| (i == 20)) {
									guid += "-";
								}
							}
							return guid;
						},
						applyIf : function(o, c) {
							if (o) {
								for ( var p in c) {
									if (fe.isEmpty(o[p])) {
										o[p] = c[p];
									}
								}
							}
							return o;
						},
						extend : function() {
							var io = function(o) {
								for ( var m in o) {
									this[m] = o[m];
								}
							};
							var oc = Object.prototype.constructor;
							return function(sb, sp, overrides) {
								if (fe.isObject(sp)) {
									overrides = sp;
									sp = sb;
									sb = overrides.constructor != oc ? overrides.constructor
											: function() {
												sp.apply(this, arguments);
											};
								}
								var F = function() {
								}, sbp, spp = sp.prototype;
								F.prototype = spp;
								sbp = sb.prototype = new F();
								sbp.constructor = sb;
								sb.superclass = spp;
								if (spp.constructor == oc) {
									spp.constructor = sp;
								}
								sb.override = function(o) {
									fe.override(sb, o);
								};
								sbp.superclass = sbp.supr = (function() {
									return spp;
								});
								sbp.override = io;
								fe.override(sb, overrides);
								sb.extend = function(o) {
									fe.extend(sb, o);
								};
								return sb;
							};
						}(),
						override : function(origclass, overrides) {
							if (overrides) {
								var p = origclass.prototype;
								fe.apply(p, overrides);
								if (fe.isIE
										&& overrides.toString != origclass.toString) {
									p.toString = overrides.toString;
								}
							}
						},
						namespace : function() {
							var o, d;
							fe.each(arguments, function(v) {
								d = v.split(".");
								o = window[d[0]] = window[d[0]] || {};
								fe.each(d.slice(1), function(v2) {
									o = o[v2] = o[v2] || {};
								});
							});
							return o;
						},
						urlEncode : function(o, pre) {
							var buf = [], key, e = encodeURIComponent;
							for (key in o) {
								fe.each(o[key] || key, function(val, i) {
									buf.push("&", e(key), "=",
											val != key ? e(val) : "");
								});
							}
							if (!pre) {
								buf.shift();
								pre = "";
							}
							return pre + buf.join("");
						},
						urlDecode : function(string, overwrite) {
							var obj = {}, pairs = string.split("&"), d = decodeURIComponent, name, value;
							fe.each(pairs, function(pair) {
								pair = pair.split("=");
								name = d(pair[0]);
								value = d(pair[1]);
								obj[name] = overwrite || !obj[name] ? value
										: [].concat(obj[name]).concat(value);
							});
							return obj;
						},
						isReady : false,
						readyList : [],
						DOMContentLoaded : null,
						readyBound : false,
						readyWait : 1,
						ready : function(wait) {
							if (wait === true) {
								this.readyWait--;
							}
							if (!this.readyWait
									|| (wait !== true && !this.isReady)) {
								if (!document.body) {
									return setTimeout(this.ready, 1);
								}
								this.isReady = true;
								if (wait !== true && --this.readyWait > 0) {
									return;
								}
								if (this.readyList) {
									var fn, i = 0, ready = this.readyList;
									this.readyList = null;
									while ((fn = ready[i++])) {
										fn.call(document, fe);
									}
								}
							}
						},
						bindReady : function() {
							if (this.readyBound) {
								return;
							}
							this.readyBound = true;
							if (document.readyState === "complete") {
								return setTimeout(this.ready, 1);
							}
							if (document.addEventListener) {
								document.addEventListener("DOMContentLoaded",
										this.DOMContentLoaded, false);
								window.addEventListener("load", this.ready,
										false);
							} else {
								if (document.attachEvent) {
									document.attachEvent("onreadystatechange",
											this.DOMContentLoaded);
									window.attachEvent("onload", this.ready);
									var toplevel = false;
									try {
										toplevel = window.frameElement == null;
									} catch (e) {
									}
									if (document.documentElement.doScroll
											&& toplevel) {
										doScrollCheck();
									}
								}
							}
						},
						init : function(fn) {
							this.bindReady();
							if (this.isReady) {
								fn.call(document, fe);
							} else {
								if (this.readyList) {
									this.readyList.push(fn);
								}
							}
							return;
						},
						domload : (function() {
							var load_events = [], load_timer, script, done, exec, old_onload, init = function() {
								done = true;
								clearInterval(load_timer);
								while (exec = load_events.shift()) {
									exec();
								}
								if (script) {
									script.onreadystatechange = "";
								}
							};
							return function(func) {
								if (done) {
									return func();
								}
								if (!load_events[0]) {
									if (document.addEventListener) {
										document
												.addEventListener(
														"DOMContentLoaded",
														init, false);
										/* @cc_on@ */
										/*
										 * @if (@_win32) document.write("<script
										 * id=__ie_onload defer src=//0><\/scr" +
										 * "ipt>"); script =
										 * document.getElementById("__ie_onload");
										 * script.onreadystatechange = function () {
										 * if (this.readyState == "complete")
										 * init(); // call the onload handler };
										 * /*@end@
										 */
									}
									if (/WebKit/i.test(navigator.userAgent)) {
										load_timer = setInterval(
												function() {
													if (/loaded|complete/
															.test(document.readyState)) {
														init();
													}
												}, 10);
									}
									old_onload = window.onload;
									window.onload = function() {
										init();
										if (old_onload) {
											old_onload();
										}
									};
								}
								load_events.push(func);
							};
						})(),
						isTopReady : false,
						topReadyList : [],
						topReady : function(fn) {
							if (fe.isTopReady) {
								fn.call(document, fe);
							} else {
								if (fe.topReadyList) {
									fe.topReadyList.push(fn);
								}
							}
							return this;
						},
						OnTopReady : function() {
							fe.isTopReady = true;
							if (fe.topReadyList) {
								var fn, i = 0;
								while ((fn = fe.topReadyList[i++])) {
									fn.call(document, fe);
								}
								fe.topReadyList = null;
							}
						},
						toArray : function() {
							return fe.isIE ? function(a, i, j, res) {
								res = [];
								fe.each(a, function(v) {
									res.push(v);
								});
								return res.slice(i || 0, j || res.length);
							} : function(a, i, j) {
								return Array.prototype.slice.call(a, i || 0, j
										|| a.length);
							};
						}(),
						each : function(array, fn, scope) {
							if (fe.isEmpty(array, true)) {
								return;
							}
							if (typeof array.length == "undefined"
									|| typeof array == "string") {
								array = [ array ];
							}
							for ( var i = 0, len = array.length; i < len; i++) {
								if (fn.call(scope || array[i], array[i], i,
										array) === false) {
									return i;
								}
							}
						}
					});
})();
if (document.addEventListener) {
	fe.DOMContentLoaded = function() {
		document.removeEventListener("DOMContentLoaded", fe.DOMContentLoaded,
				false);
		fe.ready();
	};
} else {
	if (document.attachEvent) {
		fe.DOMContentLoaded = function() {
			if (document.readyState === "complete") {
				document.detachEvent("onreadystatechange", fe.DOMContentLoaded);
				fe.ready();
			}
		};
	}
}
function doScrollCheck() {
	if (fe.isReady) {
		return;
	}
	try {
		document.documentElement.doScroll("left");
	} catch (a) {
		setTimeout(doScrollCheck, 1);
		return;
	}
	fe.ready();
}
fe.domload(function() {
});
fe.init(function() {
	if (!fe.isTopReady) {
		fe.OnTopReady();
	}
});
fe.topReady(function() {
});
fe.dom = {
	_NAME_ATTRS : (function() {
		var a = {
			"cellpadding" : "cellPadding",
			"cellspacing" : "cellSpacing",
			"colspan" : "colSpan",
			"rowspan" : "rowSpan",
			"valign" : "vAlign",
			"usemap" : "useMap",
			"frameborder" : "frameBorder"
		};
		if (fe.isIE && !(fe.isIE8) && !(fe.isIE9)) {
			a["for"] = "htmlFor";
			a["class"] = "className";
		} else {
			a["htmlFor"] = "for";
			a["className"] = "class";
		}
		return a;
	})(),
	create : function(c, a) {
		a = a || {};
		var d = document.createElement(c);
		return this.setAttr(d, a);
	},
	clone : function(c) {
		var a = this.get(c);
		if (fe.isElement(a)) {
			return a.cloneNode(arguments[1] !== false);
		}
		return null;
	},
	remove : function(c) {
		var a = this.get(c);
		if (a.parentNode) {
			a.parentNode.removeChild(a);
		}
	},
	clear : function(c) {
		var a = this.get(c);
		if (fe.isElement(a)) {
			a.innerHTML = "";
		}
	},
	show : function(c) {
		var a = this.get(c);
		if (fe.isElement(a)) {
			a.style.display = "";
		}
	},
	hide : function(c) {
		var a = this.get(c);
		if (fe.isElement(a)) {
			a.style.display = "none";
		}
	},
	get : function(a) {
		if ("string" == typeof a || a instanceof String) {
			return document.getElementById(a);
		} else {
			if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
				return a;
			}
		}
		return null;
	},
	contain : function(d, f) {
		var e = f;
		while (e && e != d) {
			try {
				e = e.parentNode;
			} catch (a) {
				e = d;
			}
		}
		return e === d;
	},
	getOuterHTML : function(a) {
		var a = this.get(a);
		if (!a) {
			return "";
		}
		var c = this.create("DIV", {});
		c.appendChild(this.clone(a));
		return c.innerHTML;
	},
	setAttr : function(d, c, e) {
		if (arguments.length == 3) {
			d = this.get(d);
			if ("style" == c) {
				d.style.cssText = e;
			} else {
				c = this._NAME_ATTRS[c] || c;
				d.setAttribute(c, e);
			}
			return d;
		} else {
			if (arguments.length == 2) {
				d = this.get(d);
				var a = arguments[1];
				for ( var c in a) {
					this.setAttr(d, c, a[c]);
				}
				return d;
			}
		}
	},
	addClass : function(a, c) {
		a = this.get(a);
		if (!a) {
			return;
		}
		if (this.hasClass(a, c)) {
			return;
		}
		a.className += " " + c;
	},
	removeClass : function(e, f) {
		e = this.get(e);
		if (!e) {
			return;
		}
		if (!this.hasClass(e, f)) {
			return;
		}
		var a = e.className.split(/\s+/);
		for ( var d = 0, c = a.length; d < c; d++) {
			if (a[d] == f) {
				a[d] = "";
			}
		}
		e.className = a.join(" ");
	},
	hasClass : function(d, e) {
		d = this.get(d);
		if (!d) {
			return false;
		}
		var f = d.className.split(/\s+/);
		for ( var c = 0, a = f.length; c < a; c++) {
			if (f[c] == e) {
				return true;
			}
		}
		return false;
	}
};
fe.apply(fe.dom, {
	scanList : [],
	scanHandler : null,
	scanInterval : 50,
	attachOnload : function(a, c) {
		if (fe.isIE) {
			a.attachEvent("onload", c);
		} else {
			a.onload = c;
		}
	},
	agency : function(d, a) {
		var c = this;
		d.hosting = true;
		this.attachOnload(a, function() {
			c.__call(d, a);
		});
	},
	__call : function(e, d) {
		e.loaded = true;
		for ( var c = 0, a = e.listeners.length; c < a; c++) {
			if (typeof e.listeners[c] == "function") {
				e.listeners[c].call(d);
			}
		}
	},
	__isLoaded : function(a) {
		if (a) {
			if (a.tagName && a.tagName == "iframe") {
				try {
					if (a.contentWindow.document.readyState == "complete") {
						return true;
					}
				} catch (c) {
				}
				me.agency(o, a);
				return false;
			} else {
				if (a.tagName && a.tagName == "img") {
					if (a.readyState == "complete" || a.complete) {
						return true;
					}
					me.agency(o, a);
					return false;
				} else {
					return true;
				}
			}
		} else {
			return false;
		}
	},
	onload : function(e, d) {
		for ( var c = 0, a = this.scanList.length; c < a; c++) {
			if (this.scanList[c].id == e) {
				if (this.scanList[c].loaded == true) {
					d.call(this.get(e));
					return;
				} else {
					this.scanList[c].listeners.push(d);
					return;
				}
			}
		}
		this.scanList.push({
			id : e,
			loaded : false,
			listeners : [ d ],
			hosting : false
		});
		this.start();
	},
	start : function() {
		var a = this;
		if (!this.scanHandler) {
			this.scanHandler = setInterval(function() {
				var h = 0;
				for ( var e = 0, d = a.scanList.length; e < d; e++) {
					var g = a.scanList[e];
					if (g.loaded || g.hosting) {
						h++;
						continue;
					}
					var f = a.get(g.id);
					if (a.__isLoaded(f)) {
						a.__call(g, f);
					}
				}
				if (h == a.scanList.length) {
					a.stop();
				}
			}, this.scanInterval);
		}
	},
	stop : function() {
		clearInterval(this.scanHandler);
		this.scanHandler = null;
	}
});
fe.namespace("fe.util");
fe.event = {
	getButton : function(a) {
		if (fe.isIE) {
			button = (a.button < 2) ? "LEFT" : ((a.button == 4) ? "MIDDLE"
					: "RIGHT");
		} else {
			button = (a.which < 2) ? "LEFT" : ((a.which == 2) ? "MIDDLE"
					: "RIGHT");
		}
		return button;
	},
	_listeners : [],
	_eventFilter : {},
	on : function(e, j, d) {
		if (fe.isArray(e)) {
			for ( var f = 0, l = e.length; f < l; f++) {
				this.on(e[f], j, d);
			}
			return;
		}
		j = j.replace(/^on/i, "");
		e = fe.dom.get(e);
		if (!e) {
			return;
		}
		var a = function(m) {
			d.call(e, m);
		}, k = fe.event._listeners, c = fe.event._eventFilter, g, h = j;
		j = j.toLowerCase();
		if (c && c[j]) {
			g = c[j](e, j, a);
			h = g.type;
			a = g.listener;
		}
		if (e.addEventListener) {
			e.addEventListener(h, a, false);
		} else {
			if (e.attachEvent) {
				e.attachEvent("on" + h, a);
			}
		}
		k[k.length] = [ e, j, d, a, h ];
		return e;
	},
	un : function(e, j, d) {
		if (fe.isArray(e)) {
			for ( var f = 0, p = e.length; f < p; f++) {
				this.un(e[f], j, d);
			}
			return;
		}
		j = (j || "").replace(/^on/i, "").toLowerCase();
		e = fe.dom.get(e);
		if (!e) {
			return;
		}
		var m = fe.event._listeners, g = m.length, c = !j, k = !d, l, h, a;
		while (g--) {
			l = m[g];
			if ((c || l[1] === j) && (l[0] === e) && (k || l[2] === d)) {
				h = l[4];
				a = l[3];
				if (e.removeEventListener) {
					e.removeEventListener(h, a, false);
				} else {
					if (e.detachEvent) {
						e.detachEvent("on" + h, a);
					}
				}
				m.splice(g, 1);
			}
		}
		return e;
	},
	once : function(a, c, d) {
		a = fe.dom.get(a);
		function e(f) {
			d.call(a, f);
			fe.event.un(a, c, e);
		}
		fe.event.on(a, c, e);
		return a;
	},
	stop : function(a) {
		var c = fe.event;
		c.stopPropagation(a);
		c.preventDefault(a);
	},
	stopPropagation : function(a) {
		if (a.stopPropagation) {
			a.stopPropagation();
		} else {
			a.cancelBubble = true;
		}
	},
	preventDefault : function(a) {
		if (a.preventDefault) {
			a.preventDefault();
		} else {
			a.returnValue = false;
		}
	},
	get : function(a, c) {
		return new fe.event.EventArg(a, c);
	},
	getKeyCode : function(a) {
		return a.which || a.keyCode;
	},
	getPageX : function(c) {
		var a = c.pageX, d = document;
		if (!a && a !== 0) {
			a = (c.clientX || 0)
					+ (d.documentElement.scrollLeft || d.body.scrollLeft);
		}
		return a;
	},
	getPageY : function(c) {
		var a = c.pageY, d = document;
		if (!a && a !== 0) {
			a = (c.clientY || 0)
					+ (d.documentElement.scrollTop || d.body.scrollTop);
		}
		return a;
	},
	getTarget : function(a) {
		return a.target || a.srcElement;
	},
	EventArg : function(d, f) {
		f = f || window;
		d = d || f.event;
		var e = f.document;
		this.target = (d.target) || d.srcElement;
		this.keyCode = d.which || d.keyCode;
		for ( var a in d) {
			var c = d[a];
			if ("function" != typeof c) {
				this[a] = c;
			}
		}
		if (!this.pageX && this.pageX !== 0) {
			this.pageX = (d.clientX || 0)
					+ (e.documentElement.scrollLeft || e.body.scrollLeft);
			this.pageY = (d.clientY || 0)
					+ (e.documentElement.scrollTop || e.body.scrollTop);
		}
		this._event = d;
	},
	_unload : function() {
		var d = fe.event._listeners, a = d.length, c = !!window.removeEventListener, f, e;
		while (a--) {
			f = d[a];
			if (f[1] == "unload") {
				continue;
			}
			if (!(e = f[0])) {
				continue;
			}
			if (e.removeEventListener) {
				e.removeEventListener(f[1], f[3], false);
			} else {
				if (e.detachEvent) {
					e.detachEvent("on" + f[1], f[3]);
				}
			}
		}
		if (c) {
			window.removeEventListener("unload", fe.event._unload, false);
		} else {
			window.detachEvent("onunload", fe.event._unload);
		}
	}
};
fe.event.EventArg.prototype.preventDefault = function() {
	if (this._event.preventDefault) {
		this._event.preventDefault();
	} else {
		this._event.returnValue = false;
	}
	return this;
};
fe.event.EventArg.prototype.stopPropagation = function() {
	if (this._event.stopPropagation) {
		this._event.stopPropagation();
	} else {
		this._event.cancelBubble = true;
	}
	return this;
};
fe.event.EventArg.prototype.stop = function() {
	return this.stopPropagation().preventDefault();
};
(function() {
	function j(m, k) {
		for ( var l in k) {
			if (k.hasOwnProperty(l)) {
				m[l] = k[l];
			}
		}
		return m;
	}
	function f(q) {
		var l = [], p = 0, m;
		for (m in q) {
			if (q.hasOwnProperty(m)) {
				l[p++] = q[m];
			}
		}
		return l;
	}
	keys = {
		keydown : 1,
		keyup : 1,
		keypress : 1
	}, mouses = {
		click : 1,
		dblclick : 1,
		mousedown : 1,
		mousemove : 1,
		mouseup : 1,
		mouseover : 1,
		mouseout : 1
	}, htmls = {
		abort : 1,
		blur : 1,
		change : 1,
		error : 1,
		focus : 1,
		load : fe.isIE ? 0 : 1,
		reset : 1,
		resize : 1,
		scroll : 1,
		select : 1,
		submit : 1,
		unload : fe.isIE ? 0 : 1
	}, bubblesEvents = {
		scroll : 1,
		resize : 1,
		reset : 1,
		submit : 1,
		change : 1,
		select : 1,
		error : 1,
		abort : 1
	}, parameters = {
		"KeyEvents" : [ "bubbles", "cancelable", "view", "ctrlKey", "altKey",
				"shiftKey", "metaKey", "keyCode", "charCode" ],
		"MouseEvents" : [ "bubbles", "cancelable", "view", "detail", "screenX",
				"screenY", "clientX", "clientY", "ctrlKey", "altKey",
				"shiftKey", "metaKey", "button", "relatedTarget" ],
		"HTMLEvents" : [ "bubbles", "cancelable" ],
		"UIEvents" : [ "bubbles", "cancelable", "view", "detail" ],
		"Events" : [ "bubbles", "cancelable" ]
	};
	j(bubblesEvents, keys);
	j(bubblesEvents, mouses);
	function h(q, m) {
		var l = 0, k = q.length, p = {};
		for (; l < k; l++) {
			p[q[l]] = m[q[l]];
			delete m[q[l]];
		}
		return p;
	}
	function e(m, l, k) {
		k = j({}, k);
		var p = f(h(parameters[l], k)), q = document.createEvent(l);
		p.unshift(m);
		if ("KeyEvents" == l) {
			q.initKeyEvent.apply(q, p);
		} else {
			if ("MouseEvents" == l) {
				q.initMouseEvent.apply(q, p);
			} else {
				if ("UIEvents" == l) {
					q.initUIEvent.apply(q, p);
				} else {
					q.initEvent.apply(q, p);
				}
			}
		}
		j(q, k);
		return q;
	}
	function c(k) {
		var l;
		if (document.createEventObject) {
			l = document.createEventObject();
			j(l, k);
		}
		return l;
	}
	function a(p, k) {
		k = h(parameters["KeyEvents"], k);
		var q;
		if (document.createEvent) {
			try {
				q = e(p, "KeyEvents", k);
			} catch (m) {
				try {
					q = e(p, "Events", k);
				} catch (l) {
					q = e(p, "UIEvents", k);
				}
			}
		} else {
			k.keyCode = k.charCode > 0 ? k.charCode : k.keyCode;
			q = c(k);
		}
		return q;
	}
	function d(l, k) {
		k = h(parameters["MouseEvents"], k);
		var m;
		if (document.createEvent) {
			m = e(l, "MouseEvents", k);
			if (k.relatedTarget && !m.relatedTarget) {
				if ("mouseout" == l.toLowerCase()) {
					m.toElement = k.relatedTarget;
				} else {
					if ("mouseover" == l.toLowerCase()) {
						m.fromElement = k.relatedTarget;
					}
				}
			}
		} else {
			k.button = k.button == 0 ? 1 : k.button == 1 ? 4 : fe
					.isNumber(k.button) ? k.button : 0;
			m = c(k);
		}
		return m;
	}
	function g(m, k) {
		k.bubbles = bubblesEvents.hasOwnProperty(m);
		k = h(parameters["HTMLEvents"], k);
		var q;
		if (document.createEvent) {
			try {
				q = e(m, "HTMLEvents", k);
			} catch (p) {
				try {
					q = e(m, "UIEvents", k);
				} catch (l) {
					q = e(m, "Events", k);
				}
			}
		} else {
			q = c(k);
		}
		return q;
	}
	fe.event.fire = function(l, m, k) {
		var p;
		m = m.replace(/^on/i, "");
		l = fe.dom.get(l);
		k = j({
			bubbles : true,
			cancelable : true,
			view : window,
			detail : 1,
			screenX : 0,
			screenY : 0,
			clientX : 0,
			clientY : 0,
			ctrlKey : false,
			altKey : false,
			shiftKey : false,
			metaKey : false,
			keyCode : 0,
			charCode : 0,
			button : 0,
			relatedTarget : null
		}, k);
		if (keys[m]) {
			p = a(m, k);
		} else {
			if (mouses[m]) {
				p = d(m, k);
			} else {
				if (htmls[m]) {
					p = g(m, k);
				} else {
					throw (new Error(m + " is not support!"));
				}
			}
		}
		if (p) {
			if (l.dispatchEvent) {
				l.dispatchEvent(p);
			} else {
				if (l.fireEvent) {
					l.fireEvent("on" + m, p);
				}
			}
		}
	};
})();
if (window.attachEvent) {
	window.attachEvent("onunload", fe.event._unload);
} else {
	window.addEventListener("unload", fe.event._unload, false);
}
fe.__Event = function(c, a) {
	this.name = a;
	this.obj = c;
	this.listeners = [];
};
fe.__Event.prototype = {
	addListener : function(e, d, c) {
		var f = this, a;
		d = d || f.obj;
		if (!f.isListening(e, d)) {
			a = f.createListener(e, d, c);
			if (f.firing) {
				f.listeners = f.listeners.slice(0);
			}
			f.listeners.push(a);
		}
	},
	createListener : function(e, d, f) {
		f = f || {};
		d = d || this.obj;
		var a = {
			fn : e,
			scope : d,
			options : f
		}, c = e;
		if (f.target) {
			c = createTargeted(c, f, d);
		}
		if (f.delay) {
			c = createDelayed(c, f, a, d);
		}
		if (f.single) {
			c = createSingle(c, this, e, d);
		}
		if (f.buffer) {
			c = createBuffered(c, f, a, d);
		}
		a.fireFn = c;
		return a;
	},
	findListener : function(e, d) {
		var f = this.listeners, c = f.length, a;
		d = d || this.obj;
		while (c--) {
			a = f[c];
			if (a) {
				if (a.fn == e && a.scope == d) {
					return c;
				}
			}
		}
		return -1;
	},
	isListening : function(c, a) {
		return this.findListener(c, a) != -1;
	},
	removeListener : function(g, f) {
		var e, a, c, h = this, d = false;
		if ((e = h.findListener(g, f)) != -1) {
			if (h.firing) {
				h.listeners = h.listeners.slice(0);
			}
			a = h.listeners[e];
			if (a.task) {
				a.task.cancel();
				delete a.task;
			}
			c = a.tasks && a.tasks.length;
			if (c) {
				while (c--) {
					a.tasks[c].cancel();
				}
				delete a.tasks;
			}
			h.listeners.splice(e, 1);
			d = true;
		}
		return d;
	},
	clearListeners : function() {
		var d = this, a = d.listeners, c = a.length;
		while (c--) {
			d.removeListener(a[c].fn, a[c].scope);
		}
	},
	fire : function() {
		var g = this, f = g.listeners, a = f.length, e = 0, c;
		if (a > 0) {
			g.firing = true;
			var d = Array.prototype.slice.call(arguments, 0);
			for (; e < a; e++) {
				c = f[e];
				if (c
						&& c.fireFn.apply(c.scope || g.obj || window, d) === false) {
					return (g.firing = false);
				}
			}
		}
		g.firing = false;
		return true;
	}
};
fe.observable = function() {
	var a = this, c = a.events;
	if (a.listeners) {
		a.on(a.listeners);
		delete a.listeners;
	}
	a.events = c || {};
};
fe.observable.prototype = {
	filterOptRe : /^(?:scope|delay|buffer|single)$/,
	fireEvent : function() {
		var d = Array.prototype.slice.call(arguments, 0), f = d[0]
				.toLowerCase(), g = this, e = true, j = g.events[f], l, h, k;
		if (g.eventsSuspended === true) {
			if (h = g.eventQueue) {
				h.push(d);
			}
		} else {
			if (typeof j == "object") {
				if (j.bubble) {
					if (j.fire.apply(j, d.slice(1)) === false) {
						return false;
					}
					k = g.getBubbleTarget && g.getBubbleTarget();
					if (k && k.enableBubble) {
						l = k.events[f];
						if (!l || typeof l != "object" || !l.bubble) {
							k.enableBubble(f);
						}
						return k.fireEvent.apply(k, d);
					}
				} else {
					d.shift();
					e = j.fire.apply(j, d);
				}
			}
		}
		return e;
	},
	addListener : function(a, d, c, j) {
		var f = this, h, k, g;
		if (typeof a == "object") {
			j = a;
			for (h in j) {
				k = j[h];
				if (!f.filterOptRe.test(h)) {
					f.addListener(h, k.fn || k, k.scope || j.scope, k.fn ? k
							: j);
				}
			}
		} else {
			a = a.toLowerCase();
			g = f.events[a] || true;
			if (typeof g == "boolean") {
				f.events[a] = g = new fe.__Event(f, a);
			}
			g.addListener(d, c, typeof j == "object" ? j : {});
		}
	},
	removeListener : function(a, d, c) {
		var e = this.events[a.toLowerCase()];
		if (typeof e == "object") {
			if (d && typeof d == "function") {
				e.removeListener(d, c);
			} else {
				e.clearListeners();
			}
		}
	},
	purgeListeners : function() {
		var d = this.events, a, c;
		for (c in d) {
			a = d[c];
			if (typeof a == "object") {
				a.clearListeners();
			}
		}
	},
	addEvents : function(f) {
		var e = this;
		e.events = e.events || {};
		if (typeof f == "string") {
			var c = arguments, d = c.length;
			while (d--) {
				e.events[c[d]] = e.events[c[d]] || true;
			}
		} else {
			fe.applyIf(e.events, f);
		}
	},
	hasListener : function(a) {
		var c = this.events[a.toLowerCase()];
		return typeof c == "object" && c.listeners.length > 0;
	},
	suspendEvents : function(a) {
		this.eventsSuspended = true;
		if (a && !this.eventQueue) {
			this.eventQueue = [];
		}
	},
	resumeEvents : function() {
		var a = this, c = a.eventQueue || [];
		a.eventsSuspended = false;
		delete a.eventQueue;
		fe.each(c, function(d) {
			a.fireEvent.apply(a, d);
		});
	}
};
fe.observable.prototype.on = fe.observable.prototype.addListener;
fe.observable.prototype.un = fe.observable.prototype.removeListener;
fe.anim = {
	hover : function() {
		if (arguments.length == 0) {
			return;
		}
		var d = arguments[0];
		d = fe.dom.get(d);
		if (!d) {
			return;
		}
		if (arguments.length == 2) {
			var e = arguments[1];
			this.hover(d, function() {
				fe.dom.addClass(d, e);
			}, function() {
				fe.dom.removeClass(d, e);
			});
		} else {
			if (arguments.length == 3) {
				var a = this, f = arguments[1], c = arguments[2];
				if (fe.isIE) {
					fe.event.on(d, "mouseenter", f);
					fe.event.on(d, "mouseleave", c);
				} else {
					fe.event.on(d, "mouseover", function(g) {
						var h = g.relatedTarget;
						if (this == h || fe.dom.contain(this, h)) {
							fe.event.stop(g);
							return;
						}
						f.apply(this, arguments);
					});
					fe.event.on(d, "mouseout", function(g) {
						var h = g.relatedTarget;
						if (this == h || fe.dom.contain(this, h)) {
							fe.event.stop(g);
							return;
						}
						c.apply(this, arguments);
					});
				}
			}
		}
	}
};
fe.applyIf(Array.prototype, {
	indexOf : function(d) {
		for ( var c = 0, a = this.length; c < a; c++) {
			if (this[c] == d) {
				return c;
			}
		}
		return -1;
	},
	remove : function(c) {
		var a = this.indexOf(c);
		if (a != -1) {
			this.splice(a, 1);
		}
		return this;
	}
});
fe.array = {};
fe.array.indexOf = function(d, e) {
	for ( var c = 0, a = d.length; c < a; c++) {
		if (d[c] == e) {
			return c;
		}
	}
	return -1;
};
fe.array.each = function(g, e) {
	var d, f, c, a = g.length;
	if ("function" == typeof e) {
		for (c = 0; c < a; c++) {
			f = g[c];
			d = e.call(g, f, c);
			if (d === false) {
				break;
			}
		}
	}
	return g;
};
fe.array.filter = function(h, f) {
	var d = [], c = 0, a = h.length, g, e;
	if ("function" == typeof f) {
		for (e = 0; e < a; e++) {
			g = h[e];
			if (true === f.call(h, g, e)) {
				d[c++] = g;
			}
		}
	}
	return d;
};
fe.array.find = function(f, d) {
	var e, c, a = f.length;
	if ("function" == typeof d) {
		for (c = 0; c < a; c++) {
			e = f[c];
			if (true === d.call(f, e, c)) {
				return e;
			}
		}
	}
	return null;
};
fe.array.map = function(f, e) {
	var d = [], c = 0, a = f.length;
	for (; c < a; c++) {
		d[c] = e(f[c], c);
	}
	return d;
};
fe.apply(Function.prototype, {
	createInterceptor : function(c, a) {
		var d = this;
		return !fe.isFunction(c) ? this : function() {
			var f = this, e = arguments;
			c.target = f;
			c.method = d;
			return (c.apply(a || f || window, e) !== false) ? d.apply(f
					|| window, e) : null;
		};
	},
	createCallback : function() {
		var a = arguments, c = this;
		return function() {
			return c.apply(window, a);
		};
	},
	createDelegate : function(d, c, a) {
		var e = this;
		return function() {
			var g = c || arguments;
			if (a === true) {
				g = Array.prototype.slice.call(arguments, 0);
				g = g.concat(c);
			} else {
				if (typeof a == "number") {
					g = Array.prototype.slice.call(arguments, 0);
					var f = [ a, 0 ].concat(c);
					Array.prototype.splice.apply(g, f);
				}
			}
			return e.apply(d || window, g);
		};
	},
	defer : function(d, f, c, a) {
		var e = this.createDelegate(f, c, a);
		if (d > 0) {
			return setTimeout(e, d);
		}
		e();
		return 0;
	}
});
if (fe.isForefox) {
	HTMLElement.prototype.__defineGetter__("outerHTML", function() {
		var d = this.cloneNode(true);
		var c = document.createElement("DIV");
		c.style.display = "none";
		document.body.appendChild(c);
		c.appendChild(d);
		var a = c.innerHTML;
		document.body.removeChild(c);
		return a;
	});
	HTMLElement.prototype.__defineSetter__("outerHTML", function(a) {
		var c = this.ownerDocument.createRange();
		c.setStartBefore(this);
		var d = c.createContextualFragment(a);
		this.parentNode.replaceChild(d, this);
		return a;
	});
	HTMLElement.prototype
			.__defineGetter__(
					"canHaveChildren",
					function() {
						return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/
								.test(this.tagName.toLowerCase());
					});
}
fe.applyIf(Number.prototype, {
	between : function(c, a) {
		return Math.min(Math.max(this, c), a);
	},
	NaN0 : function() {
		return isNaN(this) ? 0 : this;
	}
});
fe
		.applyIf(
				String,
				{
					format : function(c) {
						var a = fe.toArray(arguments, 1);
						return c.replace(/\{(\d+)\}/g, function(d, e) {
							return a[e];
						});
					},
					formatex : function(d, a) {
						d = String(d);
						var c = Array.prototype.slice.call(arguments, 1), e = Object.prototype.toString;
						if (c.length) {
							c = c.length == 1 ? (a !== null
									&& (/\[object Array\]|\[object Object\]/
											.test(e.call(a))) ? a : c) : c;
							return d.replace(/#\{(.+?)\}/g, function(f, h) {
								var g = c[h];
								if ("[object Function]" == e.call(g)) {
									g = g(h);
								}
								return ("undefined" == typeof g ? "" : g);
							});
						}
						return d;
					},
					escape : function(a) {
						return a.replace(/('|\\)/g, "\\$1");
					},
					leftPad : function(e, c, d) {
						var a = String(e);
						if (!d) {
							d = " ";
						}
						while (a.length < c) {
							a = d + a;
						}
						return a;
					}
				});
fe.applyIf(String.prototype, {
	toggle : function(c, a) {
		return this == c ? a : c;
	},
	trim : function() {
		var a = /^\s+|\s+$/g;
		return this.replace(a, "");
	}
});
var is_cur_window_load_complete = false;
if (document.all) {
	window.attachEvent("onload", SetCurWindowLoadComplete);
} else {
	window.addEventListener("load", SetCurWindowLoadComplete, false);
}
function SetCurWindowLoadComplete() {
	is_cur_window_load_complete = true;
}
String.prototype.TrimString = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.GetByteCount = function() {
	var a = this.replace(/(<.*?>)/ig, "");
	a = a.replace(/([\u0391-\uFFE5])/ig, "11");
	var c = a.length;
	return c;
};
function GetCookieValue(c) {
	var a = document.cookie.match(new RegExp(c + "=([^&;]+)"));
	if (a != null) {
		return decodeURI(a[1]);
	}
	return "";
}
function SetInfomation(e, d, a) {
	var c = document.getElementById(e);
	if (c) {
		if (a) {
			c.className = a;
		}
		if (d) {
			c.innerHTML = d;
		} else {
			c.innerHTML = "";
		}
	}
}
function ChangeTab(g, h, a, f, c) {
	var e = $("#" + h + " " + a);
	for ( var d = 0; d < e.length; d++) {
		e[d].className = c;
	}
	g.className = f;
}
function QuanToBan(d) {
	if (!d || d == "") {
		return "";
	}
	var a = "";
	for ( var c = 0; c < d.length; c++) {
		if (d.charCodeAt(c) == 12288) {
			a += String.fromCharCode(d.charCodeAt(c) - 12256);
			continue;
		}
		if (d.charCodeAt(c) > 65280 && d.charCodeAt(c) < 65375) {
			a += String.fromCharCode(d.charCodeAt(c) - 65248);
		} else {
			a += String.fromCharCode(d.charCodeAt(c));
		}
	}
	return a;
}
function SubmitForm(formname) {
	var theForm = document.forms[formname];
	if (!theForm) {
		eval("theForm=document." + formname + ";");
	}
	if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
		theForm.submit();
	}
}
function InitMyMenu(c) {
	if (c != "") {
		var d = $("#lmenu").find("li");
		for ( var a = 0; a < d.length; a++) {
		}
		d[parseInt(c)].className = "open";
	}
}
function __PostPage(c, a) {
	if (a) {
		$("#__eventArg").val(a);
	}
	$("#__eventTag").val(c);
	SubmitForm("submitForm");
}
function SelectAllCheckBox(a) {
	$("input[type=checkbox][^disabled]").attr("checked",
			a ? a.checked : this.checked);
}
function checkImgeType(d) {
	var c = new Array(".gif", ".jpg", ".jpeg", "png", "bmp");
	if (d == "") {
		return false;
	}
	var f = c.length;
	var h = d.toLowerCase();
	var e = h.length;
	var a = h.substring(e - 4, e);
	var g = h.substring(e - 5, e);
	for (i = 0; i < f; i++) {
		if ((a == c[i]) || (g == c[i])) {
			return true;
		}
	}
	return false;
}
function previewPic(f, e, d) {
	try {
		var a = document.getElementById(f);
		if (document.all) {
			a.innerHTML = "";
			a.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = e;
			a.style.width = d;
			a.style.height = d;
			a.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "scale";
		} else {
			a.innerHTML = "<img src='http://post.58.com/img/nopic2.gif' width='"
					+ d + "' height='" + d + "' />";
		}
	} catch (c) {
	}
}
function CheckFileSize(g) {
	try {
		if (document.all) {
			var f = new Image();
			f.dynsrc = g.value;
			if (f.fileSize > 2097152) {
				if (document.all) {
					window.event.returnValue = false;
				} else {
					arguments.callee.caller.arguments[0].preventDefault();
				}
				alert("上传文件不能超过2M");
				g.value = "";
			}
		} else {
			var c = g.files;
			for ( var a = 0; a < c.length; a++) {
				if (c[a].fileSize > 2097152) {
					if (document.all) {
						window.event.returnValue = false;
					} else {
						arguments.callee.caller.arguments[0].preventDefault();
					}
					alert("上传文件不能超过2M");
					g.value = "";
				}
			}
		}
	} catch (d) {
	}
}
var jQuery_formValidator_initConfig;
(function(e) {
	e.formValidator = {
		grouplist : [],
		sustainType : function(a, c) {
			var d = e("#" + a).get(0), f = d.tagName;
			d = d.type;
			switch (c.validatetype) {
			case "InitValidator":
				return true;
			case "InputValidator":
				return f == "INPUT" || f == "TEXTAREA" || f == "SELECT" ? true
						: false;
			case "CompareValidator":
				if (f == "INPUT" || f == "TEXTAREA") {
					return d == "checkbox" || d == "radio" ? false : true;
				}
				return false;
			case "AjaxValidator":
				return d == "text" || d == "textarea" || d == "file"
						|| d == "password" || d == "select-one" ? true : false;
			case "RegexValidator":
				if (f == "INPUT" || f == "TEXTAREA") {
					return d == "checkbox" || d == "radio" ? false : true;
				}
				return false;
			case "FunctionValidator":
				return true;
			case "GroupValidator":
				return true;
			}
		},
		initConfig : function(a) {
			var c = {
				debug : false,
				validatorgroup : "1",
				alertmessage : false,
				validobjectids : "",
				forcevalid : false,
				onsuccess : function() {
					return true;
				},
				onerror : function() {
				},
				submitonce : false,
				formid : "",
				autotip : false,
				tidymode : false,
				errorfocus : true,
				wideword : true,
				btnid : "",
				btnvalue : "",
				btnactionvalue : "",
				fun : null,
				errorclass : "wrong1",
				focusclass : "action1",
				successclass : "chenggong",
				tiphtml : '<span class="action_po"><span class="action_po_top">{0}</span><span class="action_po_bot"></span></span>'
			};
			a = a || {};
			e.extend(c, a);
			if (c.tidymode) {
				c.errorfocus = false;
			}
			c.formid != ""
					&& e("#" + c.formid).submit(
							function() {
								if (e.formValidator.pageIsValid("1")) {
									if (c.fun) {
										if (c.fun()) {
											e.formValidator.subform(c.formid,
													c.btnid, c.btnactionvalue);
										} else {
											return false;
										}
									} else {
										e.formValidator.subform(c.formid,
												c.btnid, c.btnactionvalue);
									}
								}
								return false;
							});
			if (jQuery_formValidator_initConfig == null) {
				jQuery_formValidator_initConfig = [];
			}
			jQuery_formValidator_initConfig.push(c);
		},
		subform : function(a, c, d) {
			a = e("#" + a).get(0);
			c = e("#" + c).get(0);
			a.submit();
			c.disabled = true;
			c.value = d;
		},
		subfalse : function(a, c, d) {
			a = e("#" + c).get(0);
			a.disabled = false;
			a.value = d;
		},
		appendValid : function(a, c) {
			if (!e.formValidator.sustainType(a, c)) {
				return -1;
			}
			var d = e("#" + a).get(0);
			if (c.validatetype == "InitValidator" || d.settings == undefined) {
				d.settings = [];
			}
			var f = d.settings.push(c);
			d.settings[f - 1].index = f - 1;
			return f - 1;
		},
		getInitConfig : function(a) {
			if (jQuery_formValidator_initConfig != null) {
				for (i = 0; i < jQuery_formValidator_initConfig.length; i++) {
					if (a == jQuery_formValidator_initConfig[i].validatorgroup) {
						return jQuery_formValidator_initConfig[i];
					}
				}
			}
			return null;
		},
		triggerValidate : function(a) {
			e.formValidator.trimTextBox(a);
			switch (a.setting.validatetype) {
			case "InputValidator":
				e.formValidator.inputValid(a);
				break;
			case "CompareValidator":
				e.formValidator.compareValid(a);
				break;
			case "AjaxValidator":
				e.formValidator.ajaxValid(a);
				break;
			case "RegexValidator":
				e.formValidator.regexValid(a);
				break;
			case "FunctionValidator":
				e.formValidator.functionValid(a);
				break;
			case "GroupValidator":
				e.formValidator.groupValid(a);
				break;
			}
		},
		trimTextBox : function(a) {
			a = e("#" + a.id);
			if (a.length > 0) {
				var c = a.get(0).tagName.toUpperCase();
				if (c == "INPUT" && a.get(0).type.toUpperCase() == "TEXT"
						|| c == "TEXTAREA") {
					c = e.trim(a.val());
					a.val(c);
				}
			}
		},
		clearErrorTip : function() {
			for ( var a = e.formValidator.getInitConfig("1"), c = e("span[class='"
					+ a.errorclass + "']"), d = 0; d < c.length; d++) {
				e(c[d]).removeClass(a.errorclass);
				e(c[d]).html("");
			}
		},
		setTipState : function(a, c, d, f) {
			var thatA = a;
			e(a).removeClass("wrong_color").addClass("action_color");
			if (d == "该用户名已经存在") {
				e(a).removeClass("action_color").addClass("wrong_color");
			}
			if (f) {
				a = e("#" + f);
				g || (g = e.formValidator.getInitConfig("1"));
			} else {
				a = a.settings[0];
				var g = e.formValidator.getInitConfig(a.validatorgroup);
				a = e("#" + a.tipid);
			}
			if (!(d == null || d == "")) {
				a.removeClass();
				if (c == "onError") {
					a.addClass(g.errorclass);
					a.html(g.tiphtml.replace("{0}", d));
					e(thatA).addClass("wrong_color");
				} else {
					if (c == "onCorrect") {
						a.addClass(g.successclass);
						a.html("");
						if (e(thatA).hasClass("action_color")) {
							e(thatA).removeClass("action_color");
						}
					} else {
						if (c == "clear") {
							a.addClass("");
							a.html("");
						} else {
							a.addClass(g.focusclass);
							a.html(g.tiphtml.replace("{0}", d));
						}
					}
				}
			}
		},
		resetTipState : function(a) {
			a = e.formValidator.getInitConfig(a);
			e(a.validobjectids).each(
					function() {
						e.formValidator.setTipState(this, "onShow",
								this.settings[0].onshow);
					});
		},
		setFailState : function(a, c) {
			var d = e("#" + a);
			d.removeClass();
			d.addClass("onError");
			d.html(c);
		},
		showMessage : function(a) {
			var c = a.id, d = e("#" + c).get(0), f = a.isvalid, g = a.setting, h = "", j = "";
			j = e("#" + c).get(0).settings;
			var k = e.formValidator.getInitConfig(j[0].validatorgroup);
			if (f) {
				a.empty || e("#" + c).css("display") == "none" ? e.formValidator
						.setTipState(d, "clear", " ")
						: e.formValidator.setTipState(d, "onCorrect", " ");
				e(d).removeClass("action_color").removeClass("wrong_color");
			} else {
				j = "onError";
				if (g.validatetype == "AjaxValidator") {
					if (g.lastValid == "") {
						j = "onLoad";
						h = g.onwait;
					} else {
						h = g.onerror;
					}
				} else {
					h = a.errormsg == "" ? g.onerror : a.errormsg;
				}
				if (k.alertmessage) {
					d = e("#" + c).get(0);
					d.validoldvalue != e(d).val() && alert(h);
				} else {
					e.formValidator.setTipState(d, j, h);
				}
				e(d).removeClass("action_color").addClass("wrong_color");
			}
			return h;
		},
		showAjaxMessage : function(a) {
			e("#" + a.id).get(0);
			e.formValidator.ajaxValid(a);
		},
		getLength : function(a) {
			var c = e("#" + a), d = c.get(0);
			sType = d.type;
			a = 0;
			switch (sType) {
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				c = c.val();
				if (e.formValidator.getInitConfig(d.settings[0].validatorgroup).wideword) {
					for (d = 0; d < c.length; d++) {
						if (c.charCodeAt(d) >= 19968
								&& c.charCodeAt(d) <= 40869) {
							a += 2;
						} else {
							a++;
						}
					}
				} else {
					a = c.length;
				}
				break;
			case "checkbox":
			case "radio":
				a = e("input[type='" + sType + "'][name='" + c.attr("name")
						+ "'][checked]").length;
				break;
			case "select-one":
				a = d.options ? d.options.selectedIndex : -1;
				break;
			case "select-multiple":
				a = e("select[name=" + d.name + "] option[selected]").length;
				break;
			}
			return a;
		},
		isEmpty : function(a) {
			return e("#" + a).get(0).settings[0].empty
					&& e.formValidator.getLength(a) == 0 ? true : false;
		},
		isOneValid : function(a) {
			return e.formValidator.oneIsValid(a, 1).isvalid;
		},
		oneIsValid : function(a, c, d) {
			if (d == undefined) {
				d = 1;
			}
			var f = {};
			f.id = a;
			f.ajax = -1;
			f.errormsg = "";
			f.defaultval = "";
			f.nextgroupid = "";
			f.tag = d;
			f.empty = false;
			var g = e("#" + a).get(0);
			d = e("#" + a);
			g = g.settings;
			var h = g.length;
			if (h == 1) {
				g[0].bind = false;
			}
			if (!g[0].bind) {
				return null;
			}
			for ( var j = 0; j < h; j++) {
				if (j == 0) {
					if (g[0].defaultvalue) {
						f.defaultval = g[0].defaultvalue;
					}
					if (e.formValidator.isEmpty(a) || f.defaultval != ""
							&& d.val() == f.defaultval
							|| d.css("display") == "none") {
						f.isvalid = true;
						f.setting = g[0];
						if (e.formValidator.isEmpty(a)) {
							f.empty = true;
						}
						var k = false;
						c = 0;
						e.each(g, function(l, m) {
							if (m.validatetype == "GroupValidator") {
								c = l;
								k = true;
								return false;
							}
						});
						if (k) {
							f.setting = g[c];
							e.formValidator.triggerValidate(f);
						}
						break;
					}
					g[0].q2b && d.val(e.formValidator.QtoB(d.val()));
					f.empty = g[0].empty;
				} else {
					f.setting = g[j];
					if (g[j].validatetype != "AjaxValidator") {
						e.formValidator.triggerValidate(f);
					} else {
						f.ajax = j;
						g[j].isvalid = true;
					}
					if (g[j].isvalid) {
						f.isvalid = true;
						f.setting = g[0];
						if (g[j].validatetype == "AjaxValidator") {
							break;
						}
					} else {
						f.isvalid = false;
						f.setting = g[j];
						break;
					}
				}
			}
			return f;
		},
		pageIsValid : function(a) {
			if (a == null || a == undefined) {
				a = "1";
			}
			var c = true, d = "", f, g, h = "^", j = e.formValidator
					.getInitConfig(a);
			if (j.validobjectids == "") {
				return true;
			}
			e(j.validobjectids)
					.each(
							function(k, l) {
								if (l.settings[0].bind) {
									if (g = e.formValidator.oneIsValid(l.id, 1)) {
										var m = l.settings[0].tipid;
										if (!g.isvalid) {
											c = false;
											if (d == "") {
												d = g.id;
												f = g.errormsg == "" ? g.setting.onerror
														: g.errormsg;
											}
										}
										if (!j.alertmessage) {
											if (h.indexOf("^" + m + "^") == -1) {
												g.isvalid || (h = h + m + "^");
												e.formValidator.showMessage(g);
											}
										}
									}
								}
							});
			if (c) {
				c = j.onsuccess();
				j.submitonce
						&& e("input[type='submit']").attr("disabled", true);
			} else {
				a = e("#" + d).get(0);
				j.onerror(f, a);
				if (d != "" && j.errorfocus) {
					a = getTopLeft(d);
					parent ? parent.window.scrollTo(a.left, a.top) : window
							.scrollTo(a.left, a.top);
				}
			}
			return !j.debug && c;
		},
		ajaxValid : function(a) {
			var c = e("#" + a.id), d = c.get(0);
			a = d.settings[a.ajax];
			a.checkfun
					&& a.checkfun(c.val(), d, function(f) {
						f = f.split(",");
						f[0] == "0" ? e.formValidator.setTipState(d, "onError",
								f[1]) : e.formValidator.setTipState(d,
								"onCorrect", " ");
					});
			return false;
		},
		regexValid : function(a) {
			var c = a.id, d = a.setting;
			e("#" + c).get(0);
			var f = e("#" + c).get(0);
			c = e("#" + c).val();
			if (!(f.settings[0].empty && f.value == "")) {
				f = d.regexp;
				if (d.datatype == "enum") {
					f = eval("regexEnum." + f);
				}
				if (f == undefined || f == "") {
					d.isvalid = true;
					return;
				}
				f = f.split("#");
				for ( var g = d.onerror.split("#"), h = 0; h < f.length; h++) {
					if (!(f[h] == "" && f[h] == null)) {
						try {
							rex = new RegExp(f[h], "ig");
						} catch (j) {
							alert(j);
							return true;
						}
						if (!rex.test(c)) {
							d.isvalid = false;
							a.errormsg = g[h];
							return;
						}
					}
				}
			}
			d.isvalid = true;
		},
		functionValid : function(a) {
			var c = a.setting, d = e("#" + a.id);
			d = c.fun(d.val(), d.get(0));
			if (d != undefined) {
				if (typeof d == "string") {
					c.isvalid = false;
					a.errormsg = d;
				} else {
					c.isvalid = d;
				}
			}
		},
		inputValid : function(a) {
			var c = a.id, d = a.setting, f = e("#" + c), g = f.get(0), h = f
					.val();
			g = g.type;
			c = e.formValidator.getLength(c);
			var j = d.empty, k = false;
			switch (g) {
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				if (d.type == "size") {
					j = d.empty;
					if (!j) {
						if (h.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
							k = true;
						}
					}
					if (k) {
						a.errormsg = d.onerror;
						d.isvalid = false;
					} else {
						d.isvalid = true;
					}
				}
				break;
			case "checkbox":
			case "select-one":
			case "select-multiple":
			case "radio":
				j = false;
				if (g == "select-one" || g == "select-multiple") {
					d.type = "size";
				}
				g = d.type;
				if (g == "size") {
					k || (j = true);
					if (j) {
						h = c;
					}
				} else {
					if (g == "date" || g == "datetime") {
						if (g == "date") {
							j = isDate(h);
						}
						if (g == "datetime") {
							j = isDate(h);
						}
						if (j) {
							h = new Date(h);
							d.min = new Date(d.min);
							d.max = new Date(d.max);
						}
					} else {
						if (g == "checkbox") {
							j = true;
							h = e(":checkbox[name='" + f.attr("name")
									+ "'][checked]").length;
						} else {
							if (g == "select") {
								j = true;
								h = e(":select[name='" + f.attr("name")
										+ "'][selected]").length;
							} else {
								if (g == "radio") {
									j = true;
									h = e(":radio[name='" + f.attr("name")
											+ "'][checked]").length;
								} else {
									stype = typeof d.min;
									if (stype == "number") {
										h = (new Number(h)).valueOf();
										isNaN(h) || (j = true);
									}
									if (stype == "string") {
										j = true;
									}
								}
							}
						}
					}
				}
				d.isvalid = false;
				if (j) {
					if (h < d.min || h > d.max) {
						if (h < d.min && d.onerrormin) {
							a.errormsg = d.onerrormin;
						}
						if (h > d.min && d.onerrormax) {
							a.errormsg = d.onerrormax;
						}
					} else {
						d.isvalid = true;
					}
				}
				break;
			}
		},
		compareValid : function(a) {
			var c = a.setting, d = e("#" + a.id), f = e("#" + c.desid);
			a = c.datatype;
			c.isvalid = false;
			curvalue = d.val();
			ls_data = f.val();
			if (a == "number") {
				if (!isNaN(curvalue) && !isNaN(ls_data)) {
					curvalue = parseFloat(curvalue);
					ls_data = parseFloat(ls_data);
				} else {
					return;
				}
				if (f.val() == undefined || f.val() == "") {
					c.isvalid = true;
					return;
				}
			}
			if (a == "date" || a == "datetime") {
				d = false;
				if (a == "date") {
					d = e.formValidator.isDate(curvalue)
							&& e.formValidator.isDate(ls_data);
				}
				if (a == "datetime") {
					d = isDateTime(curvalue) && isDateTime(ls_data);
				}
				if (d) {
					curvalue = (new Date(curvalue.replace(/-/ig, "/")))
							.getTime();
					ls_data = (new Date(ls_data.replace(/-/ig, "/"))).getTime();
				} else {
					c.isvalid = true;
					return;
				}
			}
			switch (c.operateor) {
			case "=":
				if (curvalue == ls_data) {
					c.isvalid = true;
				}
				break;
			case "!=":
				if (curvalue != ls_data) {
					c.isvalid = true;
				}
				break;
			case ">":
				if (curvalue > ls_data) {
					c.isvalid = true;
				}
				break;
			case ">=":
				if (curvalue >= ls_data) {
					c.isvalid = true;
				}
				break;
			case "<":
				if (curvalue < ls_data) {
					c.isvalid = true;
				}
				break;
			case "<=":
				if (curvalue <= ls_data) {
					c.isvalid = true;
				}
				break;
			}
		},
		groupValid : function(a) {
			var c = a.setting;
			if (a.tag == 1) {
				c.isvalid = true;
			} else {
				c = a.setting.nextgroupid;
				for ( var d = a.setting.groupName, f, g = e.formValidator.grouplist, h = 0; h < g.length; h++) {
					if (g[h].groupname == d) {
						f = g[h];
						break;
					}
				}
				if (a.tag == 2) {
					f = {
						groupname : d,
						firstid : a.id,
						errorcount : 0
					};
					g = e.formValidator.removeArray(g, d);
					g.push(f);
					e.formValidator.grouplist = g;
				}
				if (f.firstid != c) {
					c = e.formValidator.oneIsValid(c, 1, 3);
					if (f.errorcount == 0 && c.isvalid) {
						a.tag = 2;
					} else {
						if (f.errorcount > 0) {
							a.tag = 3;
						} else {
							f.errorcount++;
							if (c) {
								e.formValidator.showMessage(c);
								a.tag = 3;
							}
						}
					}
				}
			}
		},
		removeArray : function(a, c) {
			for ( var d = [], f = 0; f < a.length; f++) {
				var g = a[f];
				g.groupname != c && d.push(g);
			}
			return d;
		},
		localTooltip : function(a) {
			a = a || window.event;
			var c = a.pageX
					|| (a.clientX ? a.clientX + document.body.scrollLeft : 0);
			a = a.pageY
					|| (a.clientY ? a.clientY + document.body.scrollTop : 0);
			e("#fvtt").css({
				top : a + 2 + "px",
				left : c - 40 + "px"
			});
		},
		removetip : function() {
			for ( var a = document.getElementsByTagName("span"), c = 0; c < a.length; c++) {
				var d;
				if (d = a[c].id) {
					if (d.indexOf("_Tip") != -1) {
						if (d = e("#" + d)) {
							d.addClass("");
							d.html("");
						}
					}
				}
			}
		},
		IsSimple : function(a) {
			return /[\u4e00-\u9fa5]/.test(a);
		},
		IsNum : function(a) {
			return /^\d+$/.test(a);
		},
		QtoB : function(a) {
			for ( var c = "", d = 0; d < a.length; d++) {
				c += a.charCodeAt(d) == 12288 ? String.fromCharCode(a
						.charCodeAt(d) - 12256) : a.charCodeAt(d) > 65280
						&& a.charCodeAt(d) < 65375 ? String.fromCharCode(a
						.charCodeAt(d) - 65248) : String.fromCharCode(a
						.charCodeAt(d));
			}
			return c;
		},
		isDate : function(a) {
			a = a.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
			if (a == null) {
				return false;
			}
			var c = new Date(a[1], a[3] - 1, a[4]);
			return c.getFullYear() == a[1] && c.getMonth() + 1 == a[3]
					&& c.getDate() == a[4];
		},
		checkTitle : function(a) {
			var c = /[\u4e00-\u9fa5]/.test(a);
			if (!c) {
				return "\u6807\u9898\u592a\u8fc7\u7b80\u5355";
			}
			if (c = isHasContact(a)) {
				return "\u4e0d\u5141\u8bb8\u5305\u542b\u8054\u7cfb\u65b9\u5f0f";
			}
			return true;
		},
		checkContent : function(a) {
			if (!/[\u4e00-\u9fa5]/.test(a)) {
				return "\u5185\u5bb9\u592a\u8fc7\u7b80\u5355";
			}
			return true;
		}
	};
	e.fn.formValidator = function(a) {
		var c = {
			validatorgroup : "1",
			empty : false,
			submitonce : false,
			automodify : false,
			onshow : "\u8bf7\u8f93\u5165\u5185\u5bb9",
			onfocus : "\u8bf7\u8f93\u5165\u5185\u5bb9",
			oncorrect : "\u8f93\u5165\u6b63\u786e",
			onempty : "\u8f93\u5165\u5185\u5bb9\u4e3a\u7a7a",
			defaultvalue : null,
			bind : true,
			validatetype : "InitValidator",
			tipcss : {
				left : "10px",
				top : "1px",
				height : "20px",
				width : "250px"
			},
			triggerevent : "blur",
			forcevalid : false,
			q2b : false,
			fun : function() {
			},
			eid : ""
		};
		a = a || {};
		if (a.validatorgroup == undefined) {
			a.validatorgroup = "1";
		}
		var d = e.formValidator.getInitConfig(a.validatorgroup);
		e.extend(true, c, a);
		return this
				.each(function() {
					var f = e(this), g = {};
					e.extend(true, g, c);
					if (this.id == "") {
						this.id = a.eid;
					}
					var h = g.tipid ? g.tipid : this.id + "_Tip";
					c.tipid = h;
					e.formValidator.appendValid(this.id, c);
					g = d.validobjectids;
					if (g.indexOf("#" + this.id + " ") == -1) {
						d.validobjectids = g == "" ? "#" + this.id : g + ",#"
								+ this.id;
					}
					g = this.tagName.toLowerCase();
					var j = this.type, k = c.defaultvalue;
					if (g == "input" || g == "textarea") {
						f.focus(function() {
							if (!d.alertmessage) {
								var l = e("#" + h);
								this.lastshowclass = l.attr("class");
								this.lastshowmsg = l.html();
								e.formValidator.setTipState(this, "onFocus",
										c.onfocus);
								k && k != "" && k == f.val() && f.val("");
							}
							if (j == "password" || j == "text"
									|| j == "textarea" || j == "file") {
								this.validoldvalue = f.val();
							}
						});
						f.bind(c.triggerevent, function() {
							k && k != "" && f.val() == "" && f.val(k);
							var l = e.formValidator.oneIsValid(this.id, 1, 2);
							if (l != null) {
								if (l.ajax >= 0) {
									e.formValidator.showAjaxMessage(l);
								} else {
									if (l.tag == 2) {
										e.formValidator.showMessage(l);
										l.isvalid && c.fun && c.fun();
									}
								}
							}
						});
					} else {
						if (g == "select") {
							f.bind("focus", function() {
								d.alertmessage
										|| e.formValidator.setTipState(this,
												"onFocus", c.onfocus);
							});
							c.forcevalid
									|| f
											.bind(
													"blur",
													function() {
														var l = e.formValidator
																.oneIsValid(
																		this.id,
																		1, 2);
														if (l != null) {
															if (l.ajax >= 0) {
																e.formValidator
																		.showAjaxMessage(l);
															} else {
																l.tag == 2
																		&& e.formValidator
																				.showMessage(l);
															}
														}
													});
						}
					}
				});
	};
	e.fn.inputValidator = function(a) {
		var c = {
			isvalid : false,
			min : 0,
			max : 99999999999999,
			type : "size",
			onerror : "\u8f93\u5165\u9519\u8bef",
			validatetype : "InputValidator",
			empty : false,
			wideword : true
		};
		a = a || {};
		e.extend(true, c, a);
		return this.each(function() {
			e.formValidator.appendValid(this.id, c);
		});
	};
	e.fn.compareValidator = function(a) {
		var c = {
			isvalid : false,
			desid : "",
			operateor : "=",
			onerror : "\u8f93\u5165\u9519\u8bef",
			validatetype : "CompareValidator"
		};
		a = a || {};
		e.extend(true, c, a);
		return this.each(function() {
			e.formValidator.appendValid(this.id, c);
		});
	};
	e.fn.regexValidator = function(a) {
		var c = {
			isvalid : false,
			regexp : "",
			param : "i",
			datatype : "string",
			onerror : "\u8f93\u5165\u7684\u683c\u5f0f\u4e0d\u6b63\u786e",
			validatetype : "RegexValidator"
		};
		a = a || {};
		e.extend(true, c, a);
		return this.each(function() {
			e.formValidator.appendValid(this.id, c);
		});
	};
	e.fn.functionValidator = function(a) {
		var c = {
			isvalid : true,
			fun : function() {
				this.isvalid = true;
			},
			validatetype : "FunctionValidator",
			onerror : "\u8f93\u5165\u9519\u8bef"
		};
		a = a || {};
		e.extend(true, c, a);
		return this.each(function() {
			e.formValidator.appendValid(this.id, c);
		});
	};
	e.fn.groupValidator = function(a) {
		var c = {
			isvalid : true,
			groupName : "",
			nextgroupid : "",
			validatetype : "GroupValidator",
			onerror : "\u8f93\u5165\u9519\u8bef"
		};
		a = a || {};
		e.extend(true, c, a);
		return this.each(function() {
			e.formValidator.appendValid(this.id, c);
		});
	};
	e.fn.ajaxValidator = function(a) {
		var c = {
			isvalid : false,
			lastValid : "",
			type : "GET",
			url : "",
			addidvalue : true,
			datatype : "html",
			data : "",
			async : true,
			cache : false,
			beforesend : function() {
				return true;
			},
			success : function() {
				return true;
			},
			complete : function() {
			},
			processdata : false,
			error : function() {
			},
			buttons : null,
			onerror : "\u670d\u52a1\u5668\u6821\u9a8c\u6ca1\u6709\u901a\u8fc7",
			onwait : "\u6b63\u5728\u7b49\u5f85\u670d\u52a1\u5668\u8fd4\u56de\u6570\u636e",
			validatetype : "AjaxValidator",
			checkfun : function() {
			}
		};
		a = a || {};
		e.extend(true, c, a);
		return this.each(function() {
			e.formValidator.appendValid(this.id, c);
		});
	};
	e.fn.defaultPassed = function(a) {
		return this.each(function() {
			for ( var c = this.settings, d = 1; d < c.length; d++) {
				c[d].isvalid = true;
				e.formValidator.getInitConfig(c[0].validatorgroup).alertmessage
						|| e.formValidator.setTipState(this, a ? "onShow"
								: "onCorrect", c[0].oncorrect);
			}
		});
	};
	e.fn.unFormValidator = function(a) {
		return this.each(function() {
			this.settings[0].bind = !a;
			a ? e("#" + this.settings[0].tipid).hide() : e(
					"#" + this.settings[0].tipid).show();
		});
	};
	e.fn.showTooltips = function() {
		if (e("body [id=fvtt]").length == 0) {
			fvtt = e("<div id='fvtt' style='position:absolute;z-index:56002'></div>");
			e("body").append(fvtt);
			fvtt
					.before("<iframe src='about:blank' class='fv_iframe' scrolling='no' frameborder='0'></iframe>");
		}
		return this
				.each(function() {
					jqobj = e(this);
					s = e("<span class='top' id=fv_content style='display:block'></span>");
					b = e("<b class='bottom' style='display:block' />");
					this.tooltip = e(
							"<span class='fv_tooltip' style='display:block'></span>")
							.append(s).append(b).css({
								filter : "alpha(opacity:95)",
								KHTMLOpacity : "0.95",
								MozOpacity : "0.95",
								opacity : "0.95"
							});
					jqobj.mouseover(function(a) {
						e("#fvtt").append(this.tooltip);
						e("#fv_content").html(this.Tooltip);
						e.formValidator.localTooltip(a);
					});
					jqobj.mouseout(function() {
						e("#fvtt").empty();
					});
					jqobj.mousemove(function(a) {
						e("#fv_content").html(this.Tooltip);
						e.formValidator.localTooltip(a);
					});
				});
	};
})(jQuery);
function getElementWidth(a) {
	x = document.getElementById(a);
	return x.offsetWidth;
}
function getTopLeft(a) {
	obj = {};
	o = document.getElementById(a);
	oLeft = o.offsetLeft;
	for (oTop = o.offsetTop; o.offsetParent != null;) {
		oParent = o.offsetParent;
		oLeft += oParent.offsetLeft;
		oTop += oParent.offsetTop;
		o = oParent;
	}
	obj.top = oTop;
	obj.left = oLeft;
	return obj;
}
function isHasContact(d) {
	var c = /([0-9\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u58f9\u8d30\u53c1\u8086\u4f0d\u9646\u67d2\u634c\u7396]{7})/;
	c = new RegExp(c);
	c = c.test(d);
	if (!c) {
		c = /(([q\uff51Q\uff31]+)(.?|.{1,5})(([0-9]|[\uff10-\uff19]|[\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]|[\u2460-\u2468]|[\u3220-\u3228])[-_@\~\#\$\%\^\&\*]*){5,13})|((([0-9]|[\uff10-\uff19]|[\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]|[\u2460-\u2468]|[\u3220-\u3228])[-_@\~\#\$\%\^\&\*]*){5,13}(.?|.{1,5})([q\uff51Q\uff31]+))/;
		c = new RegExp(c);
		c = c.test(d);
	}
	return c;
}
(function(e) {
	e.j = {
		Cookie : {
			get : function(a) {
				a = document.cookie.match(new RegExp(a + "=([^&;]+)"));
				if (a != null) {
					return decodeURI(a[1]);
				}
				return "";
			},
			setcookie : function(a, c) {
				e.j.Cookie.set(a, c);
			},
			set : function(a, c, d, f, g) {
				a = a + "=" + escape(c) + ";";
				if (d && d != "") {
					a = a + "domain=" + d + ";";
				}
				if (f && f > 0) {
					d = new Date;
					d.setTime(d.getTime() + 86400000 * f);
					a = a + "expires=" + d.toGMTString() + ";";
				}
				if (g && g != "") {
					a = a + "path=" + g + ";";
				}
				document.cookie = a;
			},
			del : function(a) {
				e.j.Cookie.set(a, " ", "", -1, "/");
			}
		},
		AjaxProvider : function(a, c) {
			e.post(a, {}, function(d) {
				c(d);
			}, "html");
		},
		callajax : function(a, c, d) {
			a = "/ajax/" + a + "/?";
			c = c;
			c += "&rand=" + new Date;
			a += c;
			e.j.AjaxProvider(a, d);
		},
		TrimAll : function(a) {
			return a.replace(/\s/g, "");
		},
		getTopLeft : function(a) {
			obj = {};
			oLeft = a.offsetLeft;
			for (oTop = a.offsetTop; a.offsetParent != null;) {
				oParent = a.offsetParent;
				oLeft += oParent.offsetLeft;
				oTop += oParent.offsetTop;
				a = oParent;
			}
			obj.top = oTop;
			obj.left = oLeft;
			return obj;
		},
		scrollToElement : function(a) {
			try {
				var c = e.j.getTopLeft(a);
				parent ? parent.window.scrollTo(c.left, c.top) : window
						.scrollTo(c.left, c.top);
			} catch (d) {
				window.scrollTo(0, 0);
			}
		},
		geturlparam : function(a, c) {
			var d = new RegExp("(^|&)" + c + "=([^&]*)(&|$)");
			d = a.substr(a.indexOf("?") + 1).match(d);
			if (d != null) {
				return unescape(d[2]);
			}
			return null;
		},
		dyniframesize : function(a) {
			var c = null;
			if (document.getElementById) {
				c = document.getElementById(a);
			} else {
				eval("pTar = " + a + ";");
			}
			if (c && !window.opera) {
				c.style.display = "block";
				if (c.contentDocument && c.contentDocument.body.scrollHeight) {
					c.height = c.contentDocument.body.scrollHeight + 8;
				} else {
					if (c.Document && c.Document.body.scrollHeight) {
						c.height = c.Document.body.scrollHeight + 8;
					}
				}
			}
		},
		isTextBox : function(a) {
			var c = e(a).get(0).id;
			if (!e(a).get(0).tagName) {
				return false;
			}
			a = e(a).get(0).tagName.toUpperCase();
			if (e("#" + c + ":text").length == 1) {
				return true;
			}
			if (a == "TEXTAREA") {
				return true;
			}
			return false;
		},
		multiselect : function(a) {
			var c = this;
			this.s = [ {
				fun : function() {
				},
				css : ""
			}, {
				id : "f",
				childid : "s"
			}, {
				id : "s",
				childid : "t"
			}, {
				id : "t"
			} ];
			this.w = function() {
				var d = "";
				e.each(c.s, function(f, g) {
					if (f != 0) {
						d += '<span id="sl_' + g.id
								+ '"><select style="display:none" id="select_'
								+ g.id + '" onchange="' + a + ".c('" + g.id
								+ '\')" name="select_' + g.id
								+ '"></select></span>';
					}
				});
				document.write(d);
			};
			this.c = function(d) {
				var f = c.gs(d);
				if (f) {
					f.fun ? f.fun(d) : c.s[0].fun(d);
				}
			};
			this.gs = function(d) {
				var f;
				e.each(c.s, function(g, h) {
					if (g != 0) {
						if (d == h.id) {
							f = h;
							return false;
						}
					}
				});
				return f;
			};
			this.addoption = function(d, f, g) {
				e("<option value='" + g + "'>" + f + "</option>").appendTo(
						"#select_" + d);
			};
			this.selectoption = function(d, f) {
				e("#select_" + d).attr("value", f);
			};
			this.clearChild = function(d) {
				var f = 0;
				e.each(c.s, function(g, h) {
					if (h.id != d && f > 1) {
						e("#select_" + h.id).empty();
						e("#select_" + h.id).css("display", "none");
					} else {
						f++;
					}
				});
			};
		}
	};
	e = $ = jQuery;
	e.c = {
		xiaoqu : {
			getLineValue : function(a, c) {
				var d = "city=" + a + "&";
				d += "xq=" + escape(c);
				e.j.callajax("line", d, e.c.xiaoqu.setLineValue);
			}
		},
		user : {
			login : {
				loginerror : function(a) {
					e("#validatecode") && e("#PicValidateCode").click();
					e.c.Error.setErrorTip(a, "tipDiv");
					e.formValidator.subfalse("submitForm", "btnSubmit",
							"\u7acb\u5373\u767b\u5f55");
				},
				verifycodeerror : function(a) {
					e.c.Error.setErrorTip(a, "tipDiv");
					e("#PicValidateCode").click();
					e.formValidator.subfalse("submitForm", "btnSubmit",
							"\u7acb\u5373\u767b\u5f55");
				},
				usernotexist : function(a) {
					e.c.Error.setErrorTip(a, "tipDiv");
				}
			},
			loginsimerror : function(a) {
				if (a == "True") {
					window.location.href = window.location.href;
				} else {
					a = e("#userpwd_Tip");
					a.removeClass();
					a.addClass("v_false");
					a
							.html("\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e");
					e.formValidator.subfalse("submitForm", "btnSubmit",
							" \u767b \u5f55 ");
				}
			},
			forgetpwd : {
				notexist : function(a) {
					e.c.Error.setErrorTip(a, "txtemail_Tip");
				},
				mailsendfaild : function(a) {
					e.c.Error.setErrorTip(a, "txtemail_Tip");
				},
				validatefaild : function(a) {
					e.c.Error.setErrorTip(a, "validatecode_Tip");
				}
			},
			reg : {
				checknickname : function(a) {
					var c = /^[\w|\u4E00-\u9FA5]+$/, d = a.TrimString()
							.GetByteCount();
					if (d == 0) {
						return "\u8bf7\u586b\u5199\u7528\u6237\u540d\u3002";
					} else {
						if (d < 4) {
							return "\u4e0d\u5c11\u4e8e2\u4e2a\u6c49\u5b57\uff0c\u62164\u4e2a\u5b57\u7b26(\u6570\u5b57\uff0c\u5b57\u6bcd\u548c\u4e0b\u5212\u7ebf)\u3002";
						} else {
							if (d > 20) {
								return "\u4e0d\u8d85\u8fc710\u4e2a\u6c49\u5b57\uff0c\u621620\u4e2a\u5b57\u7b26(\u6570\u5b57\uff0c\u5b57\u6bcd\u548c\u4e0b\u5212\u7ebf)\u3002";
							} else {
								if (!a.match(c)) {
									return "\u7528\u6237\u540d\u4ec5\u53ef\u4f7f\u7528\u6c49\u5b57\u3001\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf\u3002";
								}
							}
						}
					}
					return "";
				},
				checknameexist : function(val, fun, timeout) {
					var randomId = Math.floor(Math.random() * 10000);
					e
							.ajax({
								url : "/ajax/checknickname?id=" + randomId,
								data : "nickname=" + encodeURIComponent(val),
								timeout : 5000,
								success : function(d) {
									var r = "";
									clearSug();
									if (d == "1") {
										fun(d);
									} else {
										if (document.location.href
												.indexOf("simreg") > -1) {
											var logurl = document.location.href
													.replace("simreg",
															"simlogin")
													.replace(
															"?",
															"?username=" + val
																	+ "&");
											r = '0,该用户名已被注册，如果您是"'
													+ val
													+ "\"请<a href='javascript:;' onclick='document.location=\""
													+ logurl + "\"' >登录</a>";
										} else {
											r = '0,该用户名已被注册，请使用其他用户名注册，如果您是"'
													+ val
													+ "\"请<a href='https://passport.58.com/login?username="
													+ val
													+ "' target='_blank'>登录</a>";
										}
										if ("" != d) {
											var suggestUserNamses = d
													.split(",");
											showSug(suggestUserNamses,
													"nickName");
										}
									}
									fun(r);
								},
								dataType : "html",
								error : timeout
							});
				},
				checkvalidcode : function(a, c) {
					if (e("#validatecode").val().length == 5) {
						var d = "validcode=" + encodeURIComponent(a);
						e.j
								.callajax(
										"checkvalidcode",
										d,
										function(f) {
											c(f == "0" ? f
													+ ",\u9a8c\u8bc1\u7801\u8f93\u5165\u4e0d\u6b63\u786e"
													: f);
										});
					}
				},
				checkpwd : function(a) {
					var c = /^[\w]+$/, d = a.TrimString().GetByteCount();
					return d == 0 ? "\u8bf7\u586b\u5199\u5bc6\u7801\u3002"
							: a.match(c) ? d < 6 ? "\u5bc6\u7801\u592a\u77ed\uff0c\u6700\u5c11\u4e3a6\u4f4d\u3002"
									: d > 18 ? "\u5bc6\u7801\u4e0d\u5e94\u8d85\u8fc718\u4e2a\u5b57\u7b26\u3002"
											: ""
									: "\u5bc6\u7801\u53ea\u80fd\u7531\u6570\u5b57\u3001\u5b57\u6bcd\u548c\u4e0b\u5212\u7ebf\u7ec4\u6210\u3002";
				},
				CheckPasswordStrength : function(a) {
					e("#" + a.id + "_Tip")
							.html(
									"<span class='action_po'><span class='action_po_top'>6\uFF5E16\u4E2A\u5B57\u7B26(\u6570\u5B57\uFF0C\u5B57\u6BCD\u548C\u7B26\u53F7\u7EC4\u6210)\u3002<table cellpadding='0' cellspacing='0' ><tr><td><span class='f12'>\u5bc6\u7801\u5f3a\u5ea6\uff1a</span></td><td><div class='mima_a' id='pwdLength'><p> </p></div></td><td><span class='fred f12' id='pwdStrength'> \u592a\u77ed</span></td></tr></table></span><span class='action_po_bot'></span></span>");
					(new e.c.user.PasswordStrength).update(a.value);
				},
				checkemail : function(a) {
					var c = /^[_\.0-9a-zA-Z-]+[_0-9a-zA-Z-]@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,3}$/;
					return a.TrimString() == "" ? "  \u8bf7\u586b\u5199\u7535\u5b50\u90ae\u7bb1\u3002"
							: !a.match(c) || a.split("@")[0].length > 20 ? "\u7535\u5b50\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u4f8b\u5982\uff1amyname@sohu.com"
									: "";
				},
				checkemailexist : function(val, fun, timeout) {
					var randomId = Math.floor(Math.random() * 10000);
					e
							.ajax({
								url : "/ajax/checkemail?id=" + randomId,
								data : "email=" + encodeURIComponent(val),
								timeout : 5000,
								success : function(d) {
									var r = "";
									if (d == "0") {
										if (document.location.href
												.indexOf("simreg") > -1) {
											var logurl = document.location.href
													.replace("simreg",
															"simlogin")
													.replace(
															"?",
															"?username=" + val
																	+ "&");
											r = "0,此邮箱已经存在，如果您是邮箱拥有者，请<a href='javascript:;' onclick='document.location=\""
													+ logurl + "\"' >登录</a>";
										} else {
											r = "0,此邮箱已经存在，如果您是邮箱拥有者，请<a href='https://passport.58.com/login?username="
													+ val
													+ "' target='_blank'>登录</a>";
										}
									} else {
										r = d;
									}
									fun(r);
								},
								dataType : "html",
								error : timeout
							});
				},
				regError : function(a, c) {
					var d = "", f = false;
					switch (a) {
					case "usernameexist":
					case "usernameillegal":
					case "usernameformat":
						d = "nickName_Tip";
						break;
					case "pwdformat":
						d = "password_Tip";
						break;
					case "emailillegal":
					case "emailexsit":
					case "emailformat":
						d = "txtemail_Tip";
						break;
					case "vcode":
						d = "validatecode_Tip";
						break;
					case "regtoomore":
					case "faild":
						f = true;
						break;
					}
					f ? alert(c) : e.c.Error.setErrorTip(c, d);
					e.formValidator.subfalse("submitForm", "btnSubmit",
							"\u6ce8\u518c");
				}
			},
			PasswordStrength : function() {
				this.copyToStyle = function(a) {
					var c = new Array(4);
					c[0] = " \u592a\u77ed";
					c[1] = " \u8f83\u5dee";
					c[2] = " \u826f\u597d";
					c[3] = " \u6781\u4f73";
					var d = new Array(4);
					d[0] = "mima_a";
					d[1] = "mima_b";
					d[2] = "mima_c";
					d[3] = "mima_d";
					var f = new Array(4);
					f[0] = "fred f12";
					f[1] = "fora f12";
					f[2] = "flv f12";
					f[3] = "fgreen f12";
					var g = document.getElementById("pwdStrength");
					g.className = f[a];
					g.innerHTML = c[a];
					document.getElementById("pwdLength").className = d[a];
				};
				this.update = function(a) {
					if (a.length < 6) {
						this.copyToStyle(0);
					} else {
						var c = -1;
						a.match(/[a-z]/ig) && c++;
						a.match(/[0-9]/ig) && c++;
						a.match(/(.[^a-z0-9])/ig) && c++;
						a.length < 10 && c > 0 && c--;
						switch (c) {
						case 0:
							this.copyToStyle(1);
							break;
						case 1:
							this.copyToStyle(2);
							break;
						case 2:
							this.copyToStyle(3);
							break;
						default:
							this.copyToStyle(0);
						}
					}
				};
			},
			userdetail : {
				suberror : function(a, c) {
					var d = "";
					switch (a) {
					case "truenameformat":
					case "truenameillegal":
						d = "txtTrueName_Tip";
						break;
					case "xiaoquillegal":
						d = "txtAreola_Tip";
						break;
					case "addressillegal":
						d = "txtAddress_Tip";
						break;
					case "postzipillegal":
						d = "txtPostZip_Tip";
						break;
					case "manseillegal":
						d = "txtManse_Tip";
						break;
					case "signcontentillegal":
					case "signcontentformat":
						d = "txtSignContent_Tip";
						break;
					case "mobileformat":
						d = "txtMobile_Tip";
						break;
					case "phoneformat":
						d = "txtPhone_Tip";
						break;
					case "emailexsit":
					case "emailillegal":
					case "emailformat":
						d = "txtEmail_Tip";
						break;
					case "success":
						alert(c);
						window.location = window.location;
						return;
					case "faild":
					case "lifecity":
						alert(c);
						return;
					}
					e.c.Error.setErrorTip(c, d);
					e.j.scrollToElement(document.getElementById(d));
					e.formValidator.subfalse("subform", "btnSubmit",
							"\u5b8c\u6210\u4fee\u6539");
				}
			},
			authuserinfo : {
				suberror : function(a, c, d, f, g) {
					d = !d ? "submitForm" : d;
					f = !f ? "btnSubmit" : f;
					g = e("#" + f).val() == "\u63d0\u4ea4\u4e2d...." ? "\u786e\u8ba4"
							: "\u53d1\u9001\u9a8c\u8bc1\u7801";
					e.c.Error.subError(a, c, d, f, g);
				}
			},
			authuserbiz : {
				suberror : function(a, c, d, f, g) {
					d = !d ? "submitForm" : d;
					f = !f ? "btnSubmit" : f;
					g = e("#" + f).val() == "\u63d0\u4ea4\u4e2d...." ? "\u786e\u8ba4"
							: "\u53d1\u9001\u9a8c\u8bc1\u7801";
					e.c.Error.subError(a, c, d, f, g);
				}
			}
		},
		Uploader : {
			uploaduserimg : function(a, c, d) {
				a = e("#" + a).get(0);
				c || (c = "/submit/uploaduserimg");
				d || (d = "uploadframe");
				a.action = c;
				a.target = d;
				a.submit();
			},
			uploaduserimgresult : function(a) {
				switch (a) {
				case "Faild":
					a = "\u56fe\u7247\u4e0a\u4f20\u5931\u8d25";
					break;
				case "login":
					a = "\u8bf7\u767b\u5f55\u540e\u4e0a\u4f20\u56fe\u7247";
					break;
				case "agserror":
					a = "\u53c2\u6570\u9519\u8bef";
					break;
				case "typeerror":
				case "imgnull":
					a = "\u4e0a\u4f20\u56fe\u7247\u683c\u5f0f\u4e0d\u6b63\u786e";
					break;
				case "toobig":
					a = "\u56fe\u7247\u8fc7\u5927,\u4e0a\u4f20\u56fe\u7247\u9700\u5c0f\u4e8e1M\uff01";
					break;
				default:
					a = "success|" + a;
					break;
				}
				return a;
			},
			uploaduserimgfinish : function(a) {
				a = e.c.Uploader.uploaduserimgresult(a);
				a = a.split("|");
				if (a.length > 1) {
					window.location = window.location;
				} else {
					alert(a[0]);
				}
			},
			uploadauthuserimgfinish : function(a) {
				a = e.c.Uploader.uploaduserimgresult(a);
				a = a.split("|");
				if (a.length < 2) {
					e("#errortip").html(a[0]);
				} else {
					e("#hidauthuserimg").val(a[1]);
					setTimeout(function() {
						e("#authuserimg").attr("src",
								"http://pic.58.com" + a[1]);
					}, 1000);
				}
			}
		},
		Message : {
			suberror : function(a, c, d, f, g) {
				e.c.Error.subError(a, c, !d ? "submitForm" : d,
						!f ? "btnSubmit" : f, !g ? "\u53d1\u9001" : g);
			},
			read : function(a, c, d) {
				var f = e(a).parent().parent(), g = f.next();
				if (f.find("#cbID").val().split("|")[1] == "0") {
					window.location.href = "/sysmsg/"
							+ f.find("#cbID").val().split("|")[0] + "/0/";
				} else {
					if (g.css("display") == "none") {
						if (g.html().replace(/\s*/, "") != "") {
							document.all ? g.css("display", "block") : g.css(
									"display", "table-row");
						} else {
							e.j.callajax("readmsg", "msg=" + c + "&t=" + d,
									function(h) {
										g.html(h);
										document.all ? g
												.css("display", "block") : g
												.css("display", "table-row");
									});
						}
						a.className = "";
					} else {
						g.css("display", "none");
					}
				}
			},
			rd : function(a) {
				var c = e(a).parent().parent();
				if (c.next().find("#xq1").html().replace(/\s*/, "") == "") {
					e("tr[class=sctcnr]").css("display", "none");
					a = "msg=" + c.find("#cbID").val() + "&t=1";
					e.j.callajax("readmsg", a, function(d) {
						c.next().find("#xq1").html(d);
						document.all ? c.next().css("display", "block") : c
								.next().css("display", "table-row");
					});
				} else {
					if (c.next().css("display") == "none") {
						e("tr[class=sctcnr]").css("display", "none");
						document.all ? c.next().css("display", "block") : c
								.next().css("display", "table-row");
					} else {
						c.next().css("display", "none");
					}
				}
			},
			sendfriendmsg : function(a, c, d) {
				e.j.callajax("friendpost", "msg=" + c + "&op="
						+ (d == "2" ? "refuse" : "hulve"), function(f) {
					f = f.split("$");
					f[0] == "success" && e(a).parent().html(f[1]);
				});
			},
			AnswerMessage : function(a, c) {
				var d = e(a).parents("tr").find("#answercontent").val(), f = e(
						e(a).parents("td")[0]).parent(), g = f.prev();
				if (d == "") {
					alert("\u56de\u590d\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a!");
				} else {
					d = "msg=" + c + "&content=" + encodeURIComponent(d);
					e.j.callajax("answermsg", d, function(h) {
						if (h == "") {
							alert("\u56de\u590d\u5931\u8d25!");
						} else {
							g.find("#messagereplay").html(
									" [\u5df2\u56de\u590d]");
							alert("\u56de\u590d\u6210\u529f!");
							f.css("display", "none");
						}
						e(a).parent().find("#answercontent").val("");
					});
				}
			}
		},
		friend : {
			GetUserList : function(a, c) {
				e.j.callajax("friendlist", "groupid=" + (a == "all" ? 0 : a)
						+ "&pn=" + c, function(d) {
					document.getElementById("hy01").innerHTML = d;
				});
			},
			ShowTag : function(a) {
				if (a.className != "frisel") {
					var c = 0, d = e("#friendgl ul li");
					for (c = 0; c < d.length; c++) {
						d[c].className = "";
					}
					a.className = "frisel";
					e.c.friend.GetUserList(a.id, 1);
				}
			},
			UpdateFriendName : function(a, c, d, f) {
				a = a ? a : window.event ? window.event : null;
				var g = a.srcElement ? a.srcElement : a.target;
				a = /^[\w|\u4E00-\u9FA5]+$/;
				c = c.parentNode.parentNode;
				if (g.name == "imgupdatename") {
					var h;
					h = c.getElementsByTagName("span");
					for (g = 0; g < h.length; g++) {
						if (h[g].id == "nameinfo") {
							a = h[g].getElementsByTagName("a");
							h[g].innerHTML = "<input name='newfriendname' type='text' size='6' value='"
									+ a[0].innerHTML
									+ "' /><input onclick='UpdateFriendName(event,this,"
									+ d
									+ ","
									+ f
									+ ")' name='updatefriendname' id='updatefriendname' type='button' value='\u4fdd\u5b58' />";
							break;
						}
					}
				} else {
					if (g.name == "updatefriendname") {
						c = c.parentNode;
						h = c.getElementsByTagName("input");
						for (g = 0; g < h.length; g++) {
							if (h[g].name == "newfriendname") {
								if (!a.test(h[g].value)) {
									alert("\u597d\u53cb\u540d\u79f0\u8f93\u5165\u4e0d\u5408\u6cd5!");
									return;
								}
								f = "op=updatefriendname&f=" + (d + "_" + f)
										+ "&v="
										+ encodeURIComponent(h[g].value);
								e.j
										.callajax(
												"friendpost",
												f,
												function(j) {
													if (j != "-") {
														alert("\u597d\u53cb\u540d\u79f0\u5fc5\u987b\u662f2-10\u4e2a\u6c49\u5b57\u62164-20\u4e2a\u5b57\u7b26!");
													} else {
														j = e("#userlistall dl input[name=newfriendname]");
														j
																.parent()
																.html(
																		"<input type='checkbox' name='checkbox2' id='"
																				+ c.id
																				+ "' /><a id='"
																				+ d
																				+ "' href='/"
																				+ d
																				+ "' target='_blank'>"
																				+ j
																						.val()
																				+ "</a>");
													}
												});
								break;
							}
						}
					}
				}
			},
			DeleteFriend : function(a, c) {
				window
						.confirm("\u4f60\u786e\u5b9e\u8981\u5220\u9664\u6b64\u597d\u53cb\u4e48?")
						&& e.j.callajax("friendpost", "op=deletefriend&f=" + a,
								function(d) {
									if (d != "-") {
										alert("\u5220\u9664\u5931\u8d25!");
									} else {
										d = a.split("_")[1];
										e.c.friend.GetUserList(d, c);
									}
								});
			},
			MoveFriends : function(a) {
				if (a != "-1") {
					var c = 0, d = e("#friendgl ul li");
					for (c = 0; c < d.length; c++) {
						if (d[c].id == a) {
							if (d[c].className != null
									&& d[c].className == "frisel") {
								return;
							}
							break;
						}
					}
					if (document.getElementById("userlistall")) {
						c = e.c.public1.Post.gs("cbID");
						c == "" ? alert("\u6ca1\u6709\u9700\u8981\u79fb\u52a8\u7684\u597d\u53cb\uff01")
								: e.j
										.callajax(
												"friendpost",
												"op=movefriend&f=" + c + "&g="
														+ a,
												function(f) {
													if (f != "-") {
														alert("\u79fb\u52a8\u597d\u53cb\u5931\u8d25!");
													} else {
														window.location.href = "/friend/";
													}
												});
					}
				}
			},
			UpdateFenzu : function(a) {
				var c;
				a = a.parentNode.parentNode;
				c = a.getElementsByTagName("span");
				if (c[0].innerHTML == "\u6211\u7684\u597d\u53cb") {
					alert("\u6b64\u4e3a\u9ed8\u8ba4\u5206\u7ec4\uff0c\u4e0d\u80fd\u4fee\u6539");
				} else {
					a.innerHTML = "<input name='newfenzuname' type='text' size='6' value='"
							+ c[1].innerHTML.replace(/\s*/, "")
							+ "' /><input name='updatefenzuname' id='updatefenzuname' type='button' value='\u4fdd\u5b58' onclick='$.c.friend.SaveNewFenzu("
							+ a.id + ")' />";
				}
			},
			SaveNewFenzu : function(a) {
				var c = 0, d, f = a + "", g = /^[\w|\u4E00-\u9FA5]+$/;
				d = e("#friendgl ul li");
				for (c = 0; c < d.length; c++) {
					if (d[c].id == f) {
						var h = d[c].getElementsByTagName("input");
						if (g.test(h[0].value)) {
							h = "op=updategroupname&v="
									+ encodeURIComponent(h[0].value) + "&g="
									+ a;
							e.j.callajax("friendpost", h, function(j) {
								if (j == "") {
									alert("\u4fee\u6539\u5931\u8d25\uff01");
								} else {
									if (j != "-") {
										alert(j);
									} else {
										window.location.href = "/friend/";
									}
								}
							});
						} else {
							alert("\u5206\u7ec4\u540d\u79f0\u4e0d\u5408\u6cd5!");
							return;
						}
					}
				}
			},
			DeleteTag : function(a) {
				if (window
						.confirm("\u4f60\u786e\u8ba4\u8981\u5220\u9664\u6b64\u5206\u7ec4\u4e48?")) {
					a = a.parentNode.parentNode;
					a.getElementsByTagName("span");
					e.j
							.callajax(
									"friendpost",
									"op=deletegroup&g=" + a.id,
									function(c) {
										if (c == "") {
											alert("\u8bf7\u5148\u5220\u9664\u6b64\u5206\u7ec4\u4e0b\u6240\u6709\u597d\u53cb\u518d\u5220\u9664\u6b64\u5206\u7ec4\uff01");
										} else {
											window.location.href = "/friend/";
										}
									});
				}
			}
		},
		favorite : {
			ScrollItemRight : function(a, c, d, f) {
				var g = "li";
				if (f) {
					g = f;
				}
				f = e("#" + a + " " + g);
				for (g = 0; g < f.length; g++) {
					if (f[g].style.display == "") {
						if (g > 0) {
							f[g - 1].style.display = "";
							e.c.favorite.ShowTag(a, f[g - 1], c, d);
							break;
						}
					}
				}
			},
			ScrollItemLeft : function(a, c, d, f) {
				var g = "li";
				if (f) {
					g = f;
				}
				f = e("#" + a + " " + g);
				for ( var h = g = 0; h < f.length; h++) {
					if (f[h].style.display == "") {
						g += f[h].offsetWidth;
					}
					if (g > 680) {
						break;
					}
				}
				if (g > 680) {
					for (h = 0; h < f.length; h++) {
						if (f[h].style.display == "") {
							f[h].style.display = "none";
							f[h].className && f[h].className == c
									&& e.c.favorite.ShowTag(a, f[h + 1], c, d);
							break;
						}
					}
				}
			},
			GetSelectFavID : function() {
				for ( var a = e("#area_scj li"), c = 0; c < a.length; c++) {
					if (a[c].className && a[c].className == "selected"
							&& a[c].style.display != "none") {
						return a[c].id;
					}
				}
				return "";
			},
			ShowTag : function(a, c, d, f, g) {
				if (!(c.className && c.className == d)) {
					var h = "li";
					if (g) {
						h = g;
					}
					g = 0;
					h = e("#" + a + " " + h);
					for (g = 0; g < h.length; g++) {
						h[g].className = f;
					}
					if (c.style.display == "none") {
						c.style.display = "";
					}
					c.className = d;
					e.c.favorite.FavoriteChange(c.id, a, c, d, f, 1);
				}
			},
			FavoriteChange : function(a, c, d, f, g, h) {
				c = e("#" + c + " " + g);
				for (d = d = 0; d < c.length; d++) {
					c[d].className = f;
				}
				document.getElementById(a).className = "selected";
				e.j.callajax("favoritelist", "dirid=" + a + "&pn=" + h,
						function(j) {
							e("#sc01").html(j);
						});
			},
			FavoriteChange1 : function(a, c) {
				e.c.favorite.FavoriteChange(a, "area_nav", "selected", "",
						"li", c);
			},
			FavoriteDelete : function(a, c) {
				e.j.callajax("favoritepost", "dirid=" + a + "&ids=" + c,
						function() {
							window.location = window.location;
						});
			},
			del : function(a) {
				e.j.callajax("favoritepost", "para=" + a + "&op=del",
						function() {
							window.location = window.location;
						});
			},
			deldir : function(a, c) {
				window
						.confirm("\u5220\u9664\u201c"
								+ c
								+ "\u201d\u540e\uff0c\u8fd9\u4e2a\u6536\u85cf\u5939\u91cc\u6536\u85cf\u7684\u4fe1\u606f\u90fd\u4f1a\u88ab\u5220\u9664\uff0c\u60a8\u786e\u5b9a\u9700\u8981\u5220\u9664\u5417\uff1f")
						&& e.j.callajax("favoritepost", "dirid=" + a
								+ "&op=deldir", function(d) {
							if (d.indexOf("-") > 0) {
								window.location = "/shoucangjianli/";
							} else {
								alert(d);
							}
						});
			},
			MoveFavorite : function(a, c, d) {
				for ( var f = "", g = document.getElementById("sc01")
						.getElementsByTagName("input"), h = 0; h < g.length; h++) {
					if (g[h].type == "checkbox") {
						if (g[h].id.indexOf("cbID") > -1) {
							if (g[h].checked) {
								f = f + g[h].value + ",";
							}
						}
					}
				}
				f.length < 1 || Number(c) <= 0 || c != a
						&& e.c.favorite.FavoriteMove(a, c, f, d);
			},
			FavoriteMove : function(a, c, d) {
				e.j.callajax("favoritepost", "olddirid=" + a + "&newdirid=" + c
						+ "&ids=" + d + "&op=movefavorite", function(f) {
					if (f.indexOf("-") > 0) {
						window.location = "/shoucangjianli/?dirid=" + c;
					} else {
						alert(f);
					}
				});
			}
		},
		info : {
			RepostInfo : function(a, c, d, f) {
				var g = "\u6bcf\u5929\u5237\u65b0\u7b2c1\u6761\u4fe1\u606f\u514d\u8d39\uff0c\u786e\u5b9a\u8981\u5237\u65b0\u5417\uff1f";
				if (f > 0) {
					g = "\u6bcf\u5237\u65b01\u6761\u4fe1\u606f\u9700\u8981"
							+ d
							+ "\u4e2a\u79ef\u5206\uff0c\u786e\u5b9a\u8981\u5237\u65b0\u5417\uff1f";
				}
				window.confirm(g)
						&& e.j
								.callajax(
										"reflahinfo",
										"infoid=" + c,
										function(h) {
											if (h.indexOf("-") == -1) {
												var j = "REFLASH";
												if (h == "Error") {
													j = "REFLASH1";
												}
												setbg(
														"\u5e16\u5b50\u5237\u65b0\u63d0\u793a",
														474, 250,
														"/popresult/?type=" + j
																+ "&op=" + h
																+ "&infoid="
																+ c);
											} else {
												e(a).parent().parent().prev()
														.html(h);
												setbg(
														"\u5e16\u5b50\u5237\u65b0\u63d0\u793a",
														474, 250,
														"/popresult/?type=REFLASH1&op=success&infoid="
																+ c);
											}
										});
			},
			reflashAll : function(a, c) {
				var d = 0, f = e.c.public1.Post.gs("cbID");
				if (f == "") {
					alert("\u8bf7\u5148\u9009\u62e9\u8981\u5237\u65b0\u7684\u5e16\u5b50!");
				} else {
					d = f.substring(0, f.length - 1).split(",").length;
					var g = c > 0 ? 1 * d : 1 * d - 1;
					if (window
							.confirm("\u60a8\u9009\u62e9\u4e86"
									+ d
									+ "\u6761\u4fe1\u606f,\u9884\u8ba1\u9700\u8981"
									+ g
									+ "\u4e2a\u79ef\u5206\uff0c\u786e\u5b9a\u8981\u5237\u65b0\u5417?")) {
						if (a < g) {
							setbg("\u5e16\u5b50\u5237\u65b0\u63d0\u793a", 474,
									270,
									"/popresult/?type=REFLASH&op=PILIANGSCOREERROR&us="
											+ a + "&needsorce=" + g);
							return false;
						} else {
							d = 290 + d * 20;
							f = "/reflashall/?fl=1&ids=" + encodeURI(f);
							if (navigator.userAgent.indexOf("MSIE") == -1) {
								d += 20;
							}
							setbg("\u5e16\u5b50\u5237\u65b0\u63d0\u793a", 474,
									d, f);
						}
					} else {
						return false;
					}
				}
			},
			SubInfo : function(a, c, d) {
				e.c.public1.Post.p("submitform", "/submit/infopost/?op=" + c,
						d, "ids", a);
			},
			InfoTop : function(a) {
				var c = e("#frm" + a);
				c.length < 1 && alert("\u4e0d\u80fd\u7f6e\u9876");
				if (c.attr("visible").toString() == "false") {
					e("iframe").attr("visible", false);
					e("iframe").css("height", "0px");
					c.attr("src", "/infotop/" + a + "/?temp=1"
							+ (new Date).getTime().toString(36));
					c.attr("visible", true);
				} else {
					c.attr("visible", false);
					c.css("height", "0px");
				}
			},
			setframeheight : function(a, c) {
				var d = e("#frm" + a);
				if (d.length > 0) {
					navigator.userAgent.toLowerCase().indexOf("msie") == -1 ? d
							.css("height", c + "px") : d.css("height", "270px");
				}
			},
			infotopsuccess : function() {
				window.location.href = window.location.href;
			}
		},
		Error : {
			S_Message : function() {
			},
			setError : function(a) {
				var c = e("#toperro");
				c.addClass("sc");
				c.css("display", "");
				c.html(a);
				e.j.scrollToElement(c.get(0));
				flagSubmit = false;
				e.formValidator.subfalse("aspnetForm", "fabu");
				e.c.verifycode.reloadcode();
			},
			showError : function(a) {
				alert(a);
				flagSubmit = false;
				e.formValidator.subfalse("aspnetForm", "fabu");
				e.c.verifycode.reloadcode();
			},
			setErrorTip : function(a, c) {
				try {
					e.formValidator.clearErrorTip();
				} catch (d) {
				}
				e.formValidator.setTipState(null, "onError", a, c);
			},
			subError : function(a, c, d, f, g) {
				e.c.Error.setErrorTip(a, c);
				e.j.scrollToElement(document.getElementById(c));
				e.formValidator.subfalse(d, f, g);
			}
		},
		public1 : {
			local : function(a, c) {
				this.thisid = a;
				this.p = c;
				var d = this;
				this.w = function(f, g, h, j) {
					c.s = [ {
						fun : function(k) {
							d.loadbyparent(k);
						},
						css : ""
					}, {
						id : "city" + d.thisid,
						childid : "area" + d.thisid,
						curentid : g
					}, {
						id : "area" + d.thisid,
						childid : "name" + d.thisid,
						curentid : h,
						defaultvalue : "\u8bf7\u9009\u62e9\u533a\u53bf"
					}, {
						id : "name" + d.thisid,
						curentid : j
					} ];
					c.w();
				};
				this.w1 = function(f, g, h) {
					c.s = [ {
						fun : function(j) {
							d.loadbyparent(j);
						},
						css : ""
					}, {
						id : "city" + d.thisid,
						childid : "area" + d.thisid,
						curentid : g
					}, {
						id : "area" + d.thisid,
						curentid : h
					} ];
					c.w();
				};
				this.w2 = function(f, g, h, j) {
					c.s = [ {
						fun : function(k) {
							d.loadbyparent(k);
						},
						css : ""
					}, {
						id : "city" + d.thisid,
						childid : "area" + d.thisid,
						curentid : g,
						defaultvalue : "\u8bf7\u9009\u62e9\u5730\u533a"
					}, {
						id : "area" + d.thisid,
						curentid : h,
						childid : "name" + d.thisid,
						pid : "city" + d.thisid
					}, {
						id : "name" + d.thisid,
						curentid : j,
						pid : "area" + d.thisid
					} ];
					c.w();
				};
				this.load = function(f, g, h, j) {
					g = "localid=" + h;
					var k = d.p.gs(f), l = k.childid;
					e.j.callajax("localselect", g, function(m) {
						if (!(m == "" || m == undefined)) {
							m = m.split("|");
							k.defaultvalue
									&& d.p.addoption(f, k.defaultvalue, " ");
							for ( var p = 0; p < m.length; p++) {
								var q = m[p].split(",");
								d.p.addoption(f, q[1], q[0]);
							}
							d.p.selectoption(f, j);
							e("#select_" + f).css("display", "");
							if (!e("#select_" + f)[0].selectedIndex) {
								e("#select_" + f)[0].selectedIndex = 0;
							}
							if (!(l == undefined || l == "")) {
								m = d.p.gs(k.childid);
								p = e("#select_" + f).val();
								!p || p == " "
										|| d.load(m.id, false, p, m.curentid);
							}
						}
					});
				};
				this.loadbyparent = function(f) {
					var g = d.p.gs(f).childid;
					if (g) {
						var h = e("#select_" + f).val();
						if (!(h == "" || h == " ")) {
							d.p.clearChild(f);
							e.j
									.callajax(
											"localselect",
											"localid=" + h,
											function(j) {
												var k = d.p.gs(g);
												if (j != "") {
													e("#select_" + g).css(
															"display", "");
													j = j.split("|");
													k.defaultvalue
															&& d.p
																	.addoption(
																			g,
																			k.defaultvalue,
																			" ");
													if (k.pid) {
														k = e(
																"#select_"
																		+ k.pid
																		+ " option:selected")
																.text();
														k = k.substring(1,
																k.length);
														d.p.addoption(g,
																"\u5168(" + k
																		+ ")",
																"-1");
													}
													for (k = 0; k < j.length; k++) {
														var l = j[k].split(",");
														d.p.addoption(g, l[1],
																l[0]);
													}
												}
											});
						}
					}
				};
			},
			category : function(a, c) {
				this.thisid = a;
				this.p = c;
				var d = this;
				this.w = function(f, g, h) {
					c.s = [ {
						fun : function(j) {
							d.loadbyparent(j);
						},
						css : ""
					}, {
						id : "parentcate" + d.thisid,
						childid : "childcate" + d.thisid,
						curentid : g,
						defaultvalue : "\u5168\u90e8\u5927\u7c7b"
					}, {
						id : "childcate" + d.thisid,
						curentid : h
					} ];
					c.w();
				};
				this.load = function(f, g, h, j) {
					g = "cateid=" + h;
					var k = d.p.gs(f), l = k.childid;
					e.j.callajax("cateselect", g, function(m) {
						if (!(m == "" || m == undefined)) {
							m = m.split("|");
							k.defaultvalue
									&& d.p.addoption(f, k.defaultvalue, " ");
							for ( var p = 0; p < m.length; p++) {
								var q = m[p].split(",");
								d.p.addoption(f, q[1], q[0]);
							}
							d.p.selectoption(f, j);
							e("#select_" + f).css("display", "");
							if (!e("#select_" + f)[0].selectedIndex) {
								e("#select_" + f)[0].selectedIndex = 0;
							}
							if (!(l == undefined || l == "")) {
								m = d.p.gs(k.childid);
								p = e("#select_" + f).val();
								!p || p == " "
										|| d.load(m.id, false, p, m.curentid);
							}
						}
					});
				};
				this.loadbyparent = function(f) {
					var g = d.p.gs(f).childid;
					if (g) {
						var h = e("#select_" + f).val();
						if (!(h == "" || h == " ")) {
							d.p.clearChild(f);
							e.j.callajax("cateselect", "cateid=" + h, function(
									j) {
								var k = d.p.gs(g);
								if (j != "") {
									e("#select_" + g).css("display", "");
									j = j.split("|");
									k.defaultvalue
											&& d.p.addoption(g, k.defaultvalue,
													" ");
									for (k = 0; k < j.length; k++) {
										var l = j[k].split(",");
										d.p.addoption(g, l[1], l[0]);
									}
								}
							});
						}
					}
				};
			},
			dropdowndate : function(a, c, d, f, g) {
				this.thisid = a;
				var h = this;
				this.setting = c ? c
						: [
								{
									name : "year",
									html : "<span class='yearcssdefault' style='width:auto'><select id='year"
											+ a
											+ "' class='yearcssdefault'  name='year"
											+ a
											+ "' onchange='"
											+ this.thisid
											+ ".InitMonth(0);"
											+ this.thisid
											+ ".InitDay(this.value,1,1)'></select>  \u5e74</span>",
									defaultval : d
								},
								{
									name : "month",
									html : "<span class='monthcssdefault' style='width:auto'><select id='month"
											+ a
											+ "' class='monthcssdefault'  name='month"
											+ a
											+ "' onchange='"
											+ this.thisid
											+ ".MonthChange(this.value)'></select>  \u6708</span>",
									defaultval : f
								},
								{
									name : "day",
									html : "<span class='daycssdefault' style='width:auto'><select id='day"
											+ a
											+ "' class='daycssdefault'  name='day"
											+ a
											+ "' onchange=''></select>  \u65e5</span>",
									defaultval : g
								} ];
				this.load = function(j) {
					var k = "";
					e.each(h.setting, function(l, m) {
						k += m.html;
					});
					document.write(k);
					h.InitYear(j, h.setting[0].defaultval);
					h.InitMonth(h.setting[1].defaultval);
					h.InitDay(h.setting[0].defaultval, h.setting[1].defaultval,
							h.setting[2].defaultval);
				};
				this.InitYear = function(j, k) {
					e("#year" + h.thisid).empty();
					for ( var l = 0; l < 100; l++) {
						var m = j - 99 + l;
						e("<option value='" + m + "'>" + m + "</option>")
								.appendTo("#year" + h.thisid);
					}
					e("#year" + h.thisid).attr("value", k);
				};
				this.InitMonth = function(j) {
					e("#month" + h.thisid).empty();
					for ( var k = "", l = 0; l < 12; l++) {
						k = (l + 1).toString();
						if (l < 9) {
							k = "0" + k;
						}
						e("<option value='" + (l + 1) + "'>" + k + "</option>")
								.appendTo("#month" + h.thisid);
					}
					e("#month" + h.thisid).attr("value", j);
				};
				this.InitDay = function(j, k, l) {
					var m = e("#day" + h.thisid);
					n = (new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30,
							31))[k - 1];
					if (k == 2 && (j % 4 == 0 && j % 100 != 0 || j % 400 == 0)) {
						++n;
					}
					m.empty();
					j = "";
					for (k = 0; k < n; k++) {
						j = (k + 1).toString();
						if (k < 9) {
							j = "0" + j;
						}
						e("<option value='" + (k + 1) + "'>" + j + "</option>")
								.appendTo("#day" + h.thisid);
					}
					e("#day" + h.thisid).attr("value", l);
				};
				this.MonthChange = function(j) {
					var k = e("#year" + h.thisid).val();
					h.InitDay(k, j, 1);
				};
			},
			Post : {
				submit : function(a, c) {
					var d = e("#" + a).get(0);
					d.action = c;
					d.submit();
				},
				p : function(a, c, d, f, g, h) {
					if (g == "" || !g) {
						alert(h);
					} else {
						if (d) {
							if (!confirm(d)) {
								return;
							}
						}
						e("#" + f).val(g);
						a = e("#" + a).get(0);
						if (c) {
							a.action = c;
						}
						a.submit();
					}
				},
				gs : function(a) {
					a = document.getElementsByName(a);
					for ( var c = "", d = 0; d < a.length; d++) {
						if (a[d].checked) {
							c = c + a[d].value + ",";
						}
					}
					return c;
				},
				readmsg : function(a) {
					e.j.callajax("readmsg", "msgid=" + a, function() {
					});
				}
			}
		}
	};
})(jQuery);
function closeinfo(a) {
	$.c.info.SubInfo(a, "close",
			"\u60a8\u786e\u5b9a\u5173\u95ed\u672c\u6761\u4fe1\u606f\u5417?");
}
function closecheckinfo() {
	var a = $.c.public1.Post.gs("cbID");
	a == "" ? alert("\u8bf7\u5148\u9009\u62e9\u8981\u5173\u95ed\u7684\u5e16\u5b50!")
			: $.c.info
					.SubInfo(a, "close",
							"\u60a8\u786e\u5b9a\u5173\u95ed\u8fd9\u4e9b\u4fe1\u606f\u5417?");
}
function delteinfo(a) {
	$.c.info.SubInfo(a, "del",
			"\u60a8\u786e\u5b9a\u5220\u9664\u8fd9\u4e2a\u5e16\u5b50\u5417?");
}
function deltecheckinfo() {
	var a = $.c.public1.Post.gs("cbID");
	a == "" ? alert("\u8bf7\u5148\u9009\u62e9\u8981\u5220\u9664\u7684\u5e16\u5b50!")
			: $.c.info
					.SubInfo(a, "del",
							"\u60a8\u786e\u5b9a\u5220\u9664\u8fd9\u4e9b\u5e16\u5b50\u5417?");
}
function canceltop(a) {
	$.c.info
			.SubInfo(
					a,
					"canceltop",
					"\u53d6\u6d88\u7f6e\u9876\u4e0d\u4f1a\u8fd4\u8fd8\u79ef\u5206\uff0c\u786e\u8ba4\u53d6\u6d88\u4e48\uff1f");
}
function openinfo(a) {
	$.c.info.SubInfo(a, "open", "您确定恢复本条信息吗?");
}
function opencheckinfo() {
	var a = $.c.public1.Post.gs("cbID");
	a == "" ? alert("\u8bf7\u5148\u9009\u62e9\u8981\u5f00\u542f\u7684\u5e16\u5b50!")
			: $.c.info
					.SubInfo(a, "open",
							"\u60a8\u786e\u5b9a\u5f00\u542f\u8fd9\u4e9b\u4fe1\u606f\u5417?");
}
function ConfirmUpdateInfo(a) {
	if (a.toLowerCase() == "true") {
		if (!window
				.confirm("\u4fe1\u606f\u7f6e\u9876\u4e2d\uff0c\u5982\u679c\u4fee\u6539\u4e86\u7c7b\u522b\u548c\u5730\u533a\uff0c\u5219\u539f\u5730\u533a\u548c\u7c7b\u522b\u7684\u7f6e\u9876\u81ea\u52a8\u7ed3\u675f\uff0c\u79ef\u5206\u4e0d\u4e88\u9000\u8fd8!")) {
			if (document.all) {
				window.event.returnValue = false;
			} else {
				arguments.callee.caller.arguments[0].preventDefault();
			}
		}
	}
}
function alertandjump(d, c) {
	alert(d);
	window.top.location = c;
}
function jump(a) {
	window.top.location = a;
}
function reflash() {
	window.top.location = window.top.location;
}
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_md5(a) {
	return binl2hex(core_md5(str2binl(a), a.length * chrsz));
}
function b64_md5(a) {
	return binl2b64(core_md5(str2binl(a), a.length * chrsz));
}
function hex_hmac_md5(a, c) {
	return binl2hex(core_hmac_md5(a, c));
}
function b64_hmac_md5(a, c) {
	return binl2b64(core_hmac_md5(a, c));
}
function calcMD5(a) {
	return binl2hex(core_md5(str2binl(a), a.length * chrsz));
}
function hex_md5_16(c) {
	var a = hex_md5(c);
	a = a.substring(8, 24);
	return reverse(a);
}
function core_md5(r, k) {
	r[k >> 5] |= 128 << ((k) % 32);
	r[(((k + 64) >>> 9) << 4) + 14] = k;
	var q = 1732584193;
	var p = -271733879;
	var m = -1732584194;
	var l = 271733878;
	for ( var g = 0; g < r.length; g += 16) {
		var j = q;
		var h = p;
		var f = m;
		var e = l;
		q = md5_ff(q, p, m, l, r[g + 0], 7, -680876936);
		l = md5_ff(l, q, p, m, r[g + 1], 12, -389564586);
		m = md5_ff(m, l, q, p, r[g + 2], 17, 606105819);
		p = md5_ff(p, m, l, q, r[g + 3], 22, -1044525330);
		q = md5_ff(q, p, m, l, r[g + 4], 7, -176418897);
		l = md5_ff(l, q, p, m, r[g + 5], 12, 1200080426);
		m = md5_ff(m, l, q, p, r[g + 6], 17, -1473231341);
		p = md5_ff(p, m, l, q, r[g + 7], 22, -45705983);
		q = md5_ff(q, p, m, l, r[g + 8], 7, 1770035416);
		l = md5_ff(l, q, p, m, r[g + 9], 12, -1958414417);
		m = md5_ff(m, l, q, p, r[g + 10], 17, -42063);
		p = md5_ff(p, m, l, q, r[g + 11], 22, -1990404162);
		q = md5_ff(q, p, m, l, r[g + 12], 7, 1804603682);
		l = md5_ff(l, q, p, m, r[g + 13], 12, -40341101);
		m = md5_ff(m, l, q, p, r[g + 14], 17, -1502002290);
		p = md5_ff(p, m, l, q, r[g + 15], 22, 1236535329);
		q = md5_gg(q, p, m, l, r[g + 1], 5, -165796510);
		l = md5_gg(l, q, p, m, r[g + 6], 9, -1069501632);
		m = md5_gg(m, l, q, p, r[g + 11], 14, 643717713);
		p = md5_gg(p, m, l, q, r[g + 0], 20, -373897302);
		q = md5_gg(q, p, m, l, r[g + 5], 5, -701558691);
		l = md5_gg(l, q, p, m, r[g + 10], 9, 38016083);
		m = md5_gg(m, l, q, p, r[g + 15], 14, -660478335);
		p = md5_gg(p, m, l, q, r[g + 4], 20, -405537848);
		q = md5_gg(q, p, m, l, r[g + 9], 5, 568446438);
		l = md5_gg(l, q, p, m, r[g + 14], 9, -1019803690);
		m = md5_gg(m, l, q, p, r[g + 3], 14, -187363961);
		p = md5_gg(p, m, l, q, r[g + 8], 20, 1163531501);
		q = md5_gg(q, p, m, l, r[g + 13], 5, -1444681467);
		l = md5_gg(l, q, p, m, r[g + 2], 9, -51403784);
		m = md5_gg(m, l, q, p, r[g + 7], 14, 1735328473);
		p = md5_gg(p, m, l, q, r[g + 12], 20, -1926607734);
		q = md5_hh(q, p, m, l, r[g + 5], 4, -378558);
		l = md5_hh(l, q, p, m, r[g + 8], 11, -2022574463);
		m = md5_hh(m, l, q, p, r[g + 11], 16, 1839030562);
		p = md5_hh(p, m, l, q, r[g + 14], 23, -35309556);
		q = md5_hh(q, p, m, l, r[g + 1], 4, -1530992060);
		l = md5_hh(l, q, p, m, r[g + 4], 11, 1272893353);
		m = md5_hh(m, l, q, p, r[g + 7], 16, -155497632);
		p = md5_hh(p, m, l, q, r[g + 10], 23, -1094730640);
		q = md5_hh(q, p, m, l, r[g + 13], 4, 681279174);
		l = md5_hh(l, q, p, m, r[g + 0], 11, -358537222);
		m = md5_hh(m, l, q, p, r[g + 3], 16, -722521979);
		p = md5_hh(p, m, l, q, r[g + 6], 23, 76029189);
		q = md5_hh(q, p, m, l, r[g + 9], 4, -640364487);
		l = md5_hh(l, q, p, m, r[g + 12], 11, -421815835);
		m = md5_hh(m, l, q, p, r[g + 15], 16, 530742520);
		p = md5_hh(p, m, l, q, r[g + 2], 23, -995338651);
		q = md5_ii(q, p, m, l, r[g + 0], 6, -198630844);
		l = md5_ii(l, q, p, m, r[g + 7], 10, 1126891415);
		m = md5_ii(m, l, q, p, r[g + 14], 15, -1416354905);
		p = md5_ii(p, m, l, q, r[g + 5], 21, -57434055);
		q = md5_ii(q, p, m, l, r[g + 12], 6, 1700485571);
		l = md5_ii(l, q, p, m, r[g + 3], 10, -1894986606);
		m = md5_ii(m, l, q, p, r[g + 10], 15, -1051523);
		p = md5_ii(p, m, l, q, r[g + 1], 21, -2054922799);
		q = md5_ii(q, p, m, l, r[g + 8], 6, 1873313359);
		l = md5_ii(l, q, p, m, r[g + 15], 10, -30611744);
		m = md5_ii(m, l, q, p, r[g + 6], 15, -1560198380);
		p = md5_ii(p, m, l, q, r[g + 13], 21, 1309151649);
		q = md5_ii(q, p, m, l, r[g + 4], 6, -145523070);
		l = md5_ii(l, q, p, m, r[g + 11], 10, -1120210379);
		m = md5_ii(m, l, q, p, r[g + 2], 15, 718787259);
		p = md5_ii(p, m, l, q, r[g + 9], 21, -343485551);
		q = safe_add(q, j);
		p = safe_add(p, h);
		m = safe_add(m, f);
		l = safe_add(l, e);
	}
	return Array(q, p, m, l);
}
function md5_cmn(h, e, d, c, g, f) {
	return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d);
}
function md5_ff(g, f, l, k, e, j, h) {
	return md5_cmn((f & l) | ((~f) & k), g, f, e, j, h);
}
function md5_gg(g, f, l, k, e, j, h) {
	return md5_cmn((f & k) | (l & (~k)), g, f, e, j, h);
}
function md5_hh(g, f, l, k, e, j, h) {
	return md5_cmn(f ^ l ^ k, g, f, e, j, h);
}
function md5_ii(g, f, l, k, e, j, h) {
	return md5_cmn(l ^ (f | (~k)), g, f, e, j, h);
}
function core_hmac_md5(d, g) {
	var f = str2binl(d);
	if (f.length > 16) {
		f = core_md5(f, d.length * chrsz);
	}
	var a = Array(16), e = Array(16);
	for ( var c = 0; c < 16; c++) {
		a[c] = f[c] ^ 909522486;
		e[c] = f[c] ^ 1549556828;
	}
	var h = core_md5(a.concat(str2binl(g)), 512 + g.length * chrsz);
	return core_md5(e.concat(h), 512 + 128);
}
function safe_add(a, e) {
	var d = (a & 65535) + (e & 65535);
	var c = (a >> 16) + (e >> 16) + (d >> 16);
	return (c << 16) | (d & 65535);
}
function bit_rol(a, c) {
	return (a << c) | (a >>> (32 - c));
}
function str2binl(e) {
	var d = Array();
	var a = (1 << chrsz) - 1;
	for ( var c = 0; c < e.length * chrsz; c += chrsz) {
		d[c >> 5] |= (e.charCodeAt(c / chrsz) & a) << (c % 32);
	}
	return d;
}
function binl2hex(d) {
	var c = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var e = "";
	for ( var a = 0; a < d.length * 4; a++) {
		e += c.charAt((d[a >> 2] >> ((a % 4) * 8 + 4)) & 15)
				+ c.charAt((d[a >> 2] >> ((a % 4) * 8)) & 15);
	}
	return e;
}
function binl2b64(e) {
	var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var g = "";
	for ( var c = 0; c < e.length * 4; c += 3) {
		var f = (((e[c >> 2] >> 8 * (c % 4)) & 255) << 16)
				| (((e[c + 1 >> 2] >> 8 * ((c + 1) % 4)) & 255) << 8)
				| ((e[c + 2 >> 2] >> 8 * ((c + 2) % 4)) & 255);
		for ( var a = 0; a < 4; a++) {
			if (c * 8 + a * 6 > e.length * 32) {
				g += b64pad;
			} else {
				g += d.charAt((f >> 6 * (3 - a)) & 63);
			}
		}
	}
	return g;
}
function reverse(d) {
	var a = "";
	for ( var c = d.length - 1; c >= 0; c--) {
		a += d.charAt(c);
	}
	return a;
}
function getm32str(c, a) {
	if (a.length != 13) {
		alert("timesign error !!!");
		return "";
	}
	return hex_md5(hex_md5(c) + a.substring(5, 11));
}
function getm16str(c, a) {
	if (a.length != 13) {
		alert("timesign error !!!");
		return "";
	}
	return hex_md5(hex_md5_16(c) + a.substring(5, 11));
}