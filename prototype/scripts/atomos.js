//     Zepto.js
//     (c) 2010, 2011 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length<2){do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0)}else f=arguments[1];while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function v(a){return{}.toString.call(a)=="[object Function]"}function w(a){return a instanceof Object}function x(a){return a instanceof Array}function y(a){return typeof a.length=="number"}function z(b){return b.filter(function(b){return b!==a&&b!==null})}function A(a){return a.length>0?[].concat.apply([],a):a}function B(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})}function C(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function D(a){return a.filter(function(a,b,c){return c.indexOf(a)==b})}function E(a){return a in i?i[a]:i[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function F(a,b){return typeof b=="number"&&!k[C(a)]?b+"px":b}function G(a){var b,c;return h[a]||(b=g.createElement(a),g.body.appendChild(b),c=j(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),h[a]=c),h[a]}function H(b,c){c===a&&l.test(b)&&RegExp.$1,c in q||(c="*");var d=q[c];return d.innerHTML=""+b,f.call(d.childNodes)}function I(a,b){return a=a||e,a.__proto__=I.prototype,a.selector=b||"",a}function J(b,d){if(!b)return I();if(d!==a)return J(d).find(b);if(v(b))return J(g).ready(b);if(b instanceof I)return b;var e;return x(b)?e=z(b):m.indexOf(b.nodeType)<0&&b!==window?l.test(b)?(e=H(b.trim(),RegExp.$1),b=null):b.nodeType&&b.nodeType==3?e=[b]:e=c(g,b):(e=[b],b=null),I(e,b)}function K(b,c){return c===a?J(b):J(b).filter(c)}function L(a,b,c,d){return v(b)?b.call(a,c,d):b}function M(a,b,c){var d=a%2?b:b.parentNode;d.insertBefore(c,a?a==1?d.firstChild:a==2?b:null:b.nextSibling)}function N(a,b){b(a);for(var c in a.childNodes)N(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=window.document,h={},i={},j=g.defaultView.getComputedStyle,k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+)[^>]*>/,m=[1,9,11],n=["after","prepend","before","append"],o=g.createElement("table"),p=g.createElement("tr"),q={tr:g.createElement("tbody"),tbody:o,thead:o,tfoot:o,td:p,th:p,"*":g.createElement("div")},r=/complete|loaded|interactive/,s=/^\.([\w-]+)$/,t=/^#([\w-]+)$/,u=/^[\w-]+$/;return J.extend=function(a){return f.call(arguments,1).forEach(function(c){for(b in c)a[b]=c[b]}),a},J.qsa=c=function(a,b){var c;return a===g&&t.test(b)?(c=a.getElementById(RegExp.$1))?[c]:e:f.call(s.test(b)?a.getElementsByClassName(RegExp.$1):u.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},J.isFunction=v,J.isObject=w,J.isArray=x,J.map=function(a,b){var c,d=[],e,f;if(y(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return A(d)},J.each=function(a,b){var c,d;if(y(a)){for(c=0;c<a.length;c++)if(b(c,a[c])===!1)return a}else for(d in a)if(b(d,a[d])===!1)return a;return a},J.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,indexOf:e.indexOf,concat:e.concat,map:function(a){return J.map(this,function(b,c){return a.call(b,c,b)})},slice:function(){return J(f.apply(this,arguments))},ready:function(a){return r.test(g.readyState)?a(J):g.addEventListener("DOMContentLoaded",function(){a(J)},!1),this},get:function(b){return b===a?this:this[b]},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},filter:function(a){return J([].filter.call(this,function(b){return b.parentNode&&c(b.parentNode,a).indexOf(b)>=0}))},end:function(){return this.prevObject||J()},andSelf:function(){return this.add(this.prevObject||J())},add:function(a,b){return J(D(this.concat(J(a,b))))},is:function(a){return this.length>0&&J(this[0]).filter(a).length>0},not:function(b){var c=[];if(v(b)&&b.call!==a)this.each(function(a){b.call(this,a)||c.push(this)});else{var d=typeof b=="string"?this.filter(b):y(b)&&v(b.item)?f.call(b):J(b);this.forEach(function(a){d.indexOf(a)<0&&c.push(a)})}return J(c)},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return J(this[0])},last:function(){return J(this[this.length-1])},find:function(a){var b;return this.length==1?b=c(this[0],a):b=this.map(function(){return c(this,a)}),J(b)},closest:function(a,b){var d=this[0],e=c(b||g,a);e.length||(d=null);while(d&&e.indexOf(d)<0)d=d!==b&&d!==g&&d.parentNode;return J(d)},parents:function(a){var b=[],c=this;while(c.length>0)c=J.map(c,function(a){if((a=a.parentNode)&&a!==g&&b.indexOf(a)<0)return b.push(a),a});return K(b,a)},parent:function(a){return K(D(this.pluck("parentNode")),a)},children:function(a){return K(this.map(function(){return f.call(this.children)}),a)},siblings:function(a){return K(this.map(function(a,b){return f.call(b.parentNode.children).filter(function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return this.map(function(){return this[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),j(this,"").getPropertyValue("display")=="none"&&(this.style.display=G(this.nodeName))})},replaceWith:function(a){return this.each(function(){J(this).before(a).remove()})},wrap:function(a){return this.each(function(){J(this).wrapAll(J(a)[0].cloneNode(!1))})},wrapAll:function(a){return this[0]&&(J(this[0]).before(a=J(a)),a.append(this)),this},unwrap:function(){return this.parent().each(function(){J(this).replaceWith(J(this).children())}),this},hide:function(){return this.css("display","none")},toggle:function(b){return(b===a?this.css("display")=="none":b)?this.show():this.hide()},prev:function(){return J(this.pluck("previousElementSibling"))},next:function(){return J(this.pluck("nextElementSibling"))},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var c=this.innerHTML;J(this).empty().append(L(this,b,a,c))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(w(c))for(b in c)this.setAttribute(b,c[b]);else this.setAttribute(c,L(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.removeAttribute(a)})},data:function(a,b){return this.attr("data-"+a,b)},val:function(b){return b===a?this.length>0?this[0].value:null:this.each(function(a){this.value=L(this,b,a,this.value)})},offset:function(){if(this.length==0)return null;var a=this[0].getBoundingClientRect();return{left:a.left+g.body.scrollLeft,top:a.top+g.body.scrollTop,width:a.width,height:a.height}},css:function(c,d){if(d===a&&typeof c=="string")return this.length==0?a:this[0].style[B(c)]||j(this[0],"").getPropertyValue(c);var e="";for(b in c)e+=C(b)+":"+F(b,c[b])+";";return typeof c=="string"&&(e=C(c)+":"+F(c,d)),this.each(function(){this.style.cssText+=";"+e})},index:function(a){return a?this.indexOf(J(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return this.length<1?!1:E(a).test(this[0].className)},addClass:function(a){return this.each(function(b){d=[];var c=this.className,e=L(this,a,b,c);e.split(/\s+/g).forEach(function(a){J(this).hasClass(a)||d.push(a)},this),d.length&&(this.className+=(c?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return this.className="";d=this.className,L(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(E(a)," ")}),this.className=d.trim()})},toggleClass:function(b,c){return this.each(function(d){var e=L(this,b,d,this.className);(c===a?!J(this).hasClass(e):c)?J(this).addClass(e):J(this).removeClass(e)})}},"filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(a){var b=J.fn[a];J.fn[a]=function(){var a=b.apply(this,arguments);return a.prevObject=this,a}}),["width","height"].forEach(function(b){J.fn[b]=function(c){var d,e=b.replace(/./,function(a){return a[0].toUpperCase()});return c===a?this[0]==window?window["inner"+e]:this[0]==g?g.documentElement["offset"+e]:(d=this.offset())&&d[b]:this.each(function(a){var d=J(this);d.css(b,L(this,c,a,d[b]()))})}}),n.forEach(function(a,b){J.fn[a]=function(a){var c=w(a)?a:H(a);"length"in c||(c=[c]);if(c.length<1)return this;var d=this.length,e=d>1,f=b<2;return this.each(function(a,g){for(var h=0;h<c.length;h++){var i=c[f?c.length-h-1:h];N(i,function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&window.eval.call(window,a.innerHTML)}),e&&a<d-1&&(i=i.cloneNode(!0)),M(b,g,i)}})};var c=b%2?a+"To":"insert"+(b?"Before":"After");J.fn[c]=function(b){return J(b)[a](this),this}}),I.prototype=J.fn,J}();"$"in window||(window.$=Zepto),function(a){function f(a){return a._zid||(a._zid=d++)}function g(a,b,d,e){b=h(b);if(b.ns)var g=i(b.ns);return(c[f(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||g.test(a.ns))&&(!d||a.fn==d)&&(!e||a.sel==e)})}function h(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function i(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function j(b,c,d){a.isObject(b)?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function k(b,d,e,g,i){var k=f(b),l=c[k]||(c[k]=[]);j(d,e,function(c,d){var e=i&&i(d,c),f=e||d,j=function(a){var c=f.apply(b,[a].concat(a.data));return c===!1&&a.preventDefault(),c},k=a.extend(h(c),{fn:d,proxy:j,sel:g,del:e,i:l.length});l.push(k),b.addEventListener(k.e,j,!1)})}function l(a,b,d,e){var h=f(a);j(b||"",d,function(b,d){g(a,b,d,e).forEach(function(b){delete c[h][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function p(b){var c=a.extend({originalEvent:b},b);return a.each(o,function(a,d){c[a]=function(){return this[d]=m,b[a].apply(b,arguments)},c[d]=n}),c}function q(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.qsa,c={},d=1,e={};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:k,remove:l},a.fn.bind=function(a,b){return this.each(function(){k(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){l(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){k(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return l(d,b,a),c}})})};var m=function(){return!0},n=function(){return!1},o={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){return this.each(function(e,f){k(f,c,d,b,function(c){return function(d){var e,g=a(d.target).closest(b,f).get(0);if(g)return e=a.extend(p(d),{currentTarget:g,liveFired:f}),c.apply(g,[e].concat([].slice.call(arguments,1)))}})})},a.fn.undelegate=function(a,b,c){return this.each(function(){l(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.trigger=function(b,c){return typeof b=="string"&&(b=a.Event(b)),q(b),b.data=c,this.each(function(){this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=p(typeof b=="string"?a.Event(b):b),d.data=c,d.target=h,a.each(g(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){if(a)this.bind(b,a);else if(this.length)try{this.get(0)[b]()}catch(c){}return this}}),a.Event=function(a,b){var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c}}(Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/(BlackBerry).*Version\/([\d.]+)/);d&&(c.version=d[1]),c.webkit=!!d,e&&(b.android=!0,b.version=e[2]),g&&(b.ios=!0,b.version=g[2].replace(/_/g,"."),b.iphone=!0),f&&(b.ios=!0,b.version=f[2].replace(/_/g,"."),b.ipad=!0),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),j&&(b.blackberry=!0,b.version=j[2])}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a,b){function k(a){return a.toLowerCase()}function l(a){return d?d+a:k(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+k(a)+"-",d=e,!1}),a.fx={off:!1,cssPrefix:c,transitionEnd:l("TransitionEnd"),animationEnd:l("AnimationEnd")},a.fn.anim=function(d,e,f,g){var h,i={},k,l=this,m,n=a.fx.transitionEnd;e===b&&(e=.5),a.fx.off&&(e=0);if(typeof d=="string")i[c+"animation-name"]=d,i[c+"animation-duration"]=e+"s",n=a.fx.animationEnd;else{for(k in d)j.test(k)?(h||(h=[]),h.push(k+"("+d[k]+")")):i[k]=d[k];h&&(i[c+"transform"]=h.join(" ")),a.fx.off||(i[c+"transition"]="all "+e+"s "+(f||""))}return m=function(){var b={};b[c+"transition"]=b[c+"animation-name"]="none",a(this).css(b),g&&g.call(this)},e>0&&this.one(n,m),setTimeout(function(){l.css(i),e<=0&&setTimeout(function(){l.each(function(){m.call(this)})},0)},0),this},i=null}(Zepto),function(a,b){function i(a){return typeof a=="number"?a:h[a]||h._default}function j(c,d,e,f,g){typeof d=="function"&&!g&&(g=d,d=b);var h={opacity:e};return f&&(a.fx.transforms3d?h.scale3d=f+",1":h.scale=f,c.css(a.fx.cssPrefix+"transform-origin","0 0")),c.anim(h,i(d)/1e3,null,g)}function k(b,c,d,e){return j(b,c,0,d,function(){f.call(a(this)),e&&e.call(this)})}function l(){var a,b=c.createElement("div"),e=c.createElement("div"),f="@media (-webkit-transform-3d){#zeptotest{left:9px;position:absolute}}",g=["&shy;","<style>",f,"</style>"].join("");return b.innerHTML+=g,e.id="zeptotest",b.appendChild(e),d.appendChild(b),a=e.offsetLeft===9,b.parentNode.removeChild(b),a}var c=window.document,d=c.documentElement,e=a.fn.show,f=a.fn.hide,g=a.fn.toggle,h={_default:400,fast:200,slow:600};a.fn.show=function(a,c){return e.call(this),a===b?a=0:this.css("opacity",0),j(this,a,1,"1,1",c)},a.fn.hide=function(a,c){return a===b?f.call(this):k(this,a,"0,0",c)},a.fn.toggle=function(a,c){return a===b||typeof a=="boolean"?g.call(this,a):this[this.css("display")=="none"?"show":"hide"](a,c)},a.fn.fadeTo=function(a,b,c){return j(this,a,b,null,c)},a.fn.fadeIn=function(a,b){var c=this.css("opacity");return c>0?this.css("opacity",0):c=1,e.call(this).fadeTo(a,c,b)},a.fn.fadeOut=function(a,b){return k(this,a,null,b)},a.fn.fadeToggle=function(a,b){var c=this.css("opacity")==0||this.css("display")=="none";return this[c?"fadeIn":"fadeOut"](a,b)},a.extend(a.fx,{speeds:h,transforms3d:function(c){var e=!1;return a.each(c,function(a,c){if(d.style[c]!==b)return e=a!=1||l(),!1}),e}("perspectiveProperty WebkitPerspective MozPerspective OPerspective msPerspective".split(" "))})}(Zepto),function(a){function e(){}function g(b,d,e,f){var h=a.isArray(d);a.each(d,function(d,i){f&&(d=e?f:f+"["+(h?"":d)+"]"),!f&&h?b.add(i.name,i.value):(e?a.isArray(i):c(i))?g(b,i,e,d):b.add(d,i)})}var b=0,c=a.isObject,d;a.ajaxJSONP=function(c){var d="jsonp"+ ++b,f=document.createElement("script"),g=c.context,h=function(){a(f).remove(),d in window&&(window[d]=e)},i={abort:h},j;return window[d]=function(b){clearTimeout(j),a(f).remove(),delete window[d],c.success.call(g,b)},f.src=c.url.replace(/=\?/,"="+d),a("head").append(f),c.timeout>0&&(j=setTimeout(function(){i.abort(),c.error.call(g,i,"timeout")},c.timeout)),i},a.ajaxSettings={type:"GET",beforeSend:e,success:e,error:e,complete:e,context:null,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},timeout:0},a.ajax=function(b){b=b||{};var f=a.extend({},b);for(d in a.ajaxSettings)f[d]||(f[d]=a.ajaxSettings[d]);if(/=\?/.test(f.url))return a.ajaxJSONP(f);f.url||(f.url=window.location.toString()),f.data&&!f.contentType&&(f.contentType="application/x-www-form-urlencoded"),c(f.data)&&(f.data=a.param(f.data));if(f.type.match(/get/i)&&f.data){var g=f.data;f.url.match(/\?.*=/)?g="&"+g:g[0]!="?"&&(g="?"+g),f.url+=g}var h=f.accepts[f.dataType],i=a.ajaxSettings.xhr(),j,k=f.context;f.headers=a.extend({"X-Requested-With":"XMLHttpRequest"},f.headers||{}),h&&(f.headers.Accept=h),i.onreadystatechange=function(){if(i.readyState==4){clearTimeout(j);var a,b=!1;if(i.status>=200&&i.status<300||i.status==0){if(h=="application/json"&&!/^\s*$/.test(i.responseText))try{a=JSON.parse(i.responseText)}catch(c){b=c}else a=i.responseText;b?f.error.call(k,i,"parsererror",b):f.success.call(k,a,"success",i)}else b=!0,f.error.call(k,i,"error");f.complete.call(k,i,b?"error":"success")}},i.open(f.type,f.url,!0),f.contentType&&(f.headers["Content-Type"]=f.contentType);for(name in f.headers)i.setRequestHeader(name,f.headers[name]);return f.beforeSend.call(k,i,f)===!1?(i.abort(),!1):(f.timeout>0&&(j=setTimeout(function(){i.onreadystatechange=e,i.abort(),f.error.call(k,i,"timeout")},f.timeout)),i.send(f.data),i)},a.get=function(b,c){return a.ajax({url:b,success:c})},a.post=function(b,c,d,e){return a.isFunction(c)&&(e=e||d,d=c,c=null),a.ajax({type:"POST",url:b,data:c,success:d,dataType:e})},a.getJSON=function(b,c){return a.ajax({url:b,success:c,dataType:"json"})},a.fn.load=function(b,c){if(!this.length)return this;var d=this,e=b.split(/\s/),f;return e.length>1&&(b=e[0],f=e[1]),a.get(b,function(b){d.html(f?a(document.createElement("div")).html(b).find(f).html():b),c&&c.call(d)}),this};var f=encodeURIComponent;a.param=function(a,b){var c=[];return c.add=function(a,b){this.push(f(a)+"="+f(b))},g(c,a,b),c.join("&").replace("%20","+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this),(c.attr("type")!=="radio"||c.is(":checked"))&&(c.attr("type")!=="checkbox"||!!c.is(":checked"))&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a){function d(a){return"tagName"in a?a:a.parentNode}function e(a,b,c,d){var e=Math.abs(a-b),f=Math.abs(c-d);return e<f?c-d>0?"Up":"Down":a-b>0?"Left":"Right"}function g(){b.last&&Date.now()-b.last>=f&&(a(b.target).trigger("longTap"),b={})}var b={},c,f=750;a(document).ready(function(){a(document.body).bind("touchstart",function(a){var e=Date.now(),h=e-(b.last||e);b.target=d(a.touches[0].target),c&&clearTimeout(c),b.x1=a.touches[0].pageX,b.y1=a.touches[0].pageY,h>0&&h<=250&&(b.isDoubleTap=!0),b.last=e,setTimeout(g,f)}).bind("touchmove",function(a){b.x2=a.touches[0].pageX,b.y2=a.touches[0].pageY}).bind("touchend",function(d){b.isDoubleTap?(a(b.target).trigger("doubleTap"),b={}):b.x2>0||b.y2>0?((Math.abs(b.x1-b.x2)>30||Math.abs(b.y1-b.y2)>30)&&a(b.target).trigger("swipe")&&a(b.target).trigger("swipe"+e(b.x1,b.x2,b.y1,b.y2)),b.x1=b.x2=b.y1=b.y2=b.last=0):"last"in b&&(c=setTimeout(function(){c=null,a(b.target).trigger("tap"),b={}},250))}).bind("touchcancel",function(){b={}})}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","longTap"].forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}})}(Zepto);
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */

