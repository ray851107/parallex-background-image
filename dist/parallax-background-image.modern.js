function t(t){const e=document.createElement("style");return e.appendChild(document.createTextNode(t)),e}function e(t,e){t.x*=e,t.y*=e,t.z*=e,t.w*=e,t.h*=e}function i(t){return function(i,n,s){e(i,1/t),i.z+=1-1/t,i.x-=n.x*(1-1/t)}}function n(t){return function(e,i,n){e.y+=i.y*(t-1)}}class s{constructor(t,s,r){this.element=t,this.imageWidth=s.naturalWidth,this.imageHeight=s.naturalHeight,this.transform_=function(t){const s=t.use3d?i:n,r=(o=t.velocity,function(t,i,n){e(t,Math.max(i.w/t.w,(n.h+o*(n.h-i.h))/t.h))});var o;const a=(l=function(t){if("left"===t)return 0;if("center"===t)return.5;if("right"===t)return 1;const e=parseFloat(t);return isNaN(e)?.5:e/100}(l=t.alignX),function(t,e,i){t.x=(.5-l)*(t.w-e.w)});var l;const h=s(t.velocity);return function(t,e,i){r(t,e,i),a(t,e,i),h(t,e,i)}}(r),this.renderer=new r.renderer(t,s,r),this.bgRect={x:NaN,y:NaN,z:NaN,w:NaN,h:NaN},this.dirty=!1,this.disposed=!1,this.element.classList.add("parallax-background-image-element")}updateRect(t,e){if(this.disposed)return;const i={x:0,y:0,z:0,w:this.imageWidth,h:this.imageHeight};var n,s;this.transform_(i,t,e),((n=this.bgRect).x!==(s=i).x||n.y!==s.y||n.z!==s.z||n.w!==s.w||n.h!==s.h)&&(this.dirty=!0,function(t,e){t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.h=e.h}(this.bgRect,i))}render(){this.disposed||this.dirty&&(this.dirty=!1,this.renderer.render(this.bgRect))}dispose(){this.disposed||(this.disposed=!0,this.element.classList.remove("parallax-background-image-element"),this.renderer.dispose())}}function r(t,e,i){t.position="absolute",t.left="50%",t.top="50%",t.width=e+"px",t.height=i+"px",t.transformOrigin="center center 0",t.pointerEvents="none"}function o(t,e,i,n){t.transform=`translateX(${e.x-i/2}px)translateY(${e.y-n/2}px)translateZ(${e.z}px)scale(${e.w/i}, ${e.h/n})`}class a{constructor(t,e,i){this.element=t,this.imageWidth=e.naturalWidth,this.imageHeight=e.naturalHeight,this.img=document.createElement("img"),this.style=this.img.style,this.disposed=!1,window.requestAnimationFrame(()=>{this.disposed||(this.img.src=e.src,r(this.style,this.imageWidth,this.imageHeight),this.element.prepend(this.img))})}render(t){this.disposed||o(this.style,t,this.imageWidth,this.imageHeight)}dispose(){this.disposed||(this.disposed=!0,this.element.removeChild(this.img))}}const l=function(e=""){const i=t(e);return document.head.appendChild(i),i.sheet}();let h=0;class d{constructor(t,e,i){this.element=t,this.imageWidth=e.naturalWidth,this.imageHeight=e.naturalHeight;const n=h++;this.className="parallax-background-image-pseudo-"+n,this.style=function(t,e){const i=e.insertRule(t+" {}",0);return e.cssRules[i].style}(`.${this.className}::before`,l),this.disposed=!1,window.requestAnimationFrame(()=>{this.disposed||(this.style.content='""',this.style.backgroundImage=`url(${e.src})`,this.style.backgroundSize="100% 100%",r(this.style,this.imageWidth,this.imageHeight),this.element.classList.add(this.className))})}render(t){this.disposed||o(this.style,t,this.imageWidth,this.imageHeight)}dispose(){this.disposed||(this.disposed=!0,this.element.classList.remove(this.className))}}class c{constructor(t,e){"string"==typeof t&&(t=document.querySelector(t)),e={use3d:m(),...e},this.rootElement=t,this.options=e,this.parallaxElements=[],this._setupStyle(),this._monitorRects(),this._startRenderLoop()}_setupStyle(){this.rootElement.classList.add("parallax-background-image-viewport"),this.options.use3d&&this.rootElement.classList.add("parallax-background-image-viewport-3d")}_monitorRects(){const t=this._updateRects.bind(this);window.addEventListener("resize",t),this.options.use3d||this.rootElement.addEventListener("scroll",t)}_updateRects(){const t=this.parallaxElements,e=u(this.rootElement);for(let s=0;s<t.length;++s){const r=u(t[s].element);(i=r).x-=(n=e).x,i.y-=n.y,t[s].updateRect(r,e)}var i,n}_startRenderLoop(){const t=this.parallaxElements;window.requestAnimationFrame(function e(){for(let e=0;e<t.length;++e)t[e].render();window.requestAnimationFrame(e)})}add(t,e={}){if(t instanceof Element)this._addElement(t,e);else{"string"==typeof t&&(t=this.rootElement.querySelectorAll(t));for(let i=0;i<t.length;++i)this._addElement(t[i],e)}}_addElement(t,e){this._isViewportFor(t)&&(this._removeElement(t),null!=(e=this._parseElementOptions(t,e)).image&&function(t,e){const i=document.createElement("img");i.onload=function(t){e(null,t.target)},i.onerror=function(t){e(t.error)},i.src=t}(e.image,(i,n)=>{i||(this.parallaxElements.push(new s(t,n,e)),this._updateRects())}))}_isViewportFor(t){return t!==this.rootElement&&t.closest(".parallax-background-image-viewport")===this.rootElement}_parseElementOptions(t,e){return"function"==typeof e&&(e=e(t)),null==(e={velocity:.8,alignX:"center",renderer:a,...e}).image&&(e.image=function(t){const e=window.getComputedStyle(t),i=/^url\((['"]?)(.*)\1\)$/.exec(e.backgroundImage);return null==i?null:i[2]}(t)),e.use3d=this.options.use3d,e}remove(t){if(t instanceof Element)this._removeElement(t);else{"string"==typeof t&&(t=this.rootElement.querySelectorAll(t));for(let e=0;e<t.length;++e)this._removeElement(t[e])}}_removeElement(t){const e=this.parallaxElements;for(let i=0;i<e.length;++i)if(this.parallaxElements[i].element===t)return e[i].dispose(),void e.splice(i,1)}}function m(){const t=navigator.userAgent;return-1!==t.indexOf("Chrome/")&&-1===t.indexOf("Edge/")}function u(t){const e=t.getBoundingClientRect();return{x:(e.left+e.right)/2,y:(e.top+e.bottom)/2,w:e.right-e.left,h:e.bottom-e.top}}function p(t,e={}){return new c(t,e)}!function(e=""){const i=t(e);document.head.insertBefore(i,document.head.firstElementChild)}("\n.parallax-background-image-element {\n  position: relative;\n  overflow: hidden !important;\n  background: none !important;\n  background-image: none !important;\n}\n\n.parallax-background-image-element > * {\n  position: relative;\n}\n\n.parallax-background-image-viewport {\n  overflow-x: hidden !important;\n  overflow-y: scroll !important;\n  -webkit-overflow-scrolling: touch;\n}\n\n.parallax-background-image-viewport-3d {\n  perspective: 1px !important;\n  perspective-origin: center center !important;\n}");export{a as ImageElementRenderer,d as PseudoElementRenderer,p as createViewport};
//# sourceMappingURL=parallax-background-image.modern.js.map