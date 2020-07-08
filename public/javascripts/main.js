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
var times = 0;
var darkmode = false;
var status = 'light';
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
function toTable(obj){
	var table = '';
	for(const i in obj) {
    var tr = "<tr>";
    /* Verification to add the last decimal 0 */
    if (obj[i].toString().substring(obj[i].toString().indexOf('.'), obj[i].toString().length) < 2) 
        obj[i].value += "0";
    /* Must not forget the $ sign */
    tr += "<td>" + obj[i].key + "</td>" + "<td>$" + obj[i].toString() + "</td></tr>";
	}
	table+=tr;
 	return tr;
}
document.addEventListener('DOMContentLoaded',function() {
	document.querySelector('#dark-mode-btn').addEventListener('click',function(){
		toggleDarkMode();
	});
})