(function(y,De){typeof exports=="object"&&typeof module<"u"?De(require("three")):typeof define=="function"&&define.amd?define(["three"],De):(y=typeof globalThis<"u"?globalThis:y||self,De(y.THREE))})(this,function(y){"use strict";function De(o){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(o){for(const t in o)if(t!=="default"){const a=Object.getOwnPropertyDescriptor(o,t);Object.defineProperty(e,t,a.get?a:{enumerable:!0,get:()=>o[t]})}}return e.default=o,Object.freeze(e)}const xt=De(y);function Zt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var He={exports:{}},Qt=He.exports,At;function ea(){return At||(At=1,function(o,e){(function(t,a){o.exports=a()})(Qt,()=>(()=>{var t={873:(s,r)=>{var c,d,p=function(){var f=function(l,b){var u=l,h=T[b],g=null,v=0,A=null,S=[],M={},B=function(k,R){g=function(_){for(var F=new Array(_),E=0;E<_;E+=1){F[E]=new Array(_);for(var $=0;$<_;$+=1)F[E][$]=null}return F}(v=4*u+17),z(0,0),z(v-7,0),z(0,v-7),K(),O(),G(k,R),u>=7&&ae(k),A==null&&(A=Q(u,h,S)),se(A,R)},z=function(k,R){for(var _=-1;_<=7;_+=1)if(!(k+_<=-1||v<=k+_))for(var F=-1;F<=7;F+=1)R+F<=-1||v<=R+F||(g[k+_][R+F]=0<=_&&_<=6&&(F==0||F==6)||0<=F&&F<=6&&(_==0||_==6)||2<=_&&_<=4&&2<=F&&F<=4)},O=function(){for(var k=8;k<v-8;k+=1)g[k][6]==null&&(g[k][6]=k%2==0);for(var R=8;R<v-8;R+=1)g[6][R]==null&&(g[6][R]=R%2==0)},K=function(){for(var k=C.getPatternPosition(u),R=0;R<k.length;R+=1)for(var _=0;_<k.length;_+=1){var F=k[R],E=k[_];if(g[F][E]==null)for(var $=-2;$<=2;$+=1)for(var Z=-2;Z<=2;Z+=1)g[F+$][E+Z]=$==-2||$==2||Z==-2||Z==2||$==0&&Z==0}},ae=function(k){for(var R=C.getBCHTypeNumber(u),_=0;_<18;_+=1){var F=!k&&(R>>_&1)==1;g[Math.floor(_/3)][_%3+v-8-3]=F}for(_=0;_<18;_+=1)F=!k&&(R>>_&1)==1,g[_%3+v-8-3][Math.floor(_/3)]=F},G=function(k,R){for(var _=h<<3|R,F=C.getBCHTypeInfo(_),E=0;E<15;E+=1){var $=!k&&(F>>E&1)==1;E<6?g[E][8]=$:E<8?g[E+1][8]=$:g[v-15+E][8]=$}for(E=0;E<15;E+=1)$=!k&&(F>>E&1)==1,E<8?g[8][v-E-1]=$:E<9?g[8][15-E-1+1]=$:g[8][15-E-1]=$;g[v-8][8]=!k},se=function(k,R){for(var _=-1,F=v-1,E=7,$=0,Z=C.getMaskFunction(R),W=v-1;W>0;W-=2)for(W==6&&(W-=1);;){for(var ie=0;ie<2;ie+=1)if(g[F][W-ie]==null){var ne=!1;$<k.length&&(ne=(k[$]>>>E&1)==1),Z(F,W-ie)&&(ne=!ne),g[F][W-ie]=ne,(E-=1)==-1&&($+=1,E=7)}if((F+=_)<0||v<=F){F-=_,_=-_;break}}},Q=function(k,R,_){for(var F=I.getRSBlocks(k,R),E=J(),$=0;$<_.length;$+=1){var Z=_[$];E.put(Z.getMode(),4),E.put(Z.getLength(),C.getLengthInBits(Z.getMode(),k)),Z.write(E)}var W=0;for($=0;$<F.length;$+=1)W+=F[$].dataCount;if(E.getLengthInBits()>8*W)throw"code length overflow. ("+E.getLengthInBits()+">"+8*W+")";for(E.getLengthInBits()+4<=8*W&&E.put(0,4);E.getLengthInBits()%8!=0;)E.putBit(!1);for(;!(E.getLengthInBits()>=8*W||(E.put(236,8),E.getLengthInBits()>=8*W));)E.put(17,8);return function(ie,ne){for(var ee=0,ce=0,le=0,pe=new Array(ne.length),de=new Array(ne.length),X=0;X<ne.length;X+=1){var Fe=ne[X].dataCount,Ue=ne[X].totalCount-Fe;ce=Math.max(ce,Fe),le=Math.max(le,Ue),pe[X]=new Array(Fe);for(var re=0;re<pe[X].length;re+=1)pe[X][re]=255&ie.getBuffer()[re+ee];ee+=Fe;var Ae=C.getErrorCorrectPolynomial(Ue),ye=D(pe[X],Ae.getLength()-1).mod(Ae);for(de[X]=new Array(Ae.getLength()-1),re=0;re<de[X].length;re+=1){var Le=re+ye.getLength()-de[X].length;de[X][re]=Le>=0?ye.getAt(Le):0}}var et=0;for(re=0;re<ne.length;re+=1)et+=ne[re].totalCount;var Ke=new Array(et),xe=0;for(re=0;re<ce;re+=1)for(X=0;X<ne.length;X+=1)re<pe[X].length&&(Ke[xe]=pe[X][re],xe+=1);for(re=0;re<le;re+=1)for(X=0;X<ne.length;X+=1)re<de[X].length&&(Ke[xe]=de[X][re],xe+=1);return Ke}(E,F)};M.addData=function(k,R){var _=null;switch(R=R||"Byte"){case"Numeric":_=Y(k);break;case"Alphanumeric":_=V(k);break;case"Byte":_=N(k);break;case"Kanji":_=oe(k);break;default:throw"mode:"+R}S.push(_),A=null},M.isDark=function(k,R){if(k<0||v<=k||R<0||v<=R)throw k+","+R;return g[k][R]},M.getModuleCount=function(){return v},M.make=function(){if(u<1){for(var k=1;k<40;k++){for(var R=I.getRSBlocks(k,h),_=J(),F=0;F<S.length;F++){var E=S[F];_.put(E.getMode(),4),_.put(E.getLength(),C.getLengthInBits(E.getMode(),k)),E.write(_)}var $=0;for(F=0;F<R.length;F++)$+=R[F].dataCount;if(_.getLengthInBits()<=8*$)break}u=k}B(!1,function(){for(var Z=0,W=0,ie=0;ie<8;ie+=1){B(!0,ie);var ne=C.getLostPoint(M);(ie==0||Z>ne)&&(Z=ne,W=ie)}return W}())},M.createTableTag=function(k,R){k=k||2;var _="";_+='<table style="',_+=" border-width: 0px; border-style: none;",_+=" border-collapse: collapse;",_+=" padding: 0px; margin: "+(R=R===void 0?4*k:R)+"px;",_+='">',_+="<tbody>";for(var F=0;F<M.getModuleCount();F+=1){_+="<tr>";for(var E=0;E<M.getModuleCount();E+=1)_+='<td style="',_+=" border-width: 0px; border-style: none;",_+=" border-collapse: collapse;",_+=" padding: 0px; margin: 0px;",_+=" width: "+k+"px;",_+=" height: "+k+"px;",_+=" background-color: ",_+=M.isDark(F,E)?"#000000":"#ffffff",_+=";",_+='"/>';_+="</tr>"}return(_+="</tbody>")+"</table>"},M.createSvgTag=function(k,R,_,F){var E={};typeof arguments[0]=="object"&&(k=(E=arguments[0]).cellSize,R=E.margin,_=E.alt,F=E.title),k=k||2,R=R===void 0?4*k:R,(_=typeof _=="string"?{text:_}:_||{}).text=_.text||null,_.id=_.text?_.id||"qrcode-description":null,(F=typeof F=="string"?{text:F}:F||{}).text=F.text||null,F.id=F.text?F.id||"qrcode-title":null;var $,Z,W,ie,ne=M.getModuleCount()*k+2*R,ee="";for(ie="l"+k+",0 0,"+k+" -"+k+",0 0,-"+k+"z ",ee+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',ee+=E.scalable?"":' width="'+ne+'px" height="'+ne+'px"',ee+=' viewBox="0 0 '+ne+" "+ne+'" ',ee+=' preserveAspectRatio="xMinYMin meet"',ee+=F.text||_.text?' role="img" aria-labelledby="'+H([F.id,_.id].join(" ").trim())+'"':"",ee+=">",ee+=F.text?'<title id="'+H(F.id)+'">'+H(F.text)+"</title>":"",ee+=_.text?'<description id="'+H(_.id)+'">'+H(_.text)+"</description>":"",ee+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',ee+='<path d="',Z=0;Z<M.getModuleCount();Z+=1)for(W=Z*k+R,$=0;$<M.getModuleCount();$+=1)M.isDark(Z,$)&&(ee+="M"+($*k+R)+","+W+ie);return(ee+='" stroke="transparent" fill="black"/>')+"</svg>"},M.createDataURL=function(k,R){k=k||2,R=R===void 0?4*k:R;var _=M.getModuleCount()*k+2*R,F=R,E=_-R;return m(_,_,function($,Z){if(F<=$&&$<E&&F<=Z&&Z<E){var W=Math.floor(($-F)/k),ie=Math.floor((Z-F)/k);return M.isDark(ie,W)?0:1}return 1})},M.createImgTag=function(k,R,_){k=k||2,R=R===void 0?4*k:R;var F=M.getModuleCount()*k+2*R,E="";return E+="<img",E+=' src="',E+=M.createDataURL(k,R),E+='"',E+=' width="',E+=F,E+='"',E+=' height="',E+=F,E+='"',_&&(E+=' alt="',E+=H(_),E+='"'),E+"/>"};var H=function(k){for(var R="",_=0;_<k.length;_+=1){var F=k.charAt(_);switch(F){case"<":R+="&lt;";break;case">":R+="&gt;";break;case"&":R+="&amp;";break;case'"':R+="&quot;";break;default:R+=F}}return R};return M.createASCII=function(k,R){if((k=k||1)<2)return function(pe){pe=pe===void 0?2:pe;var de,X,Fe,Ue,re,Ae=1*M.getModuleCount()+2*pe,ye=pe,Le=Ae-pe,et={"██":"█","█ ":"▀"," █":"▄","  ":" "},Ke={"██":"▀","█ ":"▀"," █":" ","  ":" "},xe="";for(de=0;de<Ae;de+=2){for(Fe=Math.floor((de-ye)/1),Ue=Math.floor((de+1-ye)/1),X=0;X<Ae;X+=1)re="█",ye<=X&&X<Le&&ye<=de&&de<Le&&M.isDark(Fe,Math.floor((X-ye)/1))&&(re=" "),ye<=X&&X<Le&&ye<=de+1&&de+1<Le&&M.isDark(Ue,Math.floor((X-ye)/1))?re+=" ":re+="█",xe+=pe<1&&de+1>=Le?Ke[re]:et[re];xe+=`
`}return Ae%2&&pe>0?xe.substring(0,xe.length-Ae-1)+Array(Ae+1).join("▀"):xe.substring(0,xe.length-1)}(R);k-=1,R=R===void 0?2*k:R;var _,F,E,$,Z=M.getModuleCount()*k+2*R,W=R,ie=Z-R,ne=Array(k+1).join("██"),ee=Array(k+1).join("  "),ce="",le="";for(_=0;_<Z;_+=1){for(E=Math.floor((_-W)/k),le="",F=0;F<Z;F+=1)$=1,W<=F&&F<ie&&W<=_&&_<ie&&M.isDark(E,Math.floor((F-W)/k))&&($=0),le+=$?ne:ee;for(E=0;E<k;E+=1)ce+=le+`
`}return ce.substring(0,ce.length-1)},M.renderTo2dContext=function(k,R){R=R||2;for(var _=M.getModuleCount(),F=0;F<_;F++)for(var E=0;E<_;E++)k.fillStyle=M.isDark(F,E)?"black":"white",k.fillRect(F*R,E*R,R,R)},M};f.stringToBytes=(f.stringToBytesFuncs={default:function(l){for(var b=[],u=0;u<l.length;u+=1){var h=l.charCodeAt(u);b.push(255&h)}return b}}).default,f.createStringToBytes=function(l,b){var u=function(){for(var g=U(l),v=function(){var O=g.read();if(O==-1)throw"eof";return O},A=0,S={};;){var M=g.read();if(M==-1)break;var B=v(),z=v()<<8|v();S[String.fromCharCode(M<<8|B)]=z,A+=1}if(A!=b)throw A+" != "+b;return S}(),h=63;return function(g){for(var v=[],A=0;A<g.length;A+=1){var S=g.charCodeAt(A);if(S<128)v.push(S);else{var M=u[g.charAt(A)];typeof M=="number"?(255&M)==M?v.push(M):(v.push(M>>>8),v.push(255&M)):v.push(h)}}return v}};var w,x,L,j,q,T={L:1,M:0,Q:3,H:2},C=(w=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],x=1335,L=7973,q=function(l){for(var b=0;l!=0;)b+=1,l>>>=1;return b},(j={}).getBCHTypeInfo=function(l){for(var b=l<<10;q(b)-q(x)>=0;)b^=x<<q(b)-q(x);return 21522^(l<<10|b)},j.getBCHTypeNumber=function(l){for(var b=l<<12;q(b)-q(L)>=0;)b^=L<<q(b)-q(L);return l<<12|b},j.getPatternPosition=function(l){return w[l-1]},j.getMaskFunction=function(l){switch(l){case 0:return function(b,u){return(b+u)%2==0};case 1:return function(b,u){return b%2==0};case 2:return function(b,u){return u%3==0};case 3:return function(b,u){return(b+u)%3==0};case 4:return function(b,u){return(Math.floor(b/2)+Math.floor(u/3))%2==0};case 5:return function(b,u){return b*u%2+b*u%3==0};case 6:return function(b,u){return(b*u%2+b*u%3)%2==0};case 7:return function(b,u){return(b*u%3+(b+u)%2)%2==0};default:throw"bad maskPattern:"+l}},j.getErrorCorrectPolynomial=function(l){for(var b=D([1],0),u=0;u<l;u+=1)b=b.multiply(D([1,P.gexp(u)],0));return b},j.getLengthInBits=function(l,b){if(1<=b&&b<10)switch(l){case 1:return 10;case 2:return 9;case 4:case 8:return 8;default:throw"mode:"+l}else if(b<27)switch(l){case 1:return 12;case 2:return 11;case 4:return 16;case 8:return 10;default:throw"mode:"+l}else{if(!(b<41))throw"type:"+b;switch(l){case 1:return 14;case 2:return 13;case 4:return 16;case 8:return 12;default:throw"mode:"+l}}},j.getLostPoint=function(l){for(var b=l.getModuleCount(),u=0,h=0;h<b;h+=1)for(var g=0;g<b;g+=1){for(var v=0,A=l.isDark(h,g),S=-1;S<=1;S+=1)if(!(h+S<0||b<=h+S))for(var M=-1;M<=1;M+=1)g+M<0||b<=g+M||S==0&&M==0||A==l.isDark(h+S,g+M)&&(v+=1);v>5&&(u+=3+v-5)}for(h=0;h<b-1;h+=1)for(g=0;g<b-1;g+=1){var B=0;l.isDark(h,g)&&(B+=1),l.isDark(h+1,g)&&(B+=1),l.isDark(h,g+1)&&(B+=1),l.isDark(h+1,g+1)&&(B+=1),B!=0&&B!=4||(u+=3)}for(h=0;h<b;h+=1)for(g=0;g<b-6;g+=1)l.isDark(h,g)&&!l.isDark(h,g+1)&&l.isDark(h,g+2)&&l.isDark(h,g+3)&&l.isDark(h,g+4)&&!l.isDark(h,g+5)&&l.isDark(h,g+6)&&(u+=40);for(g=0;g<b;g+=1)for(h=0;h<b-6;h+=1)l.isDark(h,g)&&!l.isDark(h+1,g)&&l.isDark(h+2,g)&&l.isDark(h+3,g)&&l.isDark(h+4,g)&&!l.isDark(h+5,g)&&l.isDark(h+6,g)&&(u+=40);var z=0;for(g=0;g<b;g+=1)for(h=0;h<b;h+=1)l.isDark(h,g)&&(z+=1);return u+Math.abs(100*z/b/b-50)/5*10},j),P=function(){for(var l=new Array(256),b=new Array(256),u=0;u<8;u+=1)l[u]=1<<u;for(u=8;u<256;u+=1)l[u]=l[u-4]^l[u-5]^l[u-6]^l[u-8];for(u=0;u<255;u+=1)b[l[u]]=u;return{glog:function(h){if(h<1)throw"glog("+h+")";return b[h]},gexp:function(h){for(;h<0;)h+=255;for(;h>=256;)h-=255;return l[h]}}}();function D(l,b){if(l.length===void 0)throw l.length+"/"+b;var u=function(){for(var g=0;g<l.length&&l[g]==0;)g+=1;for(var v=new Array(l.length-g+b),A=0;A<l.length-g;A+=1)v[A]=l[A+g];return v}(),h={getAt:function(g){return u[g]},getLength:function(){return u.length},multiply:function(g){for(var v=new Array(h.getLength()+g.getLength()-1),A=0;A<h.getLength();A+=1)for(var S=0;S<g.getLength();S+=1)v[A+S]^=P.gexp(P.glog(h.getAt(A))+P.glog(g.getAt(S)));return D(v,0)},mod:function(g){if(h.getLength()-g.getLength()<0)return h;for(var v=P.glog(h.getAt(0))-P.glog(g.getAt(0)),A=new Array(h.getLength()),S=0;S<h.getLength();S+=1)A[S]=h.getAt(S);for(S=0;S<g.getLength();S+=1)A[S]^=P.gexp(P.glog(g.getAt(S))+v);return D(A,0).mod(g)}};return h}var I=function(){var l=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],b=function(h,g){var v={};return v.totalCount=h,v.dataCount=g,v},u={getRSBlocks:function(h,g){var v=function(ae,G){switch(G){case T.L:return l[4*(ae-1)+0];case T.M:return l[4*(ae-1)+1];case T.Q:return l[4*(ae-1)+2];case T.H:return l[4*(ae-1)+3];default:return}}(h,g);if(v===void 0)throw"bad rs block @ typeNumber:"+h+"/errorCorrectionLevel:"+g;for(var A=v.length/3,S=[],M=0;M<A;M+=1)for(var B=v[3*M+0],z=v[3*M+1],O=v[3*M+2],K=0;K<B;K+=1)S.push(b(z,O));return S}};return u}(),J=function(){var l=[],b=0,u={getBuffer:function(){return l},getAt:function(h){var g=Math.floor(h/8);return(l[g]>>>7-h%8&1)==1},put:function(h,g){for(var v=0;v<g;v+=1)u.putBit((h>>>g-v-1&1)==1)},getLengthInBits:function(){return b},putBit:function(h){var g=Math.floor(b/8);l.length<=g&&l.push(0),h&&(l[g]|=128>>>b%8),b+=1}};return u},Y=function(l){var b=l,u={getMode:function(){return 1},getLength:function(v){return b.length},write:function(v){for(var A=b,S=0;S+2<A.length;)v.put(h(A.substring(S,S+3)),10),S+=3;S<A.length&&(A.length-S==1?v.put(h(A.substring(S,S+1)),4):A.length-S==2&&v.put(h(A.substring(S,S+2)),7))}},h=function(v){for(var A=0,S=0;S<v.length;S+=1)A=10*A+g(v.charAt(S));return A},g=function(v){if("0"<=v&&v<="9")return v.charCodeAt(0)-48;throw"illegal char :"+v};return u},V=function(l){var b=l,u={getMode:function(){return 2},getLength:function(g){return b.length},write:function(g){for(var v=b,A=0;A+1<v.length;)g.put(45*h(v.charAt(A))+h(v.charAt(A+1)),11),A+=2;A<v.length&&g.put(h(v.charAt(A)),6)}},h=function(g){if("0"<=g&&g<="9")return g.charCodeAt(0)-48;if("A"<=g&&g<="Z")return g.charCodeAt(0)-65+10;switch(g){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+g}};return u},N=function(l){var b=f.stringToBytes(l);return{getMode:function(){return 4},getLength:function(u){return b.length},write:function(u){for(var h=0;h<b.length;h+=1)u.put(b[h],8)}}},oe=function(l){var b=f.stringToBytesFuncs.SJIS;if(!b)throw"sjis not supported.";(function(){var g=b("友");if(g.length!=2||(g[0]<<8|g[1])!=38726)throw"sjis not supported."})();var u=b(l),h={getMode:function(){return 8},getLength:function(g){return~~(u.length/2)},write:function(g){for(var v=u,A=0;A+1<v.length;){var S=(255&v[A])<<8|255&v[A+1];if(33088<=S&&S<=40956)S-=33088;else{if(!(57408<=S&&S<=60351))throw"illegal char at "+(A+1)+"/"+S;S-=49472}S=192*(S>>>8&255)+(255&S),g.put(S,13),A+=2}if(A<v.length)throw"illegal char at "+(A+1)}};return h},fe=function(){var l=[],b={writeByte:function(u){l.push(255&u)},writeShort:function(u){b.writeByte(u),b.writeByte(u>>>8)},writeBytes:function(u,h,g){h=h||0,g=g||u.length;for(var v=0;v<g;v+=1)b.writeByte(u[v+h])},writeString:function(u){for(var h=0;h<u.length;h+=1)b.writeByte(u.charCodeAt(h))},toByteArray:function(){return l},toString:function(){var u="";u+="[";for(var h=0;h<l.length;h+=1)h>0&&(u+=","),u+=l[h];return u+"]"}};return b},U=function(l){var b=l,u=0,h=0,g=0,v={read:function(){for(;g<8;){if(u>=b.length){if(g==0)return-1;throw"unexpected end of file./"+g}var S=b.charAt(u);if(u+=1,S=="=")return g=0,-1;S.match(/^\s$/)||(h=h<<6|A(S.charCodeAt(0)),g+=6)}var M=h>>>g-8&255;return g-=8,M}},A=function(S){if(65<=S&&S<=90)return S-65;if(97<=S&&S<=122)return S-97+26;if(48<=S&&S<=57)return S-48+52;if(S==43)return 62;if(S==47)return 63;throw"c:"+S};return v},m=function(l,b,u){for(var h=function(z,O){var K=z,ae=O,G=new Array(z*O),se={setPixel:function(k,R,_){G[R*K+k]=_},write:function(k){k.writeString("GIF87a"),k.writeShort(K),k.writeShort(ae),k.writeByte(128),k.writeByte(0),k.writeByte(0),k.writeByte(0),k.writeByte(0),k.writeByte(0),k.writeByte(255),k.writeByte(255),k.writeByte(255),k.writeString(","),k.writeShort(0),k.writeShort(0),k.writeShort(K),k.writeShort(ae),k.writeByte(0);var R=Q(2);k.writeByte(2);for(var _=0;R.length-_>255;)k.writeByte(255),k.writeBytes(R,_,255),_+=255;k.writeByte(R.length-_),k.writeBytes(R,_,R.length-_),k.writeByte(0),k.writeString(";")}},Q=function(k){for(var R=1<<k,_=1+(1<<k),F=k+1,E=H(),$=0;$<R;$+=1)E.add(String.fromCharCode($));E.add(String.fromCharCode(R)),E.add(String.fromCharCode(_));var Z,W,ie,ne=fe(),ee=(Z=ne,W=0,ie=0,{write:function(de,X){if(de>>>X)throw"length over";for(;W+X>=8;)Z.writeByte(255&(de<<W|ie)),X-=8-W,de>>>=8-W,ie=0,W=0;ie|=de<<W,W+=X},flush:function(){W>0&&Z.writeByte(ie)}});ee.write(R,F);var ce=0,le=String.fromCharCode(G[ce]);for(ce+=1;ce<G.length;){var pe=String.fromCharCode(G[ce]);ce+=1,E.contains(le+pe)?le+=pe:(ee.write(E.indexOf(le),F),E.size()<4095&&(E.size()==1<<F&&(F+=1),E.add(le+pe)),le=pe)}return ee.write(E.indexOf(le),F),ee.write(_,F),ee.flush(),ne.toByteArray()},H=function(){var k={},R=0,_={add:function(F){if(_.contains(F))throw"dup key:"+F;k[F]=R,R+=1},size:function(){return R},indexOf:function(F){return k[F]},contains:function(F){return k[F]!==void 0}};return _};return se}(l,b),g=0;g<b;g+=1)for(var v=0;v<l;v+=1)h.setPixel(v,g,u(v,g));var A=fe();h.write(A);for(var S=function(){var z=0,O=0,K=0,ae="",G={},se=function(H){ae+=String.fromCharCode(Q(63&H))},Q=function(H){if(!(H<0)){if(H<26)return 65+H;if(H<52)return H-26+97;if(H<62)return H-52+48;if(H==62)return 43;if(H==63)return 47}throw"n:"+H};return G.writeByte=function(H){for(z=z<<8|255&H,O+=8,K+=1;O>=6;)se(z>>>O-6),O-=6},G.flush=function(){if(O>0&&(se(z<<6-O),z=0,O=0),K%3!=0)for(var H=3-K%3,k=0;k<H;k+=1)ae+="="},G.toString=function(){return ae},G}(),M=A.toByteArray(),B=0;B<M.length;B+=1)S.writeByte(M[B]);return S.flush(),"data:image/gif;base64,"+S};return f}();p.stringToBytesFuncs["UTF-8"]=function(f){return function(w){for(var x=[],L=0;L<w.length;L++){var j=w.charCodeAt(L);j<128?x.push(j):j<2048?x.push(192|j>>6,128|63&j):j<55296||j>=57344?x.push(224|j>>12,128|j>>6&63,128|63&j):(L++,j=65536+((1023&j)<<10|1023&w.charCodeAt(L)),x.push(240|j>>18,128|j>>12&63,128|j>>6&63,128|63&j))}return x}(f)},(d=typeof(c=function(){return p})=="function"?c.apply(r,[]):c)===void 0||(s.exports=d)}},a={};function n(s){var r=a[s];if(r!==void 0)return r.exports;var c=a[s]={exports:{}};return t[s](c,c.exports,n),c.exports}n.n=s=>{var r=s&&s.__esModule?()=>s.default:()=>s;return n.d(r,{a:r}),r},n.d=(s,r)=>{for(var c in r)n.o(r,c)&&!n.o(s,c)&&Object.defineProperty(s,c,{enumerable:!0,get:r[c]})},n.o=(s,r)=>Object.prototype.hasOwnProperty.call(s,r);var i={};return(()=>{n.d(i,{default:()=>fe});const s=U=>!!U&&typeof U=="object"&&!Array.isArray(U);function r(U,...m){if(!m.length)return U;const l=m.shift();return l!==void 0&&s(U)&&s(l)?(U=Object.assign({},U),Object.keys(l).forEach(b=>{const u=U[b],h=l[b];Array.isArray(u)&&Array.isArray(h)?U[b]=h:s(u)&&s(h)?U[b]=r(Object.assign({},u),h):U[b]=h}),r(U,...m)):U}function c(U,m){const l=document.createElement("a");l.download=m,l.href=U,document.body.appendChild(l),l.click(),document.body.removeChild(l)}const d={L:.07,M:.15,Q:.25,H:.3};class p{constructor({svg:m,type:l,window:b}){this._svg=m,this._type=l,this._window=b}draw(m,l,b,u){let h;switch(this._type){case"dots":h=this._drawDot;break;case"classy":h=this._drawClassy;break;case"classy-rounded":h=this._drawClassyRounded;break;case"rounded":h=this._drawRounded;break;case"extra-rounded":h=this._drawExtraRounded;break;default:h=this._drawSquare}h.call(this,{x:m,y:l,size:b,getNeighbor:u})}_rotateFigure({x:m,y:l,size:b,rotation:u=0,draw:h}){var g;const v=m+b/2,A=l+b/2;h(),(g=this._element)===null||g===void 0||g.setAttribute("transform",`rotate(${180*u/Math.PI},${v},${A})`)}_basicDot(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","circle"),this._element.setAttribute("cx",String(b+l/2)),this._element.setAttribute("cy",String(u+l/2)),this._element.setAttribute("r",String(l/2))}}))}_basicSquare(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","rect"),this._element.setAttribute("x",String(b)),this._element.setAttribute("y",String(u)),this._element.setAttribute("width",String(l)),this._element.setAttribute("height",String(l))}}))}_basicSideRounded(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("d",`M ${b} ${u}v ${l}h `+l/2+`a ${l/2} ${l/2}, 0, 0, 0, 0 ${-l}`)}}))}_basicCornerRounded(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("d",`M ${b} ${u}v ${l}h ${l}v `+-l/2+`a ${l/2} ${l/2}, 0, 0, 0, ${-l/2} ${-l/2}`)}}))}_basicCornerExtraRounded(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("d",`M ${b} ${u}v ${l}h ${l}a ${l} ${l}, 0, 0, 0, ${-l} ${-l}`)}}))}_basicCornersRounded(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("d",`M ${b} ${u}v `+l/2+`a ${l/2} ${l/2}, 0, 0, 0, ${l/2} ${l/2}h `+l/2+"v "+-l/2+`a ${l/2} ${l/2}, 0, 0, 0, ${-l/2} ${-l/2}`)}}))}_drawDot({x:m,y:l,size:b}){this._basicDot({x:m,y:l,size:b,rotation:0})}_drawSquare({x:m,y:l,size:b}){this._basicSquare({x:m,y:l,size:b,rotation:0})}_drawRounded({x:m,y:l,size:b,getNeighbor:u}){const h=u?+u(-1,0):0,g=u?+u(1,0):0,v=u?+u(0,-1):0,A=u?+u(0,1):0,S=h+g+v+A;if(S!==0)if(S>2||h&&g||v&&A)this._basicSquare({x:m,y:l,size:b,rotation:0});else{if(S===2){let M=0;return h&&v?M=Math.PI/2:v&&g?M=Math.PI:g&&A&&(M=-Math.PI/2),void this._basicCornerRounded({x:m,y:l,size:b,rotation:M})}if(S===1){let M=0;return v?M=Math.PI/2:g?M=Math.PI:A&&(M=-Math.PI/2),void this._basicSideRounded({x:m,y:l,size:b,rotation:M})}}else this._basicDot({x:m,y:l,size:b,rotation:0})}_drawExtraRounded({x:m,y:l,size:b,getNeighbor:u}){const h=u?+u(-1,0):0,g=u?+u(1,0):0,v=u?+u(0,-1):0,A=u?+u(0,1):0,S=h+g+v+A;if(S!==0)if(S>2||h&&g||v&&A)this._basicSquare({x:m,y:l,size:b,rotation:0});else{if(S===2){let M=0;return h&&v?M=Math.PI/2:v&&g?M=Math.PI:g&&A&&(M=-Math.PI/2),void this._basicCornerExtraRounded({x:m,y:l,size:b,rotation:M})}if(S===1){let M=0;return v?M=Math.PI/2:g?M=Math.PI:A&&(M=-Math.PI/2),void this._basicSideRounded({x:m,y:l,size:b,rotation:M})}}else this._basicDot({x:m,y:l,size:b,rotation:0})}_drawClassy({x:m,y:l,size:b,getNeighbor:u}){const h=u?+u(-1,0):0,g=u?+u(1,0):0,v=u?+u(0,-1):0,A=u?+u(0,1):0;h+g+v+A!==0?h||v?g||A?this._basicSquare({x:m,y:l,size:b,rotation:0}):this._basicCornerRounded({x:m,y:l,size:b,rotation:Math.PI/2}):this._basicCornerRounded({x:m,y:l,size:b,rotation:-Math.PI/2}):this._basicCornersRounded({x:m,y:l,size:b,rotation:Math.PI/2})}_drawClassyRounded({x:m,y:l,size:b,getNeighbor:u}){const h=u?+u(-1,0):0,g=u?+u(1,0):0,v=u?+u(0,-1):0,A=u?+u(0,1):0;h+g+v+A!==0?h||v?g||A?this._basicSquare({x:m,y:l,size:b,rotation:0}):this._basicCornerExtraRounded({x:m,y:l,size:b,rotation:Math.PI/2}):this._basicCornerExtraRounded({x:m,y:l,size:b,rotation:-Math.PI/2}):this._basicCornersRounded({x:m,y:l,size:b,rotation:Math.PI/2})}}class f{constructor({svg:m,type:l,window:b}){this._svg=m,this._type=l,this._window=b}draw(m,l,b,u){let h;switch(this._type){case"square":h=this._drawSquare;break;case"extra-rounded":h=this._drawExtraRounded;break;default:h=this._drawDot}h.call(this,{x:m,y:l,size:b,rotation:u})}_rotateFigure({x:m,y:l,size:b,rotation:u=0,draw:h}){var g;const v=m+b/2,A=l+b/2;h(),(g=this._element)===null||g===void 0||g.setAttribute("transform",`rotate(${180*u/Math.PI},${v},${A})`)}_basicDot(m){const{size:l,x:b,y:u}=m,h=l/7;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("clip-rule","evenodd"),this._element.setAttribute("d",`M ${b+l/2} ${u}a ${l/2} ${l/2} 0 1 0 0.1 0zm 0 ${h}a ${l/2-h} ${l/2-h} 0 1 1 -0.1 0Z`)}}))}_basicSquare(m){const{size:l,x:b,y:u}=m,h=l/7;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("clip-rule","evenodd"),this._element.setAttribute("d",`M ${b} ${u}v ${l}h ${l}v `+-l+`zM ${b+h} ${u+h}h `+(l-2*h)+"v "+(l-2*h)+"h "+(2*h-l)+"z")}}))}_basicExtraRounded(m){const{size:l,x:b,y:u}=m,h=l/7;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","path"),this._element.setAttribute("clip-rule","evenodd"),this._element.setAttribute("d",`M ${b} ${u+2.5*h}v `+2*h+`a ${2.5*h} ${2.5*h}, 0, 0, 0, ${2.5*h} ${2.5*h}h `+2*h+`a ${2.5*h} ${2.5*h}, 0, 0, 0, ${2.5*h} ${2.5*-h}v `+-2*h+`a ${2.5*h} ${2.5*h}, 0, 0, 0, ${2.5*-h} ${2.5*-h}h `+-2*h+`a ${2.5*h} ${2.5*h}, 0, 0, 0, ${2.5*-h} ${2.5*h}M ${b+2.5*h} ${u+h}h `+2*h+`a ${1.5*h} ${1.5*h}, 0, 0, 1, ${1.5*h} ${1.5*h}v `+2*h+`a ${1.5*h} ${1.5*h}, 0, 0, 1, ${1.5*-h} ${1.5*h}h `+-2*h+`a ${1.5*h} ${1.5*h}, 0, 0, 1, ${1.5*-h} ${1.5*-h}v `+-2*h+`a ${1.5*h} ${1.5*h}, 0, 0, 1, ${1.5*h} ${1.5*-h}`)}}))}_drawDot({x:m,y:l,size:b,rotation:u}){this._basicDot({x:m,y:l,size:b,rotation:u})}_drawSquare({x:m,y:l,size:b,rotation:u}){this._basicSquare({x:m,y:l,size:b,rotation:u})}_drawExtraRounded({x:m,y:l,size:b,rotation:u}){this._basicExtraRounded({x:m,y:l,size:b,rotation:u})}}class w{constructor({svg:m,type:l,window:b}){this._svg=m,this._type=l,this._window=b}draw(m,l,b,u){let h;h=this._type==="square"?this._drawSquare:this._drawDot,h.call(this,{x:m,y:l,size:b,rotation:u})}_rotateFigure({x:m,y:l,size:b,rotation:u=0,draw:h}){var g;const v=m+b/2,A=l+b/2;h(),(g=this._element)===null||g===void 0||g.setAttribute("transform",`rotate(${180*u/Math.PI},${v},${A})`)}_basicDot(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","circle"),this._element.setAttribute("cx",String(b+l/2)),this._element.setAttribute("cy",String(u+l/2)),this._element.setAttribute("r",String(l/2))}}))}_basicSquare(m){const{size:l,x:b,y:u}=m;this._rotateFigure(Object.assign(Object.assign({},m),{draw:()=>{this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","rect"),this._element.setAttribute("x",String(b)),this._element.setAttribute("y",String(u)),this._element.setAttribute("width",String(l)),this._element.setAttribute("height",String(l))}}))}_drawDot({x:m,y:l,size:b,rotation:u}){this._basicDot({x:m,y:l,size:b,rotation:u})}_drawSquare({x:m,y:l,size:b,rotation:u}){this._basicSquare({x:m,y:l,size:b,rotation:u})}}const x="circle",L=[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]],j=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,1,1,1,0,0],[0,0,1,1,1,0,0],[0,0,1,1,1,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];class q{constructor(m,l){this._roundSize=b=>this._options.dotsOptions.roundSize?Math.floor(b):b,this._window=l,this._element=this._window.document.createElementNS("http://www.w3.org/2000/svg","svg"),this._element.setAttribute("width",String(m.width)),this._element.setAttribute("height",String(m.height)),this._element.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),m.dotsOptions.roundSize||this._element.setAttribute("shape-rendering","crispEdges"),this._element.setAttribute("viewBox",`0 0 ${m.width} ${m.height}`),this._defs=this._window.document.createElementNS("http://www.w3.org/2000/svg","defs"),this._element.appendChild(this._defs),this._imageUri=m.image,this._instanceId=q.instanceCount++,this._options=m}get width(){return this._options.width}get height(){return this._options.height}getElement(){return this._element}async drawQR(m){const l=m.getModuleCount(),b=Math.min(this._options.width,this._options.height)-2*this._options.margin,u=this._options.shape===x?b/Math.sqrt(2):b,h=this._roundSize(u/l);let g={hideXDots:0,hideYDots:0,width:0,height:0};if(this._qr=m,this._options.image){if(await this.loadImage(),!this._image)return;const{imageOptions:v,qrOptions:A}=this._options,S=v.imageSize*d[A.errorCorrectionLevel],M=Math.floor(S*l*l);g=function({originalHeight:B,originalWidth:z,maxHiddenDots:O,maxHiddenAxisDots:K,dotSize:ae}){const G={x:0,y:0},se={x:0,y:0};if(B<=0||z<=0||O<=0||ae<=0)return{height:0,width:0,hideYDots:0,hideXDots:0};const Q=B/z;return G.x=Math.floor(Math.sqrt(O/Q)),G.x<=0&&(G.x=1),K&&K<G.x&&(G.x=K),G.x%2==0&&G.x--,se.x=G.x*ae,G.y=1+2*Math.ceil((G.x*Q-1)/2),se.y=Math.round(se.x*Q),(G.y*G.x>O||K&&K<G.y)&&(K&&K<G.y?(G.y=K,G.y%2==0&&G.x--):G.y-=2,se.y=G.y*ae,G.x=1+2*Math.ceil((G.y/Q-1)/2),se.x=Math.round(se.y/Q)),{height:se.y,width:se.x,hideYDots:G.y,hideXDots:G.x}}({originalWidth:this._image.width,originalHeight:this._image.height,maxHiddenDots:M,maxHiddenAxisDots:l-14,dotSize:h})}this.drawBackground(),this.drawDots((v,A)=>{var S,M,B,z,O,K;return!(this._options.imageOptions.hideBackgroundDots&&v>=(l-g.hideYDots)/2&&v<(l+g.hideYDots)/2&&A>=(l-g.hideXDots)/2&&A<(l+g.hideXDots)/2||!((S=L[v])===null||S===void 0)&&S[A]||!((M=L[v-l+7])===null||M===void 0)&&M[A]||!((B=L[v])===null||B===void 0)&&B[A-l+7]||!((z=j[v])===null||z===void 0)&&z[A]||!((O=j[v-l+7])===null||O===void 0)&&O[A]||!((K=j[v])===null||K===void 0)&&K[A-l+7])}),this.drawCorners(),this._options.image&&await this.drawImage({width:g.width,height:g.height,count:l,dotSize:h})}drawBackground(){var m,l,b;const u=this._element,h=this._options;if(u){const g=(m=h.backgroundOptions)===null||m===void 0?void 0:m.gradient,v=(l=h.backgroundOptions)===null||l===void 0?void 0:l.color;let A=h.height,S=h.width;if(g||v){const M=this._window.document.createElementNS("http://www.w3.org/2000/svg","rect");this._backgroundClipPath=this._window.document.createElementNS("http://www.w3.org/2000/svg","clipPath"),this._backgroundClipPath.setAttribute("id",`clip-path-background-color-${this._instanceId}`),this._defs.appendChild(this._backgroundClipPath),!((b=h.backgroundOptions)===null||b===void 0)&&b.round&&(A=S=Math.min(h.width,h.height),M.setAttribute("rx",String(A/2*h.backgroundOptions.round))),M.setAttribute("x",String(this._roundSize((h.width-S)/2))),M.setAttribute("y",String(this._roundSize((h.height-A)/2))),M.setAttribute("width",String(S)),M.setAttribute("height",String(A)),this._backgroundClipPath.appendChild(M),this._createColor({options:g,color:v,additionalRotation:0,x:0,y:0,height:h.height,width:h.width,name:`background-color-${this._instanceId}`})}}}drawDots(m){var l,b;if(!this._qr)throw"QR code is not defined";const u=this._options,h=this._qr.getModuleCount();if(h>u.width||h>u.height)throw"The canvas is too small.";const g=Math.min(u.width,u.height)-2*u.margin,v=u.shape===x?g/Math.sqrt(2):g,A=this._roundSize(v/h),S=this._roundSize((u.width-h*A)/2),M=this._roundSize((u.height-h*A)/2),B=new p({svg:this._element,type:u.dotsOptions.type,window:this._window});this._dotsClipPath=this._window.document.createElementNS("http://www.w3.org/2000/svg","clipPath"),this._dotsClipPath.setAttribute("id",`clip-path-dot-color-${this._instanceId}`),this._defs.appendChild(this._dotsClipPath),this._createColor({options:(l=u.dotsOptions)===null||l===void 0?void 0:l.gradient,color:u.dotsOptions.color,additionalRotation:0,x:0,y:0,height:u.height,width:u.width,name:`dot-color-${this._instanceId}`});for(let z=0;z<h;z++)for(let O=0;O<h;O++)m&&!m(z,O)||!((b=this._qr)===null||b===void 0)&&b.isDark(z,O)&&(B.draw(S+O*A,M+z*A,A,(K,ae)=>!(O+K<0||z+ae<0||O+K>=h||z+ae>=h)&&!(m&&!m(z+ae,O+K))&&!!this._qr&&this._qr.isDark(z+ae,O+K)),B._element&&this._dotsClipPath&&this._dotsClipPath.appendChild(B._element));if(u.shape===x){const z=this._roundSize((g/A-h)/2),O=h+2*z,K=S-z*A,ae=M-z*A,G=[],se=this._roundSize(O/2);for(let Q=0;Q<O;Q++){G[Q]=[];for(let H=0;H<O;H++)Q>=z-1&&Q<=O-z&&H>=z-1&&H<=O-z||Math.sqrt((Q-se)*(Q-se)+(H-se)*(H-se))>se?G[Q][H]=0:G[Q][H]=this._qr.isDark(H-2*z<0?H:H>=h?H-2*z:H-z,Q-2*z<0?Q:Q>=h?Q-2*z:Q-z)?1:0}for(let Q=0;Q<O;Q++)for(let H=0;H<O;H++)G[Q][H]&&(B.draw(K+H*A,ae+Q*A,A,(k,R)=>{var _;return!!(!((_=G[Q+R])===null||_===void 0)&&_[H+k])}),B._element&&this._dotsClipPath&&this._dotsClipPath.appendChild(B._element))}}drawCorners(){if(!this._qr)throw"QR code is not defined";const m=this._element,l=this._options;if(!m)throw"Element code is not defined";const b=this._qr.getModuleCount(),u=Math.min(l.width,l.height)-2*l.margin,h=l.shape===x?u/Math.sqrt(2):u,g=this._roundSize(h/b),v=7*g,A=3*g,S=this._roundSize((l.width-b*g)/2),M=this._roundSize((l.height-b*g)/2);[[0,0,0],[1,0,Math.PI/2],[0,1,-Math.PI/2]].forEach(([B,z,O])=>{var K,ae,G,se,Q,H,k,R,_,F,E,$;const Z=S+B*g*(b-7),W=M+z*g*(b-7);let ie=this._dotsClipPath,ne=this._dotsClipPath;if((!((K=l.cornersSquareOptions)===null||K===void 0)&&K.gradient||!((ae=l.cornersSquareOptions)===null||ae===void 0)&&ae.color)&&(ie=this._window.document.createElementNS("http://www.w3.org/2000/svg","clipPath"),ie.setAttribute("id",`clip-path-corners-square-color-${B}-${z}-${this._instanceId}`),this._defs.appendChild(ie),this._cornersSquareClipPath=this._cornersDotClipPath=ne=ie,this._createColor({options:(G=l.cornersSquareOptions)===null||G===void 0?void 0:G.gradient,color:(se=l.cornersSquareOptions)===null||se===void 0?void 0:se.color,additionalRotation:O,x:Z,y:W,height:v,width:v,name:`corners-square-color-${B}-${z}-${this._instanceId}`})),(Q=l.cornersSquareOptions)===null||Q===void 0?void 0:Q.type){const ee=new f({svg:this._element,type:l.cornersSquareOptions.type,window:this._window});ee.draw(Z,W,v,O),ee._element&&ie&&ie.appendChild(ee._element)}else{const ee=new p({svg:this._element,type:l.dotsOptions.type,window:this._window});for(let ce=0;ce<L.length;ce++)for(let le=0;le<L[ce].length;le++)!((H=L[ce])===null||H===void 0)&&H[le]&&(ee.draw(Z+le*g,W+ce*g,g,(pe,de)=>{var X;return!!(!((X=L[ce+de])===null||X===void 0)&&X[le+pe])}),ee._element&&ie&&ie.appendChild(ee._element))}if((!((k=l.cornersDotOptions)===null||k===void 0)&&k.gradient||!((R=l.cornersDotOptions)===null||R===void 0)&&R.color)&&(ne=this._window.document.createElementNS("http://www.w3.org/2000/svg","clipPath"),ne.setAttribute("id",`clip-path-corners-dot-color-${B}-${z}-${this._instanceId}`),this._defs.appendChild(ne),this._cornersDotClipPath=ne,this._createColor({options:(_=l.cornersDotOptions)===null||_===void 0?void 0:_.gradient,color:(F=l.cornersDotOptions)===null||F===void 0?void 0:F.color,additionalRotation:O,x:Z+2*g,y:W+2*g,height:A,width:A,name:`corners-dot-color-${B}-${z}-${this._instanceId}`})),(E=l.cornersDotOptions)===null||E===void 0?void 0:E.type){const ee=new w({svg:this._element,type:l.cornersDotOptions.type,window:this._window});ee.draw(Z+2*g,W+2*g,A,O),ee._element&&ne&&ne.appendChild(ee._element)}else{const ee=new p({svg:this._element,type:l.dotsOptions.type,window:this._window});for(let ce=0;ce<j.length;ce++)for(let le=0;le<j[ce].length;le++)!(($=j[ce])===null||$===void 0)&&$[le]&&(ee.draw(Z+le*g,W+ce*g,g,(pe,de)=>{var X;return!!(!((X=j[ce+de])===null||X===void 0)&&X[le+pe])}),ee._element&&ne&&ne.appendChild(ee._element))}})}loadImage(){return new Promise((m,l)=>{var b;const u=this._options;if(!u.image)return l("Image is not defined");if(!((b=u.nodeCanvas)===null||b===void 0)&&b.loadImage)u.nodeCanvas.loadImage(u.image).then(h=>{var g,v;if(this._image=h,this._options.imageOptions.saveAsBlob){const A=(g=u.nodeCanvas)===null||g===void 0?void 0:g.createCanvas(this._image.width,this._image.height);(v=A==null?void 0:A.getContext("2d"))===null||v===void 0||v.drawImage(h,0,0),this._imageUri=A==null?void 0:A.toDataURL()}m()}).catch(l);else{const h=new this._window.Image;typeof u.imageOptions.crossOrigin=="string"&&(h.crossOrigin=u.imageOptions.crossOrigin),this._image=h,h.onload=async()=>{this._options.imageOptions.saveAsBlob&&(this._imageUri=await async function(g,v){return new Promise(A=>{const S=new v.XMLHttpRequest;S.onload=function(){const M=new v.FileReader;M.onloadend=function(){A(M.result)},M.readAsDataURL(S.response)},S.open("GET",g),S.responseType="blob",S.send()})}(u.image||"",this._window)),m()},h.src=u.image}})}async drawImage({width:m,height:l,count:b,dotSize:u}){const h=this._options,g=this._roundSize((h.width-b*u)/2),v=this._roundSize((h.height-b*u)/2),A=g+this._roundSize(h.imageOptions.margin+(b*u-m)/2),S=v+this._roundSize(h.imageOptions.margin+(b*u-l)/2),M=m-2*h.imageOptions.margin,B=l-2*h.imageOptions.margin,z=this._window.document.createElementNS("http://www.w3.org/2000/svg","image");z.setAttribute("href",this._imageUri||""),z.setAttribute("x",String(A)),z.setAttribute("y",String(S)),z.setAttribute("width",`${M}px`),z.setAttribute("height",`${B}px`),this._element.appendChild(z)}_createColor({options:m,color:l,additionalRotation:b,x:u,y:h,height:g,width:v,name:A}){const S=v>g?v:g,M=this._window.document.createElementNS("http://www.w3.org/2000/svg","rect");if(M.setAttribute("x",String(u)),M.setAttribute("y",String(h)),M.setAttribute("height",String(g)),M.setAttribute("width",String(v)),M.setAttribute("clip-path",`url('#clip-path-${A}')`),m){let B;if(m.type==="radial")B=this._window.document.createElementNS("http://www.w3.org/2000/svg","radialGradient"),B.setAttribute("id",A),B.setAttribute("gradientUnits","userSpaceOnUse"),B.setAttribute("fx",String(u+v/2)),B.setAttribute("fy",String(h+g/2)),B.setAttribute("cx",String(u+v/2)),B.setAttribute("cy",String(h+g/2)),B.setAttribute("r",String(S/2));else{const z=((m.rotation||0)+b)%(2*Math.PI),O=(z+2*Math.PI)%(2*Math.PI);let K=u+v/2,ae=h+g/2,G=u+v/2,se=h+g/2;O>=0&&O<=.25*Math.PI||O>1.75*Math.PI&&O<=2*Math.PI?(K-=v/2,ae-=g/2*Math.tan(z),G+=v/2,se+=g/2*Math.tan(z)):O>.25*Math.PI&&O<=.75*Math.PI?(ae-=g/2,K-=v/2/Math.tan(z),se+=g/2,G+=v/2/Math.tan(z)):O>.75*Math.PI&&O<=1.25*Math.PI?(K+=v/2,ae+=g/2*Math.tan(z),G-=v/2,se-=g/2*Math.tan(z)):O>1.25*Math.PI&&O<=1.75*Math.PI&&(ae+=g/2,K+=v/2/Math.tan(z),se-=g/2,G-=v/2/Math.tan(z)),B=this._window.document.createElementNS("http://www.w3.org/2000/svg","linearGradient"),B.setAttribute("id",A),B.setAttribute("gradientUnits","userSpaceOnUse"),B.setAttribute("x1",String(Math.round(K))),B.setAttribute("y1",String(Math.round(ae))),B.setAttribute("x2",String(Math.round(G))),B.setAttribute("y2",String(Math.round(se)))}m.colorStops.forEach(({offset:z,color:O})=>{const K=this._window.document.createElementNS("http://www.w3.org/2000/svg","stop");K.setAttribute("offset",100*z+"%"),K.setAttribute("stop-color",O),B.appendChild(K)}),M.setAttribute("fill",`url('#${A}')`),this._defs.appendChild(B)}else l&&M.setAttribute("fill",l);this._element.appendChild(M)}}q.instanceCount=0;const T=q,C="canvas",P={};for(let U=0;U<=40;U++)P[U]=U;const D={type:C,shape:"square",width:300,height:300,data:"",margin:0,qrOptions:{typeNumber:P[0],mode:void 0,errorCorrectionLevel:"Q"},imageOptions:{saveAsBlob:!0,hideBackgroundDots:!0,imageSize:.4,crossOrigin:void 0,margin:0},dotsOptions:{type:"square",color:"#000",roundSize:!0},backgroundOptions:{round:0,color:"#fff"}};function I(U){const m=Object.assign({},U);if(!m.colorStops||!m.colorStops.length)throw"Field 'colorStops' is required in gradient";return m.rotation?m.rotation=Number(m.rotation):m.rotation=0,m.colorStops=m.colorStops.map(l=>Object.assign(Object.assign({},l),{offset:Number(l.offset)})),m}function J(U){const m=Object.assign({},U);return m.width=Number(m.width),m.height=Number(m.height),m.margin=Number(m.margin),m.imageOptions=Object.assign(Object.assign({},m.imageOptions),{hideBackgroundDots:!!m.imageOptions.hideBackgroundDots,imageSize:Number(m.imageOptions.imageSize),margin:Number(m.imageOptions.margin)}),m.margin>Math.min(m.width,m.height)&&(m.margin=Math.min(m.width,m.height)),m.dotsOptions=Object.assign({},m.dotsOptions),m.dotsOptions.gradient&&(m.dotsOptions.gradient=I(m.dotsOptions.gradient)),m.cornersSquareOptions&&(m.cornersSquareOptions=Object.assign({},m.cornersSquareOptions),m.cornersSquareOptions.gradient&&(m.cornersSquareOptions.gradient=I(m.cornersSquareOptions.gradient))),m.cornersDotOptions&&(m.cornersDotOptions=Object.assign({},m.cornersDotOptions),m.cornersDotOptions.gradient&&(m.cornersDotOptions.gradient=I(m.cornersDotOptions.gradient))),m.backgroundOptions&&(m.backgroundOptions=Object.assign({},m.backgroundOptions),m.backgroundOptions.gradient&&(m.backgroundOptions.gradient=I(m.backgroundOptions.gradient))),m}var Y=n(873),V=n.n(Y);function N(U){if(!U)throw new Error("Extension must be defined");U[0]==="."&&(U=U.substring(1));const m={bmp:"image/bmp",gif:"image/gif",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",png:"image/png",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",webp:"image/webp",pdf:"application/pdf"}[U.toLowerCase()];if(!m)throw new Error(`Extension "${U}" is not supported`);return m}class oe{constructor(m){m!=null&&m.jsdom?this._window=new m.jsdom("",{resources:"usable"}).window:this._window=window,this._options=m?J(r(D,m)):D,this.update()}static _clearContainer(m){m&&(m.innerHTML="")}_setupSvg(){if(!this._qr)return;const m=new T(this._options,this._window);this._svg=m.getElement(),this._svgDrawingPromise=m.drawQR(this._qr).then(()=>{var l;this._svg&&((l=this._extension)===null||l===void 0||l.call(this,m.getElement(),this._options))})}_setupCanvas(){var m,l;this._qr&&(!((m=this._options.nodeCanvas)===null||m===void 0)&&m.createCanvas?(this._nodeCanvas=this._options.nodeCanvas.createCanvas(this._options.width,this._options.height),this._nodeCanvas.width=this._options.width,this._nodeCanvas.height=this._options.height):(this._domCanvas=document.createElement("canvas"),this._domCanvas.width=this._options.width,this._domCanvas.height=this._options.height),this._setupSvg(),this._canvasDrawingPromise=(l=this._svgDrawingPromise)===null||l===void 0?void 0:l.then(()=>{var b;if(!this._svg)return;const u=this._svg,h=new this._window.XMLSerializer().serializeToString(u),g=btoa(h),v=`data:${N("svg")};base64,${g}`;if(!((b=this._options.nodeCanvas)===null||b===void 0)&&b.loadImage)return this._options.nodeCanvas.loadImage(v).then(A=>{var S,M;A.width=this._options.width,A.height=this._options.height,(M=(S=this._nodeCanvas)===null||S===void 0?void 0:S.getContext("2d"))===null||M===void 0||M.drawImage(A,0,0)});{const A=new this._window.Image;return new Promise(S=>{A.onload=()=>{var M,B;(B=(M=this._domCanvas)===null||M===void 0?void 0:M.getContext("2d"))===null||B===void 0||B.drawImage(A,0,0),S()},A.src=v})}}))}async _getElement(m="png"){if(!this._qr)throw"QR code is empty";return m.toLowerCase()==="svg"?(this._svg&&this._svgDrawingPromise||this._setupSvg(),await this._svgDrawingPromise,this._svg):((this._domCanvas||this._nodeCanvas)&&this._canvasDrawingPromise||this._setupCanvas(),await this._canvasDrawingPromise,this._domCanvas||this._nodeCanvas)}update(m){oe._clearContainer(this._container),this._options=m?J(r(this._options,m)):this._options,this._options.data&&(this._qr=V()(this._options.qrOptions.typeNumber,this._options.qrOptions.errorCorrectionLevel),this._qr.addData(this._options.data,this._options.qrOptions.mode||function(l){switch(!0){case/^[0-9]*$/.test(l):return"Numeric";case/^[0-9A-Z $%*+\-./:]*$/.test(l):return"Alphanumeric";default:return"Byte"}}(this._options.data)),this._qr.make(),this._options.type===C?this._setupCanvas():this._setupSvg(),this.append(this._container))}append(m){if(m){if(typeof m.appendChild!="function")throw"Container should be a single DOM node";this._options.type===C?this._domCanvas&&m.appendChild(this._domCanvas):this._svg&&m.appendChild(this._svg),this._container=m}}applyExtension(m){if(!m)throw"Extension function should be defined.";this._extension=m,this.update()}deleteExtension(){this._extension=void 0,this.update()}async getRawData(m="png"){if(!this._qr)throw"QR code is empty";const l=await this._getElement(m),b=N(m);if(!l)return null;if(m.toLowerCase()==="svg"){const u=`<?xml version="1.0" standalone="no"?>\r
${new this._window.XMLSerializer().serializeToString(l)}`;return typeof Blob>"u"||this._options.jsdom?Buffer.from(u):new Blob([u],{type:b})}return new Promise(u=>{const h=l;if("toBuffer"in h)if(b==="image/png")u(h.toBuffer(b));else if(b==="image/jpeg")u(h.toBuffer(b));else{if(b!=="application/pdf")throw Error("Unsupported extension");u(h.toBuffer(b))}else"toBlob"in h&&h.toBlob(u,b,1)})}async download(m){if(!this._qr)throw"QR code is empty";if(typeof Blob>"u")throw"Cannot download in Node.js, call getRawData instead.";let l="png",b="qr";typeof m=="string"?(l=m,console.warn("Extension is deprecated as argument for 'download' method, please pass object { name: '...', extension: '...' } as argument")):typeof m=="object"&&m!==null&&(m.name&&(b=m.name),m.extension&&(l=m.extension));const u=await this._getElement(l);if(u)if(l.toLowerCase()==="svg"){let h=new XMLSerializer().serializeToString(u);h=`<?xml version="1.0" standalone="no"?>\r
`+h,c(`data:${N(l)};charset=utf-8,${encodeURIComponent(h)}`,`${b}.svg`)}else c(u.toDataURL(N(l)),`${b}.${l}`)}}const fe=oe})(),i.default})())}(He)),He.exports}var ta=ea();const aa=Zt(ta),tt=()=>`
        <!-- Template for hotspots -->
        <button data-hotspot slot="hotspot-dot+X-Y+Z" class="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dim+X-Y" class="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dot+X-Y-Z" class="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dim+X-Z" class="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
        <button data-hotspot slot="hotspot-dot+X+Y-Z" class="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
        <button data-hotspot slot="hotspot-dim+Y-Z" class="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
        <button data-hotspot slot="hotspot-dot-X+Y-Z" class="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
        <button data-hotspot slot="hotspot-dim-X-Z" class="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
        <button data-hotspot slot="hotspot-dot-X-Y-Z" class="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
        <button data-hotspot slot="hotspot-dim-X-Y" class="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
        <button data-hotspot slot="hotspot-dot-X-Y+Z" class="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
        <svg id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dimensionLineContainer">
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
            <line class="dimensionLine"></line>
        </svg>
    `;function at(o){let e="";function t(i){return i.trim().startsWith("@media")}function a(i){return i.replace(/([A-Z])/g,"-$1").toLowerCase()}function n(i,s){let r="";const c="  ".repeat(s);for(const d in i)if(Object.prototype.hasOwnProperty.call(i,d)){const p=i[d];if(typeof p=="object"&&!Array.isArray(p))r+=`
${c}${d} {`,r+=n(p,s+1),r+=`
${c}}`;else{const f=a(d);r+=`
${c}${f}: ${p};`}}return r}for(const i in o)if(Object.prototype.hasOwnProperty.call(o,i)){const s=o[i];typeof s=="object"?(e+=`${i} {`,t(i),e+=n(s,1),e+=`
}
`):typeof s=="string"&&(e+=`${i} {
  ${s}
}
`)}return e}const ze="https://cdn.statically.io/gh/ardisplaycorp/bridge/v2.0.2/build",Ve="https://ardisplaybridge.vercel.app",na={".normal-view-container":{width:"100%",height:"100%",display:"block",fontFamily:"sans-serif",position:"relative"},".ardisplay-qr-code-button":{all:"unset",position:"absolute",top:"10px",right:"50%",transform:"translateX(50%)",background:"white",cursor:"pointer",padding:"10px",zIndex:"1000",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",boxSizing:"border-box"}},ia=(o,e,t,a,n,i,s)=>{const r=at(na),c=tt();return`
        <!-- Template for modal view -->
        <style>${r}</style>
        <div class="normal-view-container" style="direction: ltr;">
            <model-viewer
                ar
                shadow-intensity="${i.shadow}"
                ar-placement="${i.options&&i.options.length>0&&i.options[0].placement||i.placement}"
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="fixed"
                camera-controls="true"
                disable-pan="true"
                disable-tap="true"
                interaction-prompt="none"
                interpolation-decay="40"
                touch-action="none"
                max-field-of-view="auto"
                field-of-view="auto"
                camera-orbit="0deg 75deg 105%"
                ar-status="not-presenting"
            >
                ${c}
                <button class="ardisplay-qr-code-button" style="background-color: ${i.arBtn.btnBgColor};color: ${i.arBtn.btnTextColor};border-radius: ${i.arBtn.cornerRadius}px;font-size: ${i.arBtn.btnSize-6}px;text-wrap: nowrap;box-sizing: border-box;">
                    ${i.arBtn.btnIcon?`<i data-lucide="${i.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`:""}
                    ${i.arBtn.btnText}
                </button>
            </model-viewer>
        </div>
    `},sa={".ardisplay-custom-model-viewer-container":{position:"relative",width:"100%",height:"100%",display:"block",fontFamily:"sans-serif"},".ardisplay-preview-image":{width:"100%",height:"100%",objectFit:"cover",display:"block"},".ardisplay-view-3d-button":{bottom:"10px",right:"10px",padding:"10px 20px",backgroundColor:"rgba(0, 0, 0, 0.75)",color:"white",border:"none",borderRadius:"50px",cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"10px"},".ardisplay-view-3d-button svg":{fill:"white"}},oa=(o,e,t,a,n,i,s)=>`
        <!-- Template for modal view -->
        <style>${at(sa)}</style>
        <div class="ardisplay-custom-model-viewer-container" style="direction: ltr;">
            <button class="ardisplay-view-3d-button" style="background-color: ${i.arBtn.btnBgColor};color: ${i.arBtn.btnTextColor};border-radius: ${i.arBtn.cornerRadius}px;font-size: ${i.arBtn.btnSize-6}px;box-sizing: border-box;width: ${s?"100%":"fit-content"};">
                <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" class="pip-svg-icon pip-btn__icon"><path d="M11 16.9766c.3294.0154.663.0233 1 .0233 2.2351 0 4.3234-.3458 6-.9495 1.7881-.6438 4-1.8975 4-4.0505 0-1.9568-1.8939-3.1985-3.5147-3.864l-1.5605 1.5606C17.8623 9.9943 20 10.7292 20 11.9999c0 .9329-1.2789 1.5728-2 1.8958-1.8614.8335-3.9768 1.1042-6 1.1042-.3392 0-.6729-.0088-1-.0257v-1.9743l-3 3 3 3v2.0233zm2-9.9532A21.3903 21.3903 0 0 0 12.0001 7c-2.235 0-4.3234.3457-6 .9494-1.7881.6438-4 1.8976-4 4.0506 0 1.9568 1.894 3.1984 3.5146 3.8639l1.5606-1.5605C6.1378 14.0057 4 13.2707 4 12.0001c0-.9329 1.2789-1.5729 2-1.8958 1.8614-.8336 3.9767-1.1042 6-1.1042.3392 0 .6729.0087.9999.0257V11l3-3-3-3v2.0234z"></path></svg>
                <span>View in 3D</span>
            </button>
        </div>
    `,ra={"model-viewer":{top:0,left:0,opacity:0,zIndex:-100,position:"absolute"},".ardisplay-qr-code-button":{all:"unset",background:"white",cursor:"pointer",padding:"10px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",boxSizing:"border-box"}},ca=(o,e,t,a,n,i,s)=>{const r=at(ra),c=tt();return`
        <!-- Template for modal view -->
        <style>${r}</style>
        <button class="ardisplay-qr-code-button" style="background-color: ${i.arBtn.btnBgColor};color: ${i.arBtn.btnTextColor};border-radius: ${i.arBtn.cornerRadius}px;font-size: ${i.arBtn.btnSize-6}px;text-wrap: nowrap;direction: ltr;box-sizing: border-box;">
            ${i.arBtn.btnIcon?`<i data-lucide="${i.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`:""}
            ${i.arBtn.btnText}
        </button>
        <model-viewer
            ar
            shadow-intensity="${i.shadow}"
            ar-placement="${i.options&&i.options.length>0&&i.options[0].placement||i.placement}"
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="fixed"
            camera-controls="true"
            disable-pan="true"
            disable-tap="true"
            ar-status="not-presenting"
        >
            ${c}
        </model-viewer>
    `};/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=["svg",Te,[["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["path",{d:"M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=["svg",Te,[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=["svg",Te,[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=["svg",Te,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 18 4-4"}],["path",{d:"M8 10v8h8"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=["svg",Te,[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=["svg",Te,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]];async function Pe(){if(!window.customElements.get("model-viewer"))try{return await import("@google/model-viewer"),!0}catch(o){return console.error("Failed to load model-viewer:",o),!1}return!0}function kt(o,e){if(e===y.TrianglesDrawMode)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===y.TriangleFanDrawMode||e===y.TriangleStripDrawMode){let t=o.getIndex();if(t===null){const s=[],r=o.getAttribute("position");if(r!==void 0){for(let c=0;c<r.count;c++)s.push(c);o.setIndex(s),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const a=t.count-2,n=[];if(e===y.TriangleFanDrawMode)for(let s=1;s<=a;s++)n.push(t.getX(0)),n.push(t.getX(s)),n.push(t.getX(s+1));else for(let s=0;s<a;s++)s%2===0?(n.push(t.getX(s)),n.push(t.getX(s+1)),n.push(t.getX(s+2))):(n.push(t.getX(s+2)),n.push(t.getX(s+1)),n.push(t.getX(s)));n.length/3!==a&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const i=o.clone();return i.setIndex(n),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}class fa extends y.Loader{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ya(t)}),this.register(function(t){return new xa(t)}),this.register(function(t){return new Ra(t)}),this.register(function(t){return new Fa(t)}),this.register(function(t){return new Ta(t)}),this.register(function(t){return new ka(t)}),this.register(function(t){return new Sa(t)}),this.register(function(t){return new _a(t)}),this.register(function(t){return new Ma(t)}),this.register(function(t){return new va(t)}),this.register(function(t){return new La(t)}),this.register(function(t){return new Aa(t)}),this.register(function(t){return new ja(t)}),this.register(function(t){return new Ca(t)}),this.register(function(t){return new ma(t)}),this.register(function(t){return new Ea(t)}),this.register(function(t){return new qa(t)})}load(e,t,a,n){const i=this;let s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){const d=y.LoaderUtils.extractUrlBase(e);s=y.LoaderUtils.resolveURL(d,this.path)}else s=y.LoaderUtils.extractUrlBase(e);this.manager.itemStart(e);const r=function(d){n?n(d):console.error(d),i.manager.itemError(e),i.manager.itemEnd(e)},c=new y.FileLoader(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(d){try{i.parse(d,s,function(p){t(p),i.manager.itemEnd(e)},r)}catch(p){r(p)}},a,r)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,a,n){let i;const s={},r={},c=new TextDecoder;if(typeof e=="string")i=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===St){try{s[te.KHR_BINARY_GLTF]=new Da(e)}catch(f){n&&n(f);return}i=JSON.parse(s[te.KHR_BINARY_GLTF].content)}else i=JSON.parse(c.decode(e));else i=e;if(i.asset===void 0||i.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const d=new Xa(i,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});d.fileLoader.setRequestHeader(this.requestHeader);for(let p=0;p<this.pluginCallbacks.length;p++){const f=this.pluginCallbacks[p](d);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),r[f.name]=f,s[f.name]=!0}if(i.extensionsUsed)for(let p=0;p<i.extensionsUsed.length;++p){const f=i.extensionsUsed[p],w=i.extensionsRequired||[];switch(f){case te.KHR_MATERIALS_UNLIT:s[f]=new wa;break;case te.KHR_DRACO_MESH_COMPRESSION:s[f]=new za(i,this.dracoLoader);break;case te.KHR_TEXTURE_TRANSFORM:s[f]=new Pa;break;case te.KHR_MESH_QUANTIZATION:s[f]=new Oa;break;default:w.indexOf(f)>=0&&r[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}d.setExtensions(s),d.setPlugins(r),d.parse(a,n)}parseAsync(e,t){const a=this;return new Promise(function(n,i){a.parse(e,t,n,i)})}}function ga(){let o={};return{get:function(e){return o[e]},add:function(e,t){o[e]=t},remove:function(e){delete o[e]},removeAll:function(){o={}}}}const te={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ma{constructor(e){this.parser=e,this.name=te.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let a=0,n=t.length;a<n;a++){const i=t[a];i.extensions&&i.extensions[this.name]&&i.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,i.extensions[this.name].light)}}_loadLight(e){const t=this.parser,a="light:"+e;let n=t.cache.get(a);if(n)return n;const i=t.json,c=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e];let d;const p=new y.Color(16777215);c.color!==void 0&&p.setRGB(c.color[0],c.color[1],c.color[2],y.LinearSRGBColorSpace);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":d=new y.DirectionalLight(p),d.target.position.set(0,0,-1),d.add(d.target);break;case"point":d=new y.PointLight(p),d.distance=f;break;case"spot":d=new y.SpotLight(p),d.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,d.angle=c.spot.outerConeAngle,d.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,d.target.position.set(0,0,-1),d.add(d.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return d.position.set(0,0,0),d.decay=2,ke(d,c),c.intensity!==void 0&&(d.intensity=c.intensity),d.name=t.createUniqueName(c.name||"light_"+e),n=Promise.resolve(d),t.cache.add(a,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,a=this.parser,i=a.json.nodes[e],r=(i.extensions&&i.extensions[this.name]||{}).light;return r===void 0?null:this._loadLight(r).then(function(c){return a._getNodeRef(t.cache,r,c)})}}class wa{constructor(){this.name=te.KHR_MATERIALS_UNLIT}getMaterialType(){return y.MeshBasicMaterial}extendParams(e,t,a){const n=[];e.color=new y.Color(1,1,1),e.opacity=1;const i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){const s=i.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],y.LinearSRGBColorSpace),e.opacity=s[3]}i.baseColorTexture!==void 0&&n.push(a.assignTexture(e,"map",i.baseColorTexture,y.SRGBColorSpace))}return Promise.all(n)}}class va{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=n.extensions[this.name].emissiveStrength;return i!==void 0&&(t.emissiveIntensity=i),Promise.resolve()}}class ya{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&i.push(a.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&i.push(a.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(i.push(a.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){const r=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new y.Vector2(r,r)}return Promise.all(i)}}class xa{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_DISPERSION}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=n.extensions[this.name];return t.dispersion=i.dispersion!==void 0?i.dispersion:0,Promise.resolve()}}class Aa{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&i.push(a.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&i.push(a.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(i)}}class ka{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_SHEEN}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[];t.sheenColor=new y.Color(0,0,0),t.sheenRoughness=0,t.sheen=1;const s=n.extensions[this.name];if(s.sheenColorFactor!==void 0){const r=s.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],y.LinearSRGBColorSpace)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&i.push(a.assignTexture(t,"sheenColorMap",s.sheenColorTexture,y.SRGBColorSpace)),s.sheenRoughnessTexture!==void 0&&i.push(a.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(i)}}class Sa{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&i.push(a.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(i)}}class _a{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_VOLUME}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];t.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&i.push(a.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;const r=s.attenuationColor||[1,1,1];return t.attenuationColor=new y.Color().setRGB(r[0],r[1],r[2],y.LinearSRGBColorSpace),Promise.all(i)}}class Ma{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_IOR}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=n.extensions[this.name];return t.ior=i.ior!==void 0?i.ior:1.5,Promise.resolve()}}class La{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_SPECULAR}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];t.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&i.push(a.assignTexture(t,"specularIntensityMap",s.specularTexture));const r=s.specularColorFactor||[1,1,1];return t.specularColor=new y.Color().setRGB(r[0],r[1],r[2],y.LinearSRGBColorSpace),s.specularColorTexture!==void 0&&i.push(a.assignTexture(t,"specularColorMap",s.specularColorTexture,y.SRGBColorSpace)),Promise.all(i)}}class Ca{constructor(e){this.parser=e,this.name=te.EXT_MATERIALS_BUMP}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];return t.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&i.push(a.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(i)}}class ja{constructor(e){this.parser=e,this.name=te.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const a=this.parser.json.materials[e];return!a.extensions||!a.extensions[this.name]?null:y.MeshPhysicalMaterial}extendMaterialParams(e,t){const a=this.parser,n=a.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const i=[],s=n.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&i.push(a.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(i)}}class Ra{constructor(e){this.parser=e,this.name=te.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,a=t.json,n=a.textures[e];if(!n.extensions||!n.extensions[this.name])return null;const i=n.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(a.extensionsRequired&&a.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,i.source,s)}}class Fa{constructor(e){this.parser=e,this.name=te.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,a=this.parser,n=a.json,i=n.textures[e];if(!i.extensions||!i.extensions[t])return null;const s=i.extensions[t],r=n.images[s.source];let c=a.textureLoader;if(r.uri){const d=a.options.manager.getHandler(r.uri);d!==null&&(c=d)}return this.detectSupport().then(function(d){if(d)return a.loadTextureImage(e,s.source,c);if(n.extensionsRequired&&n.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return a.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ta{constructor(e){this.parser=e,this.name=te.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,a=this.parser,n=a.json,i=n.textures[e];if(!i.extensions||!i.extensions[t])return null;const s=i.extensions[t],r=n.images[s.source];let c=a.textureLoader;if(r.uri){const d=a.options.manager.getHandler(r.uri);d!==null&&(c=d)}return this.detectSupport().then(function(d){if(d)return a.loadTextureImage(e,s.source,c);if(n.extensionsRequired&&n.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return a.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ea{constructor(e){this.name=te.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,a=t.bufferViews[e];if(a.extensions&&a.extensions[this.name]){const n=a.extensions[this.name],i=this.parser.getDependency("buffer",n.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return i.then(function(r){const c=n.byteOffset||0,d=n.byteLength||0,p=n.count,f=n.byteStride,w=new Uint8Array(r,c,d);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(p,f,w,n.mode,n.filter).then(function(x){return x.buffer}):s.ready.then(function(){const x=new ArrayBuffer(p*f);return s.decodeGltfBuffer(new Uint8Array(x),p,f,w,n.mode,n.filter),x})})}else return null}}class qa{constructor(e){this.name=te.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,a=t.nodes[e];if(!a.extensions||!a.extensions[this.name]||a.mesh===void 0)return null;const n=t.meshes[a.mesh];for(const d of n.primitives)if(d.mode!==ve.TRIANGLES&&d.mode!==ve.TRIANGLE_STRIP&&d.mode!==ve.TRIANGLE_FAN&&d.mode!==void 0)return null;const s=a.extensions[this.name].attributes,r=[],c={};for(const d in s)r.push(this.parser.getDependency("accessor",s[d]).then(p=>(c[d]=p,c[d])));return r.length<1?null:(r.push(this.parser.createNodeMesh(e)),Promise.all(r).then(d=>{const p=d.pop(),f=p.isGroup?p.children:[p],w=d[0].count,x=[];for(const L of f){const j=new y.Matrix4,q=new y.Vector3,T=new y.Quaternion,C=new y.Vector3(1,1,1),P=new y.InstancedMesh(L.geometry,L.material,w);for(let D=0;D<w;D++)c.TRANSLATION&&q.fromBufferAttribute(c.TRANSLATION,D),c.ROTATION&&T.fromBufferAttribute(c.ROTATION,D),c.SCALE&&C.fromBufferAttribute(c.SCALE,D),P.setMatrixAt(D,j.compose(q,T,C));for(const D in c)if(D==="_COLOR_0"){const I=c[D];P.instanceColor=new y.InstancedBufferAttribute(I.array,I.itemSize,I.normalized)}else D!=="TRANSLATION"&&D!=="ROTATION"&&D!=="SCALE"&&L.geometry.setAttribute(D,c[D]);y.Object3D.prototype.copy.call(P,L),this.parser.assignFinalMaterial(P),x.push(P)}return p.isGroup?(p.clear(),p.add(...x),p):x[0]}))}}const St="glTF",Oe=12,_t={JSON:1313821514,BIN:5130562};class Da{constructor(e){this.name=te.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Oe),a=new TextDecoder;if(this.header={magic:a.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==St)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-Oe,i=new DataView(e,Oe);let s=0;for(;s<n;){const r=i.getUint32(s,!0);s+=4;const c=i.getUint32(s,!0);if(s+=4,c===_t.JSON){const d=new Uint8Array(e,Oe+s,r);this.content=a.decode(d)}else if(c===_t.BIN){const d=Oe+s;this.body=e.slice(d,d+r)}s+=r}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class za{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=te.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const a=this.json,n=this.dracoLoader,i=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,r={},c={},d={};for(const p in s){const f=it[p]||p.toLowerCase();r[f]=s[p]}for(const p in e.attributes){const f=it[p]||p.toLowerCase();if(s[p]!==void 0){const w=a.accessors[e.attributes[p]],x=Ee[w.componentType];d[f]=x.name,c[f]=w.normalized===!0}}return t.getDependency("bufferView",i).then(function(p){return new Promise(function(f,w){n.decodeDracoFile(p,function(x){for(const L in x.attributes){const j=x.attributes[L],q=c[L];q!==void 0&&(j.normalized=q)}f(x)},r,d,y.LinearSRGBColorSpace,w)})})}}class Pa{constructor(){this.name=te.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Oa{constructor(){this.name=te.KHR_MESH_QUANTIZATION}}class Mt extends y.Interpolant{constructor(e,t,a,n){super(e,t,a,n)}copySampleValue_(e){const t=this.resultBuffer,a=this.sampleValues,n=this.valueSize,i=e*n*3+n;for(let s=0;s!==n;s++)t[s]=a[i+s];return t}interpolate_(e,t,a,n){const i=this.resultBuffer,s=this.sampleValues,r=this.valueSize,c=r*2,d=r*3,p=n-t,f=(a-t)/p,w=f*f,x=w*f,L=e*d,j=L-d,q=-2*x+3*w,T=x-w,C=1-q,P=T-w+f;for(let D=0;D!==r;D++){const I=s[j+D+r],J=s[j+D+c]*p,Y=s[L+D+r],V=s[L+D]*p;i[D]=C*I+P*J+q*Y+T*V}return i}}const Ba=new y.Quaternion;class Ia extends Mt{interpolate_(e,t,a,n){const i=super.interpolate_(e,t,a,n);return Ba.fromArray(i).normalize().toArray(i),i}}const ve={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ee={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lt={9728:y.NearestFilter,9729:y.LinearFilter,9984:y.NearestMipmapNearestFilter,9985:y.LinearMipmapNearestFilter,9986:y.NearestMipmapLinearFilter,9987:y.LinearMipmapLinearFilter},Ct={33071:y.ClampToEdgeWrapping,33648:y.MirroredRepeatWrapping,10497:y.RepeatWrapping},nt={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},it={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},_e={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ga={CUBICSPLINE:void 0,LINEAR:y.InterpolateLinear,STEP:y.InterpolateDiscrete},st={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Na(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new y.MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:y.FrontSide})),o.DefaultMaterial}function Ce(o,e,t){for(const a in t.extensions)o[a]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[a]=t.extensions[a])}function ke(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function $a(o,e,t){let a=!1,n=!1,i=!1;for(let d=0,p=e.length;d<p;d++){const f=e[d];if(f.POSITION!==void 0&&(a=!0),f.NORMAL!==void 0&&(n=!0),f.COLOR_0!==void 0&&(i=!0),a&&n&&i)break}if(!a&&!n&&!i)return Promise.resolve(o);const s=[],r=[],c=[];for(let d=0,p=e.length;d<p;d++){const f=e[d];if(a){const w=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):o.attributes.position;s.push(w)}if(n){const w=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):o.attributes.normal;r.push(w)}if(i){const w=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):o.attributes.color;c.push(w)}}return Promise.all([Promise.all(s),Promise.all(r),Promise.all(c)]).then(function(d){const p=d[0],f=d[1],w=d[2];return a&&(o.morphAttributes.position=p),n&&(o.morphAttributes.normal=f),i&&(o.morphAttributes.color=w),o.morphTargetsRelative=!0,o})}function Ua(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let t=0,a=e.weights.length;t<a;t++)o.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(o.morphTargetInfluences.length===t.length){o.morphTargetDictionary={};for(let a=0,n=t.length;a<n;a++)o.morphTargetDictionary[t[a]]=a}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ka(o){let e;const t=o.extensions&&o.extensions[te.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ot(t.attributes):e=o.indices+":"+ot(o.attributes)+":"+o.mode,o.targets!==void 0)for(let a=0,n=o.targets.length;a<n;a++)e+=":"+ot(o.targets[a]);return e}function ot(o){let e="";const t=Object.keys(o).sort();for(let a=0,n=t.length;a<n;a++)e+=t[a]+":"+o[t[a]]+";";return e}function rt(o){switch(o){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ha(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Va=new y.Matrix4;class Xa{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ga,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let a=!1,n=-1,i=!1,s=-1;if(typeof navigator<"u"){const r=navigator.userAgent;a=/^((?!chrome|android).)*safari/i.test(r)===!0;const c=r.match(/Version\/(\d+)/);n=a&&c?parseInt(c[1],10):-1,i=r.indexOf("Firefox")>-1,s=i?r.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||a&&n<17||i&&s<98?this.textureLoader=new y.TextureLoader(this.options.manager):this.textureLoader=new y.ImageBitmapLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new y.FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const a=this,n=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([a.getDependencies("scene"),a.getDependencies("animation"),a.getDependencies("camera")])}).then(function(s){const r={scene:s[0][n.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:n.asset,parser:a,userData:{}};return Ce(i,r,n),ke(r,n),Promise.all(a._invokeAll(function(c){return c.afterRoot&&c.afterRoot(r)})).then(function(){for(const c of r.scenes)c.updateMatrixWorld();e(r)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],a=this.json.meshes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n].joints;for(let r=0,c=s.length;r<c;r++)e[s[r]].isBone=!0}for(let n=0,i=e.length;n<i;n++){const s=e[n];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(a[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,a){if(e.refs[t]<=1)return a;const n=a.clone(),i=(s,r)=>{const c=this.associations.get(s);c!=null&&this.associations.set(r,c);for(const[d,p]of s.children.entries())i(p,r.children[d])};return i(a,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let a=0;a<t.length;a++){const n=e(t[a]);if(n)return n}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const a=[];for(let n=0;n<t.length;n++){const i=e(t[n]);i&&a.push(i)}return a}getDependency(e,t){const a=e+":"+t;let n=this.cache.get(a);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(i){return i.loadNode&&i.loadNode(t)});break;case"mesh":n=this._invokeOne(function(i){return i.loadMesh&&i.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(i){return i.loadBufferView&&i.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(i){return i.loadMaterial&&i.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(i){return i.loadTexture&&i.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(i){return i.loadAnimation&&i.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(i){return i!=this&&i.getDependency&&i.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(a,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){const a=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(i,s){return a.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],a=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[te.KHR_BINARY_GLTF].body);const n=this.options;return new Promise(function(i,s){a.load(y.LoaderUtils.resolveURL(t.uri,n.path),i,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(a){const n=t.byteLength||0,i=t.byteOffset||0;return a.slice(i,i+n)})}loadAccessor(e){const t=this,a=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){const s=nt[n.type],r=Ee[n.componentType],c=n.normalized===!0,d=new r(n.count*s);return Promise.resolve(new y.BufferAttribute(d,s,c))}const i=[];return n.bufferView!==void 0?i.push(this.getDependency("bufferView",n.bufferView)):i.push(null),n.sparse!==void 0&&(i.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),i.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(i).then(function(s){const r=s[0],c=nt[n.type],d=Ee[n.componentType],p=d.BYTES_PER_ELEMENT,f=p*c,w=n.byteOffset||0,x=n.bufferView!==void 0?a.bufferViews[n.bufferView].byteStride:void 0,L=n.normalized===!0;let j,q;if(x&&x!==f){const T=Math.floor(w/x),C="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+T+":"+n.count;let P=t.cache.get(C);P||(j=new d(r,T*x,n.count*x/p),P=new y.InterleavedBuffer(j,x/p),t.cache.add(C,P)),q=new y.InterleavedBufferAttribute(P,c,w%x/p,L)}else r===null?j=new d(n.count*c):j=new d(r,w,n.count*c),q=new y.BufferAttribute(j,c,L);if(n.sparse!==void 0){const T=nt.SCALAR,C=Ee[n.sparse.indices.componentType],P=n.sparse.indices.byteOffset||0,D=n.sparse.values.byteOffset||0,I=new C(s[1],P,n.sparse.count*T),J=new d(s[2],D,n.sparse.count*c);r!==null&&(q=new y.BufferAttribute(q.array.slice(),q.itemSize,q.normalized)),q.normalized=!1;for(let Y=0,V=I.length;Y<V;Y++){const N=I[Y];if(q.setX(N,J[Y*c]),c>=2&&q.setY(N,J[Y*c+1]),c>=3&&q.setZ(N,J[Y*c+2]),c>=4&&q.setW(N,J[Y*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}q.normalized=L}return q})}loadTexture(e){const t=this.json,a=this.options,i=t.textures[e].source,s=t.images[i];let r=this.textureLoader;if(s.uri){const c=a.manager.getHandler(s.uri);c!==null&&(r=c)}return this.loadTextureImage(e,i,r)}loadTextureImage(e,t,a){const n=this,i=this.json,s=i.textures[e],r=i.images[t],c=(r.uri||r.bufferView)+":"+s.sampler;if(this.textureCache[c])return this.textureCache[c];const d=this.loadImageSource(t,a).then(function(p){p.flipY=!1,p.name=s.name||r.name||"",p.name===""&&typeof r.uri=="string"&&r.uri.startsWith("data:image/")===!1&&(p.name=r.uri);const w=(i.samplers||{})[s.sampler]||{};return p.magFilter=Lt[w.magFilter]||y.LinearFilter,p.minFilter=Lt[w.minFilter]||y.LinearMipmapLinearFilter,p.wrapS=Ct[w.wrapS]||y.RepeatWrapping,p.wrapT=Ct[w.wrapT]||y.RepeatWrapping,n.associations.set(p,{textures:e}),p}).catch(function(){return null});return this.textureCache[c]=d,d}loadImageSource(e,t){const a=this,n=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const s=n.images[e],r=self.URL||self.webkitURL;let c=s.uri||"",d=!1;if(s.bufferView!==void 0)c=a.getDependency("bufferView",s.bufferView).then(function(f){d=!0;const w=new Blob([f],{type:s.mimeType});return c=r.createObjectURL(w),c});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const p=Promise.resolve(c).then(function(f){return new Promise(function(w,x){let L=w;t.isImageBitmapLoader===!0&&(L=function(j){const q=new y.Texture(j);q.needsUpdate=!0,w(q)}),t.load(y.LoaderUtils.resolveURL(f,i.path),L,void 0,x)})}).then(function(f){return d===!0&&r.revokeObjectURL(c),ke(f,s),f.userData.mimeType=s.mimeType||Ha(s.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=p,p}assignTexture(e,t,a,n){const i=this;return this.getDependency("texture",a.index).then(function(s){if(!s)return null;if(a.texCoord!==void 0&&a.texCoord>0&&(s=s.clone(),s.channel=a.texCoord),i.extensions[te.KHR_TEXTURE_TRANSFORM]){const r=a.extensions!==void 0?a.extensions[te.KHR_TEXTURE_TRANSFORM]:void 0;if(r){const c=i.associations.get(s);s=i.extensions[te.KHR_TEXTURE_TRANSFORM].extendTexture(s,r),i.associations.set(s,c)}}return n!==void 0&&(s.colorSpace=n),e[t]=s,s})}assignFinalMaterial(e){const t=e.geometry;let a=e.material;const n=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){const r="PointsMaterial:"+a.uuid;let c=this.cache.get(r);c||(c=new y.PointsMaterial,y.Material.prototype.copy.call(c,a),c.color.copy(a.color),c.map=a.map,c.sizeAttenuation=!1,this.cache.add(r,c)),a=c}else if(e.isLine){const r="LineBasicMaterial:"+a.uuid;let c=this.cache.get(r);c||(c=new y.LineBasicMaterial,y.Material.prototype.copy.call(c,a),c.color.copy(a.color),c.map=a.map,this.cache.add(r,c)),a=c}if(n||i||s){let r="ClonedMaterial:"+a.uuid+":";n&&(r+="derivative-tangents:"),i&&(r+="vertex-colors:"),s&&(r+="flat-shading:");let c=this.cache.get(r);c||(c=a.clone(),i&&(c.vertexColors=!0),s&&(c.flatShading=!0),n&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(r,c),this.associations.set(c,this.associations.get(a))),a=c}e.material=a}getMaterialType(){return y.MeshStandardMaterial}loadMaterial(e){const t=this,a=this.json,n=this.extensions,i=a.materials[e];let s;const r={},c=i.extensions||{},d=[];if(c[te.KHR_MATERIALS_UNLIT]){const f=n[te.KHR_MATERIALS_UNLIT];s=f.getMaterialType(),d.push(f.extendParams(r,i,t))}else{const f=i.pbrMetallicRoughness||{};if(r.color=new y.Color(1,1,1),r.opacity=1,Array.isArray(f.baseColorFactor)){const w=f.baseColorFactor;r.color.setRGB(w[0],w[1],w[2],y.LinearSRGBColorSpace),r.opacity=w[3]}f.baseColorTexture!==void 0&&d.push(t.assignTexture(r,"map",f.baseColorTexture,y.SRGBColorSpace)),r.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,r.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(d.push(t.assignTexture(r,"metalnessMap",f.metallicRoughnessTexture)),d.push(t.assignTexture(r,"roughnessMap",f.metallicRoughnessTexture))),s=this._invokeOne(function(w){return w.getMaterialType&&w.getMaterialType(e)}),d.push(Promise.all(this._invokeAll(function(w){return w.extendMaterialParams&&w.extendMaterialParams(e,r)})))}i.doubleSided===!0&&(r.side=y.DoubleSide);const p=i.alphaMode||st.OPAQUE;if(p===st.BLEND?(r.transparent=!0,r.depthWrite=!1):(r.transparent=!1,p===st.MASK&&(r.alphaTest=i.alphaCutoff!==void 0?i.alphaCutoff:.5)),i.normalTexture!==void 0&&s!==y.MeshBasicMaterial&&(d.push(t.assignTexture(r,"normalMap",i.normalTexture)),r.normalScale=new y.Vector2(1,1),i.normalTexture.scale!==void 0)){const f=i.normalTexture.scale;r.normalScale.set(f,f)}if(i.occlusionTexture!==void 0&&s!==y.MeshBasicMaterial&&(d.push(t.assignTexture(r,"aoMap",i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(r.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&s!==y.MeshBasicMaterial){const f=i.emissiveFactor;r.emissive=new y.Color().setRGB(f[0],f[1],f[2],y.LinearSRGBColorSpace)}return i.emissiveTexture!==void 0&&s!==y.MeshBasicMaterial&&d.push(t.assignTexture(r,"emissiveMap",i.emissiveTexture,y.SRGBColorSpace)),Promise.all(d).then(function(){const f=new s(r);return i.name&&(f.name=i.name),ke(f,i),t.associations.set(f,{materials:e}),i.extensions&&Ce(n,f,i),f})}createUniqueName(e){const t=y.PropertyBinding.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,a=this.extensions,n=this.primitiveCache;function i(r){return a[te.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r,t).then(function(c){return jt(c,r,t)})}const s=[];for(let r=0,c=e.length;r<c;r++){const d=e[r],p=Ka(d),f=n[p];if(f)s.push(f.promise);else{let w;d.extensions&&d.extensions[te.KHR_DRACO_MESH_COMPRESSION]?w=i(d):w=jt(new y.BufferGeometry,d,t),n[p]={primitive:d,promise:w},s.push(w)}}return Promise.all(s)}loadMesh(e){const t=this,a=this.json,n=this.extensions,i=a.meshes[e],s=i.primitives,r=[];for(let c=0,d=s.length;c<d;c++){const p=s[c].material===void 0?Na(this.cache):this.getDependency("material",s[c].material);r.push(p)}return r.push(t.loadGeometries(s)),Promise.all(r).then(function(c){const d=c.slice(0,c.length-1),p=c[c.length-1],f=[];for(let x=0,L=p.length;x<L;x++){const j=p[x],q=s[x];let T;const C=d[x];if(q.mode===ve.TRIANGLES||q.mode===ve.TRIANGLE_STRIP||q.mode===ve.TRIANGLE_FAN||q.mode===void 0)T=i.isSkinnedMesh===!0?new y.SkinnedMesh(j,C):new y.Mesh(j,C),T.isSkinnedMesh===!0&&T.normalizeSkinWeights(),q.mode===ve.TRIANGLE_STRIP?T.geometry=kt(T.geometry,y.TriangleStripDrawMode):q.mode===ve.TRIANGLE_FAN&&(T.geometry=kt(T.geometry,y.TriangleFanDrawMode));else if(q.mode===ve.LINES)T=new y.LineSegments(j,C);else if(q.mode===ve.LINE_STRIP)T=new y.Line(j,C);else if(q.mode===ve.LINE_LOOP)T=new y.LineLoop(j,C);else if(q.mode===ve.POINTS)T=new y.Points(j,C);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+q.mode);Object.keys(T.geometry.morphAttributes).length>0&&Ua(T,i),T.name=t.createUniqueName(i.name||"mesh_"+e),ke(T,i),q.extensions&&Ce(n,T,q),t.assignFinalMaterial(T),f.push(T)}for(let x=0,L=f.length;x<L;x++)t.associations.set(f[x],{meshes:e,primitives:x});if(f.length===1)return i.extensions&&Ce(n,f[0],i),f[0];const w=new y.Group;i.extensions&&Ce(n,w,i),t.associations.set(w,{meshes:e});for(let x=0,L=f.length;x<L;x++)w.add(f[x]);return w})}loadCamera(e){let t;const a=this.json.cameras[e],n=a[a.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return a.type==="perspective"?t=new y.PerspectiveCamera(y.MathUtils.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):a.type==="orthographic"&&(t=new y.OrthographicCamera(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),a.name&&(t.name=this.createUniqueName(a.name)),ke(t,a),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],a=[];for(let n=0,i=t.joints.length;n<i;n++)a.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?a.push(this.getDependency("accessor",t.inverseBindMatrices)):a.push(null),Promise.all(a).then(function(n){const i=n.pop(),s=n,r=[],c=[];for(let d=0,p=s.length;d<p;d++){const f=s[d];if(f){r.push(f);const w=new y.Matrix4;i!==null&&w.fromArray(i.array,d*16),c.push(w)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[d])}return new y.Skeleton(r,c)})}loadAnimation(e){const t=this.json,a=this,n=t.animations[e],i=n.name?n.name:"animation_"+e,s=[],r=[],c=[],d=[],p=[];for(let f=0,w=n.channels.length;f<w;f++){const x=n.channels[f],L=n.samplers[x.sampler],j=x.target,q=j.node,T=n.parameters!==void 0?n.parameters[L.input]:L.input,C=n.parameters!==void 0?n.parameters[L.output]:L.output;j.node!==void 0&&(s.push(this.getDependency("node",q)),r.push(this.getDependency("accessor",T)),c.push(this.getDependency("accessor",C)),d.push(L),p.push(j))}return Promise.all([Promise.all(s),Promise.all(r),Promise.all(c),Promise.all(d),Promise.all(p)]).then(function(f){const w=f[0],x=f[1],L=f[2],j=f[3],q=f[4],T=[];for(let C=0,P=w.length;C<P;C++){const D=w[C],I=x[C],J=L[C],Y=j[C],V=q[C];if(D===void 0)continue;D.updateMatrix&&D.updateMatrix();const N=a._createAnimationTracks(D,I,J,Y,V);if(N)for(let oe=0;oe<N.length;oe++)T.push(N[oe])}return new y.AnimationClip(i,void 0,T)})}createNodeMesh(e){const t=this.json,a=this,n=t.nodes[e];return n.mesh===void 0?null:a.getDependency("mesh",n.mesh).then(function(i){const s=a._getNodeRef(a.meshCache,n.mesh,i);return n.weights!==void 0&&s.traverse(function(r){if(r.isMesh)for(let c=0,d=n.weights.length;c<d;c++)r.morphTargetInfluences[c]=n.weights[c]}),s})}loadNode(e){const t=this.json,a=this,n=t.nodes[e],i=a._loadNodeShallow(e),s=[],r=n.children||[];for(let d=0,p=r.length;d<p;d++)s.push(a.getDependency("node",r[d]));const c=n.skin===void 0?Promise.resolve(null):a.getDependency("skin",n.skin);return Promise.all([i,Promise.all(s),c]).then(function(d){const p=d[0],f=d[1],w=d[2];w!==null&&p.traverse(function(x){x.isSkinnedMesh&&x.bind(w,Va)});for(let x=0,L=f.length;x<L;x++)p.add(f[x]);return p})}_loadNodeShallow(e){const t=this.json,a=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const i=t.nodes[e],s=i.name?n.createUniqueName(i.name):"",r=[],c=n._invokeOne(function(d){return d.createNodeMesh&&d.createNodeMesh(e)});return c&&r.push(c),i.camera!==void 0&&r.push(n.getDependency("camera",i.camera).then(function(d){return n._getNodeRef(n.cameraCache,i.camera,d)})),n._invokeAll(function(d){return d.createNodeAttachment&&d.createNodeAttachment(e)}).forEach(function(d){r.push(d)}),this.nodeCache[e]=Promise.all(r).then(function(d){let p;if(i.isBone===!0?p=new y.Bone:d.length>1?p=new y.Group:d.length===1?p=d[0]:p=new y.Object3D,p!==d[0])for(let f=0,w=d.length;f<w;f++)p.add(d[f]);if(i.name&&(p.userData.name=i.name,p.name=s),ke(p,i),i.extensions&&Ce(a,p,i),i.matrix!==void 0){const f=new y.Matrix4;f.fromArray(i.matrix),p.applyMatrix4(f)}else i.translation!==void 0&&p.position.fromArray(i.translation),i.rotation!==void 0&&p.quaternion.fromArray(i.rotation),i.scale!==void 0&&p.scale.fromArray(i.scale);return n.associations.has(p)||n.associations.set(p,{}),n.associations.get(p).nodes=e,p}),this.nodeCache[e]}loadScene(e){const t=this.extensions,a=this.json.scenes[e],n=this,i=new y.Group;a.name&&(i.name=n.createUniqueName(a.name)),ke(i,a),a.extensions&&Ce(t,i,a);const s=a.nodes||[],r=[];for(let c=0,d=s.length;c<d;c++)r.push(n.getDependency("node",s[c]));return Promise.all(r).then(function(c){for(let p=0,f=c.length;p<f;p++)i.add(c[p]);const d=p=>{const f=new Map;for(const[w,x]of n.associations)(w instanceof y.Material||w instanceof y.Texture)&&f.set(w,x);return p.traverse(w=>{const x=n.associations.get(w);x!=null&&f.set(w,x)}),f};return n.associations=d(i),i})}_createAnimationTracks(e,t,a,n,i){const s=[],r=e.name?e.name:e.uuid,c=[];_e[i.path]===_e.weights?e.traverse(function(w){w.morphTargetInfluences&&c.push(w.name?w.name:w.uuid)}):c.push(r);let d;switch(_e[i.path]){case _e.weights:d=y.NumberKeyframeTrack;break;case _e.rotation:d=y.QuaternionKeyframeTrack;break;case _e.position:case _e.scale:d=y.VectorKeyframeTrack;break;default:switch(a.itemSize){case 1:d=y.NumberKeyframeTrack;break;case 2:case 3:default:d=y.VectorKeyframeTrack;break}break}const p=n.interpolation!==void 0?Ga[n.interpolation]:y.InterpolateLinear,f=this._getArrayFromAccessor(a);for(let w=0,x=c.length;w<x;w++){const L=new d(c[w]+"."+_e[i.path],t.array,f,p);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(L),s.push(L)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const a=rt(t.constructor),n=new Float32Array(t.length);for(let i=0,s=t.length;i<s;i++)n[i]=t[i]*a;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(a){const n=this instanceof y.QuaternionKeyframeTrack?Ia:Mt;return new n(this.times,this.values,this.getValueSize()/3,a)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Wa(o,e,t){const a=e.attributes,n=new y.Box3;if(a.POSITION!==void 0){const r=t.json.accessors[a.POSITION],c=r.min,d=r.max;if(c!==void 0&&d!==void 0){if(n.set(new y.Vector3(c[0],c[1],c[2]),new y.Vector3(d[0],d[1],d[2])),r.normalized){const p=rt(Ee[r.componentType]);n.min.multiplyScalar(p),n.max.multiplyScalar(p)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const i=e.targets;if(i!==void 0){const r=new y.Vector3,c=new y.Vector3;for(let d=0,p=i.length;d<p;d++){const f=i[d];if(f.POSITION!==void 0){const w=t.json.accessors[f.POSITION],x=w.min,L=w.max;if(x!==void 0&&L!==void 0){if(c.setX(Math.max(Math.abs(x[0]),Math.abs(L[0]))),c.setY(Math.max(Math.abs(x[1]),Math.abs(L[1]))),c.setZ(Math.max(Math.abs(x[2]),Math.abs(L[2]))),w.normalized){const j=rt(Ee[w.componentType]);c.multiplyScalar(j)}r.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(r)}o.boundingBox=n;const s=new y.Sphere;n.getCenter(s.center),s.radius=n.min.distanceTo(n.max)/2,o.boundingSphere=s}function jt(o,e,t){const a=e.attributes,n=[];function i(s,r){return t.getDependency("accessor",s).then(function(c){o.setAttribute(r,c)})}for(const s in a){const r=it[s]||s.toLowerCase();r in o.attributes||n.push(i(a[s],r))}if(e.indices!==void 0&&!o.index){const s=t.getDependency("accessor",e.indices).then(function(r){o.setIndex(r)});n.push(s)}return y.ColorManagement.workingColorSpace!==y.LinearSRGBColorSpace&&"COLOR_0"in a&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${y.ColorManagement.workingColorSpace}" not supported.`),ke(o,e),Wa(o,e,t),Promise.all(n).then(function(){return e.targets!==void 0?$a(o,e.targets,t):o})}const ct=new WeakMap;class Ja extends y.Loader{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,a,n){const i=new y.FileLoader(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,s=>{this.parse(s,t,n)},a,n)}parse(e,t,a=()=>{}){this.decodeDracoFile(e,t,null,null,y.SRGBColorSpace,a).catch(a)}decodeDracoFile(e,t,a,n,i=y.LinearSRGBColorSpace,s=()=>{}){const r={attributeIDs:a||this.defaultAttributeIDs,attributeTypes:n||this.defaultAttributeTypes,useUniqueIDs:!!a,vertexColorSpace:i};return this.decodeGeometry(e,r).then(t).catch(s)}decodeGeometry(e,t){const a=JSON.stringify(t);if(ct.has(e)){const c=ct.get(e);if(c.key===a)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let n;const i=this.workerNextTaskID++,s=e.byteLength,r=this._getWorker(i,s).then(c=>(n=c,new Promise((d,p)=>{n._callbacks[i]={resolve:d,reject:p},n.postMessage({type:"decode",id:i,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return r.catch(()=>!0).then(()=>{n&&i&&this._releaseTask(n,i)}),ct.set(e,{key:a,promise:r}),r}_createGeometry(e){const t=new y.BufferGeometry;e.index&&t.setIndex(new y.BufferAttribute(e.index.array,1));for(let a=0;a<e.attributes.length;a++){const n=e.attributes[a],i=n.name,s=n.array,r=n.itemSize,c=new y.BufferAttribute(s,r);i==="color"&&(this._assignVertexColorSpace(c,n.vertexColorSpace),c.normalized=!(s instanceof Float32Array)),t.setAttribute(i,c)}return t}_assignVertexColorSpace(e,t){if(t!==y.SRGBColorSpace)return;const a=new y.Color;for(let n=0,i=e.count;n<i;n++)a.fromBufferAttribute(e,n),y.ColorManagement.toWorkingColorSpace(a,y.SRGBColorSpace),e.setXYZ(n,a.r,a.g,a.b)}_loadLibrary(e,t){const a=new y.FileLoader(this.manager);return a.setPath(this.decoderPath),a.setResponseType(t),a.setWithCredentials(this.withCredentials),new Promise((n,i)=>{a.load(e,n,void 0,i)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(a=>{const n=a[0];e||(this.decoderConfig.wasmBinary=a[1]);const i=Ya.toString(),s=["/* draco decoder */",n,"","/* worker */",i.substring(i.indexOf("{")+1,i.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const n=new Worker(this.workerSourceURL);n._callbacks={},n._taskCosts={},n._taskLoad=0,n.postMessage({type:"init",decoderConfig:this.decoderConfig}),n.onmessage=function(i){const s=i.data;switch(s.type){case"decode":n._callbacks[s.id].resolve(s);break;case"error":n._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(n)}else this.workerPool.sort(function(n,i){return n._taskLoad>i._taskLoad?-1:1});const a=this.workerPool[this.workerPool.length-1];return a._taskCosts[e]=t,a._taskLoad+=t,a})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function Ya(){let o,e;onmessage=function(s){const r=s.data;switch(r.type){case"init":o=r.decoderConfig,e=new Promise(function(p){o.onModuleLoaded=function(f){p({draco:f})},DracoDecoderModule(o)});break;case"decode":const c=r.buffer,d=r.taskConfig;e.then(p=>{const f=p.draco,w=new f.Decoder;try{const x=t(f,w,new Int8Array(c),d),L=x.attributes.map(j=>j.array.buffer);x.index&&L.push(x.index.array.buffer),self.postMessage({type:"decode",id:r.id,geometry:x},L)}catch(x){console.error(x),self.postMessage({type:"error",id:r.id,error:x.message})}finally{f.destroy(w)}});break}};function t(s,r,c,d){const p=d.attributeIDs,f=d.attributeTypes;let w,x;const L=r.GetEncodedGeometryType(c);if(L===s.TRIANGULAR_MESH)w=new s.Mesh,x=r.DecodeArrayToMesh(c,c.byteLength,w);else if(L===s.POINT_CLOUD)w=new s.PointCloud,x=r.DecodeArrayToPointCloud(c,c.byteLength,w);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!x.ok()||w.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+x.error_msg());const j={index:null,attributes:[]};for(const q in p){const T=self[f[q]];let C,P;if(d.useUniqueIDs)P=p[q],C=r.GetAttributeByUniqueId(w,P);else{if(P=r.GetAttributeId(w,s[p[q]]),P===-1)continue;C=r.GetAttribute(w,P)}const D=n(s,r,w,q,T,C);q==="color"&&(D.vertexColorSpace=d.vertexColorSpace),j.attributes.push(D)}return L===s.TRIANGULAR_MESH&&(j.index=a(s,r,w)),s.destroy(w),j}function a(s,r,c){const p=c.num_faces()*3,f=p*4,w=s._malloc(f);r.GetTrianglesUInt32Array(c,f,w);const x=new Uint32Array(s.HEAPF32.buffer,w,p).slice();return s._free(w),{array:x,itemSize:1}}function n(s,r,c,d,p,f){const w=f.num_components(),L=c.num_points()*w,j=L*p.BYTES_PER_ELEMENT,q=i(s,p),T=s._malloc(j);r.GetAttributeDataArrayForAllPoints(c,f,q,j,T);const C=new p(s.HEAPF32.buffer,T,L).slice();return s._free(T),{name:d,array:C,itemSize:w}}function i(s,r){switch(r){case Float32Array:return s.DT_FLOAT32;case Int8Array:return s.DT_INT8;case Int16Array:return s.DT_INT16;case Int32Array:return s.DT_INT32;case Uint8Array:return s.DT_UINT8;case Uint16Array:return s.DT_UINT16;case Uint32Array:return s.DT_UINT32}}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var ge=Uint8Array,we=Uint16Array,lt=Int32Array,dt=new ge([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ht=new ge([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Rt=new ge([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ft=function(o,e){for(var t=new we(31),a=0;a<31;++a)t[a]=e+=1<<o[a-1];for(var n=new lt(t[30]),a=1;a<30;++a)for(var i=t[a];i<t[a+1];++i)n[i]=i-t[a]<<5|a;return{b:t,r:n}},Tt=Ft(dt,2),Za=Tt.b,pt=Tt.r;Za[28]=258,pt[258]=28;for(var Qa=Ft(ht,0),Et=Qa.r,ut=new we(32768),he=0;he<32768;++he){var Me=(he&43690)>>1|(he&21845)<<1;Me=(Me&52428)>>2|(Me&13107)<<2,Me=(Me&61680)>>4|(Me&3855)<<4,ut[he]=((Me&65280)>>8|(Me&255)<<8)>>1}for(var Be=function(o,e,t){for(var a=o.length,n=0,i=new we(e);n<a;++n)o[n]&&++i[o[n]-1];var s=new we(e);for(n=1;n<e;++n)s[n]=s[n-1]+i[n-1]<<1;var r;if(t){r=new we(1<<e);var c=15-e;for(n=0;n<a;++n)if(o[n])for(var d=n<<4|o[n],p=e-o[n],f=s[o[n]-1]++<<p,w=f|(1<<p)-1;f<=w;++f)r[ut[f]>>c]=d}else for(r=new we(a),n=0;n<a;++n)o[n]&&(r[n]=ut[s[o[n]-1]++]>>15-o[n]);return r},je=new ge(288),he=0;he<144;++he)je[he]=8;for(var he=144;he<256;++he)je[he]=9;for(var he=256;he<280;++he)je[he]=7;for(var he=280;he<288;++he)je[he]=8;for(var Xe=new ge(32),he=0;he<32;++he)Xe[he]=5;var en=Be(je,9,0),tn=Be(Xe,5,0),qt=function(o){return(o+7)/8|0},Dt=function(o,e,t){return(t==null||t>o.length)&&(t=o.length),new ge(o.subarray(e,t))},an=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],We=function(o,e,t){var a=new Error(e||an[o]);if(a.code=o,Error.captureStackTrace&&Error.captureStackTrace(a,We),!t)throw a;return a},Se=function(o,e,t){t<<=e&7;var a=e/8|0;o[a]|=t,o[a+1]|=t>>8},Ie=function(o,e,t){t<<=e&7;var a=e/8|0;o[a]|=t,o[a+1]|=t>>8,o[a+2]|=t>>16},bt=function(o,e){for(var t=[],a=0;a<o.length;++a)o[a]&&t.push({s:a,f:o[a]});var n=t.length,i=t.slice();if(!n)return{t:Bt,l:0};if(n==1){var s=new ge(t[0].s+1);return s[t[0].s]=1,{t:s,l:1}}t.sort(function(I,J){return I.f-J.f}),t.push({s:-1,f:25001});var r=t[0],c=t[1],d=0,p=1,f=2;for(t[0]={s:-1,f:r.f+c.f,l:r,r:c};p!=n-1;)r=t[t[d].f<t[f].f?d++:f++],c=t[d!=p&&t[d].f<t[f].f?d++:f++],t[p++]={s:-1,f:r.f+c.f,l:r,r:c};for(var w=i[0].s,a=1;a<n;++a)i[a].s>w&&(w=i[a].s);var x=new we(w+1),L=ft(t[p-1],x,0);if(L>e){var a=0,j=0,q=L-e,T=1<<q;for(i.sort(function(J,Y){return x[Y.s]-x[J.s]||J.f-Y.f});a<n;++a){var C=i[a].s;if(x[C]>e)j+=T-(1<<L-x[C]),x[C]=e;else break}for(j>>=q;j>0;){var P=i[a].s;x[P]<e?j-=1<<e-x[P]++-1:++a}for(;a>=0&&j;--a){var D=i[a].s;x[D]==e&&(--x[D],++j)}L=e}return{t:new ge(x),l:L}},ft=function(o,e,t){return o.s==-1?Math.max(ft(o.l,e,t+1),ft(o.r,e,t+1)):e[o.s]=t},zt=function(o){for(var e=o.length;e&&!o[--e];);for(var t=new we(++e),a=0,n=o[0],i=1,s=function(c){t[a++]=c},r=1;r<=e;++r)if(o[r]==n&&r!=e)++i;else{if(!n&&i>2){for(;i>138;i-=138)s(32754);i>2&&(s(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(s(n),--i;i>6;i-=6)s(8304);i>2&&(s(i-3<<5|8208),i=0)}for(;i--;)s(n);i=1,n=o[r]}return{c:t.subarray(0,a),n:e}},Ge=function(o,e){for(var t=0,a=0;a<e.length;++a)t+=o[a]*e[a];return t},Pt=function(o,e,t){var a=t.length,n=qt(e+2);o[n]=a&255,o[n+1]=a>>8,o[n+2]=o[n]^255,o[n+3]=o[n+1]^255;for(var i=0;i<a;++i)o[n+i+4]=t[i];return(n+4+a)*8},Ot=function(o,e,t,a,n,i,s,r,c,d,p){Se(e,p++,t),++n[256];for(var f=bt(n,15),w=f.t,x=f.l,L=bt(i,15),j=L.t,q=L.l,T=zt(w),C=T.c,P=T.n,D=zt(j),I=D.c,J=D.n,Y=new we(19),V=0;V<C.length;++V)++Y[C[V]&31];for(var V=0;V<I.length;++V)++Y[I[V]&31];for(var N=bt(Y,7),oe=N.t,fe=N.l,U=19;U>4&&!oe[Rt[U-1]];--U);var m=d+5<<3,l=Ge(n,je)+Ge(i,Xe)+s,b=Ge(n,w)+Ge(i,j)+s+14+3*U+Ge(Y,oe)+2*Y[16]+3*Y[17]+7*Y[18];if(c>=0&&m<=l&&m<=b)return Pt(e,p,o.subarray(c,c+d));var u,h,g,v;if(Se(e,p,1+(b<l)),p+=2,b<l){u=Be(w,x,0),h=w,g=Be(j,q,0),v=j;var A=Be(oe,fe,0);Se(e,p,P-257),Se(e,p+5,J-1),Se(e,p+10,U-4),p+=14;for(var V=0;V<U;++V)Se(e,p+3*V,oe[Rt[V]]);p+=3*U;for(var S=[C,I],M=0;M<2;++M)for(var B=S[M],V=0;V<B.length;++V){var z=B[V]&31;Se(e,p,A[z]),p+=oe[z],z>15&&(Se(e,p,B[V]>>5&127),p+=B[V]>>12)}}else u=en,h=je,g=tn,v=Xe;for(var V=0;V<r;++V){var O=a[V];if(O>255){var z=O>>18&31;Ie(e,p,u[z+257]),p+=h[z+257],z>7&&(Se(e,p,O>>23&31),p+=dt[z]);var K=O&31;Ie(e,p,g[K]),p+=v[K],K>3&&(Ie(e,p,O>>5&8191),p+=ht[K])}else Ie(e,p,u[O]),p+=h[O]}return Ie(e,p,u[256]),p+h[256]},nn=new lt([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Bt=new ge(0),sn=function(o,e,t,a,n,i){var s=i.z||o.length,r=new ge(a+s+5*(1+Math.ceil(s/7e3))+n),c=r.subarray(a,r.length-n),d=i.l,p=(i.r||0)&7;if(e){p&&(c[0]=i.r>>3);for(var f=nn[e-1],w=f>>13,x=f&8191,L=(1<<t)-1,j=i.p||new we(32768),q=i.h||new we(L+1),T=Math.ceil(t/3),C=2*T,P=function(_){return(o[_]^o[_+1]<<T^o[_+2]<<C)&L},D=new lt(25e3),I=new we(288),J=new we(32),Y=0,V=0,N=i.i||0,oe=0,fe=i.w||0,U=0;N+2<s;++N){var m=P(N),l=N&32767,b=q[m];if(j[l]=b,q[m]=l,fe<=N){var u=s-N;if((Y>7e3||oe>24576)&&(u>423||!d)){p=Ot(o,c,0,D,I,J,V,oe,U,N-U,p),oe=Y=V=0,U=N;for(var h=0;h<286;++h)I[h]=0;for(var h=0;h<30;++h)J[h]=0}var g=2,v=0,A=x,S=l-b&32767;if(u>2&&m==P(N-S))for(var M=Math.min(w,u)-1,B=Math.min(32767,N),z=Math.min(258,u);S<=B&&--A&&l!=b;){if(o[N+g]==o[N+g-S]){for(var O=0;O<z&&o[N+O]==o[N+O-S];++O);if(O>g){if(g=O,v=S,O>M)break;for(var K=Math.min(S,O-2),ae=0,h=0;h<K;++h){var G=N-S+h&32767,se=j[G],Q=G-se&32767;Q>ae&&(ae=Q,b=G)}}}l=b,b=j[l],S+=l-b&32767}if(v){D[oe++]=268435456|pt[g]<<18|Et[v];var H=pt[g]&31,k=Et[v]&31;V+=dt[H]+ht[k],++I[257+H],++J[k],fe=N+g,++Y}else D[oe++]=o[N],++I[o[N]]}}for(N=Math.max(N,fe);N<s;++N)D[oe++]=o[N],++I[o[N]];p=Ot(o,c,d,D,I,J,V,oe,U,N-U,p),d||(i.r=p&7|c[p/8|0]<<3,p-=7,i.h=q,i.p=j,i.i=N,i.w=fe)}else{for(var N=i.w||0;N<s+d;N+=65535){var R=N+65535;R>=s&&(c[p/8|0]=d,R=s),p=Pt(c,p+1,o.subarray(N,R))}i.i=s}return Dt(r,0,a+qt(p)+n)},on=function(){for(var o=new Int32Array(256),e=0;e<256;++e){for(var t=e,a=9;--a;)t=(t&1&&-306674912)^t>>>1;o[e]=t}return o}(),rn=function(){var o=-1;return{p:function(e){for(var t=o,a=0;a<e.length;++a)t=on[t&255^e[a]]^t>>>8;o=t},d:function(){return~o}}},cn=function(o,e,t,a,n){if(!n&&(n={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),s=new ge(i.length+o.length);s.set(i),s.set(o,i.length),o=s,n.w=i.length}return sn(o,e.level==null?6:e.level,e.mem==null?n.l?Math.ceil(Math.max(8,Math.min(13,Math.log(o.length)))*1.5):20:12+e.mem,t,a,n)},It=function(o,e){var t={};for(var a in o)t[a]=o[a];for(var a in e)t[a]=e[a];return t},be=function(o,e,t){for(;t;++e)o[e]=t,t>>>=8};function ln(o,e){return cn(o,e||{},0,0)}var Gt=function(o,e,t,a){for(var n in o){var i=o[n],s=e+n,r=a;Array.isArray(i)&&(r=It(a,i[1]),i=i[0]),i instanceof ge?t[s]=[i,r]:(t[s+="/"]=[new ge(0),r],Gt(i,s,t,a))}},Nt=typeof TextEncoder<"u"&&new TextEncoder,dn=typeof TextDecoder<"u"&&new TextDecoder,hn=0;try{dn.decode(Bt,{stream:!0}),hn=1}catch{}function Je(o,e){var t;if(Nt)return Nt.encode(o);for(var a=o.length,n=new ge(o.length+(o.length>>1)),i=0,s=function(d){n[i++]=d},t=0;t<a;++t){if(i+5>n.length){var r=new ge(i+8+(a-t<<1));r.set(n),n=r}var c=o.charCodeAt(t);c<128||e?s(c):c<2048?(s(192|c>>6),s(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|o.charCodeAt(++t)&1023,s(240|c>>18),s(128|c>>12&63),s(128|c>>6&63),s(128|c&63)):(s(224|c>>12),s(128|c>>6&63),s(128|c&63))}return Dt(n,0,i)}var gt=function(o){var e=0;if(o)for(var t in o){var a=o[t].length;a>65535&&We(9),e+=a+4}return e},$t=function(o,e,t,a,n,i,s,r){var c=a.length,d=t.extra,p=r&&r.length,f=gt(d);be(o,e,s!=null?33639248:67324752),e+=4,s!=null&&(o[e++]=20,o[e++]=t.os),o[e]=20,e+=2,o[e++]=t.flag<<1|(i<0&&8),o[e++]=n&&8,o[e++]=t.compression&255,o[e++]=t.compression>>8;var w=new Date(t.mtime==null?Date.now():t.mtime),x=w.getFullYear()-1980;if((x<0||x>119)&&We(10),be(o,e,x<<25|w.getMonth()+1<<21|w.getDate()<<16|w.getHours()<<11|w.getMinutes()<<5|w.getSeconds()>>1),e+=4,i!=-1&&(be(o,e,t.crc),be(o,e+4,i<0?-i-2:i),be(o,e+8,t.size)),be(o,e+12,c),be(o,e+14,f),e+=16,s!=null&&(be(o,e,p),be(o,e+6,t.attrs),be(o,e+10,s),e+=14),o.set(a,e),e+=c,f)for(var L in d){var j=d[L],q=j.length;be(o,e,+L),be(o,e+2,q),o.set(j,e+4),e+=4+q}return p&&(o.set(r,e),e+=p),e},pn=function(o,e,t,a,n){be(o,e,101010256),be(o,e+8,t),be(o,e+10,t),be(o,e+12,a),be(o,e+16,n)};function un(o,e){e||(e={});var t={},a=[];Gt(o,"",t,e);var n=0,i=0;for(var s in t){var r=t[s],c=r[0],d=r[1],p=d.level==0?0:8,f=Je(s),w=f.length,x=d.comment,L=x&&Je(x),j=L&&L.length,q=gt(d.extra);w>65535&&We(11);var T=p?ln(c,d):c,C=T.length,P=rn();P.p(c),a.push(It(d,{size:c.length,crc:P.d(),c:T,f,m:L,u:w!=s.length||L&&x.length!=j,o:n,compression:p})),n+=30+w+q+C,i+=76+2*(w+q)+(j||0)+C}for(var D=new ge(i+22),I=n,J=i-n,Y=0;Y<a.length;++Y){var f=a[Y];$t(D,f.o,f,f.f,f.u,f.c.length);var V=30+f.f.length+gt(f.extra);D.set(f.c,f.o+V),$t(D,n,f,f.f,f.u,f.c.length,f.o,f.m),n+=16+V+(f.m?f.m.length:0)}return pn(D,n,a.length,J,I),D}let Ne,mt,qe,Ye;function bn(o,e=1/0,t=null){mt||(mt=new y.PlaneGeometry(2,2,1,1)),qe||(qe=new y.ShaderMaterial({uniforms:{blitTexture:new y.Uniform(o)},vertexShader:`
			varying vec2 vUv;
			void main(){
				vUv = uv;
				gl_Position = vec4(position.xy * 1.0,0.,.999999);
			}`,fragmentShader:`
			uniform sampler2D blitTexture; 
			varying vec2 vUv;

			void main(){ 
				gl_FragColor = vec4(vUv.xy, 0, 1);
				
				#ifdef IS_SRGB
				gl_FragColor = sRGBTransferOETF( texture2D( blitTexture, vUv) );
				#else
				gl_FragColor = texture2D( blitTexture, vUv);
				#endif
			}`})),qe.uniforms.blitTexture.value=o,qe.defines.IS_SRGB=o.colorSpace==y.SRGBColorSpace,qe.needsUpdate=!0,Ye||(Ye=new y.Mesh(mt,qe),Ye.frustumCulled=!1);const a=new y.PerspectiveCamera,n=new y.Scene;n.add(Ye),t===null&&(t=Ne=new y.WebGLRenderer({antialias:!1}));const i=Math.min(o.image.width,e),s=Math.min(o.image.height,e);t.setSize(i,s),t.clear(),t.render(n,a);const r=document.createElement("canvas"),c=r.getContext("2d");r.width=i,r.height=s,c.drawImage(t.domElement,0,0,i,s);const d=new y.CanvasTexture(r);return d.minFilter=o.minFilter,d.magFilter=o.magFilter,d.wrapS=o.wrapS,d.wrapT=o.wrapT,d.colorSpace=o.colorSpace,d.name=o.name,Ne&&(Ne.forceContextLoss(),Ne.dispose(),Ne=null),d}class fn{parse(e,t,a,n){this.parseAsync(e,n).then(t).catch(a)}async parseAsync(e,t={}){t=Object.assign({ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:"horizontal"}},includeAnchoringProperties:!0,quickLookCompatible:!1,maxTextureSize:1024},t);const a={},n="model.usda";a[n]=null;let i=Ut();i+=mn(t);const s={},r={};e.traverseVisible(d=>{if(d.isMesh){const p=d.geometry,f=d.material;if(f.isMeshStandardMaterial){const w="geometries/Geometry_"+p.id+".usda";if(!(w in a)){const x=xn(p);a[w]=vn(x)}f.uuid in s||(s[f.uuid]=f),i+=yn(d,p,f)}else console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",d)}else d.isCamera&&(i+=Rn(d))}),i+=wn(),i+=Ln(s,r,t.quickLookCompatible),a[n]=Je(i),i=null;for(const d in r){let p=r[d];p.isCompressedTexture===!0&&(p=bn(p));const f=gn(p.image,p.flipY,t.maxTextureSize),w=await new Promise(x=>f.toBlob(x,"image/png",1));a[`textures/Texture_${d}.png`]=new Uint8Array(await w.arrayBuffer())}let c=0;for(const d in a){const p=a[d],f=34+d.length;c+=f;const w=c&63;if(w!==4){const x=64-w,L=new Uint8Array(x);a[d]=[p,{extra:{12345:L}}]}c=p.length}return un(a,{level:0})}}function gn(o,e,t){if(typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&o instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&o instanceof ImageBitmap){const a=t/Math.max(o.width,o.height),n=document.createElement("canvas");n.width=o.width*Math.min(1,a),n.height=o.height*Math.min(1,a);const i=n.getContext("2d");return e===!0&&(i.translate(0,n.height),i.scale(1,-1)),i.drawImage(o,0,0,n.width,n.height),n}else throw new Error("THREE.USDZExporter: No valid image data found. Unable to process texture.")}const me=7;function Ut(){return`#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)

`}function mn(o){return`def Xform "Root"
{
	def Scope "Scenes" (
		kind = "sceneLibrary"
	)
	{
		def Xform "Scene" (
			customData = {
				bool preliminary_collidesWithEnvironment = 0
				string sceneName = "Scene"
			}
			sceneName = "Scene"
		)
		{${o.includeAnchoringProperties===!0?`
		token preliminary:anchoring:type = "${o.ar.anchoring.type}"
		token preliminary:planeAnchoring:alignment = "${o.ar.planeAnchoring.alignment}"
	`:""}
`}function wn(){return`
		}
	}
}

`}function vn(o){let e=Ut();return e+=o,Je(e)}function yn(o,e,t){const a="Object_"+o.id,n=Kt(o.matrixWorld);return o.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",o),`def Xform "${a}" (
	prepend references = @./geometries/Geometry_${e.id}.usda@</Geometry>
	prepend apiSchemas = ["MaterialBindingAPI"]
)
{
	matrix4d xformOp:transform = ${n}
	uniform token[] xformOpOrder = ["xformOp:transform"]

	rel material:binding = </Materials/Material_${t.id}>
}

`}function Kt(o){const e=o.elements;return`( ${Ze(e,0)}, ${Ze(e,4)}, ${Ze(e,8)}, ${Ze(e,12)} )`}function Ze(o,e){return`(${o[e+0]}, ${o[e+1]}, ${o[e+2]}, ${o[e+3]})`}function xn(o){return`
def "Geometry"
{
${An(o)}
}
`}function An(o){const e="Geometry",t=o.attributes,a=t.position.count;return`
	def Mesh "${e}"
	{
		int[] faceVertexCounts = [${kn(o)}]
		int[] faceVertexIndices = [${Sn(o)}]
		normal3f[] normals = [${wt(t.normal,a)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${wt(t.position,a)}]
${Mn(t)}
		uniform token subdivisionScheme = "none"
	}
`}function kn(o){const e=o.index!==null?o.index.count:o.attributes.position.count;return Array(e/3).fill(3).join(", ")}function Sn(o){const e=o.index,t=[];if(e!==null)for(let a=0;a<e.count;a++)t.push(e.getX(a));else{const a=o.attributes.position.count;for(let n=0;n<a;n++)t.push(n)}return t.join(", ")}function wt(o,e){if(o===void 0)return console.warn("USDZExporter: Normals missing."),Array(e).fill("(0, 0, 0)").join(", ");const t=[];for(let a=0;a<o.count;a++){const n=o.getX(a),i=o.getY(a),s=o.getZ(a);t.push(`(${n.toPrecision(me)}, ${i.toPrecision(me)}, ${s.toPrecision(me)})`)}return t.join(", ")}function _n(o){const e=[];for(let t=0;t<o.count;t++){const a=o.getX(t),n=o.getY(t);e.push(`(${a.toPrecision(me)}, ${1-n.toPrecision(me)})`)}return e.join(", ")}function Mn(o){let e="";for(let a=0;a<4;a++){const n=a>0?a:"",i=o["uv"+n];i!==void 0&&(e+=`
		texCoord2f[] primvars:st${n} = [${_n(i)}] (
			interpolation = "vertex"
		)`)}const t=o.color;if(t!==void 0){const a=t.count;e+=`
	color3f[] primvars:displayColor = [${wt(t,a)}] (
		interpolation = "vertex"
		)`}return e}function Ln(o,e,t=!1){const a=[];for(const n in o){const i=o[n];a.push(Cn(i,e,t))}return`def "Materials"
{
${a.join("")}
}

`}function Cn(o,e,t=!1){const a="			",n=[],i=[];function s(r,c,d){const p=r.source.id+"_"+r.flipY;e[p]=r;const f=r.channel>0?"st"+r.channel:"st",w={1e3:"repeat",1001:"clamp",1002:"mirror"},x=r.repeat.clone(),L=r.offset.clone(),j=r.rotation,q=Math.sin(j),T=Math.cos(j);return L.y=1-L.y-x.y,t?(L.x=L.x/x.x,L.y=L.y/x.y,L.x+=q/x.x,L.y+=T-1):(L.x+=q*x.x,L.y+=(1-T)*x.y),`
		def Shader "PrimvarReader_${c}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${f}"
			float2 outputs:result
		}

		def Shader "Transform2d_${c}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${o.id}/PrimvarReader_${c}.outputs:result>
			float inputs:rotation = ${(j*(180/Math.PI)).toFixed(me)}
			float2 inputs:scale = ${Vt(x)}
			float2 inputs:translation = ${Vt(L)}
			float2 outputs:result
		}

		def Shader "Texture_${r.id}_${c}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${p}.png@
			float2 inputs:st.connect = </Materials/Material_${o.id}/Transform2d_${c}.outputs:result>
			${d!==void 0?"float4 inputs:scale = "+jn(d):""}
			token inputs:sourceColorSpace = "${r.colorSpace===y.NoColorSpace?"raw":"sRGB"}"
			token inputs:wrapS = "${w[r.wrapS]}"
			token inputs:wrapT = "${w[r.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${o.transparent||o.alphaTest>0?"float outputs:a":""}
		}`}return o.side===y.DoubleSide&&console.warn("THREE.USDZExporter: USDZ does not support double sided materials",o),o.map!==null?(n.push(`${a}color3f inputs:diffuseColor.connect = </Materials/Material_${o.id}/Texture_${o.map.id}_diffuse.outputs:rgb>`),o.transparent?n.push(`${a}float inputs:opacity.connect = </Materials/Material_${o.id}/Texture_${o.map.id}_diffuse.outputs:a>`):o.alphaTest>0&&(n.push(`${a}float inputs:opacity.connect = </Materials/Material_${o.id}/Texture_${o.map.id}_diffuse.outputs:a>`),n.push(`${a}float inputs:opacityThreshold = ${o.alphaTest}`)),i.push(s(o.map,"diffuse",o.color))):n.push(`${a}color3f inputs:diffuseColor = ${Ht(o.color)}`),o.emissiveMap!==null?(n.push(`${a}color3f inputs:emissiveColor.connect = </Materials/Material_${o.id}/Texture_${o.emissiveMap.id}_emissive.outputs:rgb>`),i.push(s(o.emissiveMap,"emissive",new y.Color(o.emissive.r*o.emissiveIntensity,o.emissive.g*o.emissiveIntensity,o.emissive.b*o.emissiveIntensity)))):o.emissive.getHex()>0&&n.push(`${a}color3f inputs:emissiveColor = ${Ht(o.emissive)}`),o.normalMap!==null&&(n.push(`${a}normal3f inputs:normal.connect = </Materials/Material_${o.id}/Texture_${o.normalMap.id}_normal.outputs:rgb>`),i.push(s(o.normalMap,"normal"))),o.aoMap!==null&&(n.push(`${a}float inputs:occlusion.connect = </Materials/Material_${o.id}/Texture_${o.aoMap.id}_occlusion.outputs:r>`),i.push(s(o.aoMap,"occlusion",new y.Color(o.aoMapIntensity,o.aoMapIntensity,o.aoMapIntensity)))),o.roughnessMap!==null?(n.push(`${a}float inputs:roughness.connect = </Materials/Material_${o.id}/Texture_${o.roughnessMap.id}_roughness.outputs:g>`),i.push(s(o.roughnessMap,"roughness",new y.Color(o.roughness,o.roughness,o.roughness)))):n.push(`${a}float inputs:roughness = ${o.roughness}`),o.metalnessMap!==null?(n.push(`${a}float inputs:metallic.connect = </Materials/Material_${o.id}/Texture_${o.metalnessMap.id}_metallic.outputs:b>`),i.push(s(o.metalnessMap,"metallic",new y.Color(o.metalness,o.metalness,o.metalness)))):n.push(`${a}float inputs:metallic = ${o.metalness}`),o.alphaMap!==null?(n.push(`${a}float inputs:opacity.connect = </Materials/Material_${o.id}/Texture_${o.alphaMap.id}_opacity.outputs:r>`),n.push(`${a}float inputs:opacityThreshold = 0.0001`),i.push(s(o.alphaMap,"opacity"))):n.push(`${a}float inputs:opacity = ${o.opacity}`),o.isMeshPhysicalMaterial&&(o.clearcoatMap!==null?(n.push(`${a}float inputs:clearcoat.connect = </Materials/Material_${o.id}/Texture_${o.clearcoatMap.id}_clearcoat.outputs:r>`),i.push(s(o.clearcoatMap,"clearcoat",new y.Color(o.clearcoat,o.clearcoat,o.clearcoat)))):n.push(`${a}float inputs:clearcoat = ${o.clearcoat}`),o.clearcoatRoughnessMap!==null?(n.push(`${a}float inputs:clearcoatRoughness.connect = </Materials/Material_${o.id}/Texture_${o.clearcoatRoughnessMap.id}_clearcoatRoughness.outputs:g>`),i.push(s(o.clearcoatRoughnessMap,"clearcoatRoughness",new y.Color(o.clearcoatRoughness,o.clearcoatRoughness,o.clearcoatRoughness)))):n.push(`${a}float inputs:clearcoatRoughness = ${o.clearcoatRoughness}`),n.push(`${a}float inputs:ior = ${o.ior}`)),`
	def Material "Material_${o.id}"
	{
		def Shader "PreviewSurface"
		{
			uniform token info:id = "UsdPreviewSurface"
${n.join(`
`)}
			int inputs:useSpecularWorkflow = 0
			token outputs:surface
		}

		token outputs:surface.connect = </Materials/Material_${o.id}/PreviewSurface.outputs:surface>

${i.join(`
`)}

	}
`}function Ht(o){return`(${o.r}, ${o.g}, ${o.b})`}function jn(o){return`(${o.r}, ${o.g}, ${o.b}, 1.0)`}function Vt(o){return`(${o.x}, ${o.y})`}function Rn(o){const e=o.name?o.name:"Camera_"+o.id,t=Kt(o.matrixWorld);return o.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",o),o.isOrthographicCamera?`def Camera "${e}"
		{
			matrix4d xformOp:transform = ${t}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${o.near.toPrecision(me)}, ${o.far.toPrecision(me)})
			float horizontalAperture = ${((Math.abs(o.left)+Math.abs(o.right))*10).toPrecision(me)}
			float verticalAperture = ${((Math.abs(o.top)+Math.abs(o.bottom))*10).toPrecision(me)}
			token projection = "orthographic"
		}
	
	`:`def Camera "${e}"
		{
			matrix4d xformOp:transform = ${t}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${o.near.toPrecision(me)}, ${o.far.toPrecision(me)})
			float focalLength = ${o.getFocalLength().toPrecision(me)}
			float focusDistance = ${o.focus.toPrecision(me)}
			float horizontalAperture = ${o.getFilmWidth().toPrecision(me)}
			token projection = "perspective"
			float verticalAperture = ${o.getFilmHeight().toPrecision(me)}
		}
	
	`}var Fn=function(){var o="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:W:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:986qdbk;jYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz1jjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbhodnawTmbaxa8Acd4fRbbhokaocFeGh5cbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz1jjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:jjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q1jjbfcj1jjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bbarcwf9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfag9c8F1:NghcKtc8F91aicdfa8J9c8N1:Nfg8KRbbG86bbarcVfcba8KahcjeGcr4fghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fag9c8F1:NgicKtc8F91aha8J9c8N1:NfghRbbG86bbarc96fcbahaicjeGcr4fgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbb83bbarcwfaicwf8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbcbaocl49Rh8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E93aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z1jjjb8AazazcjdfaAcufad2fadz1jjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbyd:K1jjbgeabcifc98GfgbBd:K1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk81dbcjwk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:Kwkl8WNbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;X9Mqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:183lYud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxavaialfgmar9Rgoad;8qbbcj;abad9Uc;WFbGcjdadca0EhPdndndnadTmbaoadfhscbhzinaeaz9nmdamax9RaD6miabazad2fhHaxaDfhOaPaeaz9RazaPfae6EgAcsfgocl4cifcd4hCavcj;cbfaoc9WGgXcetfhQavcj;cbfaXci2fhLavcj;cbfaXfhKcbhYaoc;ab6h8AincbhodnawTmbaxaYcd4fRbbhokaocFeGhEcbh3avcj;cbfh5indndndndnaEa3cet4ciGgoc9:fPdebdkamaO9RaX6mwavcj;cbfa3aX2faOaX;8qbbaOaAfhOxdkavcj;cbfa3aX2fcbaX;8kbxekamaO9RaC6moaoclVcbawEhraOaCfhocbhidna8Ambamao9Rc;Gb6mbcbhlina5alfhidndndndndndnaOalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiczfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaicafaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaoclffaqc:q:yjjbfRbbfhoxikaic8Wfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaocwffaqc:q:yjjbfRbbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitc:q1jjbfpbibaic:q:yjjbfRbbgipsaoRbegqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqc:q:yjjbfRbbfhokalc;abfhialcjefaX0meaihlamao9Rc;Fb0mbkkdnaiaX9pmbaici4hlinamao9RcK6mwa5aifhqdndndndndndnaOaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaoclffahc:q:yjjbfRbbfhoxikaqaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaocwffahc:q:yjjbfRbbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpkbbaaaocdffahc:q:yjjbfRbbfhokalcdfhlaiczfgiaX6mbkkaohOaoTmoka5aXfh5a3cefg3cl9hmbkdndndndnawTmbasaYcd4fRbbglciGPlbedwbkaXTmdavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep9Ta8Epxeeeeeeeeeeeeeeeeg8Fp9op9Hp9rg8Eagp9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Ug8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9AbbbaladfhlaoczfgoaX6mbxikkaXTmeavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep:nea8Epxebebebebebebebebg8Fp9op:bep9rg8Eagp:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeg8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9AbbbaladfhlaoczfgoaX6mbxdkkaXTmbcbhocbalcl4gl9Rc8FGhiavcjdfaYfhravaYfpbdbh8Finaravcj;cbfaofpblbggaKaofpblbg8JpmbzeHdOiAlCvXoQrLg8KaQaofpblbg8LaLaofpblbg8MpmbzeHdOiAlCvXoQrLg8NpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ea8Fp9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Fa8Ka8NpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwKDYq8AkEx3m5P8Es8Fgga8La8MpmwKDYq8AkEx3m5P8Es8Fg8JpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9AbbbaradfhraoczfgoaX6mbkkaYclfgYad6mbkaHavcjdfaAad2;8qbbavavcjdfaAcufad2fad;8qbbaAazfhzc9:hoaOhxaOmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdaPaeao9RaoaPfae6Eaofgoae6mbkaial9Rhxkcbc99amax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:SPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgopklbaiaopklbaiabalcitfgdaeciGglcitgv;8qbbdnalTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkadaiav;8qbbkk:oDllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiczfpxbbbbbbbbbbbbbbbbgkpklbaiakpklbaiabalcitfgoaeciGgvcitgw;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkaoaiaw;8qbbkk;uddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaic8WfpxbbbbbbbbbbbbbbbbgopklbaicafaopklbaiczfaopklbaiaopklbaiabavcdtfgdalciGgecdtgv;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkadaiav;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),a=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var n=WebAssembly.validate(t)?r(e):r(o),i,s=WebAssembly.instantiate(n,{}).then(function(T){i=T.instance,i.exports.__wasm_call_ctors()});function r(T){for(var C=new Uint8Array(T.length),P=0;P<T.length;++P){var D=T.charCodeAt(P);C[P]=D>96?D-97:D>64?D-39:D+4}for(var I=0,P=0;P<T.length;++P)C[I++]=C[P]<60?a[C[P]]:(C[P]-60)*64+C[++P];return C.buffer.slice(0,I)}function c(T,C,P,D,I,J,Y){var V=T.exports.sbrk,N=D+3&-4,oe=V(N*I),fe=V(J.length),U=new Uint8Array(T.exports.memory.buffer);U.set(J,fe);var m=C(oe,D,I,fe,J.length);if(m==0&&Y&&Y(oe,N,I),P.set(U.subarray(oe,oe+D*I)),V(oe-V(0)),m!=0)throw new Error("Malformed buffer data: "+m)}var d={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},p={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},f=[],w=0;function x(T){var C={object:new Worker(T),pending:0,requests:{}};return C.object.onmessage=function(P){var D=P.data;C.pending-=D.count,C.requests[D.id][D.action](D.value),delete C.requests[D.id]},C}function L(T){for(var C="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(n)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+q.name+";"+c.toString()+q.toString(),P=new Blob([C],{type:"text/javascript"}),D=URL.createObjectURL(P),I=f.length;I<T;++I)f[I]=x(D);for(var I=T;I<f.length;++I)f[I].object.postMessage({});f.length=T,URL.revokeObjectURL(D)}function j(T,C,P,D,I){for(var J=f[0],Y=1;Y<f.length;++Y)f[Y].pending<J.pending&&(J=f[Y]);return new Promise(function(V,N){var oe=new Uint8Array(P),fe=++w;J.pending+=T,J.requests[fe]={resolve:V,reject:N},J.object.postMessage({id:fe,count:T,size:C,source:oe,mode:D,filter:I},[oe.buffer])})}function q(T){var C=T.data;if(!C.id)return self.close();self.ready.then(function(P){try{var D=new Uint8Array(C.count*C.size);c(P,P.exports[C.mode],D,C.count,C.size,C.source,P.exports[C.filter]),self.postMessage({id:C.id,count:C.count,action:"resolve",value:D},[D.buffer])}catch(I){self.postMessage({id:C.id,count:C.count,action:"reject",value:I})}})}return{ready:s,supported:!0,useWorkers:function(T){L(T)},decodeVertexBuffer:function(T,C,P,D,I){c(i,i.exports.meshopt_decodeVertexBuffer,T,C,P,D,i.exports[d[I]])},decodeIndexBuffer:function(T,C,P,D){c(i,i.exports.meshopt_decodeIndexBuffer,T,C,P,D)},decodeIndexSequence:function(T,C,P,D){c(i,i.exports.meshopt_decodeIndexSequence,T,C,P,D)},decodeGltfBuffer:function(T,C,P,D,I,J){c(i,i.exports[p[I]],T,C,P,D,i.exports[d[J]])},decodeGltfBufferAsync:function(T,C,P,D,I){return f.length>0?j(T,C,P,p[D],d[I]):s.then(function(){var J=new Uint8Array(T*C);return c(i,i.exports[p[D]],J,T,C,P,i.exports[d[I]]),J})}}}();function Tn(o,e="horizontal",t){return new Promise((a,n)=>{const i=new fa;i.setMeshoptDecoder(Fn);const s=new Ja;s.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/"),s.preload(),console.log(s),i.setDRACOLoader(s),i.load(o,r=>{r.scene.traverse(p=>{p.isMesh&&p.material&&(Array.isArray(p.material)?p.material:[p.material]).forEach(w=>{w.side===xt.DoubleSide&&(w.side=xt.FrontSide,w.needsUpdate=!0)})}),r.scene.scale.set(t.scaleX,t.scaleY,t.scaleZ),e==="vertical"&&(r.scene.rotation.x=-Math.PI/2),r.scene.updateMatrixWorld(!0);const c={ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:e}},quickLookCompatible:!1,maxTextureSize:1024};new fn().parse(r.scene,p=>{const f=new Blob([p],{type:"model/vnd.usdz+zip"}),w=URL.createObjectURL(f);console.log(w),a(w)},p=>{console.error("Error during USDZ export:",p),n(new Error(`USDZ export failed: ${String(p)}`))},c)},void 0,r=>{console.error("Error loading GLB:",o,r),n(new Error(`Failed to load GLB from ${o}: ${String(r)}`))})})}const En=o=>btoa(o),Xt=o=>atob(o),ue=(o,e={})=>{const t=document.createElement(o);return e.classList&&e.classList.forEach(a=>t.classList.add(a)),e.textContent&&(t.textContent=e.textContent),e.attributes&&Object.entries(e.attributes).forEach(([a,n])=>{t.setAttribute(a,n)}),t};function Qe(o,e=document.body){return e.appendChild(o),o}const $e={debug:(...o)=>{},error:(...o)=>{},warn:(...o)=>{}};async function vt(o,e){if(e[o])return e[o];try{const t=fetch(o).then(a=>{if(!a.ok)throw new Error("Network response was not ok");return a.blob()}).then(a=>{const n=URL.createObjectURL(a);return e[o]=n,n});return e[o]=t,await t}catch(t){return console.error("Failed to load poster:",t),delete e[o],o}}class yt{constructor(e,t){this.container=e,this.modelData=t,this.qrCode=null}async loadImage(e){return new Promise((t,a)=>{const n=new Image;n.onload=()=>t(),n.onerror=n.onabort=()=>a(new Error("Image failed to load")),n.src=e})}async updateQrCode(e){var i;this.container.innerHTML="";const t=(i=this.modelData)==null?void 0:i.qrCode;let a=t==null?void 0:t.faviconUrl;if(a)try{await this.loadImage(a)}catch{a=null}const n={width:parseInt(t.QRsize)||240,height:parseInt(t.QRsize)||240,data:e,dotsOptions:{color:t.dotColor||"#000000",type:t.dotStyle||"square"},cornersSquareOptions:{color:t.cornerColor||"#000000",type:t.cornerStyle||"square"},cornersDotOptions:{color:t.cornerDotColor||"#000000",type:t.cornerDotStyle||"square"},backgroundOptions:{color:t.backgroundColor||"#ffffff"}};a&&(n.image=a,n.imageOptions={margin:parseInt(t.faviconMargin)||0}),this.qrCode=new aa(n),this.qrCode.append(this.container)}}const Wt=document.createElement("template");Wt.innerHTML=`
  <div class="ardisplay-progress-modal" id="ardisplayProgressModal" style="display: none;direction: ltr;">
    <div class="ardisplay-progress-content">
      <button class="ardisplay-progress-close-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg></button>
      <h3 class="ardisplay-progress-text">Loading...</h3>
      <div class="ardisplay-progress-bar">
        <div class="ardisplay-progress-bar-fill" id="ardisplayProgressBarFill"></div>
      </div>
    </div>
  </div>
  <style>
    .ardisplay-progress-modal {
      position: fixed;
      z-index: 9999;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .ardisplay-progress-content {
      position: relative;
      text-align: center;
      font-family: sans-serif;
    }
    .ardisplay-progress-text {
      color:white;
    }
    .ardisplay-progress-bar {
      width: 200px;
      background: transparent;
      border: 2px solid white;
      border-radius: 4px;
      margin-top: 16px;
      overflow: hidden;
    }
    .ardisplay-progress-bar-fill {
      width: 0;
      height: 8px;
      background: white;
      transition: width 0.2s linear;
    }
    .ar-button {
      margin-top: 16px;
      padding: 8px 16px;
      background: #0072f5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      display: none;
    }
    .ar-button:hover {
      background: #0058bc;
    }
    .ardisplay-progress-close-button {
      position: fixed;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        color: white;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background: transparent;
    }
    .ardisplay-progress-close-button:hover {
      color: #ccc;
    }
    .ardisplay-progress-close-button svg{
      width:30px;
      height:30px;
    }
  </style>
`;const Re=[{title:"Scanning",description:"Stand several feet back. With camera facing wall, make sweeping motion side to side, up and down."},{title:"Ready to view",description:"Get started with AR view"}],Jt=document.createElement("template");Jt.innerHTML=`
  <div class="ardisplay-multi-steps-overlay" style="display: none;direction: ltr;">
    <div class="ardisplay-overlay-bg" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9998;
    ">
      <div class="ardisplay-steps-close-button" style="
        position: fixed;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        color: white;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:30px;height:30px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <div class="ardisplay-multi-steps-modal" style="
      position: fixed;
      bottom: .5rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 1rem);
      height: auto;
      max-height: 90vh;
      background-color: rgba(255, 255, 255, 0.85);
      -webkit-backdrop-filter: blur(15px);
      backdrop-filter: blur(15px);
      z-index: 9999;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 15px;
    ">
      <div class="ardisplay-steps-content" style="padding: 1rem; flex: 1;padding-top: 0;">
        <h3 class="ardisplay-translate-lang instructions-title">Scanning</h3>
        <img id="instructionGif" src="" class="ardisplay-steps-gif" alt="Computer man">
        <div class="ardisplay-instructions-body translate-lang" data-id="space-info">Stand several feet back. With camera facing wall, make sweeping motion side to side, up and down.</div>
      </div>
      <div class="ardisplay-steps-footer" style="
        display: flex; 
        justify-content: flex-end; 
        flex-direction:column;
        gap: 0.5rem; 
        border-top: 1px solid #ccc; 
        font-size: 16px;
        font-weight: bold;
        line-height: 1.5;
        padding: 8px;
        width: 75%;
        max-width: 100%;
        margin: 10px auto;
      ">
        <button class="ardisplay-next-button ardisplay-multi-button">Next</button>
      </div>
    </div>
  </div>
  <style>
    /* You can customize these classes as well */
    .ardisplay-multi-steps-overlay.show {
      display: block;
    }

    .ardisplay-steps-gif{
      width:100%;
      height:auto;
      border-radius: 20px;
    }

    .ardisplay-view-wall-button{
      width: 100%;
    }

    .ardisplay-view-wall-button svg{
      width: 24px;
      height: 24px;
      margin-right: 8px;
      fill: white;
      stroke: white;
    }

    .ardisplay-instructions-body {
        display:flex;
        align-items:center;
        font-size: 16px;
        line-height: 1.5;
        color: #272727;
        margin: 10px 0 10px 0;
        text-align: justify;
        font-family:sans-serif;
    }

    h3 {
        font-size: 20px;
        font-weight: bold;
        font-family:sans-serif;
        line-height: 1.5;
        margin: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 10px 10px 10px 10px;
    }

    .ardisplay-steps-header{
      display:flex;
      flex-direction:row;
      width:80%;
      gap:12px;
      margin:auto;
    }

    .ardisplay-steps-content{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      overflow:hidden;
    }

    .ardisplay-step-indicator{
      height:6px;
      background:#bbbbbb;
      flex:1;
    }

    .ardisplay-step-indicator.active{
      background:black;
    }

    .ardisplay-multi-button{
      padding-block: .5rem;
      cursor:pointer;
      height:45px;
      border-radius:10px;
      flex-shrink:0;
      font-weight:bold;
    }

    .ardisplay-next-button{
      background:black!important;
      color:white;
    }

    .ardisplay-skip-button{
      border:none;
      color:gray;
      text-decoration:underline;
    }
  </style>
`;class qn extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.selectedIndex=0,this.calculatedScale=null,this.modelData=null,this.originalSize=null,this.variants=[],this.variantSizes=[],this.scaleEvent=new Event("scale",{bubbles:!0,composed:!0}),this.isModelLoaded=!1,this.userClickedAR=!1,this.currentStep=1,this.totalSteps=2,this.qrCodeManager=null,this.qrModal=null,this.posters={},this.modelViewer=null,this.debouncedRenderSVG=this.animationFrameDebounce(this._renderSVG),this.debouncedUpdateDimensionHotspots=this.animationFrameDebounce(this._updateDimensionHotspots),this.GIF_URLS=[],this.gifCache={},this.preloadImage=async e=>{if(this.gifCache[e])return this.gifCache[e];const t=fetch(e).then(a=>a.blob()).then(a=>{const n=URL.createObjectURL(a);return this.gifCache[e]=n,n}).catch(a=>(delete this.gifCache[e],e));return this.gifCache[e]=t,t},this.setupPreloaderForStep=(e,t)=>{if(e+1<this.GIF_URLS.length&&!this.gifCache[this.GIF_URLS[e+1]]){const a=this.GIF_URLS[e+1],n=t.querySelector(".ardisplay-steps-gif");if(!n)return;const i=n.getBoundingClientRect();if(i.top>=0&&i.bottom<=window.innerHeight){this.preloadImage(a);return}new IntersectionObserver((c,d)=>{c.forEach(p=>{p.isIntersecting&&(this.preloadImage(a),d.disconnect())})},{threshold:.5}).observe(n)}}}animationFrameDebounce(e){let t=!1;return(...a)=>{t||(t=!0,requestAnimationFrame(()=>{e.apply(this,a),t=!1}))}}debounce(e,t){let a;return function(...n){const i=this;clearTimeout(a),a=setTimeout(()=>e.apply(i,n),t)}}_sendShortStatsEvent(e,t=""){var n;$e.debug(this.modelData);const a={dmodelId:((n=this.modelData)==null?void 0:n.modelId)||"no-model-id",action:e,browser:navigator.userAgent,message:t||void 0};fetch("https://ardisplayboilerplate.vercel.app/api/stats",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(i=>{i.ok||$e.error("Error sending stats:",i.status)}).catch(i=>{})}static get observedAttributes(){return["ar-btn-config"]}attributeChangedCallback(e,t,a){e==="ar-btn-config"&&t!==a&&this._updateArBtnConfig(a)}_updateArBtnConfig(e){if(!this.modelData){console.warn("Deferring AR button config update: modelData not ready yet.");return}if(e)try{const t=Xt(e),a=JSON.parse(t);let n={...this.modelData.arBtn,...a};const i=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".ardisplay-qr-code-button"):document.querySelector(".ardisplay-qr-code-button"),s=this.shadowRoot.querySelector(".ardisplay-view-3d-button");if(s&&(s.style.backgroundColor=n.btnBgColor,s.style.color=n.btnTextColor,s.style.borderRadius=n.cornerRadius+"px",s.style.fontSize=n.btnSize+"px",s.style.boxSizing="border-box",n.modalButtonText&&(s.querySelector("span").innerHTML=n.modalButtonText)),i){i.style.backgroundColor=n.btnBgColor,i.style.color=n.btnTextColor,i.style.borderRadius=n.cornerRadius+"px",i.style.fontSize=n.btnSize+"px",i.style.boxSizing="border-box";const r=n.btnIcon?`<i data-lucide="${n.btnIcon}" style="width: 24px; height: 24px; color: inherit;"></i>`:"";i.innerHTML=`${r} ${n.btnText}`,this._processLucideIcons(i)}}catch(t){console.error("Invalid AR button configuration provided in ar-btn-config attribute:",t)}}async connectedCallback(){if(this._getAttributes(),await this._getModelData(),this.modelData.enabled===!1&&!this.hasAttribute("enabled"))return;const e=this.modelData.options&&this.modelData.options.length>0&&this.modelData.options[0].placement||this.modelData.placement;e==="wall"?this.GIF_URLS.push(`${ze}/wall.webp`):this.GIF_URLS.push(`${ze}/floor.gif`),this.styles=this._consolidateStyles(),this.modelData.mode!=="popup"?this.shadowRoot.appendChild(this.styles):document.body.appendChild(this.styles);const t=document.createElement("template");t.innerHTML=`
      <!-- QR Code Modal -->
      <style>
        #qrModal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .qr-modal-content {
          background: white;
          border-radius: 8px;
          position: relative;
          background-color: #fefefe;
          border: 1px solid #888;
          width: 820px;
          height: 418px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .qr-close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          border: none;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .qr-modal-content h2 {
          margin-top: 0;
          color: #333;
          text-align: center;
        }
        .qr-code-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #qr-code {
          margin: 20px auto;
        }
      </style>
      <div id="qrModal" class="qr-modal" style="direction: ltr;">
          <div class="qr-modal-content" style="display: flex; flex-direction: row;text-align: center;overflow: hidden;">
          <button class="qr-close-button">×</button>
          <div style="width: 50%; height:100%;flex-grow: 0; flex-shrink: 0;display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
              <h2 style="padding-block: 10px;">
                  <p id="btn-text" style="margin: 0">${this.modelData.title}</p>
              </h2>
              <p data-id="qrcode-info" class="translate-lang" style="margin:0">${this.modelData.description}</p>
              <div class="qr-code-container">
                  <div id="qr-code"></div>
              </div>
          </div>
          <div style="width: 50%; height:100%; flex-grow: 0; flex-shrink: 0;">
              <img src="${this.modelData.options[0].posterFileUrl}" alt="Artwork" style="width: 100%; height: 100%; object-fit: contain; object-position: center;">
          </div>
          </div>
      </div>
    `;const a=tt(),n=document.createElement("template");n.innerHTML=`
      <style>
      .model-viewer-container{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 96px);
        height: calc(100% - 96px);
        display: none;
        background-color: white;
        flex-direction: row;
        z-index: 999;
      }

      /* Consolidated Styles */
      model-viewer {
        width: 100%;
        height: 100%;
        --min-hotspot-opacity: 0;
        position: relative;
      }
        
      .ardisplay-close-button{
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      .ardisplay-close-button svg{
        width: 24px;
        height: 24px;
        fill: black;
      }
      .ardisplay-model-viewer-overlay{
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        display: none;
      }
      .ardisplay-details-panel{
        width: 400px;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding-block: 1rem;
        padding-top: 50px; // added padding
      }
      @media only screen and (max-width: 900px){
        .model-viewer-container{
          width: 100%;
          height: calc(100% - 48px);
          transform: translate(-50%, 0);
          top: 48px;
        }
        .ardisplay-details-panel{
          display: none!important;
        }

        .ardisplay-model-viewer-overlay{
          top: -48px;
        }

        .ardisplay-qr-code-button{
          display:flex!important;
        }
      }
      .ardisplay-details-panel{
        display:flex;
      }
      .ardisplay-qr-code-button{
        all: unset;
        position: absolute;
        display:none;
        top: 10px;
        right: 50%;
        transform: translateX(50%);
        background: white;
        cursor: pointer;
        padding: 10px;
        z-index: 1000;
        align-items: center;
        justify-content: center;
        gap: 10px;
        white-space: nowrap;
      }
      .ardisplay-show{
        display:flex!important;
      }
      </style>
      <div class="model-viewer-container" style="direction: ltr;">
                <model-viewer  
                    ar
                    shadow-intensity="${this.modelData.shadow}"
                    ar-placement="${this.modelData.options&&this.modelData.options.length>0&&this.modelData.options[0].placement||this.modelData.placement}"
                    ar-modes="webxr scene-viewer quick-look"
                    ar-scale="fixed"
                    camera-controls="true"
                    disable-pan="true"
                    disable-tap="true"
                    ar-status="not-presenting"
                >
                    ${a}
                    <button class="ardisplay-qr-code-button" style="background-color: ${this.modelData.arBtn.btnBgColor};color: ${this.modelData.arBtn.btnTextColor};border-radius: ${this.modelData.arBtn.cornerRadius}px;font-size: ${this.modelData.arBtn.btnSize-6}px;text-wrap: nowrap;box-sizing: border-box;">
                        ${this.modelData.arBtn.btnIcon?`<i data-lucide="${this.modelData.arBtn.btnIcon}" style="width: 24px; height: 24px;color: inherit;"></i>`:""}
                        ${this.modelData.arBtn.btnText}
                    </button>
                </model-viewer>
                <button class="ardisplay-close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <div class="ardisplay-details-panel" style="flex-direction:column;">
                    <div class="ar-display-custom-panel" style="flex:1;display:block;"></div>
                    <button id="showQRButton" style="margin-top: 16px; margin-right: 16px; padding: 8px 16px; color: black; border: none; border-radius: 4px; cursor: pointer;display:flex;flex-direction:row;align-items:center;gap:16px;font-weight:700;">
                      <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" class="rotera-svg-icon"><path d="M2 2h7v2H4v5H2V2zm18 2h-5V2h7v7h-2V4zM4 15H2v7h7v-2H4v-5zm18 0h-2v5h-5v2h7v-7z"></path><path d="M11 6h2v5h5v7h-7v-5H6v-2h5V6z"></path><path d="M9 6H6v3h3V6zm6 0h3v3h-3V6zm-6 9H6v3h3v-3z"></path></svg>
                      Try it in your home
                    </button>
                    <div id="inline-qr-container" style="display: none; margin-top: 16px;justify-content:center;align-items:center;"></div>
                </div>
            </div>
            <div class="ardisplay-model-viewer-overlay"></div>
        </div>
    `,this.styles=this._consolidateStyles(),this.shadowRoot.appendChild(this.styles),await this._loadTemplate(this.modelData.mode),this._moveSlottedContent(),this._updateArBtnConfig(this.getAttribute("ar-btn-config"));const i=this.getAttribute("ar-btn-config");if(i)try{const C=Xt(i),P=JSON.parse(C);this.modelData.arBtn=P}catch(C){console.error("Invalid AR button configuration provided in ar-btn-config attribute:",C)}Qe(Wt.content.cloneNode(!0)),Qe(Jt.content.cloneNode(!0));const s=e==="wall"?"wall.webp":"floor.gif",r=document.querySelector("#instructionGif");r&&(r.src=`${ze}/${s}`),this.modelData.placement;const c=document.querySelector(".ardisplay-instructions-body");c&&(c.innerHTML=`Stand several feet back. With camera facing ${e==="wall"?"wall":"floor"}, make sweeping motion side to side, up and down.`),this.modelData.mode!=="popup"&&Qe(t.content.cloneNode(!0)),this.modelData.mode==="popup"&&Qe(n.content.cloneNode(!0)),this.modelViewer=this.modelData.mode==="popup"?document.querySelector("model-viewer"):this.shadowRoot.querySelector("model-viewer");const d=document.querySelector("#showQRButton");d&&d.addEventListener("click",()=>{const C=document.querySelector("#inline-qr-container");if(C){C.classList.toggle("ardisplay-show");const P=`${Ve}/${this.modelData.modelId}`;this.qrCodeManager&&this.qrCodeManager.updateQrCode(P)}}),this.modelData.mode==="popup"&&this._processLucideIcons(document.querySelector(".ardisplay-qr-code-button"));const p=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".ardisplay-qr-code-button"):document.querySelector(".ardisplay-qr-code-button");this.hasAttribute("fullWidth")&&this.modelData.mode==="none"&&(p.style.width="100%"),p.style.boxSizing="border-box";const f=document.querySelector("#qr-code");if(p&&(this.qrCodeManager=new yt(f,this.modelData),this._setupQRCodeListeners()),this.modelData.mode==="popup"){const C=document.querySelector("#inline-qr-container");C&&(this.qrCodeManager=new yt(C,this.modelData))}const w=document.querySelector(".ardisplay-next-button"),x=document.querySelector(".ardisplay-steps-close-button");w==null||w.addEventListener("click",this._goToNextStep.bind(this)),x==null||x.addEventListener("click",()=>{const C=document.querySelector(".ardisplay-multi-steps-overlay");C&&(C.style.display="none")});const L=document.querySelector("#ardisplayProgressModal"),j=document.querySelector(".ardisplay-progress-content"),q=document.querySelector(".ardisplay-progress-close-button");L&&q&&(q.addEventListener("click",()=>{L.style.display="none"}),L.addEventListener("click",C=>{j.contains(C.target)||(L.style.display="none")})),this._setupEventListeners(),this._sendShortStatsEvent("View");const T=ue("div",{classList:["bottom-container"]});T.style.direction="ltr",this.modelViewer.appendChild(T),this._setupCartButton(T),this._setupBottomNavBar(T),this._isIOSDevice()&&this.modelViewer&&this.modelViewer.removeAttribute("ar-scale")}_showStepsModal(){const e=document.querySelector(".ardisplay-multi-steps-overlay");if(e){e.style.display="block";const t=this.GIF_URLS[0];this.preloadImage(t),this.setupPreloaderForStep(0,document),this._setupSwipeListeners()}}_skipToLast(){this.currentStep=this.totalSteps;const e=document.querySelector(".ardisplay-steps-content"),t=document.querySelector(".ardisplay-next-button"),a=document.querySelector(".ardisplay-skip-button");document.querySelectorAll(".ardisplay-step-indicator").forEach((i,s)=>{i.classList.toggle("active",s<this.currentStep)}),e.innerHTML=`
      <h3 class="ardisplay-instructions-title">${Re[this.currentStep-1].title}</h3>
      <img src="${this.GIF_URLS[this.GIF_URLS.length-1]}"
           class="ardisplay-steps-gif"
           alt="Product preview"
           style="width: 100%;">
      <div class="ardisplay-instructions-body">${Re[this.currentStep-1].description}</div>
      <button class="ardisplay-view-wall-button" style="
        background: black;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        ">
        <svg version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
        <g>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M33.002,49H44c2.762,0,5-2.239,5-5V32.626"/>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M1,33v10.999c0,2.763,2.24,5,5,5h11"/>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M17,1H6C3.238,1,1,3.238,1,6v11"/>
          <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
            M49,16.625V6c0-2.762-2.238-5-5-5H33.002"/>
          <g>
            <path d="M39,39c0,1.104-1.116,2-2.22,2L14.89,35C13.785,35,13,34.104,13,33V17c0-1.104,0.676-2,1.78-2l22.11-6
              C37.994,9,39,9.896,39,11V39z M23.686,29.171c-0.59,0.588-0.59,1.541,0,2.129c0.293,0.295,0.678,0.441,1.064,0.441
              c0.385,0,0.77-0.146,1.064-0.441l4.377-4.376l4.199,4.198c0.588,0.59,1.541,0.59,2.129,0c0.588-0.588,0.588-1.541,0-2.129
              l-5.264-5.264c-0.588-0.59-1.541-0.59-2.129,0l-1.697,1.697l-3.76-3.758c-0.586-0.586-1.535-0.586-2.121,0l-6.943,6.943
              c-0.586,0.586-0.586,1.535,0,2.121c0.293,0.293,0.676,0.439,1.061,0.439c0.383,0,0.768-0.146,1.061-0.439l5.883-5.883l2.699,2.697
              L23.686,29.171z M29.119,19.571c0-0.998-0.809-1.807-1.807-1.807c-0.996,0-1.805,0.809-1.805,1.807
              c0,0.996,0.809,1.805,1.805,1.805C28.311,21.376,29.119,20.567,29.119,19.571"/>
          </g>
        </g>
        </svg>
        View on your wall
      </button>
    `,t&&requestAnimationFrame(()=>{t.parentElement.style.display="none"}),a&&requestAnimationFrame(()=>{a.style.display="none"});const n=e.querySelector(".ardisplay-view-wall-button");n&&n.addEventListener("click",()=>{this.handleActivateAR();const i=document.querySelector(".ardisplay-multi-steps-overlay");i&&(i.style.display="none")})}async _goToNextStep(){if(this.currentStep<this.totalSteps)if(this.currentStep++,document.querySelectorAll(".ardisplay-step-indicator").forEach((e,t)=>{e.classList.remove("active"),t<=this.currentStep-1&&e.classList.add("active")}),this.currentStep===this.totalSteps){const e=document.querySelector(".ardisplay-steps-content"),t=document.querySelector(".ardisplay-next-button"),a=document.querySelector(".ardisplay-skip-button");e.innerHTML=`
          <h3 class="ardisplay-instructions-title">${Re[this.currentStep-1].title}</h3>
          <img src="${this.GIF_URLS[this.GIF_URLS.length-1]}"
               class="ardisplay-steps-gif"
               alt="Product preview"
               style="object-fit: cover;width: 100%;">
          <div class="ardisplay-instructions-body">${Re[this.currentStep-1].description}</div>
          <button class="ardisplay-view-wall-button" style="
            background: black;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            margin-top: 16px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            ">
              <svg version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
              <g>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M33.002,49H44c2.762,0,5-2.239,5-5V32.626"/>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M1,33v10.999c0,2.763,2.24,5,5,5h11"/>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M17,1H6C3.238,1,1,3.238,1,6v11"/>
                <path fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                  M49,16.625V6c0-2.762-2.238-5-5-5H33.002"/>
                <g>
                  <path d="M39,39c0,1.104-1.116,2-2.22,2L14.89,35C13.785,35,13,34.104,13,33V17c0-1.104,0.676-2,1.78-2l22.11-6
                    C37.994,9,39,9.896,39,11V39z M23.686,29.171c-0.59,0.588-0.59,1.541,0,2.129c0.293,0.295,0.678,0.441,1.064,0.441
                    c0.385,0,0.77-0.146,1.064-0.441l4.377-4.376l4.199,4.198c0.588,0.59,1.541,0.59,2.129,0c0.588-0.588,0.588-1.541,0-2.129
                    l-5.264-5.264c-0.588-0.59-1.541-0.59-2.129,0l-1.697,1.697l-3.76-3.758c-0.586-0.586-1.535-0.586-2.121,0l-6.943,6.943
                    c-0.586,0.586-0.586,1.535,0,2.121c0.293,0.293,0.676,0.439,1.061,0.439c0.383,0,0.768-0.146,1.061-0.439l5.883-5.883l2.699,2.697
                    L23.686,29.171z M29.119,19.571c0-0.998-0.809-1.807-1.807-1.807c-0.996,0-1.805,0.809-1.805,1.807
                    c0,0.996,0.809,1.805,1.805,1.805C28.311,21.376,29.119,20.567,29.119,19.571"/>
                </g>
              </g>
              </svg>
              View on your wall
          </button>
        `;const n=e.querySelector(".ardisplay-steps-gif"),i=this.GIF_URLS[this.GIF_URLS.length-1];t&&requestAnimationFrame(()=>{t.parentElement.style.display="none"}),a&&requestAnimationFrame(()=>{a.style.display="none"});try{const r=await this.preloadImage(i);n.src=r,n.setAttribute("loading","eager")}catch{n.src=i}const s=e.querySelector(".ardisplay-view-wall-button");s&&s.addEventListener("click",()=>{this.handleActivateAR();const r=document.querySelector(".ardisplay-multi-steps-overlay");r&&(r.style.display="none")})}else{const e=document.querySelector(".ardisplay-steps-gif"),t=this.GIF_URLS[this.currentStep-1];try{const a=await this.preloadImage(t);e.src=a,e.setAttribute("loading","eager")}catch{e.src=t}document.querySelector(".ardisplay-instructions-title").innerHTML=Re[this.currentStep-1].title,document.querySelector(".ardisplay-instructions-body").innerHTML=Re[this.currentStep-1].description,this.setupPreloaderForStep(this.currentStep-1,document)}}async _goToPreviousStep(){if(this.currentStep>1){this.currentStep--,document.querySelectorAll(".ardisplay-step-indicator").forEach((a,n)=>{a.classList.remove("active"),n<this.currentStep&&a.classList.add("active")});const e=document.querySelector(".ardisplay-steps-content");e.innerHTML=`
        <h3 class="ardisplay-instructions-title">${Re[this.currentStep-1].title}</h3>
        <img src="${this.GIF_URLS[this.currentStep-1]}"
             class="ardisplay-steps-gif"
             alt="Product preview"
             style="width: 100%;">
        <div class="ardisplay-instructions-body">
          Stand several feet back. With camera facing ${this.variants[this.selectedIndex]&&this.variants[this.selectedIndex].placement||this.modelData.placement}, make sweeping motion side to side, up and down.
        </div>
      `;const t=document.querySelector(".ardisplay-next-button");t&&t.parentElement&&(t.parentElement.style.display="flex")}}_setupSwipeListeners(){const e=document.querySelector(".ardisplay-steps-content");if(!e)return;let t=0,a=0;const n=50,i=r=>{t=r.changedTouches[0].screenX},s=r=>{a=r.changedTouches[0].screenX,this._handleSwipeGesture(t,a,n)};e.addEventListener("touchstart",i),e.addEventListener("touchend",s),this._swipeHandlers={start:i,end:s,element:e}}_handleSwipeGesture(e,t,a){const n=t-e;Math.abs(n)>a&&(n<0?this._goToNextStep():this._goToPreviousStep())}disconnectedCallback(){if(document.removeEventListener("mousedown",this.boundHandleDocumentMouseDown),document.removeEventListener("scale",this.boundHandleScale),this.modelViewer&&(this.modelViewer.removeEventListener("model-visibility",this.boundHandleModelVisibility),this.modelViewer.removeEventListener("ar-status",this.boundHandleArStatus),this.modelViewer.removeEventListener("camera-change",this.boundHandleCameraChange),this.modelViewer.removeEventListener("scene-graph-ready",this.boundHandleSceneGraphReady),this.modelViewer.removeEventListener("load",this.boundHandleLoad)),this.cleanupBlobUrls(),this._swipeHandlers){const{start:e,end:t,element:a}=this._swipeHandlers;a.removeEventListener("touchstart",e),a.removeEventListener("touchend",t),this._swipeHandlers=null}}async _getModelData(){const e={title:"demo",modelId:"67e796c8294328fd88bfba83",logo:"",addToCartUrl:"https://www.demo.com/demo/addToCart",url:"https://ardisplay.io",description:"View this product in your environment by scanning this code with your phone",displayShareBtn:!1,shadow:1,qrCode:{faviconId:"",faviconUrl:"",faviconMargin:"0",QRsize:"200",dotStyle:"square",dotColor:"#000000",cornerStyle:"square",cornerColor:"#000000",cornerDotStyle:"square",cornerDotColor:"#000000",backgroundColor:"#ffffff",imgBackground:!1,website:"https://ardisplay.io"},arBtn:{btnText:"View in your space",btnTextColor:"#ffffff",btnBgColor:"#3b37ff",btnIcon:"Eye",cornerRadius:"8",btnSize:"15"},options:[{name:"DemoLives.glb",model:"121",url:"https://assetger.ddns.net/storage/documents/d91c18c6-9966-4d25-a443-a68df576f97e-optimized.glb",sizes:[{label:"Default Size",width:"135.6cm",height:"106.0cm",depth:"3.0cm"}],posterFileUrl:"https://assetger.ddns.net/storage/documents/e995WMUn836jJ5oGVicX5SkYcijE6mhl6opT3Fqg.webp",placement:"wall",iosUrl:"https://assetger.ddns.net/storage/documents/Nq6baT4fkJDk7blTAeZJhZfDzsPdLQQNRVWs3fVI.usdz",androidId:"121",iosId:"122",posterFileId:"123"}],mode:"popup",qrcode:"popup",enabled:!0,storeProductId:""};let t=0;const a=3;for(this.modelData=null;t<a&&!this.modelData;)try{t++;let n=window.location.href,i;const s=this.hasAttribute("src"),r=this.hasAttribute("shopify-src");if(s?i=await fetch(`https://ardisplayboilerplate.vercel.app/api/3d-model?id=${this.getAttribute("src")}`):r?i=await fetch(`https://ardisplayboilerplate.vercel.app/api/3d-model/store?storeProductId=${this.getAttribute("shopify-src")}`):(n&&n.endsWith("/")&&(n=n.slice(0,-1)),i=await fetch(`https://ardisplayboilerplate.vercel.app/api/3d-model?url=${En(n)}`)),!i||!i.ok){const d=i?i.status:"No response";throw new Error(`Response status: ${d}`)}const c=await i.json();if(typeof c!="object"||c===null||!c.options||c.options.length===0)throw $e.warn("Received invalid or empty data structure from API."),new Error("Invalid data structure received.");this.modelData=c,this.hasAttribute("ar-button")&&(this.modelData.mode="none")}catch(n){$e.error(`Attempt ${t} failed: ${n.message}`),t>=a||await new Promise(i=>setTimeout(i,500))}!this.modelData&&!this.getAttribute("src")&&!this.getAttribute("shopify-src")&&(this.modelData=e),this._setupVariantsSizes(),$e.debug("Final modelData being used:",this.modelData)}_setupVariantsSizes(){var e;this.variants=((e=this.modelData)==null?void 0:e.options)||[],this.variantSizes=[],this.variants.forEach(t=>{const a={};t.sizes.forEach(n=>{const i=n.label.toLowerCase();a[i]={width:n.width,height:n.height,depth:n.depth||""}}),this.variantSizes.push(a)})}_getAttributes(){return{modelSrc:this.getAttribute("src")||"",modelPoster:this.getAttribute("poster")||"",ar:this.hasAttribute("ar"),cameraControls:this.hasAttribute("camera-controls"),touchAction:this.getAttribute("touch-action")||"none",viewMode:this.getAttribute("view-mode")||"normal",arPlacement:this.getAttribute("ar-placement")||"floor"}}_consolidateStyles(){const e=document.createElement("style");return this.modelData.mode!=="none"&&this.modelData.mode!=="popup"?e.textContent=`
        :host {
          display: block;
          width: 100%;
          height: 600px;
          transform: scale(1);
          font-family: 'Roboto', sans-serif;
        }
      `:e.textContent=`
        :host {
          display: block;
          width: 100%;
          height: fit-content;
          transform: scale(1);
          font-family: 'Roboto', sans-serif;
        }
      `,e.textContent+=` 
      *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      /* Consolidated Styles */
      model-viewer {
        width: 100%;
        height: 100%;
        --min-hotspot-opacity: 0;
        position: relative;
        display: block;
      }

      model-viewer[ar-status="session-started"] .ardisplay-qr-code-button,
      model-viewer[ar-status="object-placed"] .ardisplay-qr-code-button {
        display: none;
      }



      model-viewer[ar-status="session-started"] .ardisplay-nav-icon-button:last-child,
      model-viewer[ar-status="object-placed"] .ardisplay-nav-icon-button:last-child {
        display: flex;
      }

      model-viewer[ar-status="session-started"] .dim,
      model-viewer[ar-status="object-placed"] .dim{
        display: none!important;
      }

      model-viewer[ar-status="session-started"] #dimLines,
      model-viewer[ar-status="object-placed"] #dimLines{
        display: none!important;
      }

      .ardisplay-nav-icon-button:last-child {
        display: none;
      }

      .dimensionLineContainer {
        pointer-events: none;
        display: block;
      }

      .dimensionLine {
        display: none;
        stroke: #16a5e6;
        stroke-width: 2;
      }

      .hide {
        display: none;
      }

      .dot {
        display: none;
      }

      .dim {
        display: none;
        border-radius: 20px;
        color: #1185bb;
        padding: 4px 8px;
        border: 1px solid #1185bb;
      }

      /* Bottom Nav Bar */
      .bottom-container{
        position: absolute;
        width: 100%;
        bottom: 0px;
        height: auto;
      }

      .ardisplay-bottom-nav-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        z-index: 10;
      }

      .cart-button-wrapper{
        display: none;
      }

      model-viewer[ar-status="session-started"] .cart-button-wrapper,
      model-viewer[ar-status="object-placed"] .cart-button-wrapper{
        display: flex;
      }

      .nav-btn {
        background-color: #f0f0f0;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 4px;
        margin-right: 8px;
        font-weight: 500;
        transition: background-color 0.2s ease;
        flex: 1;
      }
      .nav-btn:hover {
        background-color: #ddd;
      }

      /* Sub-panels */
      .hidden {
        display: none;
      }

      /* Color Slider */
      .slider {
        width: 100%;
        text-align: center;
        overflow: hidden;
        margin: 0 auto;
      }
      .slides {
        display: flex;
        justify-content: center;
        padding: 10px;
        flex-direction: row-reverse;
        gap: 10px; /* spacing between slides */
      }
      .slide {
        scroll-snap-align: start;
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
        cursor: pointer;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        outline: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .slide.selected {
        border-color: #4285f4;
        box-shadow: 0 0 0 2px rgba(66,133,244,0.3);
      }

      .size-panel {
      /* Similar to 'flex flex-wrap gap-2' in Tailwind */
      display: flex;
      flex-wrap: wrap;
      gap: 8px; /* ~ Tailwind gap-2 */
      padding: 16px; /* for some breathing room */
      padding-top: 0;
      background-color: transparent;
      z-index: 100;
    }

    .size-buttons-wrapper {
      /* If you need an extra wrapper, adjust accordingly */
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      padding: 0;
    }

    .size-button {
      /* Mimicking "border-2 border-gray-300 rounded-lg px-4 py-2" */
      border: 2px solid #ccc;
      border-radius: 8px; /* ~ Tailwind rounded-lg */
      padding: 8px 16px; /* ~ px-4 py-2 in Tailwind */
      background-color: rgba(255, 255, 255, 0.8); /* ~ bg-white/80 */
      font-weight: 500;
      cursor: pointer;
      color: black;

      /* Tailwind “transition-colors” is basically short for smooth border/color transitions */
      transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
    }

    /* Hover effect: "hover:border-blue-600 hover:text-blue-600" */
    .size-button:hover:not(:disabled) {
      border-color: #2563EB;
      color: #2563EB;
    }

    /* Active/selected state similar to your existing .selected logic */
    .size-button.selected {
      color: #4285f4;
      border-color: #4285f4;
      opacity: 1;
    }

      /* Floating Add to Cart button */
      .cart-button-wrapper {
        position: absolute;
        top: -64px; /* similar to -top-16 from Tailwind */
        left: 0;
        right: 0;
        justify-content: center;
      }
      .cart-btn {
        background-color: #2563EB; /* Tailwind blue-600 */
        color: #fff;
        border: none;
        border-radius: 9999px; /* fully rounded */
        padding: 12px 32px; /* ~py-3 px-8 */
        font-weight: 600;
        font-family: sans-serif;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .cart-btn:hover {
        background-color: #1D4ED8; /* Tailwind blue-700 */
      }
      .cart-btn svg {
        height: 20px; /* h-5 in Tailwind ~ 20px */
        width: 20px;
      }

      /* Bottom Nav Bar (matching the React code style) */
      .ardisplay-bottom-nav {
        height: fit-content; /* h-16 in Tailwind */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        position: relative;
        z-index: 100;
        margin-bottom: 16px;
      }
      .ardisplay-nav-icon-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 120px;
        padding: 8px 16px;
        color: black; /* text-gray-600 */
        background: #ccc;
        border-radius:40px;
        gap:10px;
        border: none;
        cursor: pointer;
        transition: color 0.2s ease;
      }
      .ardisplay-nav-icon-button svg {
        height: 24px; /* h-6 */
        width: 24px;
      }
      .ardisplay-nav-icon-button span {
        font-size: 12px; /* text-xs ~12px */
        font-weight: bold;
      }
      /* ------------------------------------------------------------------ */
      .sub-panel{
      position: absolute;
      bottom: 0; /* ensure it sits over the nav bar */
      height: auto;
      width: 100%;
      z-index: 10000;
      background: white;
      padding-top: 50px; // added padding for close button
    }
      .sub-panel .sub-panel-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

      model-viewer[ar-status="session-started"] .ardisplay-variant-btn-active,
      model-viewer[ar-status="object-placed"] .ardisplay-variant-btn-active{
        display:none!important;
      }
    `,e}async checkWebXRSupport(){try{return"xr"in navigator?await navigator.xr.isSessionSupported("immersive-ar"):!1}catch{return!1}}async _loadTemplate(e){let t=e==="popup"?oa:e==="inpage"?ia:ca;const a=this._getAttributes(),n=t(a.ar,a.cameraControls,a.touchAction,a.modelPoster,a.arPlacement,this.modelData,this.hasAttribute("fullWidth")),i=document.createRange().createContextualFragment(n);if(this._processLucideIcons(i),this.shadowRoot.appendChild(i),e==="inpage"){const s=document.createElement("img");s.src=await vt(this.modelData.options[0].posterFileUrl,this.posters),s.style.position="absolute",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",s.style.objectFit="contain",s.style.zIndex="10",this.shadowRoot.querySelector("model-viewer").appendChild(s),this.addEventListener("click",async()=>{const r=this.shadowRoot.querySelector("model-viewer img");r&&this.shadowRoot.querySelector("model-viewer").removeChild(r),await Pe();const c=document.createElement("style");c.textContent=".container { direction: ltr; }",this.modelViewer.shadowRoot.appendChild(c)}),this.addEventListener("mouseenter",async()=>{const r=this.shadowRoot.querySelector("model-viewer img");r&&this.shadowRoot.querySelector("model-viewer").removeChild(r),await Pe();const c=document.createElement("style");c.textContent=".container { direction: ltr; }",this.modelViewer.shadowRoot.appendChild(c)})}}_updateSizePanel(e){const t=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".size-panel"):document.querySelector(".size-panel");if(!t)return;t.innerHTML="";const a=ue("div",{classList:["size-buttons-wrapper"]}),n=this.variantSizes[e];n&&Object.entries(n).forEach(([i,s])=>{const r=ue("button",{classList:["size-button"],attributes:{"data-size-key":i},disabled:!1});r.innerHTML=`
          <span class="size-label">${i}</span>
          <span class="size-description">
            (${s.width} X ${s.height} X ${s.depth?s.depth+"":""})
          </span>
        `,r.addEventListener("click",c=>{if(!this.modelViewer)return;this.modelData.mode==="popup"?document.querySelectorAll(".size-button").forEach(p=>p.classList.remove("selected")):this.shadowRoot.querySelectorAll(".size-button").forEach(p=>p.classList.remove("selected")),c.currentTarget.classList.add("selected");const d=this.variantSizes[e][i];this.calculateAndApplyScale(d)}),a.appendChild(r)}),t.appendChild(a)}_processLucideIcons(e){const t={eye:ha,blocks:la,rotate3d:ua,box:da,fileaxis3d:pa,scan:ba};e.querySelectorAll("[data-lucide]").forEach(n=>{const i=n.getAttribute("data-lucide").toLowerCase(),s=t[i];if(s){const r=n.getAttribute("width")||24,c=n.getAttribute("color")||"currentColor",d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("width",r),d.setAttribute("height",r),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.setAttribute("stroke",c),d.setAttribute("stroke-width","2"),d.setAttribute("stroke-linecap","round"),d.setAttribute("stroke-linejoin","round"),s[2].forEach(p=>{const[f,w]=p,x=document.createElementNS("http://www.w3.org/2000/svg",f);Object.entries(w).forEach(([L,j])=>{x.setAttribute(L,j)}),d.appendChild(x)}),n.parentNode.replaceChild(d,n)}})}_moveSlottedContent(){const e=this.shadowRoot.querySelector(".ar-display-custom-panel"),t=this.querySelector('slot[name="custom-panel"]');e&&t&&e.appendChild(t)}_setupEventListeners(){this.modelData.mode==="popup"?this._setupModalEventListeners():this.modelData.mode==="inpage"&&this._setupNormalEventListeners(),this.boundHandleScale=()=>this._setupDimensions(this.modelViewer),this.boundHandleModelVisibility=()=>this._setupDimensions(this.modelViewer),this.boundHandleArStatus=e=>this._handleArStatusChange(e),this.boundHandleCameraChange=()=>{this.debouncedRenderSVG(),this.debouncedUpdateDimensionHotspots()},this.boundHandleSceneGraphReady=()=>{this.debouncedRenderSVG(),this.debouncedUpdateDimensionHotspots()},this.boundHandleLoad=()=>{this.isModelLoaded=!0,this.qrCodeButton&&(this.qrCodeButton.disabled=!1);const e=this.modelViewer.getDimensions(),t=this.modelViewer.scale.toString().split(" ").map(Number);if(this.originalSize={x:0,y:0,z:0},this.originalSize.x=e.x/t[0],this.originalSize.y=e.y/t[1],this.originalSize.z=e.z/t[2],this.variantSizes&&this.variantSizes[this.selectedIndex]){const i=this.variantSizes[this.selectedIndex],s=Object.keys(i)[0];if(s){const r=i[s];this.calculateAndApplyScale(r),requestAnimationFrame(()=>{(this.modelData.mode!=="popup"?this.shadowRoot.querySelectorAll(".size-button"):document.querySelectorAll(".size-button")).forEach((d,p)=>{p===0?d.classList.add("selected"):d.classList.remove("selected")})})}}this.shadowRoot.querySelector(".size-panel button")||this._updateSizePanel(0);const a=this.modelViewer.shadowRoot.querySelector(".slot.ar-button");a&&(a.style.display="none");const n=document.querySelector("#ardisplayProgressModal");n&&n.style.display!=="none"&&(n.style.display="none",this._showStepsModal())},document.addEventListener("scale",this.boundHandleScale),this.modelViewer.addEventListener("model-visibility",this.boundHandleModelVisibility),this.modelViewer.addEventListener("ar-status",this.boundHandleArStatus),this.modelViewer.addEventListener("camera-change",this.boundHandleCameraChange),this.modelViewer.addEventListener("scene-graph-ready",this.boundHandleSceneGraphReady),this.modelViewer.addEventListener("load",this.boundHandleLoad),this.modelViewer.addEventListener("progress",e=>{const t=Math.round(e.detail.totalProgress*100),a=document.querySelector("#ardisplayProgressBarFill");a&&(a.style.width=`${t}%`,a.style.display="block")}),this.modelViewer.addEventListener("load",()=>{this.isModelLoaded=!0,this.modelData.mode==="popup"?document.querySelectorAll(".dim").forEach(t=>{t.style.display="block"}):this.shadowRoot.querySelectorAll(".dim").forEach(t=>{t.style.display="block"});const e=document.querySelector("#activateAR");e&&(e.addEventListener("click",async t=>{if(t instanceof MouseEvent)try{console.log("clicked"),await this.modelViewer.activateAR();const a=document.querySelector("#ardisplayProgressModal");a&&(a.style.display="none")}catch{}}),e.style.display="block")})}_isIOSDevice(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}_isMobileDevice(){return/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}async _setupQRCodeListeners(){const e=document.querySelector("#qrModal"),t=document.querySelector("#qr-code"),a=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".ardisplay-qr-code-button"):document.querySelector(".ardisplay-qr-code-button"),n=document.querySelector(".qr-close-button");this.qrCodeManager||(this.qrCodeManager=new yt(t,this.modelData)),a.addEventListener("click",async()=>{if(this.GIF_URLS.push(await vt(this.modelData.options[0].posterFileUrl,this.posters)),this.modelData.mode==="none"&&this._isMobileDevice()){const i=document.querySelector("#ardisplayProgressModal");if(i){const r=document.querySelector("#ardisplayProgressBarFill");r&&(r.style.width="0%",r.style.display="block"),i.style.display="flex",this.userClickedAR=!0}await Pe();const s=document.createElement("style");if(s.textContent=".container { direction: ltr; }",this.modelViewer.shadowRoot.appendChild(s),this.modelViewer&&this.modelViewer.addEventListener("progress",r=>{const c=Math.round(r.detail.totalProgress*100),d=document.querySelector("#ardisplayProgressBarFill");d&&(d.style.width=`${c}%`,d.style.display="block")}),this.isModelLoaded){const r=document.querySelector("#ardisplayProgressModal");r&&(r.style.display="none"),this._resetSteps(),this._showStepsModal();return}}else if(this._isMobileDevice()){if(await this.checkWebXRSupport(),this.isModelLoaded){this._resetSteps(),this._showStepsModal();return}const i=document.querySelector("#ardisplayProgressModal");if(i){const r=document.querySelector("#ardisplayProgressBarFill");r&&(r.style.width="0%",r.style.display="block"),i.style.display="flex",this.userClickedAR=!0}await Pe();const s=document.createElement("style");s.textContent=".container { direction: ltr; }",this.modelViewer.shadowRoot.appendChild(s)}else{const i=`${Ve}/${this.modelData.modelId}`;this.qrCodeManager.updateQrCode(i),e.style.display="flex";return}}),n.addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",i=>{i.target===e&&(e.style.display="none")})}_resetSteps(){this.currentStep=1,document.querySelectorAll(".ardisplay-step-indicator").forEach((n,i)=>{n.classList.toggle("active",i===0)});const e=document.querySelector(".ardisplay-steps-content");e&&(e.innerHTML=`
        <h3 class="ardisplay-instructions-title">Scanning</h3>
        <img src="${this.GIF_URLS[0]}" class="ardisplay-steps-gif" alt="Computer man">
        <div class="ardisplay-instructions-body">Stand several feet back. With camera facing ${this.variants[this.selectedIndex]&&this.variants[this.selectedIndex].placement||this.modelData.placement}, make sweeping motion side to side, up and down.</div>
      `);const t=document.querySelector(".ardisplay-next-button"),a=document.querySelector(".ardisplay-skip-button");t&&(t.parentElement.style.display="flex"),a&&(a.style.display="block")}async generateUSDZ(){const e=this.modelViewer.getAttribute("src")||this.modelViewer.src;if(!e){console.error("No GLB file available for USDZ generation.");return}let t=this.modelViewer.getAttribute("scale")||this.modelViewer.scale;t||(t="1 1 1");const n=(this.modelData.placement||"floor").toLowerCase()==="wall"?"vertical":"horizontal";try{const i={x:t.split(" ")[0],y:t.split(" ")[1],z:t.split(" ")[2]},s=await Tn(e,n,i);console.log("USDZFile :",s);const r=this.modelViewer;r&&r.setAttribute("ios-src",s)}catch(i){console.error("Error generating USDZ model:",i)}}async handleActivateAR(){if(this._sendShortStatsEvent("Click"),!this._isMobileDevice()){const e=`${Ve}/${this.modelData.modelId}`;this.qrCodeManager&&this.qrModal&&(this.qrCodeManager.updateQrCode(e),this.qrModal.style.display="flex");return}if(await this.generateUSDZ(),this.modelViewer.canActivateAR)try{this._sendShortStatsEvent("Try"),this.modelViewer.activateAR()}catch(e){this._sendShortStatsEvent("Failed",e.message);const t=`${Ve}/${this.modelData.modelId}`;this.qrCodeManager&&this.qrModal&&(this.qrCodeManager.updateQrCode(t),this.qrModal.style.display="flex")}}_setupVariantsColors(){if(!this.variants||this.variants.length===0)return null;const e=ue("div",{classList:["slider"]}),t=ue("div",{classList:["slides"]});return this.variants.forEach(async(a,n)=>{const i=ue("button",{classList:["slide"]});if(n===0&&(i.classList.add("selected"),this.modelViewer&&a.url)){let r=new URL(a.url);new URL(a.iosUrl),this.modelViewer.setAttribute("src",r.href),a.posterFileUrl?this.modelViewer.poster=await vt(a.posterFileUrl,this.posters):this.modelViewer.removeAttribute("poster")}a.posterFileUrl&&(i.style.backgroundImage=`url('${a.posterFileUrl}')`);let s=!0;if(this.variants.forEach(r=>{r.placement!==this.variants[0].placement&&(s=!1)}),!s){const r=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".ardisplay-variant-btn"):document.querySelector(".ardisplay-variant-btn");r&&r.classList&&!r.classList.contains("ardisplay-variant-btn-active")&&r.classList.add("ardisplay-variant-btn-active")}i.onclick=()=>{if(!this.modelViewer)return;if(a.url){let d=new URL(a.url);new URL(a.iosUrl),this.modelViewer.setAttribute("src",d.href)}this._updateSizePanel(n),a.posterFileUrl?this.modelViewer.poster=a.posterFileUrl:this.modelViewer.removeAttribute("poster"),a.placement?this.modelViewer.setAttribute("ar-placement",a.placement):this.modelViewer.setAttribute("ar-placement",this.modelData.placement),this.modelData.mode!=="popup"?(this.shadowRoot.querySelectorAll(".slide").forEach(d=>d.classList.remove("selected")),i.classList.add("selected")):(document.querySelectorAll(".slide").forEach(d=>d.classList.remove("selected")),i.classList.add("selected")),this.selectedIndex=n,this.selectedIndex=n;const r=this.variants[n]&&this.variants[n].placement||this.modelData.placement||"floor",c=document.querySelector(".ardisplay-instructions-body");c&&(c.innerHTML=`Stand several feet back. With camera facing ${r.toLowerCase()==="wall"?"wall":"floor"}, make sweeping motion side to side, up and down.`),this.GIF_URLS[0]=r.toLowerCase()==="wall"?`${ze}/wall.webp`:`${ze}/floor.gif`,this._updateNavButtonsVisibility()},t.appendChild(i)}),e.appendChild(t),e}_setupCartButton(e){const t=ue("div",{classList:["cart-button-wrapper"]}),a=ue("button",{classList:["cart-btn"]});a.innerHTML=`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293
               2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0
               100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to Cart
      `,t.appendChild(a),e.appendChild(t),t.addEventListener("click",async()=>{await this._sendShortStatsEvent("Cart"),window.location.href=this.modelData.addToCartUrl})}_setupBottomNavBar(e){const t=ue("div",{classList:["sub-panel","hidden"]}),a=ue("button",{classList:["sub-panel-close-button"],textContent:"×"});a.style.position="absolute",a.style.top="0px",a.style.right="10px",a.style.background="transparent",a.style.height="50px",a.style.border="none",a.style.fontSize="32px",a.style.cursor="pointer",a.addEventListener("click",()=>{t.classList.add("hidden")}),t.appendChild(a);const n=ue("div",{classList:["sub-panel-label"],textContent:"Size"});n.style.fontSize="16px",n.style.position="absolute",n.style.top="0",n.style.left="50%",n.style.height="50px",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.transform="translateX(-50%)",t.appendChild(n);const i=this._createSizeControls();i&&t.appendChild(i);const s=ue("div",{classList:["sub-panel","hidden"]}),r=ue("button",{classList:["sub-panel-close-button"],textContent:"×"});r.style.position="absolute",r.style.top="0px",r.style.right="10px",r.style.background="transparent",r.style.border="none",r.style.fontSize="32px",r.style.height="50px",r.style.cursor="pointer",r.addEventListener("click",()=>{s.classList.add("hidden")}),s.appendChild(r);const c=ue("div",{classList:["sub-panel-label"],textContent:"Variant"});c.style.fontSize="16px",c.style.position="absolute",c.style.top="0",c.style.left="50%",c.style.height="50px",c.style.display="flex",c.style.alignItems="center",c.style.justifyContent="center",c.style.transform="translateX(-50%)",s.appendChild(c);const d=this._setupVariantsColors();d&&s.appendChild(d);const p=ue("div",{classList:["ardisplay-bottom-nav"]}),f=j=>{const q=j.classList.contains("hidden");t.classList.add("hidden"),s.classList.add("hidden"),q&&j.classList.remove("hidden")},w=ue("button",{classList:["ardisplay-nav-icon-button","ardisplay-size-btn"]});w.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="height:28px;width:28px;">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6V4H20V20H12V18H8V16H4V8H8V6H12ZM14 6H18V18H14V6ZM12 8H10V16H12V8ZM8 10V14H6V10H8Z" fill="#000000"/>
      </svg>
      <span>Size</span>
    `,w.addEventListener("click",()=>{f(t),w.classList.toggle("active",!t.classList.contains("hidden")),x.classList.remove("active")});const x=ue("button",{classList:["ardisplay-nav-icon-button","ardisplay-variant-btn"]});if(x.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" style="height:24px;width:24px;">
        <path d="M1 9.431l14.847 8.085c0.149 0.081 0.313 0.122 0.479 0.122 0.163 0 0.326-0.04 0.474-0.12l15.003-8.085c0.327-0.176 0.53-0.52 0.525-0.892s-0.216-0.711-0.547-0.88l-14.848-7.54c-0.283-0.143-0.617-0.144-0.902-0.002l-15.002 7.54c-0.332 0.167-0.545 0.505-0.551 0.877s0.196 0.717 0.521 0.895zM16.161 2.134l12.692 6.446-12.843 6.921-12.693-6.912zM31.292 15.01l-2.968-1.507-2.142 1.155 2.5 1.27-12.842 6.921-12.694-6.912 2.666-1.34-2.136-1.164-3.135 1.575c-0.332 0.167-0.545 0.505-0.551 0.877s0.196 0.717 0.521 0.895l14.847 8.085c0.149 0.081 0.313 0.122 0.479 0.122 0.163 0 0.326-0.04 0.474-0.12l15.003-8.085c0.327-0.176 0.53-0.52 0.525-0.892s-0.215-0.711-0.546-0.88zM31.292 22.01l-2.811-1.382-2.142 1.155 2.344 1.145-12.843 6.921-12.694-6.912 2.478-1.121-2.136-1.164-2.947 1.357c-0.332 0.167-0.545 0.505-0.551 0.877s0.196 0.717 0.521 0.895l14.847 8.085c0.149 0.081 0.313 0.122 0.479 0.122 0.163 0 0.326-0.04 0.475-0.12l15.003-8.085c0.327-0.176 0.53-0.52 0.525-0.892-0.005-0.373-0.215-0.712-0.546-0.88z"/>
      </svg>
      <span>Variant</span>
    `,x.addEventListener("click",()=>{f(s),x.classList.toggle("active",!s.classList.contains("hidden")),w.classList.remove("active")}),this.variants.length===1&&x&&(x.style.display="none"),this.variants.length>0){const j=this.variants[0].sizes;j&&j.length===1&&w&&(w.style.display="none")}const L=ue("button",{classList:["ardisplay-nav-icon-button"]});L.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
      </svg>
      <span>Share</span>
    `,L.addEventListener("click",async()=>{this._sendShortStatsEvent("Share");const j={title:document.title,text:"Check out this AR model!",url:window.location.href};try{await navigator.share(j)}catch(q){console.warn("Share failed:",q)}}),p.appendChild(w),p.appendChild(x),p.appendChild(L),this.boundHandleDocumentMouseDown=j=>{const q=j.composedPath();!q.includes(p)&&!q.includes(t)&&!q.includes(s)&&(t.classList.add("hidden"),s.classList.add("hidden"),w.classList.remove("active"),x.classList.remove("active"))},document.addEventListener("mousedown",this.boundHandleDocumentMouseDown),e.appendChild(p),e.appendChild(t),e.appendChild(s)}_updateNavButtonsVisibility(){var i;const e=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".ardisplay-bottom-nav .ardisplay-size-btn"):document.querySelector(".ardisplay-bottom-nav .ardisplay-size-btn"),t=this.modelData.mode!=="popup"?this.shadowRoot.querySelector(".ardisplay-bottom-nav .ardisplay-variant-btn"):document.querySelector(".ardisplay-bottom-nav .ardisplay-variant-btn");this.variants.length===1&&t?t.style.display="none":t&&(t.style.display="flex");const a=typeof this.selectedIndex=="number"?this.selectedIndex:0,n=(i=this.variants[a])==null?void 0:i.sizes;n&&n.length===1&&e?e.style.display="none":e&&(e.style.display="flex")}async _setupModalEventListeners(){const e=this.shadowRoot.querySelector(".ardisplay-view-3d-button");this.shadowRoot.querySelector(".ardisplay-preview-image");const t=document.querySelector(".model-viewer-container"),a=document.querySelector(".ardisplay-close-button"),n=document.querySelector(".ardisplay-model-viewer-overlay");e&&t&&e.addEventListener("click",async()=>{await Pe();const i=document.createElement("style");i.textContent=".container { direction: ltr; }",this.modelViewer.shadowRoot.appendChild(i),t.style.display="flex",n.style.display="block"}),a&&n&&(a.addEventListener("click",()=>{t.style.display="none",n.style.display="none"}),n.addEventListener("click",()=>{t.style.display="none",n.style.display="none"}))}_setupNormalEventListeners(){}_handleArStatusChange(e){const t=e.detail.status==="session-started";if(!t){const i=document.querySelector("#ardisplayProgressModal");i&&(i.style.display="none")}const a=[...this.modelViewer.querySelectorAll("[data-hotspot]"),this.modelViewer.querySelector("#dimLines")].filter(Boolean);(i=>{a.forEach(s=>{s.classList.toggle("hide",!i)})})(!t)}_drawLine(e,t,a,n){!e||!t||!a||(e.setAttribute("x1",t.canvasPosition.x),e.setAttribute("y1",t.canvasPosition.y),e.setAttribute("x2",a.canvasPosition.x),e.setAttribute("y2",a.canvasPosition.y),n&&e.classList.toggle("hide",!n.facingCamera))}_renderSVG(){const e=this.modelViewer.querySelectorAll("line");if(e.length===0)return;[{line:e[0],start:"hotspot-dot+X-Y+Z",end:"hotspot-dot+X-Y+Z",dimension:"hotspot-dim+X-Y"},{line:e[1],start:"hotspot-dot+X-Y-Z",end:"hotspot-dot+X+Y-Z",dimension:"hotspot-dim+X-Z"},{line:e[2],start:"hotspot-dot+X+Y-Z",end:"hotspot-dot-X+Y-Z"},{line:e[3],start:"hotspot-dot-X+Y-Z",end:"hotspot-dot-X-Y-Z",dimension:"hotspot-dim-X-Z"},{line:e[4],start:"hotspot-dot-X-Y-Z",end:"hotspot-dot-X-Y+Z",dimension:"hotspot-dim-X-Y"}].forEach(({line:a,start:n,end:i,dimension:s})=>{this._drawLine(a,this.modelViewer.queryHotspot(n),this.modelViewer.queryHotspot(i),s?this.modelViewer.queryHotspot(s):null)})}_updateDimensionHotspots(){const e=this.modelViewer.getBoundingBoxCenter(),t=this.modelViewer.getDimensions(),a={x:t.x/2,y:t.y/2,z:t.z/2};[{name:"hotspot-dot+X-Y+Z",position:[e.x+a.x,e.y-a.y,e.z+a.z]},{name:"hotspot-dim+X-Y",position:[e.x+a.x*1.2,e.y-a.y*1.1,e.z],label:`${(t.z*100).toFixed(0)} cm`,labelSelector:'[slot="hotspot-dim+X-Y"]'},{name:"hotspot-dot+X-Y-Z",position:[e.x+a.x,e.y-a.y,e.z-a.z]},{name:"hotspot-dim+X-Z",position:[e.x+a.x*1.2,e.y,e.z-a.z*1.2],label:`${(t.y*100).toFixed(0)} cm`,labelSelector:'[slot="hotspot-dim+X-Z"]'},{name:"hotspot-dot+X+Y-Z",position:[e.x+a.x,e.y+a.y,e.z-a.z]},{name:"hotspot-dim+Y-Z",position:[e.x,e.y+a.y*1.1,e.z-a.z*1.1],label:`${(t.x*100).toFixed(0)} cm`,labelSelector:'[slot="hotspot-dim+Y-Z"]'},{name:"hotspot-dot-X+Y-Z",position:[e.x-a.x,e.y+a.y,e.z-a.z]},{name:"hotspot-dim-X-Z",position:[e.x-a.x*1.2,e.y,e.z-a.z*1.2],label:`${(t.y*100).toFixed(0)} cm`,labelSelector:'[slot="hotspot-dim-X-Z"]'},{name:"hotspot-dot-X-Y-Z",position:[e.x-a.x,e.y-a.y,e.z-a.z]},{name:"hotspot-dim-X-Y",position:[e.x-a.x*1.2,e.y-a.y*1.1,e.z],label:`${(t.z*100).toFixed(0)} cm`,labelSelector:'[slot="hotspot-dim-X-Y"]'},{name:"hotspot-dot-X-Y+Z",position:[e.x-a.x,e.y-a.y,e.z+a.z]}].forEach(({name:i,position:s,label:r,labelSelector:c})=>{if(this.modelViewer.updateHotspot({name:i,position:s.join(" ")}),r&&c){const d=this.modelViewer.querySelector(c);d&&(d.textContent=r)}})}_setupDimensions(){this.modelData.mode==="popup"?document.querySelectorAll(".dimensionLine").forEach(e=>{e.style.display="block"}):this.shadowRoot.querySelectorAll(".dimensionLine").forEach(e=>{e.style.display="block"}),this.debouncedRenderSVG(),this.debouncedUpdateDimensionHotspots()}_createSizeControls(){const e=ue("div",{classList:["size-panel"]}),t=ue("div",{classList:["size-buttons-wrapper"]});return e.appendChild(t),e}_handleSizeChange(e){if(e.target.classList.contains("size-button")){const t=e.target.getAttribute("data-size-key");if(this.variantSizes[this.selectedIndex][t]){this.shadowRoot.querySelectorAll(".size-button").forEach(n=>n.classList.remove("selected")),e.target.classList.add("selected");const a=this.variantSizes[this.selectedIndex][t];this.calculateAndApplyScale(a)}}}applyScale(){this.calculatedScale&&this.modelViewer&&(this.modelViewer.setAttribute("scale",`${this.calculatedScale.scaleX} ${this.calculatedScale.scaleY} ${this.calculatedScale.scaleZ}`),typeof this.modelViewer.updateFraming=="function"&&requestAnimationFrame(()=>{this.modelViewer.updateFraming(),document.dispatchEvent(this.scaleEvent)}))}async calculateAndApplyScale(e){if(e)try{const t=await this.calculateModelScale(e);this.calculatedScale=t,this.applyScale()}catch{}}cmToMeters(e){return parseFloat(e.replace("cm",""))/100}calculateModelScale(e){const t=this.originalSize||{x:1,y:1,z:1},a=t.x,n=t.y,i=t.z,s=this.cmToMeters(e.width),r=this.cmToMeters(e.height),c=e.depth?this.cmToMeters(e.depth):.05,d=s/a,p=r/n,f=c/i;return{scaleX:d,scaleY:p,scaleZ:f}}cleanupBlobUrls(){Object.values(this.gifCache).forEach(e=>{URL.revokeObjectURL(e)}),this.gifCache={}}}customElements.define("ardisplay-viewer",qn),document.addEventListener("DOMContentLoaded",()=>{window.customElements.get("ardisplay-viewer")?Yt():window.customElements.whenDefined("ardisplay-viewer").then(Yt)});function Yt(){const t=document.evaluate("//*[normalize-space(text())='{%AR-DISPLAY-PLAYER%}']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,a=document.createElement("ardisplay-viewer");t.replaceWith(a)}});
//# sourceMappingURL=ardisplay.umd.js.map