// source: http://ejohn.org/blog/simple-javascript-inheritance/

// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();
window.system = {
    debug: true,

    env: {
    },

    constant: {
        STDIN: 0,
        STDOUT: 1,
        STDERR: 2
    }
}
/* cat.js
 *
 * Atomic OS WASH command
 *
 * Echo file contents to stdout
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.cat.!!methodName!!
 * @constructor
 */

system.bin.cat = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Echo file contents to stdout\n\n  Usage: cat [filepath]";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var path = (args instanceof Array) ? args.shift() : args;
            path = (path.match(/^\//)) ? path : system.env.cwd + '/' + path;

            var buf = system.fs.readFile(path);

            if (buf) {
                if (stdout) stdout.write(buf);

            } else {
                if (stdout) stdout.write('file "' +  path + '" not found');
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
/* cd.js
 *
 * Atomic OS WASH command
 *
 * Change Directory. Supports:
 *   ~ (home folder)
 *   - (last folder)
 *  .. (parent folder)
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.cd.!!methodName!!
 * @constructor
 */

system.bin.cd = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Change Directory\n\n  Usage: cd [path]\n\nNOTE: Supports  ~ (home folder), - (last folder), and .. (parent folder)";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var path = (args instanceof Array) ? args.shift() : args;
            var handled = false;

            // preprocess path, handle 
            if (path == '-') {               // swap current working directory with previous working directory
                var tmp = system.env.pwd;
                system.env.pwd = system.env.cwd;
                system.env.cwd = tmp;
                handled = true;

            } else if (path == '~') {
                system.env.pwd = system.env.cwd;
                system.env.cwd = system.env.home;
                handled = true;

            } else if (path.match(/\.\./)) { // path references parent container

                if (system.debug) console.warn('..: original path: ' + path);

                // start at the current working directory
                var tmppath = system.env.cwd;
                if (system.debug) console.warn('..: cwd: ' + tmppath);

                // while path references a parent directory transform the path to it's parent
                while (path.match(/\.\./)) {
                    path = path.replace(/\.\./, '');
                    var parts = tmppath.split('/');
                    parts.pop(); //FIXME: .. may not always be at beginning of path
                    tmppath = parts.join('/');
                }

                path = path.replace(/\/\//g, '/'); // if original path ends with a slash the transformed version may contain two in a row (eg ../../ => //)

                if (system.debug) {
                    console.warn('..: result: ' + tmppath);
                    console.warn('..: transformed path: ' + path);
                }

                path = (tmppath) ? (path == '/')                                        // if there was a result and path is the root
                                        ? tmppath                                       //    use the result
                                        : (path.match(/^\//)) ? tmppath + path          //    else if the path is absolute add it to our result
                                                              : tmppath + '/' + path    //                                 else use our result and make path absolute
                                 : '/';                                                 // else use the root folder
                ;

                path = path.replace(/\/$/, ''); // to be sure
                if (system.debug) console.warn('..: final path: ' + path);
            }

            // if preprocessing hasn't handled the request
            if (! handled) {
                if (! path.match(/^\//)) {              // convert relative paths to absolute
                    path = (system.env.cwd == '/') ? '/' + path : system.env.cwd + '/' + path;
                }

                if (system.fs.getFolder(path)) {        // confirm folder exists
                    system.env.pwd = system.env.cwd || '/';
                    system.env.cwd = path;

                    handled = true;
                }
            }

            // write result message to stdout
            var message = (handled) ? system.env.cwd : 'folder "' + path + '" not found';
            if (stdout) stdout.write(message);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }

        return system.env.pwd;
    }
};
/* clear.js
 *
 * Atomic OS WASH command
 *
 * Clear command console's output window
 *
 * The clear command is currently broken.  After running this command, the global wash stdout stream will no longer echo to the console window
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.clear.!!methodName!!
 * @constructor
 */

system.bin.clear = {
    help: function() {
        return "Clear command console's output window\n\n  Usage: clear\n\nNote: the clear command is currently broken.  After running this command, the global wash stdout stream will no longer echo to the console window";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            // specific to the global test console cmdWindow, see main.js
            // FIXME: the cls() method is broken, see commandwindow.js
            if (cmdWindow && cmdWindow.cls) cmdWindow.cls();

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
/* commands.js
 *
 * Atomic OS WASH command
 *
 * List available commands from /bin to stdout
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.commands.!!methodName!!
 * @constructor
 */

system.bin.commands = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "List available commands from /bin to stdout\n\n  Usage: commands";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {

            wash("ls /bin");

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* echo.js
 *
 * Atomic OS WASH command
 *
 * Echo string to stdout
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.echo.!!methodName!!
 * @constructor
 */
system.bin.echo = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */
    help: function() {
        return "Echo string to stdout\n\n  Usage: echo [string]";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */
    exec: function(args) {
        var debug = false;
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var message = (args instanceof Array) ? message = args.join(' ') : args;

            if (stdout) {
                stdout.write(message);
            } else {
                console.log(message);
            }

            // test stderr
            if (debug && stderr) throw new Error('fake error');

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* edit.js
 *
 * Atomic OS WASH command
 *
 * Edit file in File Editor
 *
 * This command is currently tied to the temporary File Editor window
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.edit.!!methodName!!
 * @constructor
 */

system.bin.edit = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Edit file in File Editor\n\n  Usage: edit [filepath]\n\nNOTE: This command is currently tied to the temporary File Editor window.";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var filepath = args[0];
            if (editWindow) {
                $('#' + editWindow.name + '-filename').val(filepath);
                editWindow.load(filepath);
            }

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* help.js
 *
 * Atomic OS WASH command
 *
 * Simple help utility
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.help.!!methodName!!
 * @constructor
 */

system.bin.help = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Simple help utility\n\n  Usage: help [command name]";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var cmd = args instanceof Array ? args[0] : 'help';

            if (system.bin[cmd]) {
                var message = 'Help not available for command "' + cmd + '"';

                if (system.bin[cmd].help) message = system.bin[cmd].help();
                if (stdout) stdout.write(message);
            }

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* ls.js
 *
 * Atomic OS WASH command
 *
 * List files
 *
 * Without a path, lists the current working directory
 * With -l, lists files in a single column
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.ls.!!methodName!!
 * @constructor
 */

system.bin.ls = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "List files\n\n  Usage: ls [-l] [path]\n\nWithout a path, lists the current working directory.\nWith -l, lists files in a single column.";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        var formatStr = function(str, len) {
            var result = str;
            while (result.length < len) {
                result += " ";
            }
            return result;
        };

        try {

            var displayType = 'wide',
                path = system.env.cwd;

            if (args instanceof Array) {
                path = args.shift();

                if (path.match(/^-l/)) {
                    displayType = 'single';
                    path = args.shift();
                    if (! path) path = system.env.cwd;
                }
            }

            var output = path + ':' + "\n";
            if (displayType == 'wide') output += "\n";

            var fspath = system.fs.getFolder(path);
            if (fspath) {
                var results = fspath.listFiles(); // pre-sorted by listFiles()

                // figure out the longest entry
                var len = 0;
                for (var i=0; i<results.length; i++) {
                    if (results[i].path.length > len) len = results[i].path.length;
                };

                var lineLength = 0;
                for (var i=0; i<results.length; i++) {
                    var result = results[i].path;
                    var file = results[i].file;

                    var postfix = (file && file.tree) ? '/' : '';

                    switch(displayType) {
                        case 'single':
                            output += '  ' + result + postfix + "\n";
                            break;

                        case 'wide':
                        default:
                            var segment = formatStr(result + postfix, len+1) + "  ";
                            if (lineLength > 60) {
                                output += "\n";
                                lineLength = 0;
                            }
                            lineLength += segment.length;
                            output += segment;
                    }
                }

                output = output.replace(/\n$/, ''); // remove trailing newline

            } else {
                output = "folder not found";
            }

            if (stdout) {
                stdout.write(output);
            } else {
                console.log(output);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
/* mkdir.js
 *
 * Atomic OS WASH command
 *
 * Make directory
 *
 * This command is currently limited to creating folders in the current directory
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.mkdir.!!methodName!!
 * @constructor
 */
system.bin.mkdir = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */
    help: function() {
        return "Make directory\n\n  Usage: mkdir [folder name]\n\nNOTE: This command is currently limited to creating folders in the current directory";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */
    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var folder = (args instanceof Array) ? args.shift() : args;
            var currentFolder = system.fs.getFolder(system.env.cwd);

            if (currentFolder) result = currentFolder.addChildFolder(folder);

            var message = (result) ? "ok, created " : "failed to create ";
            if (stdout) stdout.write(message + folder);

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* pwd.js
 *
 * Atomic OS WASH command
 *
 * Echo current working directory to stdout
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.pwd.!!methodName!!
 * @constructor
 */

system.bin.pwd = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Echo current working directory to stdout\n\n  Usage: pwd";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            if (stdout) {
                stdout.write(system.env.cwd);
            } else {
                console.log(system.env.cwd);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
/* rm.js
 *
 * Atomic OS WASH command
 *
 * Remove a file
 * 
 * This command is currently limited to removing files in the current directory
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.rm.!!methodName!!
 * @constructor
 */

system.bin.rm = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Remove a file\n\n  Usage: rm [filename]\n\nNOTE: This command is currently limited to removing files in the current directory";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var filename = (args instanceof Array) ? args.shift() : args;
            var currentFolder = system.fs.getFolder(system.env.cwd);

            if (currentFolder) result = currentFolder.removeFile(filename);

            var message = (result) ? "ok, removed " : "failed to remove ";
            if (stdout) stdout.write(message + filename);

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* rmdir.js
 *
 * Remove a directory
 *
 * This command is currently limited to removing folders in the current directory
 *
 * Atomic OS WASH command
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.rmdir.!!methodName!!
 * @constructor
 */

system.bin.rmdir = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Remove a directory\n\n  Usage: rmdir [folder name]\n\nNOTE: This command is currently limited to removing folders in the current directory";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var folder = (args instanceof Array) ? args.shift() : args;
            var currentFolder = system.fs.getFolder(system.env.cwd);

            if (currentFolder) result = currentFolder.removeChildFolder(folder);

            var message = (result) ? "ok, removed " : "failed to remove ";
            if (stdout) stdout.write(message + folder);

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* touch.js
 *
 * Atomic OS WASH command
 *
 * Create empty file
 *
 * This command is currently limited to creating files in the current directory
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.touch.!!methodName!!
 * @constructor
 */

system.bin.touch = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Create empty file\n\n  Usage: touch [file name]\n\nNOTE: This command is currently limited to creating files in the current directory";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var filename = (args instanceof Array) ? args.shift() : args;
            var folder = system.env.cwd;

            if (filename.match(/^\//)) {
                folder = filename;
                filename = system.fs.basename(folder);
            }

            var currentFolder = system.fs.getFolder(folder);
            if (currentFolder) result = currentFolder.addFile(filename);

            var message = (result) ? "ok, created " : "failed to create ";
            if (stdout) stdout.write(message + 'file "' + filename + '"');

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* wallpaper.js
 *
 * Atomic OS WASH command
 *
 * Sets the desktop wallpaper
 *
 * This command can currently only add/remove one graphic [css class="bg-tile"]
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.wallpaper.!!methodName!!
 * @constructor
 */

system.bin.wallpaper = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Sets the desktop wallpaper\n\n  Usage: wallpaper\n\nThis command can currently only add/remove one graphic [css class=\"bg-tile\"]";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            dObj   = system.fs.tree.mnt.tree.desktop;
            dName  = dObj.name;
            dEl = $('#' + dName);
            if (dEl.hasClass('bg-tile')) {
                dEl.removeClass('bg-tile');
            } else {
                dEl.addClass('bg-tile');
            }

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
/* class.js
 *
 * ++[black[Atomic OS Class: HxClass]++
 *
 * Base class for Atomic OS objects
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxClass = Class.extend({
    /* @constructor
     * @method init
     * @param {Object} opts Options dictionary
     *
     */
    init: function(opts) {
        opts = opts || {};
    }
});

/* guid.js
 *
 * ++[black[Atomic OS Class: HxGUID] **Singleton**++
 *
 * Simple GUID generator based on http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

// FIXME: no validation
window.HxGUID = (function() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    return {
        /* @method next
         * Generates a GUID. **WARNING:** Does not check if ID already in use
         * @returns {String} GUID
         */

        next: function() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
    }
})();
/* bus.js
 *
 * ++[black[Atomic OS Class: HxBus] **Singleton**++
 *
 * Primary message bus
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxBus = (function () {
    var channels = {
        "default": {
            subscriptions: {}
        }
    };

    return {
        /* @method publish
         * Publish a message and execute all subscribed callback functions
         * @param {String} msg Message being published
         * @param {Array} args Arguments to pass to subscribed callbacks
         * @param {Object} scope Context to execute callback with
         * @param {String} ch Optional channel name !!default: 'default'!!
         */

        publish: function (msg, args, scope, ch) {
            ch = (ch) ? ch : "default";

            if (! channels.hasOwnProperty(ch)) {
                console.warn('system bus: publish: "' + ch + '" is not a registered channel');
                return;
            }

            if (! channels[ch].subscriptions.hasOwnProperty(msg)) {
                console.warn('system bus: publish: "' + msg + '" is not a registered message');
                return;
            }

            args = (args) ? args : [];

            for (var i=0; i < channels[ch].subscriptions[msg].length; i++) {
                if (scope) {
                    channels[ch].subscriptions[msg][i].call(scope, args);
                } else {
                    channels[ch].subscriptions[msg][i](args);
                }
            }
        },

        /* @method subscribe
         * Add a subscription
         * @param {String} msg Message to subscribe to
         * @param {Function} fn Function to callback when message is published
         * @param {String} ch Optional channel name !!default: 'default'!!
         */

        subscribe: function (msg, fn, ch) {
            if (typeof fn !== 'function') {
                throw new Error('system bus: subscribe: fn must be a function');
            }

            ch = (ch) ? ch : "default";

            if (! channels.hasOwnProperty(ch)) {
                channels[ch] = {
                    subscriptions: {}
                };
            };

            if (! channels[ch].subscriptions[msg]) {
                channels[ch].subscriptions[msg] = new Array();
            }

            channels[ch].subscriptions[msg].push(fn);
        },

        /* @method unsubscribe
         * Remove a subscription
         * @param {String} msg Subscribed message name
         * @param {Function} fn The callback that was subscribed
         * @param {String} ch Optional channel name !!default: 'default'!!
         */

        unsubscribe: function (msg, fn, ch) {
            if (typeof fn !== 'function') {
                throw new Error('system bus: unsubscribe: fn must be a function');
            }

            ch = (ch) ? ch : "default";

            for (var i=0; i < channels[ch].subscriptions[msg].length; i++) {
                if (channels[ch].subscriptions[msg][i] === fn) {
                    channels[ch].subscriptions[msg].splice(i, 1);
                    return;
                }
            }
        }
    }
})();
/* stream.js
 *
 * ++[black[Atomic OS Class: HxStream]++
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxStream = HxClass.extend({
    /* @constructor
     * @method init
     * Extends <a href="class.html">HxClass</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        opts = opts                          || {};
        this.name = opts.name                || HxGUID.next();
        this.bus = opts.bus                  || HxBus;
        this.buffer = opts.buffer            || '';
        this.autoFlush = 'autoFlush' in opts ? opts.autoFlush : true;

        var self = this;
        this.bus.subscribe('rollcall', function() {
            console.log('stream "' + self.name + '" responding');
        });
    },

    /* @method read
     * Read and return the internal buffer.  If this stream objects' autoFlush property is set to true, internal buffer will be flushed once read.
     * @returns {String} Internal buffer
     */

    read: function() {
        var buf = this.buffer;
        if (this.autoFlush) this.flush();
        return buf;
    },

    /* @method write
     * Write characters to internal buffer, overwriting any previous contents
     * @param {String} buf Text contents to store in internal buffer
     * @returns {HxStream} Returns this stream object
     */

    write: function(buf) {
        this.buffer = buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    /* @method append
     * Write characters to internal buffer, appending to any previous contents
     * @param {String} buf Text contents to append to internal buffer
     * @returns {HxStream} Returns this stream object
     */

    append: function(buf) {
        this.buffer += buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    /* @method flush
     * Empties the internal buffer
     */

    flush: function() {
        this.buffer = '';
    }
});
/* file.js
 *
 * ++[black[Atomic OS Class: HxFile]++
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxFile = HxStream.extend({
    /* @constructor
     * @method init
     * Extends <a href="stream.html">HxStream</a>
     *
     * By default, autoFlush is false for a file. Otherwise the contents would be lost after reading.
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this._super(opts);
        this.autoFlush = false;
    }
});
/* jsfs.js
 *
 * ++[black[Atomic OS Class: HxJSFS]++
 *
 * Tree structure to contain temporary filesystem in JavaScript
 *
 * Derived from https://gist.github.com/897565
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */


var HxJSFS = HxStream.extend({
    /* @constructor
     * @method init
     * Extends <a href="stream.html">HxStream</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    /* @method traverse
     * Crawls a tree, executing a callback on each node found
     * @param {Object} obj Object to crawl
     * @param {Function} fn Function to call on each node
     * @param {Object} parent Parent node
     */

    traverse: function(obj, fn, parent) {
        for (i in obj) {
            if (typeof(obj[i]) != 'function') fn.apply(this, [i, obj[i], parent]);

            if (obj[i] instanceof HxJSFS) {
                this.traverse(obj[i].tree, fn, i);
            }
        }
    },

    /* @method getNodeRecursive
     * Search a tree of objects looking for a particular property name
     * @param {String} property Property to search for
     * @returns {Array} Returns a list of objects, containing the matched node and it's parent
     */

    getNodeRecursive: function(property) {
        var acc = [];

        this.traverse(this.tree, function(key, value, parent) {
            if (key === property) {
                acc.push({ parent: parent, value: value });
            }
        });

        return acc;
    },

    /* @method getPath
     * Get the filepath representation of a node
     * @param {String} nodeName Name of the node to search for (eg. an HxFile filename)
     * @returns {String} Returns the filepath to a node
     */

    getPath: function(nodeName) {
        var path = '/' + nodeName;

        var matches = this.getNodeRecursive(nodeName);

        if (matches.length > 0) {
            var parentNode = matches[0].parent;
            if (parentNode) path = this.getPath(parentNode) + path;
        }

        return path;
    },

    /* @method find
     * Locate a file under this filesystem
     * @param {String} nodeName Name of the node to locate
     * @returns {Array} Returns a list of potentially matching filepaths
     */

    find: function(nodeName) {
        var acc = [];
        var matches = this.getNodeRecursive(nodeName);

        for (var m in matches) {
            var parentNode = matches[m].parent;
            var path = this.getPath(parentNode) + '/' + nodeName;
            acc.push({ path: path, file: matches[m].value });
        }

        return acc;
    },

    /* @method basename
     * @param {String} path Filepath to return basename
     * @returns {String} Strips the filename from a full filepath
     */

    basename: function(path) {
        if (path.match(/\//)) {
            return path.split('/').pop();
        } else {
            return path;
        }
    },

    /* @method listFiles
     * List all files and folders that are immediate children of this node
     * @returns {Array} Returns a sorted list of files and subtrees
     */

    listFiles: function() {
        var acc = [];

        for (var child in this.tree) {
            var node = this.tree[child];
            acc.push({ path: child, file: node });
        }

        return acc.sort(function(a, b) {
            var path1 = a.path.toLowerCase(), path2 = b.path.toLowerCase();
            if (path1 < path2) return -1;
            if (path1 > path2) return 1;
            return 0;
        });
    },

    /* @method readFile
     * Read and return an HxFile's contents
     * @param {String} path Filepath to node to be read
     * @returns {String} file contents
     */

    readFile: function(path) {
        var nodeName = this.basename(path);
        var candidates = this.find(nodeName);

        for (var i=0; i < candidates.length; i++) {
            if (candidates[i].path == path) {
                return candidates[i].file.read();
            }
        }

        console.warn('file "' + path + '" not found');
        return false;
    },

    /* @method writeFile
     * @param {String} path Filepath to node to be written to
     * @param {String} buf Contents to write to an HxFile
     * @param {Bool} append Append to file if true
     * @returns {Bool} True on success
     */

    writeFile: function(path, buf, append) {
        var nodeName = this.basename(path);
        var candidates = this.find(nodeName);

        for (var i=0; i < candidates.length; i++) {
            if (candidates[i].path == path) {
                if (append) {
                    candidates[i].file.append(buf);
                } else {
                    candidates[i].file.write(buf);

                    try {
                        // update system.bin if necessary
                        if (path.match(/^\/bin\//)) {
                            // FIXME: after saving updated command, running again causes exception SyntaxError: Unexpected token (
                            var warning = 'saving to /bin not currently supported, but trying anyway...';
                            system.wash.fd[1].write(warning);

                            var binpath = 'system' + path.replace(/\//g, '.');
                            var binobj = eval(binpath); // get the exectable object
                            binobj.exec = eval(buf);    // evaluate text to create function object and assign it
                        }
                    } catch(e) {
                        system.wash.fd[1].write("sorry, it didn't work");
                    }
                }
                return true;
            }
        }

        return false;
    },

    /* @method getFolder
     * @param {String} path Filepath to desired folder
     * @returns {HxJSFS} False if not found, otherwise a JSFS object (or subclass)
     */

    getFolder: function(path) {
            if (path == '/') return system.fs;

            path = path.replace(/\/$/, ''); // trim trailing slash

            var fspath = 'system.fs',
                newpath = '',
                pathParts = path.split('/');

            // create a js path
            if (pathParts.length > 1) {
                pathParts.shift();

                for (var i=0; i<pathParts.length; i++) {
                    newpath += '.tree.' + pathParts[i];
                }
            }
            fspath += newpath;

            try {
                var o = eval(fspath);
                return o ? o : false;

            } catch(e) {
                console.warn('fs exception: fs object does not exist');
                return false;
            }
    },

    /* @method mount
     * Attach an HxJSFS (or subclass) tree to a node
     * @param {String} path Filepath to mount a filesystem onto
     * @param {HxJSFS} fs An instantiated filesystem to mount
     */

    mount: function(path, fs) {
        var subtreeName = this.basename(fs.name);
        var folder = this.getFolder(path);
        folder.tree[subtreeName] = fs;
    },

    /* @method addChildFolder
     * Creates a named subfolder
     * @param {String} name Name of subfolder
     * @returns {Bool} True on success
     */

    addChildFolder: function(name) {
        this.tree[name] = new HxJSFS({});
        return (this.tree[name] instanceof HxJSFS);
    },

    /* @method removeChildFolder
     * Remove a named subfolder
     * @param {String} name Name of subfolder to delete
     * @returns {Bool} True on success
     */

    removeChildFolder: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxJSFS) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    },

    /* @method addFile
     * Create an empty HxFile
     * @param {String} name Name of file to create
     * @returns {Bool} True on success
     */

    addFile: function(name) {
        this.tree[name] = new HxFile({
            name: name
        });
        return (this.tree[name] instanceof HxFile);
    },

    /* @method removeFile
     * Delete a named file
     * @param {String} name Name of file to delete
     * @returns {Bool} True on success
     */

    removeFile: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxFile) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    }
});
/* domfs.js
 *
 * ++[black[Atomic OS Class: HxDOMFS]++
 *
 * JavaScript tree structure to represent a filesystem in the DOM
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxDOMFS = HxJSFS.extend({
    /* @constructor
     * @method init
     * Extends <a href="jsfs.html">HxJSFS</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    /* @method addChildFolder
     * **Superclass Override**
     * Creates a named subfolder
     * @param {String} name Name of subfolder
     * @returns {Bool} True on success
     */

    addChildFolder: function(name) {
        this.tree[name] = new HxDOMFS({});
        return (this.tree[name] instanceof HxDOMFS);
    },

    /* @method addFile
     * **Superclass Override**
     * Create an empty HxFile
     * @param {String} name Name of file to create
     * @returns {Bool} True on success
     */

    addFile: function(name) {
        $('#fileroot').append('<div class="domfile"></div>');
        this.tree[name] = new HxFile({
            name: name
        });
        return (this.tree[name] instanceof HxFile);
    }
});
/* process.js
 *
 * ++[black[Atomic OS Class: HxProcess]++
 *
 * A simple object to represent a "process"
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxProcess = HxClass.extend({
    /* @constructor
     * @method init
     * Extends <a href="class.html">HxClass</a>
     *
     * Creates three streams per process: STDIN, STDOUT, and STDERR
     * @param {Object} opts Options dictionary
     */
    init: function(opts) {
        opts = opts || {};
        this.name = opts.name || HxGUID.next();

        this._super(opts);

        this.fd = [
            new HxStream({}),
            new HxStream({}),
            new HxStream({})
        ];
    }
});

/* wash.js
 *
 * ++[black[Atomic OS Class: HxWASH]++
 *
 * WASH (Web Application SHell)
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxWash = HxProcess.extend({
    /* @constructor
     * @method init
     * Extends <a href="process.html">HxProcess</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        opts = opts || {};

        this._super(opts);

        var self   = this,
            stdin  = this.fd[0].name,
            stdout = this.fd[1].name,
            stderr = this.fd[2].name;

        this.fd[0].bus.subscribe(stdin  + ':ondata', this.onInput);
        this.fd[1].bus.subscribe(stdout + ':ondata', this.onOutput);
        this.fd[2].bus.subscribe(stderr + ':ondata', this.onError);
    },

    /* @method exec
     * Executes a command
     * @param {String} command The command line to execute
     */

    exec: function(command) {
        var args = command.match(' ') ? command.split(' ') : command;

        try {
            var cmdName = args instanceof Array ? args.shift() : command
                basename = system.fs.basename(cmdName),
                cmdObj = null;

            if (system.bin[basename]) {
                cmdObj = eval( system.bin[basename] );

            } else {
                var notFound = 'command not found';

                this.fd[1].write(notFound);
                console.warn(notFound);
            }

            if (cmdObj) cmdObj.exec.call(this, args);

        } catch(e) {
            console.warn("WASH Exception:");
            console.dir(e);
        }
    },

    /* @method onInput
     * Callback to execute when data is placed on STDIN
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onInput: function(args) {
//        this.exec( this.fd[0].read() );

        //FIXME: 'this' is an empty object
        //
        //       How do we set the scope to wash instance
        //       (We don't want to reference system.wash...)

        var buf = system.wash.fd[0].read();
        system.wash.exec(buf);
    },

    /* @method onOutput
     * Callback to execute when data is written to STDOUT
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onOutput: function(args) {
        //FIXME: How do we set the scope to *this* wash instance
        //       (...and want to route messages to linked processes)

        var buf = system.wash.fd[1].read();
        console.log(buf);
    },

    /* @method onError
     * Callback to execute when data is written to STDERR
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onError: function(args) {
        //FIXME: How do we set the scope to *this* wash instance

        var buf = system.wash.fd[2].read();
        console.warn(buf);
    }
});

/* panel.js
 *
 * ++[black[Atomic OS Class: HxPanel++]
 *
 * HxJSFS-based, mountable UI widget
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxPanel = HxJSFS.extend({
    /* @constructor
     * @method init
     * Extends <a href="jsfs.html">HxJSFS</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this._super(opts);

        this.toggleState = (opts && opts.toggled)  ? opts.toggled  : true;
        this.name        = (opts && opts.name)     ? opts.name     : HxGUID.next();
        this.parentEl    = (opts && opts.parentEl) ? opts.parentEl : 'winroot';
        this.bus         = (opts && opts.bus)      ? opts.bus      : HxBus;
        this.mountPoint  = (opts && opts.mount)    ? opts.mount    : null;

        //FIXME: convert this nodes name to something the DOM can use
        if (this.name.match(/\//)) {
            this.name = system.fs.basename(this.name); 
        }

        var html = '<div id="' + this.name + '" class="ui-panel"></div>';

//        console.warn('attaching panel ' + this.name + ' to ' + this.parentEl);

        $('#' + this.parentEl).append(html);
        this.hxpanel = $('#' + this.name);

        if (opts && opts.className) { this.hxpanel.addClass(opts.className); }
        if (opts && opts.css)   { this.hxpanel.css(opts.css); }

        if (this.mountPoint) {
            system.fs.mount(this.mountPoint, this);
        }
    },

    /* @method get
     * Get a Zepto object for this panels' DOM element
     * @returns {Object} Returns the jQuery-compatible container for this panel
     */

    get: function() {
        return this.hxpanel
    },

    /* @method getName
     * Get the name for this panel
     * @returns {String} DOM element ID
     */

    getName: function() {
        return this.name;
    },

    /* @method moveTo
     * Move this panel to a new location on the screen
     * @param {Integer} x The left co-ordinate to position the panel at
     * @param {Integer} y The top co-ordinate to position the panel at
     */

    moveTo: function(x,y) {
        this.hxpanel.css({ top: y, left: x });
    },

    /* @method resizeTo
     * Resize this panel (using CSS right/bottom rules, not width/height)
     * @param {Integer} x2 The right co-oridinate for this panel
     * @param {Integer} y2 The bottom co-ordinate for this panel
     */

    resizeTo: function(x2,y2) {
        this.hxpanel.css({ right: x2, bottom: y2 });
    },

    /* @method toggle
     * Show or hide this panel
     * @returns {Bool} Returns the toggled state of this panel
     */

    toggle: function() {
        toggleState = (toggleState) ? false : true;
        this.hxpanel.fadeToggle();

        return toggleState;
    }
});

