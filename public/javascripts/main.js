var times = 0;
var darkmode = false;
var status = 'light';
function toggleStats(){
	var btn = document.querySelector('#stats');
	btn.classList.toggle('hidden');
	btn.innerText = darkmode ? 'Hide Stats' : 'Show Stats';
}
function downloadStats(){
	
}
function toggleDarkMode(){
	var body = document.querySelector('body');
	var btn = document.querySelector('#dark-mode-btn');
	darkmode = !darkmode;
	body.classList.toggle("dark",darkmode);	
	btn.innerText = darkmode ? 'Light Mode' : 'Dark Mode';
	btn.classList.toggle("waves-light", !darkmode);
	btn.classList.toggle("waves-dark",  darkmode);
	times+=1;
	status = darkmode?'dark':'light';
}
document.addEventListener('DOMContentLoaded',function() {
	document.querySelector('#dark-mode-btn').addEventListener('click',function(){
		toggleDarkMode();
	});
	document.querySelector('#stats-btn').addEventListener('click',function(){
		toggleStats();
	});

})
//Caricamento statistiche navigatore
var _navigator = {};
for (var i in navigator) _navigator[i] = navigator[i];
h = toUl(_navigator);
console.log(h);
stats.innerHTML =h; 
var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems);
function toUl(a){
	console.log(a);
	if(typeof a ==='function'){
		try {
		 a = navigator[a.name]();
		} catch (error) {
		  console.log('Error: errore'+error);
		}
	}
	if(Array.isArray(a)){
		console.log('array');
		return "<ul class='collection'>"+a.map(x=>"<li  class='collection-item'>"+toUl(x)+"</li>").join('')+"</ul>";
	}
	else if(typeof a === 'object' && a !== null){
		console.log('object');
		return "<ul class='collapsible popout'>"+Object.keys(a).map(x => "<li><div class='collapsible-header'>"+x+"</div><div class='collapsible-body'>"+toUl(a[x])+"</div></li>").join('')+"</ul>";
	}
	else if(!a || typeof a.toString !== "function"){
		console.log('empty');
		return '';
	}
	else{
		console.log('other');
		return a.toString();
	} 
}