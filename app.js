'use strict';
const $ = id => document.getElementById(id);
let italianVoice = null;
function refreshVoices(){
 italianVoice = window.speechSynthesis?.getVoices().find(v=>/^it(?:-|_|$)/i.test(v.lang)) || null;
 $('audioStatus').textContent = italianVoice ? 'Pronuncia italiana disponibile: tocca un animale per ascoltarla.' : 'Voce italiana non disponibile su questo dispositivo. Puoi comunque scoprire tutti i nomi e giocare.';
 document.querySelectorAll('.audio-button').forEach(b=>{b.hidden=!italianVoice||!b.closest('.animal').classList.contains('revealed');});
}
function speak(name){if(!italianVoice)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(name);u.voice=italianVoice;u.lang='it-IT';u.rate=.85;u.onerror=()=>{$('audioStatus').textContent='La pronuncia non è disponibile al momento. Riprova con il pulsante audio.';};window.speechSynthesis.speak(u);}
if(window.speechSynthesis) window.speechSynthesis.addEventListener('voiceschanged',refreshVoices);
let game=null, timer=null, pairCount=4;
function cancelPending(){clearTimeout(timer);timer=null;}
function screen(id){cancelPending();window.speechSynthesis?.cancel();['start','explore','memory'].forEach(s=>$(s).hidden=s!==id);$('back').hidden=id==='start';if(id==='memory')newGame();window.scrollTo(0,0);}
$('home').onclick=$('back').onclick=()=>screen('start');$('discover').onclick=()=>screen('explore');$('play').onclick=()=>screen('memory');
ANIMALI.forEach(a=>{
 const tile=document.createElement('article');tile.className='animal';
 const toggle=document.createElement('button');toggle.className='animal-toggle';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Scopri il nome di questo animale');
 const img=document.createElement('img');img.src=a.immagine;img.alt='Animale da scoprire';img.loading='lazy';
 const label=document.createElement('span');label.className='animal-name hidden-name';label.textContent=a.nome;label.setAttribute('aria-hidden','true');toggle.append(img,label);
 const audio=document.createElement('button');audio.className='audio-button';audio.textContent='♪';audio.setAttribute('aria-label','Ripeti la pronuncia di '+a.nome);audio.hidden=true;audio.onclick=()=>speak(a.nome);
 toggle.onclick=()=>{const show=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(show));toggle.setAttribute('aria-label',show?'Nascondi il nome '+a.nome:'Scopri il nome di questo animale');label.classList.toggle('hidden-name',!show);label.setAttribute('aria-hidden',String(!show));tile.classList.toggle('revealed',show);audio.hidden=!show||!italianVoice;if(show)speak(a.nome);};tile.append(toggle,audio);$('animals').append(tile);
});
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function createGame(n){const animals=shuffle(ANIMALI).slice(0,n);return {deck:shuffle(animals.flatMap(a=>[{animal:a,type:'image'},{animal:a,type:'word'}])),selected:[],matched:new Set(),attempts:0,locked:false};}
function matchCards(a,b){return a.animal.id===b.animal.id&&a.type!==b.type;}
function updateStats(){$('attempts').textContent=game.attempts;$('found').textContent=game.matched.size+' / '+pairCount;}
function renderCard(index){const c=game.deck[index],b=$('cards').children[index],shown=game.selected.includes(index)||game.matched.has(c.animal.id);b.replaceChildren();b.className='card'+(shown?' open':'')+(game.matched.has(c.animal.id)?' matched':'');b.disabled=game.matched.has(c.animal.id);b.setAttribute('aria-label',shown?(c.type==='image'?'Immagine: ':'Nome: ')+c.animal.nome:'Carta coperta '+(index+1));if(!shown){const s=document.createElement('span');s.className='back-mark';s.textContent='?';b.append(s);}else if(c.type==='image'){const img=document.createElement('img');img.src=c.animal.immagine;img.alt=c.animal.nome;b.append(img);}else b.textContent=c.animal.nome;}
function choose(index){if(game.locked||game.selected.includes(index)||game.matched.has(game.deck[index].animal.id))return;game.selected.push(index);renderCard(index);if(game.selected.length<2)return;game.attempts++;const [a,b]=game.selected;if(matchCards(game.deck[a],game.deck[b])){game.matched.add(game.deck[a].animal.id);game.selected=[];renderCard(a);renderCard(b);updateStats();if(game.matched.size===pairCount){$('win').hidden=false;$('result').textContent=`Hai trovato ${pairCount} coppie in ${game.attempts} tentativi.`;}}else{game.locked=true;updateStats();const activeGame=game;timer=setTimeout(()=>{if(game!==activeGame)return;game.selected=[];game.locked=false;renderCard(a);renderCard(b);timer=null;},1000);}}
function newGame(){cancelPending();game=createGame(pairCount);$('win').hidden=true;$('cards').replaceChildren();game.deck.forEach((c,i)=>{const b=document.createElement('button');b.onclick=()=>choose(i);$('cards').append(b);renderCard(i);});updateStats();}
document.querySelectorAll('[data-pairs]').forEach(b=>b.onclick=()=>{pairCount=Number(b.dataset.pairs);document.querySelectorAll('[data-pairs]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));newGame();});$('restart').onclick=$('again').onclick=newGame;
refreshVoices();
