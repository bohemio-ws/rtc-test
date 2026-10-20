/* RTC 0.68 · banco de pruebas aislado */
(function(){
"use strict";
const $=s=>document.querySelector(s),C=window.RTCCore,app=$("#app");
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const expected="QNH uno cero uno siete, Eco Charlie Romeo Tango Charlie";
function acoustic(m){if(!m)return"Sin métricas";return `${m.seconds.toFixed(1)} s · silencio ${Math.round(m.silenceRatio*100)} % · ${m.pauseSegments} segmentos de silencio`}
function tokens(s){return C.norm(s).split(" ").filter(Boolean)}
function correction(text){
 const issues=C.phraseIssues(text),n=C.norm(text),checks=[
  ["QNH",/\bq\s*n\s*h\b|\bqnh\b/.test(n)],
  ["1017",/\b1017\b|\buno\s+cero\s+uno\s+siete\b/.test(n)],
  ["Indicativo EC-RTC",C.callsignRecognized(text)]
 ];
 const hit=checks.filter(x=>x[1]).length,coverage=Math.round(hit/checks.length*100);
 return `<div class="card feedback"><h3>Corrección didáctica</h3><p><b>Cobertura detectada:</b> ${coverage} %</p>${checks.map(x=>`<p class="line ${x[1]?'good':'warn'}">${x[1]?'✓':'○'} ${x[0]}</p>`).join('')}${issues.map(x=>`<p class="warn">⚠ ${safe(x)}</p>`).join('')}<p><b>Modelo:</b> ${safe(expected)}</p><p class="muted">La corrección textual es auxiliar: un error del reconocedor no convierte automáticamente en incorrecta una transmisión que haya sonado bien.</p></div>`;
}
app.innerHTML=`<section class="card"><div class="k">ENTORNO AISLADO DE PRUEBAS</div><h2>RTC Academy 0.68</h2><p>Prueba aquí PTT, transcripción y corrección sin tocar producción.</p><button class="btn" id="hear">🔊 Probar voz aeronáutica</button><p class="radio">EC-RTC · QNH 1017 · pista 24</p></section><section class="card"><div class="k">TRANSMITE</div><p>Di: <b>«${expected}»</b>.</p><button class="ptt" id="ptt">MANTENER<br>PTT</button><div id="status" class="muted">Mantén pulsado PTT mientras hablas y suelta al terminar.</div><div class="radio" id="out">Aquí aparecerá la transcripción.</div><textarea id="manual" placeholder="Transcripción / corrección manual"></textarea><button class="btn primary" id="check">Evaluar mi comunicación</button><div id="feedback"></div></section>`;
$("#version").textContent=`PRUEBAS · VERSIÓN ${C.VERSION} · ${C.BUILD_DATE}`;
$("#hear").onclick=()=>C.speak("EC-RTC, QNH 1017, pista 24");
function evaluate(text,result){
 const raw=String(text||"").trim();
 const q=result?.asrQuality,discarded=q&&!q.usable&&!!result.rawText;
 $("#feedback").innerHTML=`${result?`<div class="card"><b>${result.audio?'✓ Audio recibido':'✗ No se obtuvo audio'}</b><p>Métricas acústicas: ${safe(acoustic(result.metrics))}</p>${discarded?`<p class="warn">El ASR parece incoherente (${q.wpm} palabras/min; repetición ${q.repetition} %). Se muestra para diagnóstico, pero no penaliza el audio.</p>`:''}</div>`:''}${raw?correction(raw):'<div class="card feedback"><p class="warn">No hay texto reconocible para hacer corrección textual. El audio sigue siendo la evidencia principal.</p></div>'}`;
}
RTCPtt.bind($("#ptt"),$("#status"),{
 onPartial:t=>{$("#out").textContent=t||"Escuchando…"},
 onFinal:r=>{
  const shown=(r.rawText||r.text||"").trim();
  $("#out").textContent=shown||"Sin transcripción utilizable";
  $("#manual").value=shown;
  evaluate(r.text||"",r);
 }
});
$("#check").onclick=()=>evaluate($("#manual").value,null);
})();