/* window.js
 *
 * ++[black[Atomic OS Class: HxWindow]++
 *
 * Mountable UI Window
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxWindow = HxPanel.extend({
    /* @constructor
     * @method init
     * Extends <a href="panel.html">HxPanel</a>
     *
     * When attaching to an HxProcess, be sure to connect handlers to your STD* streams
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        opts = opts || {};

        if (opts.defaultStyle) {
            opts.css = opts.css || {};
            opts.css.position = 'absolute';
            opts.css.backgroundColor = '#ccc';
            opts.css.border = '2px outset #eee';
        }

        this._super(opts);

        this.title = opts.title || 'Window ' + this.name;

        this.inputHandler  = opts.inputHandler  || function() {};
        this.outputHandler = opts.outputHandler || function() {};
        this.errorHandler  = opts.errorHandler  || function() {};

        var ui = "<div id='" + this.name + "-titlebar' class='titlebar'>" + this.title + "</div><div id='" + this.name + "-content'></div>";

        this.get().append(ui);
    },

    /* @method getTitlebar
     * Get a Zepto object for the DOM element representing this windows' titlebar
     * @returns {Object} Returns a jQuery-compatible container for the titlebar
     */

    getTitlebar: function() {
        return $('#' + this.name + '-titlebar');
    },

    /* @method getContent
     * Get a Zepto object for the DOM element representing this windows' main content area
     * @returns {Object} Returns a jQuery-compatible container for the content area
     */

    getContent: function() {
        return $('#' + this.name + '-content');
    }
});

