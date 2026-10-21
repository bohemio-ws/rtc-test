(()=>{'use strict';
window.RTC_RADIO_DIALOGUES=[
{id:'tower_departure',title:'Torre · salida VFR',role:'TORRE',intro:'Estás en punto de espera de la pista 24. Realiza una salida VFR y responde a Torre.',turns:[
{rx:'Eco Charlie Romeo Tango Charlie, Torre, mantenga posición, tráfico en final.',expect:'Acusa recibo y mantén posición.',reply:'Eco Charlie Romeo Tango Charlie, mantengo posición.'},
{rx:'Eco Charlie Romeo Tango Charlie, pista dos cuatro, autorizado a despegar, viento dos seis cero grados ocho nudos.',expect:'Colaciona pista y autorización de despegue.',reply:'Pista dos cuatro, autorizado a despegar, Eco Charlie Romeo Tango Charlie.'},
{rx:'Eco Charlie Romeo Tango Charlie, notifique Sierra.',expect:'Colaciona el punto de notificación.',reply:'Notificaré Sierra, Eco Charlie Romeo Tango Charlie.'}
]},
{id:'traffic_arrival',title:'Tráfico · llegada a aeródromo no controlado',role:'TRÁFICO',intro:'Te aproximas al Aeródromo Norte. Otro ULM está en circuito. Coordina sin convertir la autoinformación en una autorización.',turns:[
{rx:'Eco Alfa Bravo, Aeródromo Norte tráfico, viento en cola izquierda pista dos cuatro para toma.',expect:'Informa tu posición e intención.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, cinco millas Sierra, dos mil quinientos pies, para integrar viento en cola pista dos cuatro.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Alfa Bravo, tráfico a la vista, número uno para toma.',expect:'Confirma si tienes el tráfico y mantén separación.',reply:'Eco Alfa Bravo, Eco Charlie Romeo Tango Charlie, AFIRMA tráfico a la vista, mantengo separación.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Alfa Bravo, pista libre.',expect:'Actualiza tu posición en circuito.',reply:'Aeródromo Norte tráfico, Eco Charlie Romeo Tango Charlie, entrando viento en cola izquierda pista dos cuatro.'}
]},
{id:'air_air',title:'Avión–avión · convergencia',role:'OTRA AERONAVE',intro:'Dos ULM convergen cerca de un punto de ruta. La radio ayuda, pero no sustituye ver y evitar ni las reglas de prioridad.',turns:[
{rx:'Eco Delta Lima, tres millas al este de Sierra, dos mil setecientos pies, rumbo oeste.',expect:'Da posición, nivel e intención.',reply:'Eco Delta Lima, Eco Charlie Romeo Tango Charlie, dos millas al oeste de Sierra, dos mil quinientos pies, rumbo este, tráfico a la vista.'},
{rx:'Eco Charlie Romeo Tango Charlie, Eco Delta Lima, AFIRMA, te tengo a la vista.',expect:'Coordina manteniendo la maniobra reglamentaria y separación visual.',reply:'Eco Delta Lima, Eco Charlie Romeo Tango Charlie, mantengo separación visual y paso por mi derecha.'}
]}
];
function addCulture(){const menu=document.querySelector('.menu');if(!menu||document.getElementById('morseCulture'))return;const b=document.createElement('button');b.id='morseCulture';b.innerHTML='<b>⚡ Curiosidad · Código Morse</b><br><small>De la telegrafía a las comunicaciones actuales</small>';b.onclick=()=>window.open('https://bohemio-ws.github.io/morse/','_blank','noopener');menu.appendChild(b)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addCulture);else addCulture();
})();