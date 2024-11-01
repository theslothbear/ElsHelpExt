const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const names = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() - 1) / 7);
}

window.onload = function(){
	chrome.storage.local.get(['login', 'password'], function(data) {
		if(typeof data.login != 'undefined' && typeof data.password != 'undefined'){
			get_info(data.login, data.password, true);
		} else {
			alert('Произошла ошибка. Проверьте правильность логина и пароля.Если ошибка сохраняется, обратитесь в тех.поддержку');
		}
	});
}

function get_info(login, pass, is_first){
	httpGet('https://elschool.ru/Logon/Logout');
	var t = httpPost(login, pass, is_first);
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function httpPost(login, password, is_first){
try{
	//alert(`${login} ${password}`);
	var xhr = new XMLHttpRequest();
	var params = `login=${login}&password=${password}`;
	xhr.withCredentials = true;
	xhr.open('POST', 'https://elschool.ru/Logon/Index', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
	  // alert(this.responseText);
		this.open('GET', 'https://elschool.ru/users/diaries', false);
		this.onload = function() {
			if(is_first){
				//var url = this.responseURL;
				document.querySelector('#week').value = (new Date()).getWeek();
				document.querySelector('#year').value = (new Date()).getFullYear();
				var text = this.responseText;
				//console.log(text);
				func(text);
			} else{
				var year = document.querySelector('#year').value;
				var week = document.querySelector('#week').value;
				var url = this.responseURL + `&Year=${year}&Week=${week}`;
				this.open('GET', url, false);
				this.onload = function() {
					var text = this.responseText;
					//console.log(text);
					func(text);
				}
				this.send( null )
			}
		}
		this.send( null );
	};
	xhr.send(params);
} catch(err){
	alert('Произошла ошибка. Проверьте правильность логина и пароля.Если ошибка сохраняется, обратитесь в тех.поддержку');
}
}

function func(text){
	//dates
	var h = -1;
	var d = text.split('<td class="diary__dayweek');
	for(const el of d){
		if (h != -1){
			var a = el.split('<p>')[1].split('</p>')[0].split(' ')[1];
			var b = el.split('<p>')[1].split('</p>')[0].split('&nbsp;&nbsp;&nbsp;')[1];
			if(typeof a != 'undefined'){
				document.querySelector(`#date_${days[h]}`).innerText = a;
				document.querySelector(`#pd_${days[h]}`).innerText = a;
			} else{
				document.querySelector(`#date_${days[h]}`).innerText = b;
				document.querySelector(`#pd_${days[h]}`).innerText = b;
			}
		}
		h+=1;
	}

	//week
	var start = document.querySelector('#date_monday').innerText;
	var end = document.querySelector('#date_saturday').innerText;
	var st = start.split('.');
	var en = end.split('.');
	document.querySelector('#name_week').innerText = `${st[0]} ${names[parseInt(st[1])-1]} — ${en[0]} ${names[parseInt(en[1])-1]}`;

	//num of lessons
	var l = text.split('<tbody>');
	//console.log(l.length);
	var i = -1;
	for(const e of l){
		if (i!=-1 && i != l.length-2){
			var k = e.split('</tbody')[0].split('<tr');
			//console.log(k.length);
			if (k.length <= 2) document.querySelector(`#num_${days[i]}`).innerText = `Нет занятий`;
			else document.querySelector(`#num_${days[i]}`).innerText = `${k.length - 1} уроков`;
		}
		i+=1
	}

	//subjects and dz
	var l = text.split('<tbody>');
	var i = -1;
	for(const s of l){
		if (i!=-1){
			var k = s.split('</tbody')[0].split('<tr');
			var str = '';
			//console.log(k);
			for(const sub of k){
				try{
					var predm = sub.split('<div class="flex-grow-1">')[1].split('</div>')[0];
					var dz = sub.split('<div class="diary__homework-text">')[1].split('</div>')[0];
					str+=`<div class="lesson" style="border-top: 1px solid grey;"><h2>${predm}</h2><h3>${dz}</h3></div>`;
				} catch(err){
					var a = 0;
				}
			}
			try{
				if(str == ''){
					str='<h3 style="margin-top: 100px; margin-left:0px">Нет занятий</h2>';
				}
				document.querySelector(`#scroll_${days[i]}`).innerHTML = str;
			} catch(err){
				//document.querySelector(`#scroll_${days[i]}`).innerHTML = 'Нет занятий';
				var a = 0;
			}
		}
		i+=1
	}
	for(const el of document.getElementsByClassName("lesson")){
		el.addEventListener("click", change_color);
	}
}

document.getElementById("right").addEventListener("click", nextWeek);

function nextWeek(){
	var week = parseInt(document.querySelector('#week').value);
	var year = parseInt(document.querySelector('#year').value);
	if(week >= 53){
		week=1;
		year+=1;
	} else{
		week+=1;
	}
	document.querySelector('#week').value = week;
	document.querySelector('#year').value = year;
	chrome.storage.local.get(['login', 'password'], function(data) {
		if(typeof data.login != 'undefined' && typeof data.password != 'undefined'){
			get_info(data.login, data.password, false);
		} else {
			alert('Произошла ошибка. Проверьте правильность логина и пароля.Если ошибка сохраняется, обратитесь в тех.поддержку');
		}
	});

}

document.getElementById("left").addEventListener("click", prevWeek);

function prevWeek(){
	var week = parseInt(document.querySelector('#week').value);
	var year = parseInt(document.querySelector('#year').value);
	if(week <= 1){
		week=53;
		year-=1;
	} else{
		week-=1;
	}
	document.querySelector('#week').value = week;
	document.querySelector('#year').value = year;
	chrome.storage.local.get(['login', 'password'], function(data) {
		if(typeof data.login != 'undefined' && typeof data.password != 'undefined'){
			get_info(data.login, data.password, false);
		} else {
			alert('Произошла ошибка. Проверьте правильность логина и пароля.Если ошибка сохраняется, обратитесь в тех.поддержку');
		}
	});

}

document.getElementById("monday").addEventListener("click", open_monday);
document.getElementById("tuesday").addEventListener("click", open_tuesday);
document.getElementById("wednesday").addEventListener("click", open_wednesday);
document.getElementById("thursday").addEventListener("click", open_thursday);
document.getElementById("friday").addEventListener("click", open_friday);
document.getElementById("saturday").addEventListener("click", open_saturday);
for(const el of document.getElementsByClassName("lesson")){
	el.addEventListener("click", change_color);
}

function open_monday(){
	document.querySelector('#panel_monday').style.display = 'block';
}
function open_tuesday(){
	document.querySelector('#panel_tuesday').style.display = 'block';
}
function open_wednesday(){
	document.querySelector('#panel_wednesday').style.display = 'block';
}
function open_thursday(){
	document.querySelector('#panel_thursday').style.display = 'block';
}
function open_friday(){
	document.querySelector('#panel_friday').style.display = 'block';
}
function open_saturday(){
	document.querySelector('#panel_saturday').style.display = 'block';
}

function change_color(event){
	//console.log('click');
	if (event.target.tagName != 'DIV') return;
	if(!event.target.style.backgroundColor) event.target.style.backgroundColor = 'rgb(11 134 178 / 57%)';
	else event.target.style.backgroundColor = '';
}

document.getElementById("close_monday").addEventListener("click", close_monday);
document.getElementById("close_tuesday").addEventListener("click", close_tuesday);
document.getElementById("close_wednesday").addEventListener("click", close_wednesday);
document.getElementById("close_thursday").addEventListener("click", close_thursday);
document.getElementById("close_friday").addEventListener("click", close_friday);
document.getElementById("close_saturday").addEventListener("click", close_saturday);

function close_monday(){
	document.querySelector('#panel_monday').style.display = 'none';
}

function close_tuesday(){
	document.querySelector('#panel_tuesday').style.display = 'none';
}

function close_wednesday(){
	document.querySelector('#panel_wednesday').style.display = 'none';
}

function close_thursday(){
	document.querySelector('#panel_thursday').style.display = 'none';
}

function close_friday(){
	document.querySelector('#panel_friday').style.display = 'none';
}

function close_saturday(){
	document.querySelector('#panel_saturday').style.display = 'none';
}