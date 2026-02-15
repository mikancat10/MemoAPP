const list=document.getElementById("list");
let timer=null;

function md(text){
 return text
 .replace(/^# (.*$)/gim,'<h1>$1</h1>')
 .replace(/^## (.*$)/gim,'<h2>$1</h2>')
 .replace(/\*\*(.*?)\*\*/gim,'<b>$1</b>')
 .replace(/`(.*?)`/gim,'<code>$1</code>')
 .replace(/\n/g,'<br>');
}

function save(){
 if(current===null)return;
 notes[current].text=editor.value;
 notes[current].time=Date.now();
 Storage.save(notes);
 renderList(search.value);
}

editor.addEventListener("input",()=>{
 clearTimeout(timer);
 timer=setTimeout(save,300);
 preview.innerHTML=md(editor.value);
});

function renderList(filter=""){
 list.innerHTML="";
 notes.forEach((n,i)=>{
  if(!n.text.toLowerCase().includes(filter.toLowerCase()))return;
  const d=document.createElement("div");
  d.className="note";
  d.textContent=n.text.split("\n")[0]||"無題";
  d.onclick=()=>open(i);
  list.appendChild(d);
 });
}

function renderTabs(){
 tabs.innerHTML="";
 openTabs.forEach(i=>{
  const t=document.createElement("div");
  t.className="tab"+(i===current?" active":"");
  t.textContent=notes[i].text.split("\n")[0]||"無題";
  t.onclick=()=>open(i,false);
  tabs.appendChild(t);
 });
}

function open(i,add=true){
 current=i;
 editor.value=notes[i].text;
 preview.innerHTML=md(editor.value);
 if(add&&!openTabs.includes(i))openTabs.push(i);
 renderTabs();
}

function newNote(){
 notes.unshift({text:"",time:Date.now()});
 open(0);
 renderList();
}

search.oninput=()=>renderList(search.value);

document.addEventListener("keydown",e=>{
 if(e.ctrlKey&&e.key==="n"){e.preventDefault();newNote()}
});

if(notes.length===0)newNote();else open(0);
renderList();