var HxCommandWindow = HxWindow.extend({
    init: function(opts) {
        opts = opts || {};
        this._super(opts);

        this.history = [];
        this.historyPtr = this.history.length;

// note: text inputs and textareas positioned with top,left,right,bottom work fine in webkit, but won't show correctly in Firefox
//       (eg. per docs: <https://developer.mozilla.org/en/CSS/position>)
//
//       fixed by enclosing in div's, positioning those and then expanding the text inputs/areas using %-based widths/heights
//       see <http://snook.ca/archives/html_and_css/absolute-position-textarea> for more info

        var output = "<div id='" + this.name + "-h-output'><textarea id='" + this.name + "-output' class='rounded'>Welcome to WASH, the Web Application SHell\n</textarea></div>";

        var input = "<span id='" + this.name + "-prompt'>" + system.env.cwd + " $ </span>" + 
                    "<div id='" + this.name + "-h-input'><input id='" + this.name + "-input' type='text' /></div>" +
                    "<button id='" + this.name + "-btn'>ENTER</button>";

        var ui = output + input;
        this.getContent().append(ui);

        var self = this;

        var hOutput = $('#' + this.name + '-h-output');
        var txtOutput = $('#' + this.name + '-output');
        hOutput.css({
            display: 'block',
            position: 'absolute',
            top: '30px',
            left: '2px',
            right: '2px',
            bottom: '32px'
        });
        txtOutput.css({
            width: '99%',
            height: '99%',
            color: '#888',
            fontFamily: 'Courier',
            fontSize: '15px'
        });

        var promptLabel = $('#' + this.name + '-prompt');
        promptLabel.css({
            display: 'inline-block',
            position: 'absolute',
            bottom: '5px',
            left: '0px',
            width: '20%',
            textAlign: 'right',
            overflow: 'hidden',
            backgroundColor: '#fff',
            height: '20px',
            border: '0px solid #000'
        });
        promptLabel.click(function() {
            $('#' + self.name + '-input').focus();
        });

        var btnExecute = $('#' + this.name + '-btn');
        btnExecute.css({
            position: 'absolute',
            bottom: '4px',
            right: '10px'
        }).addClass('ui-btn disabled');

        btnExecute.click(function() {
            self.exec.call(self);
        });

        var hInput = $('#' + this.name + '-h-input');
        var txtInput = $('#' + this.name + '-input');
        hInput.css({
            position: 'absolute',
            height: 20,
            bottom: 5,
            left: '20%',
            right: 80,
            margin: 0,
            padding: 0
        });
        txtInput.css({
            width: '99%',
            height: 18,
            outline: 'none',
            border: '0px solid #000',
            margin: '0px',
            paddingLeft: '0.25em'
        });

        txtInput.keyup(function(evt) {
            //if ($('#' + self.name + '-btn').hasClass('disabled')) {
            //$('#' + self.name + '-btn').removeClass('disabled')
            //$('#' + self.name + '-btn').addClass('disabled')

            if (this.value.length > 0) {
                $('#' + self.name + '-btn').removeClass('disabled')
            } else {
                $('#' + self.name + '-btn').addClass('disabled')
            }

            switch (evt.keyCode) {
                case 13: // ENTER key
                    $('#' + self.name + '-btn').trigger('click');
                    break;

                case 38: // UP key
                    if (self.historyPtr > 0) self.historyPtr--;
                    $('#' + self.name + '-input').val(self.history[self.historyPtr]);
                    break;

                case 40: // DOWN key
                    var cmdString = '';

                    if (self.historyPtr < self.history.length) {
                        self.historyPtr++;
                        cmdString = self.history[self.historyPtr];

                    } else {
                        cmdString = '';
                    }

                    $('#' + self.name + '-input').val(cmdString);
                    break;

                default:
//                    console.log(evt.keyCode);
            };
        });

        txtInput[0].focus();
    },

    exec: function(evt) {
        var input = $('#' + this.name + '-input');
        var cmdString = input.val();
        input.val('');

        this.history.push(cmdString);               // push onto command history
        system.wash.fd[1].write("\n" + system.env.cwd + "$ " + cmdString);  // echo to stdout
        system.wash.fd[0].write(cmdString);         // write to stdin so global wash will execute it

        input[0].focus();
        this.historyPtr = this.history.length;

        var promptStr = system.env.cwd + ' $';
        $('#' + this.name + '-prompt').html(promptStr);
    },

    cls: function() {
        $('#' + this.name + '-output').val('');     //FIXME after clearing, all output stops... why?
    }
});

