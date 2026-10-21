(()=>{'use strict';
window.RTC_RADIO_DIALOGUES=[
{id:'guided_departure',title:'Vuelo guiado · plataforma, rodaje y salida',role:'AERÓDROMO NORTE / TRÁFICO',intro:'La misma secuencia del curso ilustrado: plataforma, rodaje, punto de espera y salida. En autoinformación nadie te autoriza; todos construyen una imagen común del tráfico.',turns:[
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, final pista cero seis.',expect:'Informa que permaneces fuera de pista y que has comprendido el conflicto.',reply:'Eco Delta Alfa Bravo, Eco Charlie Romeo Tango Charlie, recibido tráfico en final, mantengo punto de espera.'},
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, pista libre.',expect:'Tras comprobar visualmente pista y tráfico, anuncia entrada y despegue.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, entrando pista cero seis y despegando.'},
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, viento en cola izquierda pista cero seis.',expect:'Ya en ascenso, comunica tu salida del circuito por Sierra.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, abandonando circuito por punto Sierra, en ruta.'}
]},
{id:'tower_departure',title:'Torre · salida VFR y abreviación de indicativo',role:'TORRE',intro:'Primer contacto con indicativo completo. Si Torre inicia después la abreviación, puedes continuar con Romeo Tango Charlie mientras no exista riesgo de confusión.',turns:[
{rx:'Eco Charlie Romeo Tango Charlie, Torre, mantenga posición, tráfico en final.',expect:'Primer intercambio: usa el indicativo completo y mantén posición.',reply:'Eco Charlie Romeo Tango Charlie, mantengo posición.',repeatRequest:['repita instrucciones','repita instruccion','repita torre','repita']},
{rx:'Romeo Tango Charlie, pista dos cuatro, autorizado a despegar, viento dos seis cero grados ocho nudos.',expect:'Torre ha iniciado la abreviación. Colaciona pista y autorización usando Romeo Tango Charlie.',reply:'Pista dos cuatro, autorizado a despegar, Romeo Tango Charlie.',repeatRequest:['repita instrucciones romeo tango charlie','repita instrucciones rtc','repita instrucciones','repita instruccion']},
{rx:'Romeo Tango Charlie, después de salida notifique Sierra.',expect:'Colaciona el punto de notificación manteniendo el indicativo abreviado.',reply:'Notificaré Sierra, Romeo Tango Charlie.',repeatRequest:['repita instrucciones romeo tango charlie','repita instrucciones rtc','repita instrucciones','repita instruccion']},
{rx:'Romeo Tango Charlie, recibido, continúe salida.',expect:'Cierra el intercambio de forma breve; no añadas información innecesaria.',reply:'Romeo Tango Charlie.',repeatRequest:['repita instrucciones romeo tango charlie','repita instrucciones rtc','repita instrucciones','repita instruccion']}
]},
{id:'guided_circuit',title:'Vuelo guiado · circuito y tráfico precedente',role:'TRÁFICO',intro:'Reproduce las fases viento en cola, base y final del ejercicio ilustrado. Debes escuchar, localizar al precedente y mantener separación.',turns:[
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, viento en cola izquierda pista cero seis, número uno.',expect:'Informa tu viento en cola y que eres número dos si tienes al precedente identificado.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, viento en cola izquierda pista cero seis, número dos, tráfico precedente a la vista.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Delta Alfa Bravo, virando base pista cero seis.',expect:'Mantén separación y actualiza tu posición cuando sea operacionalmente útil.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, continuando viento en cola pista cero seis, tráfico a la vista.'},
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, pista libre.',expect:'Anuncia tu final cuando estés establecido.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, final pista cero seis.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Delta Alfa Bravo, recibido, abandono frecuencia.',expect:'No necesitas una conversación larga; mantén la aproximación y vigilancia.',reply:'Eco Delta Alfa Bravo, Eco Charlie Romeo Tango Charlie, recibido.'}
]},
{id:'traffic_arrival',title:'Vuelo guiado · llegada a aeródromo no controlado',role:'TRÁFICO',intro:'La llegada del curso guiado: escucha antes de integrarte y coordina con otro ULM sin convertir la autoinformación en una autorización.',turns:[
{rx:'Aeródromo Sur tráfico, Eco Alfa Bravo, viento en cola izquierda pista dos cuatro para toma.',expect:'Informa posición, nivel aproximado e intención de integración.',reply:'Aeródromo Sur tráfico, Eco Charlie Romeo Tango Charlie, cinco millas al norte, dos mil quinientos pies, para integración.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Alfa Bravo, tráfico a la vista, número uno para toma.',expect:'Confirma si tienes el tráfico y mantén separación.',reply:'Eco Alfa Bravo, Eco Charlie Romeo Tango Charlie, AFIRMA, tráfico a la vista, mantengo separación.'},
{rx:'Aeródromo Sur tráfico, Eco Alfa Bravo, base izquierda pista dos cuatro.',expect:'Actualiza tu incorporación sin pedir autorización al otro piloto.',reply:'Aeródromo Sur tráfico, Eco Charlie Romeo Tango Charlie, integrando viento en cola izquierda pista dos cuatro.'},
{rx:'Aeródromo Sur tráfico, Eco Alfa Bravo, pista libre.',expect:'Continúa tu secuencia y comunica la fase real.',reply:'Aeródromo Sur tráfico, Eco Charlie Romeo Tango Charlie, base izquierda pista dos cuatro.'}
]},
{id:'air_air',title:'Vuelo guiado · avión-avión en Sierra',role:'OTRA AERONAVE',intro:'La convergencia del curso ilustrado. La radio ayuda a localizaros, pero no sustituye vigilancia exterior, prioridad ni separación visual.',turns:[
{rx:'Eco Delta Lima, tres millas al este de Sierra, dos mil setecientos pies, rumbo oeste.',expect:'Da indicativo, posición, nivel e intención.',reply:'Eco Delta Lima, Eco Charlie Romeo Tango Charlie, dos millas al oeste de Sierra, dos mil quinientos pies, rumbo este, tráfico a la vista.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Delta Lima, AFIRMA, te tengo a la vista.',expect:'Coordina brevemente manteniendo vigilancia y separación visual.',reply:'Eco Delta Lima, Eco Charlie Romeo Tango Charlie, mantengo separación visual.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Delta Lima, paso por tu norte, mantengo dos mil setecientos pies.',expect:'Confirma únicamente lo necesario y continúa vigilando.',reply:'Eco Delta Lima, Eco Charlie Romeo Tango Charlie, tráfico a la vista, mantengo dos mil quinientos pies.'}
]},
{id:'panpan_return',title:'Vuelo guiado · PAN PAN y regreso prioritario',role:'TRÁFICO / AERÓDROMO',intro:'Continuación de la rama PAN PAN del curso. Primero vuela el avión; después comunica naturaleza, posición e intención y mantén informado al resto solo lo necesario.',turns:[
{rx:'Eco Charlie Romeo Tango Charlie, tráfico del Aeródromo Norte, recibido PAN PAN, tráfico en circuito mantiene escucha.',expect:'Actualiza brevemente tu regreso y la pista prevista.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, PAN PAN, incorporándome directo a final pista cero seis.'},
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, viento en cola pista cero seis, te tengo a la vista y prolongaré viento en cola.',expect:'Acusa la información sin convertirla en una autorización.',reply:'Eco Delta Alfa Bravo, Eco Charlie Romeo Tango Charlie, recibido, continúo directo a final pista cero seis.'},
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, pista libre.',expect:'Si la situación lo permite, anuncia final y concéntrate en aterrizar.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, PAN PAN, final pista cero seis.'}
]},
{id:'radio_restore',title:'Vuelo guiado · radio recuperada',role:'TRÁFICO',intro:'Tras un fallo de radio has recuperado comunicaciones. Igual que en el curso, primero escucha unos segundos y después informa posición e intención.',turns:[
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, viento en cola izquierda pista cero seis.',expect:'Informa que la radio está restablecida, tu posición y regreso.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, radio restablecida, tres millas al oeste, regresando al campo.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Delta Alfa Bravo, recibido, estoy número uno para toma pista cero seis.',expect:'Confirma tráfico si lo tienes y mantén separación.',reply:'Eco Delta Alfa Bravo, Eco Charlie Romeo Tango Charlie, AFIRMA tráfico a la vista, mantengo separación.'},
{rx:'Aeródromo Norte tráfico, Eco Delta Alfa Bravo, pista libre.',expect:'Comunica tu incorporación real.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, integrando viento en cola izquierda pista cero seis.'}
]}
];
/* Motor aislado para radio-lab. No altera PTT ni SpeechRecognition. Genera ruido continuo
   que puede mantenerse exactamente hasta el final de una transmisión. */
window.RTC_RADIO_LAB={
 isRepeatRequest(text,turn){
  const n=String(text||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  return !!(turn&&turn.repeatRequest&&turn.repeatRequest.some(x=>n.includes(x)));
 },
 startNoise(level){
  if(!level)return()=>{};
  try{
   const A=window.AudioContext||window.webkitAudioContext,a=new A(),seconds=1,b=a.createBuffer(1,a.sampleRate*seconds,a.sampleRate),d=b.getChannelData(0);
   for(let i=0;i<d.length;i++){const crack=Math.random()<.0025*level?(Math.random()-.5)*1.6:0;d[i]=(Math.random()*2-1)*(.025*level)+crack}
   const s=a.createBufferSource(),g=a.createGain();s.buffer=b;s.loop=true;g.gain.value=.18+.055*level;s.connect(g).connect(a.destination);s.start();
   let stopped=false;return()=>{if(stopped)return;stopped=true;try{g.gain.setTargetAtTime(0,a.currentTime,.025);s.stop(a.currentTime+.09)}catch(_){}setTimeout(()=>a.close(),180)};
  }catch(_){return()=>{}}
 }
};
})();