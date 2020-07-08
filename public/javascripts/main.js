var times = 0;
var darkmode = false;
var status = 'light';
function toggleStats(){
	var area = document.querySelector('#stats');
	area.classList.toggle('hidden');
	document.querySelector('#stats-btn').innerText = area.classList.contains('hidden') ? 'Show Stats' :'Hide Stats';
}
function downloadStats(){
	var exportName ='stats';
	var exportObj = {dark:{darkmode:darkmode,status:status},navi:_navigator};
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
	updateStats();
}
function updateStats(){
	var d = document.querySelector('#darkmode-info');
	var html = "<div class='collection'>";
	html += "<div class='collection-item'>Times Changed "+times+"</div>";
	html += "<div class='collection-item'>Status  "+status+"</div>";
	html +="</div>";
	d.innerHTML = html;
}
document.addEventListener('DOMContentLoaded',function() {
	updateStats();
	document.querySelector('#dark-mode-btn').addEventListener('click',function(){
		toggleDarkMode();
	});
	document.querySelector('#stats-btn').addEventListener('click',function(){
		toggleStats();
	});
	document.querySelector('#download-btn').addEventListener('click',function(){
		downloadStats();
	});
})
//Caricamento statistiche navigatore
var _navigator = {};
for (var i in navigator) _navigator[i] = navigator[i];
h = toUl(_navigator);
console.log(h);
stats.innerHTML +="<div><h2 class='center'>Dark Mode Stats</h2><div id='darkmode-info'></div></div>"; 
stats.innerHTML +="<h2 class='center'>User Agent Info</h2>"; 
stats.innerHTML +=h; 
var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems);
elems = document.querySelectorAll('.tooltipped');
instances = M.Tooltip.init(elems);
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