var HxEditWindow = HxWindow.extend({
    init: function(opts) {
        opts = opts || {};
        this._super(opts);

        this.history = [];
        this.historyPtr = this.history.length;

// note: text inputs and textareas positioned with top,left,right,bottom work fine in webkit, but won't show correctly in Firefox
//       (eg. per docs: <https://developer.mozilla.org/en/CSS/position>)
//
//       fixed by enclosing in div's, positioning those and then expanding the text inputs/areas using %-based widths/heights
//       see <http://snook.ca/archives/html_and_css/absolute-position-textarea> for more info

        var output = "<div id='" + this.name + "-h-editor'><textarea id='" + this.name + "-editor' class='rounded'></textarea></div>" +
                     "<span id='" + this.name + "-status' class='statusbar rounded'></span>";

        var input = "<span style='position: absolute; top: 37px; left: 215px; font-size: 14px; font-family: verdana;'>Filename:</span><div id='" + this.name + "-h-filename'><input id='" + this.name + "-filename' type='text' /></div>" +
                    "<button id='" + this.name + "-btnnew'  class='ui-btn' style='position: absolute; top: 35px; left: 10px;'>NEW</button>" +
                    "<button id='" + this.name + "-btnload' class='ui-btn disabled' style='position: absolute; top: 35px; left: 80px;'>LOAD</button>" + 
                    "<button id='" + this.name + "-btnsave' class='ui-btn disabled' style='position: absolute; top: 35px; left: 150px;'>SAVE</button>";

        var ui = output + input;
        this.getContent().append(ui);

        var self = this;

        var hEditor = $('#' + this.name + '-h-editor').css({
            position: 'absolute',
            top: 65,
            left: 2,
            right: 0,
            bottom: 32
        });
        var txtEditor = $('#' + this.name + '-editor').css({
            width: '99%',
            height: '99%'
        });

        var btnNew = $('#' + this.name + '-btnnew');
        btnNew.click(function() {
            $('#' + self.name + '-filename').val('');
            $('#' + self.name + '-editor').val('');
            $('#' + self.name + '-btnload').addClass('disabled');
            $('#' + self.name + '-btnsave').addClass('disabled');
            self.notify('File buffer cleared.');
        });

        var btnLoad = $('#' + this.name + '-btnload');
        btnLoad.click(function() {
            self.load();
        });

        var btnSave = $('#' + this.name + '-btnsave');
        btnSave.click(function() {
            self.save();
        });

        var hFilename = $('#' + this.name + '-h-filename');
        hFilename.css({
            position: 'absolute',
            height: 20,
            top: 35,
            left: 290,
            right: 5
        });

        var txtFilename = $('#' + this.name + '-filename');
        txtFilename.css({
            width: '99%'
        }).addClass('rounded');

        txtFilename.keyup(function(evt) {
            if (this.value.length > 0) {
                $('#' + self.name + '-btnload').removeClass('disabled');
                $('#' + self.name + '-btnsave').removeClass('disabled');
            } else {
                $('#' + self.name + '-btnload').addClass('disabled');
                $('#' + self.name + '-btnsave').addClass('disabled');
            }

            switch (evt.keyCode) {
                case 13: // ENTER key
                    if (! $('#' + self.name + '-btnsave').hasClass('disabled')) {
                        $('#' + self.name + '-btnload').trigger('click');
                        $('#' + self.name + '-editor').focus();
                    }
                    break;

                case 38: // UP key
                    if (self.historyPtr > 0) self.historyPtr--;
                    $('#' + self.name + '-filename').val(self.history[self.historyPtr]);
                    break;

                case 40: // DOWN key
                    var cmdString = '';

                    if (self.historyPtr < self.history.length) {
                        self.historyPtr++;
                        cmdString = self.history[self.historyPtr];

                    } else {
                        cmdString = '';
                    }

                    $('#' + self.name + '-filename').val(cmdString);
                    break;

                default:
//                    console.log(evt.keyCode);
            };
        });
    },

    load: function() {
        var input = $('#' + this.name + '-filename');
        var filename = input.val();

        this.history.push(filename);
        var buf = system.fs.readFile(filename);

        if (buf) {
            $('#' + this.name + '-editor').val(buf);
            $('#' + this.name + '-btnsave').removeClass('disabled');
            input[0].focus();
            this.historyPtr = this.history.length;
            this.notify('File "' + filename + '" loaded.');

        } else {
            this.notify('File "' + filename + '" not found.');
        }


    },

    save: function() {
        var input = $('#' + this.name + '-filename');
        var filename = input.val();

        var buf = $('#' + this.name + '-editor').val();
        system.fs.writeFile(filename, buf);

        var verify = system.fs.readFile(filename);
        if (buf == verify) {
            this.notify('File "' + filename + '" saved.');
        }
    },

    cls: function() {
        $('#' + this.name + '-editor').val('');
    },

    notify: function(msg) {
        var statusbar = $('#' + this.name + '-status');
        statusbar.html(msg);

        setTimeout(function() {
            statusbar.html('');
        }, 2000);
    }
});

