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
    env: {
    },

    constant: {
        STDIN: 0,
        STDOUT: 1,
        STDERR: 2
    }
}
window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cat = {
    exec: function(args) {
        try {
            var path = (args instanceof Array) ? args.shift() : args;
            console.log(system.fs.readFile(path));

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cd = {
    exec: function(args) {
        try {
            var path = (args instanceof Array) ? args.shift() : args;

            if (path == '-') {
                var tmp = system.env.pwd;
                system.env.pwd = system.env.cwd;
                system.env.cwd = tmp;

            } else {
                system.env.pwd = system.env.cwd || '/';
                system.env.cwd = path;
            }

            console.log(system.env.cwd);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }

        return system.env.pwd;
    }
};
window.system = window.system || {};
system.bin = system.bin || {};

system.bin.echo = {
    exec: function(args) {
        // 'this' is the calling process, eg:
        // console.log('process ' + this.name + ' executing);
        var stdin =  (this.fd) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var message = (args instanceof Array) ? message = args.join(' ') : args;
            if (stdout) stdout.write(message);

            // test stderr
            if (stderr) throw new Error('fake error');

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
window.system = window.system || {};
system.bin = system.bin || {};

system.bin.ls = {
    exec: function(args) {
        try {
            var path = (args instanceof Array) ? args.shift() : args;
            if (! path && system.env && system.env.cwd) path = system.env.cwd;

            console.log(path + ':');

            var fspath = system.fs.getFolder(path);
            if (fspath) {
                var results = fspath.listFiles(); // pre-sorted by listFiles()

                for (var i=0; i<results.length; i++) {
                    var result = results[i].path;
                    var file = results[i].file;

                    var postfix = (file && file.tree) ? '/' : '';
                    console.log( '  ' + result + postfix );
                }
            } else {
                console.warn("folder not found");
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
window.system = window.system || {};
system.bin = system.bin || {};

system.bin.pwd = {
    exec: function(args) {
        try {
            console.log(system.env.cwd);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
var HxClass = Class.extend({
    init: function(opts) {
        opts = opts || {};
    }
});

// Derived from http://aymanh.com/9-javascript-tips-you-may-not-know

function HxAssertException(message) { this.message = message; }

HxAssertException.prototype.toString = function() {
    return 'HxAssertException: ' + this.message;
}

window.assert = function(exp, message, echoOnly) {
    if (! exp) {
        var exception = new HxAssertException(message);

        if (echoOnly) {
            console.warn(exception.toString());

        } else {
            throw exception;
        }
    }
}

window.assertNot = function(exp, message, echoOnly) {
    if (exp) {
        var exception = new HxAssertException(message);

        if (echoOnly) {
            console.warn(exception.toString());

        } else {
            throw exception;
        }
    }
}
// source: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
// FIXME: no validation
window.HxGUID = (function() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    return {
        next: function() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
    }
})();
var HxBus = (function () {
    var channels = {
        "default": {
            subscriptions: {}
        }
    };

    return {
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
var HxStream = HxClass.extend({
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

    read: function() {
        var buf = this.buffer;
        if (this.autoFlush) this.flush();
        return buf;
    },

    write: function(buf) {
        this.buffer = buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    append: function(buf) {
        this.buffer += buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    flush: function() {
        this.buffer = '';
    }
});
var HxFile = HxStream.extend({
    init: function(opts) {
        this._super(opts);
        this.autoFlush = false;
    }
});
// derived from https://gist.github.com/897565

var HxJSFS = HxStream.extend({
    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    traverse: function(obj, func, parent) {
        for (i in obj) {
            if (typeof(obj[i]) != 'function') func.apply(this, [i, obj[i], parent]);

            if (obj[i] instanceof HxJSFS) {
                this.traverse(obj[i].tree, func, i);
            }
        }
    },

    getNodeRecursive: function(property) {
        var acc = [];

        this.traverse(this.tree, function(key, value, parent) {
            if (key === property) {
                acc.push({ parent: parent, value: value });
            }
        });

        return acc;
    },

    getPath: function(nodeName) {
        var path = '/' + nodeName;

        var matches = this.getNodeRecursive(nodeName);

        if (matches.length > 0) {
            var parentNode = matches[0].parent;
            if (parentNode) path = this.getPath(parentNode) + path;
        }

        return path;
    },

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

    basename: function(path) {
        return path.split('/').pop();
    },

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

    readFile: function(path) {
        var nodeName = this.basename(path);
        var candidates = this.find(nodeName);

        for (var i=0; i < candidates.length; i++) {
            if (candidates[i].path == path) {
                return candidates[i].file.read();
            }
        }

        console.warn("file not found");
    },

    writeFile: function(path, buf, append) {
        var nodeName = this.basename(path);
        var candidates = this.find(nodeName);

        for (var i=0; i < candidates.length; i++) {
            if (candidates[i].path == path) {
                if (append) {
                    candidates[i].file.append(buf);
                } else {
                    candidates[i].file.write(buf);
                }
                return true;
            }
        }

        return false;
    },

    getFolder: function(path) {
            if (path == '/') return system.fs;

            path = path.replace(/\/$/, '');

            var pathParts = path.split('/');

            if (pathParts.length > 1) {
                pathParts.shift();

                var fspath = "system.fs";
                var newpath = '';

                for (var i=0; i<pathParts.length; i++) {
                    newpath += '.tree.' + pathParts[i];
                }
            }

            fspath += newpath;
            var o = eval(fspath);

            return o ? o : false;
    },

    mount: function(path, fs) {
        var subtreeName = this.basename(fs.name);
        var folder = this.getFolder(path);
        folder.tree[subtreeName] = fs;
    }
});
var HxProcess = HxClass.extend({
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

var HxWash = HxProcess.extend({
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

    exec: function(command) {
        var args = command.match(' ') ? command.split(' ') : [command];

        try {
            var cmdName = args.shift(),
                basename = system.fs.basename(cmdName),
                cmdObj = eval( system.bin[basename] );

            cmdObj.exec.call(this, args);

        } catch(e) {
            console.warn("WASH Exception:");
            console.dir(e);
        }
    },

    onInput: function(args) {
        console.log('wash process received data on stdin');

//        this.exec( this.fd[0].read() );

        //FIXME: 'this' is an empty object
        //
        //       How do we set the scope to wash instance
        //       (We don't want to reference system.wash...)

        var buf = system.wash.fd[0].read();
        system.wash.exec(buf);
    },

    onOutput: function(args) {
        console.log('wash process sent data on stdout');

        //FIXME: How do we set the scope to *this* wash instance
        //       (...and want to route messages to linked processes)

        var buf = system.wash.fd[1].read();
        console.log('output: ' + buf);
    },

    onError: function(args) {
        //FIXME: How do we set the scope to *this* wash instance

        var buf = system.wash.fd[2].read();
        console.log('error: ' + buf);
    }
});

var HxPanel = HxJSFS.extend({
    init: function(opts) {
        this._super(opts);

        this.toggleState = (opts && opts.toggled)  ? opts.toggled  : true;
        this.name        = (opts && opts.name)     ? opts.name     : HxGUID.next();
        this.parentEl    = (opts && opts.parentEl) ? opts.parentEl : 'winroot';
        this.bus         = (opts && opts.bus)      ? opts.bus      : HxBus;

        //FIXME: convert this nodes name to something the DOM can use
        if (this.name.match(/\//)) {
            this.name = system.fs.basename(this.name); 
        }

        var html = '<div id="' + this.name + '" class="HxPanel"></div>';

        console.warn('attaching panel ' + this.name + ' to ' + this.parentEl);

        $('#' + this.parentEl).append(html);
        this.hxpanel = $('#' + this.name);

        if (opts && opts.class) { this.hxpanel.addClass(opts.class); }
        if (opts && opts.css)   { this.hxpanel.css(opts.css); }
    },

    get: function() { return this.hxpanel },

    getName: function() { return this.name; },

    moveTo: function(x,y) { this.hxpanel.css({ top: y, left: x }); },

    resizeTo: function(x2,y2) { this.hxpanel.css({ right: x2, bottom: y2 }); },

    toggle: function() {
        toggleState = (toggleState) ? false : true;
        this.hxpanel.fadeToggle();

        return toggleState;
    }
});

var HxTest = function(plan) {
    this.plan = plan || [];
    this.assertCounter = 0;

    this.run = function() {
        for (var i=0; i < this.plan.length; i++) {
            this.plan[i] = this.plan[i].replace(/^assert/, 'this.assert');
            eval( this.plan[i] );
        }
    }

    this.assert = function(caption, value, expected) {
        var header = ++this.assertCounter + '/' + this.plan.length + ' ';
        header += !expected ? '[SKIP]' : (value == expected) ? '[PASS]' : '[FAIL]';

        var msg = header + ' ' + caption + ': "' + value + '"';
        msg += (header.match(/\[FAIL\]/)) ? ', expected: "' + expected + '"' : '';

        console.log(msg);
    };

    this.assertNotEqual = function(caption, value, expected) {
        var header = ++this.assertCounter + '/' + this.plan.length + ' ';
        header += !expected ? '[SKIP]' : (value != expected) ? '[PASS]' : '[FAIL]';

        var msg = header + ' ' + caption + ': "' + value + '"';
        msg += (header.match(/\[FAIL\]/)) ? ', NOT expected: "' + expected + '"' : '';

        console.log(msg);
    };

    return this;
};
$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');

    window.system = window.system || {};
    if (! system.bus) system.bus = HxBus;

    // stream tests
    window.streams = [],

    console.log('creating example stdin stream (autoFlush: true)');
    streams.push(new HxStream({ name: 'stdin (test)', buffer: 'test 1' }));
    HxBus.subscribe(streams[0].name + ':ondata', function() {
        console.log('system: ' + streams[0].name + ' was modified');
    });

    console.log('creating example stdout stream (autoFlush: false)');
    streams.push(new HxStream({ name: 'stdout (test)', buffer: 'test 2', autoFlush: false }));
    HxBus.subscribe(streams[1].name + ':ondata', function() {
        console.log('system: ' + streams[1].name + ' was modified');
    });

    // build default filesystem
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

    // add a /usr
    var usrfs = new HxJSFS({
        name: '/usr',
        tree: {
            local: new HxJSFS({
                name: '/usr/local',
                tree: {
                    readme: new HxFile({
                        name: '/usr/local/readme',
                        buffer: "Lorem ipsum and all that jazz."
                    })
                }
            })
        }
    });

    system.fs.mount("/", usrfs);

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

    // fs search test
    var nodeName = 'readme';
    console.log('searching for node "' + nodeName + '"');
    var results = system.fs.find(nodeName);
    for (var i=0; i < results.length; i++) {
        console.log('  found: ' + results[i].path);
    }

    // read/write fs test
    console.log('write test (with notification)');
    system.bus.subscribe('/etc/motd:ondata', function(len) {
        console.log('system: /etc/motd was modified (buffer size: ' + len +')');
    });
    system.fs.writeFile('/etc/motd', "This is the MOTD: We're close to a console now");

    // environment
    system.env = {
        cwd: '/',
        pwd: '/'
    };

    // command interpreter test
    system.wash = new HxWash();
    window.wash = system.wash.exec;

    wash('echo [NOTE] Going to cat the message of the day...');
    wash('cat /etc/motd');
    wash('echo [NOTE] FS root:');
    wash('ls');
    wash('echo [NOTE] Change to home directory');
    wash('cd /home/guest');
    wash('ls');

    // add desktop, then attach panels
    //FIXME: need to improve name support, see panel.js

    var desktopfs = new HxPanel({
        name: '/mnt/desktop',
        css: {
            position: 'absolute',
                 top: 0,
                left: 0,
               right: 0,
              bottom: 0
        },

        tree: {}
    });

    system.fs.mount("/mnt", desktopfs);

    var panels = {
        panel1: new HxPanel({
            parentEl: 'desktop', // basename for /mnt/desktop (see FIXME note)
            css: {
                   position: 'absolute',
                        top: 100,
                       left: 100,
                      right: 100,
                     bottom: 100,
                     border: '2px outset #eee',
            backgroundColor: '#ccc'
            }
        }),

        panel2: new HxPanel({
            parentEl: 'desktop', // basename for /mnt/desktop (see FIXME note)
            css: {
                   position: 'absolute',
                        top: 50,
                       left: 250,
                      width: 400,
                     height: 200,
                     border: '2px outset #eee',
            backgroundColor: '#ccc'
            }
        })
    }

    system.fs.tree.mnt.tree = panels;
});
