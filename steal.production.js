/*
 *  steal v0.1.0
 *  
 *  Copyright (c) 2014 Bitovi; Licensed MIT
 */
/*
 *  ES6 Promises shim from when.js, Copyright (c) 2010-2014 Brian Cavalier, John Hann, MIT License
 */
!function(a){function b(a){for(var b=0;b<a.length;b++)[].lastIndexOf.call(a,a[b])!=b&&a.splice(b--,1);return a}var c=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},d=function(a,b){var c,d;if("number"==typeof a.length&&a.length-1 in a)for(c=0,d=a.length;d>c;c++)b.call(a[c],a[c],c,a);else for(c in a)a.hasOwnProperty(c)&&b.call(a[c],a[c],c,a);return a},e=function(a){return"string"==typeof a},f=function(a,b){return d(b,function(b,c){a[c]=b}),a},g=function(a){var b=a.lastIndexOf("/");return-1!==b?a.substr(0,b):a},h=function(a){return a[a.length-1]},i=function(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null},j=function(a,b){function c(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return b=i(b||""),a=i(a||""),b&&a?(b.protocol||a.protocol)+(b.protocol||b.authority?b.authority:a.authority)+c(b.protocol||b.authority||"/"===b.pathname.charAt(0)?b.pathname:b.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+b.pathname:a.pathname)+(b.protocol||b.authority||b.pathname?b.search:b.search||a.search)+b.hash:null},k=function(a){var b=a.lastIndexOf("/"),c=(-1==b?a:a.substr(b+1)).match(/^[\w-\s\.]+/);return c?c[0]:""},l=function(a){var b=k(a),c=b.lastIndexOf(".");return-1!==c?b.substr(c+1):""},m={},n=function(a){var b=a.lastIndexOf("!"),c="";if(-1!=b){var d=a.substr(0,b),e=a.substr(b+1)||d.substr(d.lastIndexOf(".")+1);c="!"+e,m[e]=!0,a=d}else if(m[a])return a;var f=k(a),g=l(a);return"/"===a[a.length-1]?a+k(a.substr(0,a.length-1))+c:/^(\w+(?:s)?:\/\/|\.|file|\/)/.test(a)||-1!==f.indexOf(".")?"js"===g?a.substr(0,a.lastIndexOf("."))+c:a+c:a+"/"+f+c},o=function(b){var l,m,o,p=function(){var a=arguments,b=function(){var b,c=[];d(a,function(a){e(a)?c.push(p.System["import"](n(a))):"function"==typeof a&&(b=a)});var f=Promise.all(c);return b?f.then(function(a){return b&&b.apply(null,a)}):f};return"production"===p.config().env?b():l.then(b,b)};p.System=b,p.parseURI=i,p.joinURIs=j;var q=function(a){a.ext={};var b=a.normalize,c=/\.(\w+)!$/;a.normalize=function(d,e,f){var g,h=d.match(c);return h&&a.ext[g=h[1]]&&(d+=a.ext[g]),b.call(this,d,e,f)}};q(b);var r={env:"development"};p.config=function(a){if(e(a)){var b=a;if(!(arguments.length>=2)){var c=t[b];return c&&c.get?c.get():r[b]}}else{if("object"!=typeof a){var g={};return d(t,function(a,b){a.get&&(g[b]=a.get())}),f(g,r)}a=f({},a),d(t,function(b,c){if(b.set&&a[c]){var d=b.set(a[c]);void 0!==d&&(r[c]=d),delete a[c]}}),f(r,a)}};var s=function(a){return{get:function(){return p.System[a]},set:function(b){p.System[a]="object"==typeof b&&"object"==typeof p.System[a]?f(p.System[a]||{},b||{}):b}}},t={env:{set:function(a){return u(),a}},root:s("baseURL"),config:{set:function(a){var c=k(a),d=g(a);b.paths.stealconfig=c,t.root.set((d===a?".":d)+"/")}},paths:s("paths"),map:s("map"),startId:{set:function(a){t.main.set(n(a))},get:function(){return b.main}},main:{get:s("main").get,set:function(a){b.main=a,u()}},meta:s("meta")},u=function(){if("production"===r.env&&b.main){var a=b.main,c=b.bundlesPath||"bundles/",d=c+k(a);b.meta[d]={format:"amd"},b.bundles[d]=[a]}},v="less-1.7.0",w=function(){var a,e,f,g,i,j={},k=document.getElementsByTagName("script"),l=k[k.length-1];if(l){a=l.src.split("?"),e=a.shift(),f=a.join("?"),a=f.split(","),e.indexOf("steal.production")>-1&&(j.env="production"),g=a[0],g&&(j.startId=g),i=a[1],i&&(j.env=i),a=e.split("/");var m=a.pop();0!==m.indexOf("steal")||b.paths["steal/dev"]||(j.paths={"steal/*":a.join("/")+"/*.js",less:a.join("/")+"/"+v+".js","@traceur":a.slice(0,-1).join("/")+"/traceur/traceur.js"}),"steal"===h(a)&&(a.pop(),"bower_components"===h(a)&&a.pop());var n=a.join("/");j.root=n+"/",d(l.attributes,function(a){var b=c(0===a.nodeName.indexOf("data-")?a.nodeName.replace("data-",""):a.nodeName);j[b]=a.value})}return j},x=function(){var a={};return"string"!=typeof __dirname||b.paths["steal/dev"]||(a.paths={"steal/*":__dirname+"/*.js","@traceur":__dirname.split("/").slice(0,-1).join("/")+"/traceur/traceur.js"}),b.register("less",[],function(){var a=require;return{__useDefault:!0,"default":a("less")}}),a};return p.startup=function(c){if(a.document)var g=w();else var g=x();f(b.ext,{css:"steal/css",less:"steal/less"}),p.config(g);var h=p.config();d(h.executed||[],function(a,c){b.register(c,[],function(){})});var i=[];return h.startIds&&(i.push.apply(i,e(h.startIds)?[h.startIds]:h.startIds),h.startIds=i.slice(0)),"production"==h.env?o=p.System.import(p.System.main)["catch"](function(a){}):"development"==h.env?(l=p.System.import("stealconfig"),m=l.then(function(){return c&&p.config(c),p.System.import("steal/dev")},function(){return p.System.import("steal/dev")}),o=m.then(function(){return p.System.main?b.import(p.System.main):l}).then(function(){p.dev&&p.dev.log("app loaded successfully")},function(a){})):void 0},p},p=/(?:^\s*|[}{\(\);,\n\?\&]\s*)steal\s*\(\s*((?:"[^"]+"\s*,|'[^']+'\s*,\s*)*)/,q=function(a){function c(b,c){for(var d=(c.metadata,[]),e=0;e<b.length;e++){var f=a.get(b[e]);if(f.__useDefault)f=f["default"];else if(!f.__esModule){var g={__esModule:!0};for(var h in f)g[h]=f[h];f=g}d[e]=f}var f,i;return{deps:d,module:f||i&&{exports:i}}}return a.formats.unshift("steal"),a.format.steal={detect:function(a){return!!a.source.match(p)},deps:function(c){var d=a.global,e=[],f=c.metadata,g=d.steal;return d.steal=function(){for(var a=0;a<arguments.length;a++)"string"==typeof arguments[a]?e.push(arguments[a]):f.factory=arguments[a]},a.__exec(c),d.steal=g,e=e||[],e=b(e,f),d.define=void 0,f.deps=e,e},execute:function(b,d){if(d.metadata.factory){var e=c(b,d);return d.metadata.factory.apply(a.global,e.deps)||e.module&&e.module.exports}},normalize:function(a,b,c,d){return d(n(a,this),b,c)}},a};if("undefined"!=typeof System&&q(System),"undefined"!=typeof window)window.steal=o(System),window.steal.startup(),window.steal.addFormat=q;else{var r=o(System);r.System=System,r.dev=require("./dev.js"),r.clone=o,module.exports=r,a.steal=r,a.steal.addFormat=q}}("undefined"==typeof window?global:window);