var HxDocWindow = HxWindow.extend({
    init: function(opts) {
        opts = opts || {};
        this._super(opts);

        var ui = "<div id='" + this.name + "-h-iframe'><iframe id='" + this.name + "-iframe' class='rounded' src='scripts/docs/index.html'></iframe></div>";
        this.getContent().append(ui);

        var self = this;

        var hIframe = $('#' + this.name + '-h-iframe').css({
            position: 'absolute',
            top: 35,
            left: 15,
            right: 0,
            bottom: 15
        });

        var iFrame = $('#' + this.name + '-iframe').css({
            width: '99%',
            height: '99%'
        });
    }
});

$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');

    // system setup (use system.js to configure)
    window.system = window.system || {};
    if (! system.bus) system.bus = HxBus;


    // environment setup
    system.env = {
        home:'/home/guest',
        cwd: '/home/guest',
        pwd: '/',
        mobile: (navigator.userAgent.match(/mobile/i) ||
                 navigator.userAgent.match(/fennec/i)) ? true : false
    };


    // command interpreter setup (init process will load here instead of wash)
    system.wash = new HxWash();
    window.wash = function(args) { system.wash.exec.call(system.wash, args); };


    // create filesystem
    system.fs = new HxJSFS({
        name: '/',
        tree: {
            etc: new HxJSFS({
                name: '/etc',
                tree: {
                    motd: new HxFile({
                        name: '/etc/motd',
                        buffer: 'Welcome to Atomic OS 2'
                    })
                }
            }),

            home: new HxJSFS({
                name: '/home',
                tree: {
                    guest: new HxJSFS({
                        name: '/home/guest',
                        tree: {
                            readme: new HxFile({
                                name: '/home/guest/readme',
                                buffer: 'Lorem ipsum and all that jazz.'
                            }),

                            data: new HxJSFS({
                                name: '/home/guest/data',
                                tree: {
                                    readme: new HxFile({
                                        name: '/home/guest/data/settings',
                                        buffer: "# Sample config"
                                    })
                                }
                            })
                        }
                    })
                }
            }),

            mnt: new HxJSFS({
                name: '/mnt',
                tree: {}
            })
        }
    });


    // build /bin from command objects
    var binfs = new HxJSFS({
        name: '/bin',
        tree: {}
    });

    for (var cmd in system.bin) {
        binfs.tree[cmd] = new HxFile({
            name: '/bin/' + cmd,
            buffer: system.bin[cmd].exec.toString()
        });
    }

    system.fs.mount("/", binfs);


    // build /mnt/dom from dom objects
    var domfs = new HxDOMFS({
        name: '/mnt/dom',
        tree: {}
    });

    var divList = $('.domfile');
    
    for (var div=0; div < divList.length; div++) {
        var name = '/mnt/dom/';
        var id = divList[div].id;
            id = '/' + id.replace(/-/g, '/'); // make filepath
        var basename = system.fs.basename(id);

        if (id) {
            name = id;
        } else {
            name += div;
        }

        domfs.tree[basename] = new HxFile({
            name: name,
            buffer: divList[div].textContent
        });
    }

    system.fs.mount("/mnt", domfs);


    // add a desktop mount and attach panels
    //FIXME: need to improve name support, see panel.js

    var desktopfs = new HxPanel({
        name: '/mnt/desktop',
        css: {
               position: 'absolute',
                    top: 0,
                   left: 0,
                  right: 0,
                 bottom: 0,
                 border: '0px solid #000',
        backgroundColor: 'rgba(127,192,127,0.9)',
           borderRadius: '0px',
        mozBorderRadius: '0px'
        },

        tree: {}
    });

    system.fs.mount("/mnt", desktopfs);

    $('#desktop').append('<div class="taskbar"></div>');


    // prevent global wash from flushing stdout on read so we can mirror it to the command window's output
    system.wash.fd[1].autoFlush = false;

    // window test - this needs to break out into a webtty process which should contain it's on HxWASH interpreter
    var left = '1%',
        width = '48%';

    if (system.env.mobile) {
        left = '1%';
        width = '98%';
    }

    window.cmdWindow = new HxCommandWindow({
        parentEl: 'desktop',
        mount: '/mnt/desktop',
        title: 'Command Console',
        defaultStyle: false, // use system chrome [absolute positioning, gray background & outset border: see HxWindow.init()]
        css: { top: '40px', left: left, width: width, bottom: '3%', position: 'absolute', backgroundColor: '#fff', border: '2px outset #ddd' },

        inputHandler: function(buf) {
            system.wash.fd[0].write(buf);
        },

        outputHandler: function() {
            var buf = system.wash.fd[1].read() + "\n";
            var output = $('#' + cmdWindow.name + '-output');
            output.append(buf);
            output[0].scrollTop = output[0].scrollHeight;
        },

        errorHandler: function() {
        }
    });

    // tie global wash's stdout to cmdWindow output
    var stdout = system.wash.fd[1];
    stdout.bus.subscribe(stdout.name + ':ondata', cmdWindow.outputHandler);

    // add a taskbutton
    $('.taskbar').append('<button id="cmdwin-taskbtn" class="ui-btn-pressed">Console</button>');
    $('#cmdwin-taskbtn').click(function() {
        $('#' + cmdWindow.name).toggle('hide');
        this.className = (this.className.match(/ui-btn-pressed/)) ? 'ui-btn' : 'ui-btn-pressed';
    });

    var right = left; // mirror cmdWindow left position
    window.editWindow = new HxEditWindow({
        parentEl: 'desktop',
        mount: '/mnt/desktop',
        title: 'File Editor',
        defaultStyle: true,
        css: { top: '40px', right: right, width: width, bottom: '3%' },

        intputHandler: function(buf) {
        },

        outputHandler: function() {
        },

        errorHandler: function() {
        }
    });

    // add a taskbutton
    $('.taskbar').append('<button id="editwin-taskbtn" class="ui-btn-pressed">Editor</button>');
    $('#editwin-taskbtn').click(function() {
        $('#' + editWindow.name).toggle('hide');
        this.className = (this.className.match(/ui-btn-pressed/)) ? 'ui-btn' : 'ui-btn-pressed';
    });

    window.docWindow = new HxDocWindow({
        parentEl: 'desktop',
        mount: '/mnt/desktop',
        title: 'Documentation',
        defaultStyle: true,
        css: {
            top: 40,
            left: 0,
            right: 0,
            bottom: '3%'
        }
    });

    // add a taskbutton
    $('.taskbar').append('<button id="docwin-taskbtn" class="ui-btn-pressed">Docs</button>');
    $('#docwin-taskbtn').click(function() {
        $('#' + docWindow.name).toggle('hide');
        this.className = (this.className.match(/ui-btn-pressed/)) ? 'ui-btn' : 'ui-btn-pressed';
    });

    $('#editwin-taskbtn')[0].click();
    $('#docwin-taskbtn')[0].click();

    wash("cat /mnt/dom/motd");
});
