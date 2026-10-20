/* RTC Academy 0.69 · PTT: ASR visible, audio independiente */
(function(){
"use strict";
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const clean=t=>String(t||"").replace(/\s+/g," ").trim();
const norm=t=>clean(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").trim();
function rms(a){let s=0;for(let i=0;i<a.length;i++)s+=a[i]*a[i];return a.length?Math.sqrt(s/a.length):0}
function asrQuality(text,seconds){const w=norm(text).split(" ").filter(Boolean),total=w.length;if(!total)return{usable:false,reason:"empty",total:0,wpm:0,repetition:0};const wpm=total*60/Math.max(.1,seconds),freq={};for(const x of w)freq[x]=(freq[x]||0)+1;const top=Math.max(...Object.values(freq))/total;let repeated=0;for(let size=2;size<=Math.min(6,Math.floor(total/2));size++){const seen={};for(let i=0;i<=total-size;i++){const g=w.slice(i,i+size).join(" ");seen[g]=(seen[g]||0)+1}for(const [g,n] of Object.entries(seen))if(n>=3)repeated=Math.max(repeated,g.split(" ").length*n/total)}const bad=total>=10&&(wpm>300||top>.5||repeated>.55);return{usable:!bad,reason:bad?"degenerate":"ok",total,wpm:Math.round(wpm),repetition:Math.round(Math.max(top,repeated)*100)}}
window.RTCPtt={asrQuality,bind(btn,status,{onPartial,onFinal,onError}={}){
 if(!btn||!status)return()=>{};
 let holding=false,busy=false,startAt=0,stream=null,media=null,chunks=[],rec=null,finalText="",interimText="",levels=[],ctx=null,source=null,analyser=null,raf=0,finishTimer=0;
 const ui=x=>{btn.classList.toggle("live",x);btn.setAttribute("aria-pressed",x?"true":"false")};
 function stopHardware(){if(raf)cancelAnimationFrame(raf);raf=0;try{source?.disconnect();analyser?.disconnect()}catch{};try{ctx?.close()}catch{};try{stream?.getTracks().forEach(t=>t.stop())}catch{};source=analyser=ctx=stream=null}
 function meter(){if(!analyser)return;const a=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(a);levels.push(rms(a));raf=requestAnimationFrame(meter)}
 function acoustic(seconds){const threshold=.012,voiced=levels.filter(v=>v>threshold);let pauses=0,silent=false;for(const v of levels){if(v<=threshold&&!silent){silent=true;pauses++}else if(v>threshold)silent=false}return{seconds,meanLevel:voiced.length?voiced.reduce((a,b)=>a+b,0)/voiced.length:0,peakLevel:levels.length?Math.max(...levels):0,silenceRatio:levels.length?1-voiced.length/levels.length:1,pauseSegments:pauses,samples:levels.length}}
 function emitFinal(){if(!busy)return;busy=false;clearTimeout(finishTimer);const seconds=Math.max(.1,(performance.now()-startAt)/1000),rawText=clean(finalText||interimText),quality=asrQuality(rawText,seconds),audio=chunks.length?new Blob(chunks,{type:media?.mimeType||"audio/webm"}):null,metrics=acoustic(seconds);stopHardware();ui(false);status.textContent=audio?(rawText?"✓ Audio recibido · transcripción recibida.":"✓ Audio recibido · el navegador no devolvió transcripción."):"Transmisión terminada.";onFinal?.({text:quality.usable?rawText:"",rawText,audio,metrics,asrAvailable:!!SR,asrError:"",asrQuality:quality})}
 async function start(){if(holding||busy)return;holding=true;busy=true;startAt=performance.now();chunks=[];finalText="";interimText="";levels=[];ui(true);status.textContent="● TRANSMITIENDO · suelta PTT al terminar";onPartial?.("");
  try{stream=await navigator.mediaDevices.getUserMedia({audio:true});if(!holding){stopHardware();busy=false;ui(false);return}
   if(window.MediaRecorder){try{media=new MediaRecorder(stream);media.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};media.start(250)}catch(e){media=null}}
   const AC=window.AudioContext||window.webkitAudioContext;if(AC){try{ctx=new AC();source=ctx.createMediaStreamSource(stream);analyser=ctx.createAnalyser();analyser.fftSize=1024;source.connect(analyser);meter()}catch(e){}}
   if(SR){try{rec=new SR();rec.lang="es-ES";rec.continuous=false;rec.interimResults=true;rec.maxAlternatives=1;rec.onresult=e=>{let f="",i="";for(let x=0;x<e.results.length;x++){const t=clean(e.results[x][0]?.transcript||"");if(e.results[x].isFinal)f+=(f?" ":"")+t;else i+=(i?" ":"")+t}if(f)finalText=clean((finalText?finalText+" ":"")+f);interimText=i;onPartial?.(clean(finalText+(i?" "+i:"")))};rec.onerror=e=>{onError?.(e.error||"asr")};rec.onend=()=>{rec=null;if(!holding&&busy)finishTimer=setTimeout(emitFinal,120)};rec.start()}catch(e){onError?.(String(e))}}
  }catch(e){holding=false;busy=false;ui(false);stopHardware();status.textContent="No se pudo abrir el micrófono. Revisa el permiso del navegador.";onError?.(e)}
 }
 function stop(e){if(e)e.preventDefault();if(!holding)return;holding=false;ui(false);status.textContent="Procesando transmisión…";try{if(media&&media.state!=="inactive"){media.onstop=()=>{if(!rec)emitFinal()};media.stop()}}catch{};try{rec?.stop()}catch{rec=null};finishTimer=setTimeout(emitFinal,900)}
 const down=e=>{e.preventDefault();if(e.pointerType==="mouse"&&e.button!==0)return;try{btn.setPointerCapture(e.pointerId)}catch{};start()};
 btn.addEventListener("pointerdown",down);btn.addEventListener("pointerup",stop);btn.addEventListener("pointercancel",stop);btn.addEventListener("contextmenu",e=>e.preventDefault());btn.addEventListener("touchmove",e=>e.preventDefault(),{passive:false});
 return()=>{clearTimeout(finishTimer);holding=false;busy=false;try{rec?.abort()}catch{};try{if(media&&media.state!=="inactive")media.stop()}catch{};stopHardware();ui(false)};
}};
})();