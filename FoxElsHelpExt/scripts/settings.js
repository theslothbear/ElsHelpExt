document.getElementById("minus").addEventListener("click", minus);
document.getElementById("plus").addEventListener("click", plus);

document.getElementById("save").addEventListener("click", save);

function minus() {
	if(document.querySelector("#pars").value == 2) document.querySelector("#pars").value = 1;
	else if(document.querySelector("#pars").value == 5) document.querySelector("#pars").value = 2;
	else if(document.querySelector("#pars").value == 15) document.querySelector("#pars").value = 5;
	else if(document.querySelector("#pars").value == 30) document.querySelector("#pars").value = 15;
	else if(document.querySelector("#pars").value == 60) document.querySelector("#pars").value = 30;
	else if(document.querySelector("#pars").value == 120) document.querySelector("#pars").value = 60;
}

function plus() {
	if(document.querySelector("#pars").value == 1) document.querySelector("#pars").value = 2;
	else if(document.querySelector("#pars").value == 2) document.querySelector("#pars").value = 5;
	else if(document.querySelector("#pars").value == 5) document.querySelector("#pars").value = 15;
	else if(document.querySelector("#pars").value == 15) document.querySelector("#pars").value = 30;
	else if(document.querySelector("#pars").value == 30) document.querySelector("#pars").value = 60;
	else if(document.querySelector("#pars").value == 60) document.querySelector("#pars").value = 120;
}

function save(){
	var x = document.querySelector("#pars").value;
	if (x>=1 && x<=120){
		chrome.alarms.clearAll();
		chrome.alarms.create("5min", {
		  periodInMinutes: parseInt(x)
		});
		alert('Готово!');
	} else{
		alert('Неверное значение');
	}
}

window.onload = function(){
	chrome.alarms.get('5min', function(data){
		document.querySelector("#pars").value = data.periodInMinutes; 
	});
}