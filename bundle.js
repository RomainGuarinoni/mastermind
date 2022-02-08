(()=>{"use strict";(()=>{function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t){return e.filter((function(e){return e===t})).length}function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e){var t,n=e.target.id.split("-")[0];null===(t=e.dataTransfer)||void 0===t||t.setData("text/plain",n),e.dataTransfer.effectAllowed="move"}function i(e){e.preventDefault(),e.dataTransfer.dropEffect="move"}function c(e,t){var n;e.preventDefault();var o=e.dataTransfer.getData("text/plain");(n=e.target.classList).remove.apply(n,r(t)),e.target.classList.add(o,"current-target")}function l(e){var t;(t=e.target.classList).remove.apply(t,r(e.target.classList.value.split(" "))),e.target.classList.add("target")}function d(e,t){for(var n=0;n<e.length;n++)e[n].addEventListener("dragover",i,!0),e[n].addEventListener("drop",(function(e){return c(e,t)})),e[n].addEventListener("mousedown",l)}var u;function s(e,t,n){var r=document.createElement("div");r.classList.add("line"),r.id="line-".concat(e);var o=document.createElement("div");o.classList.add("red-indicator-container");var a=document.createElement("div");a.classList.add("targets-container");for(var i=0;i<n;i++){var c=document.createElement("div");c.classList.add("target"),a.appendChild(c)}var l=document.createElement("div");l.classList.add("white-indicator-container"),r.appendChild(o),r.appendChild(a),r.appendChild(l),t.appendChild(r)}function m(e,t,n){for(var r=0;r<n;r++){var o=document.createElement("div");switch(e){case u.red:o.classList.add("red-indicator");break;case u.white:o.classList.add("white-indicator")}t.appendChild(o)}}function f(e,t){document.getElementById("".concat(e,"-piece")).style.display=t}!function(e){e[e.white=0]="white",e[e.red=1]="red"}(u||(u={}));var p=document.getElementById("game-container"),y=[document.getElementById("blue-piece"),document.getElementById("red-piece"),document.getElementById("green-piece"),document.getElementById("yellow-piece"),document.getElementById("orange-piece"),document.getElementById("black-piece"),document.getElementById("white-piece"),document.getElementById("maroon-piece")];window.addEventListener("DOMContentLoaded",(function(){y.forEach((function(e){return e.addEventListener("dragstart",a)}))}));var v,g,h,E,b,I=document.getElementById("parametersPopup"),w=document.getElementById("win"),B=document.getElementById("loose"),A=y.map((function(e){return e.id.split("-")[0]})),L=document.getElementById("applyParameters"),C=document.getElementById("cancelParameters"),S=document.getElementById("verify"),k=document.getElementById("restart"),M=document.getElementById("win-restart"),T=document.getElementById("loose-restart"),P=document.getElementById("parameters"),D=document.getElementById("duplicateCheck"),N=document.getElementById("nbColorsValue"),j=document.getElementById("nbTurnsValue"),x=document.getElementById("nbPossibilitiesValue"),O=D.checked,q=j.valueAsNumber,z=N.valueAsNumber,H=x.valueAsNumber;function V(){v=1;var t,n=function(e,t){return e.sort((function(){return.5-Math.random()})).slice(0,t)}(A,z);b=function(t,n,r){if(!r&&n>t.length)throw new Error("Impossible to create a combination");if(!1===r){var o=t.sort((function(){return.5-Math.random()}));return Array.from(new Set(o)).slice(0,n)}return e(Array(n)).map((function(){return t[Math.floor(Math.random()*t.length)]}))}(n,H,O),t=n,A.forEach((function(e){t.includes(e)?f(e,"block"):f(e,"none")})),p.innerHTML="",s(v,p,H),d(g,A)}S.onclick=function(){var t;try{t=function(e,t){return Array.from(e).map((function(e){var n=e.className.split(" ").filter((function(e){return t.includes(e)}))[0];if(!n)throw new Error("Combination is not complete");return n}))}(g,A)}catch(e){return void alert("Mettez des pions dans chaque emplacement de la ligne")}var r=function(t,r){var o=[],a=[];return t.forEach((function(t,i){if(r[i]===t)return o.push(t),void(o.filter((function(e){return e===t})).length===n(r,t)&&(a=a.filter((function(e){return e!==t}))));r.includes(t)&&[].concat(o,e(a)).filter((function(e){return e===t})).length<n(r,t)&&a.push(t)})),{goodPlacement:o.length,wrongPlacement:a.length}}(t,b),o=r.goodPlacement,a=r.wrongPlacement;if(m(u.red,h,o),m(u.white,E,a),o===H)return document.getElementById("nb-round").innerHTML="Tu as trouvé la combinaison en ".concat(v," tours"),void(w.style.display="flex");v!==q?function(){!function(e){for(var t=0;t<e.length;t++)e[t].removeEventListener("dragover",i,!0),e[t].removeEventListener("mousedown",l),e[t].classList.remove("current-target")}(g),s(++v,p,H);var e=function(e){var t=document.getElementById("line-".concat(e));if(!t)throw new Error("Line does not exist");return{targets:t.querySelectorAll("div.targets-container > div.target"),redIndicatorsContainer:t.querySelector("div.red-indicator-container"),whiteIndicatorsContainer:t.querySelector("div.white-indicator-container")}}(v),t=e.targets,n=e.redIndicatorsContainer,r=e.whiteIndicatorsContainer;h=n,E=r,d(g=t,A)}():function(){var e=document.getElementById("solution-combination");e.innerHTML="";for(var t=0;t<b.length;t++){var n=document.createElement("div");n.classList.add("piece",b[t]),e.appendChild(n)}B.style.display="flex"}()},k.onclick=V,L.onclick=function(){O=D.checked,z=N.valueAsNumber,q=j.valueAsNumber,H=x.valueAsNumber,!1===O&&z<H?alert("Attention, autorisez les doublons ou mettez un nombre de couleurs supérieur ou égal au nombre de possibilités par ligne"):(I.style.display="none",V())},C.onclick=function(){I.style.display="none"},P.onclick=function(){I.style.display="flex"},M.onclick=function(e){e.preventDefault(),w.style.display="none",V()},T.onclick=function(e){e.preventDefault(),B.style.display="none",V()},V()})()})();
//# sourceMappingURL=bundle.js.map