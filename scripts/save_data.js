document.getElementById("gobtn").addEventListener("click", ClickedGo);

document.getElementById("tg").addEventListener("click", open_tg);
document.getElementById("github").addEventListener("click", open_github);
document.getElementById("bot").addEventListener("click", open_bot);

document.getElementById("lines").addEventListener("click", menu);
document.getElementById("stat").addEventListener("click", stat);
document.getElementById("settings").addEventListener("click", settings);
//document.getElementById("vozm").addEventListener("click", vozm);
//document.getElementById("plan").addEventListener("click", open_plan);
document.getElementById("dz").addEventListener("click", open_dz);
//document.getElementById("rate").addEventListener("click", rate);
document.getElementById("help").addEventListener("click", help);
document.getElementById("tabel").addEventListener("click", tabel);

document.getElementById("clear").addEventListener("click", clear);

function tabel(){
	chrome.windows.create({url : "tabel.html", width: 500, height: 700, type: "popup"});
}


function help(){
  window.open("https://t.me/slbear");
}

document.addEventListener(
  'click',
  function handleClickOutsideBox(event) {
    const m = document.getElementById('menu');
    const l = document.getElementById('lines')
    if (!m.contains(event.target) && !l.contains(event.target)) {
      m.style.display = 'none';
      document.querySelector('#is_menu_closed').checked = true;
			divs = document.getElementsByTagName('div');
			for (const d of divs){
				if(d.id != 'lines' && d.id != 'buttons' && d.id != 'menu') d.style.opacity = '1';
			}
    }
  },
);

function clear(){
	var result = confirm('Хотите продолжить?\nВся история оценок будет удалена');
	if(result){
		chrome.storage.local.set({'history': []});
		document.location.reload();
	}
}

function open_tg(){
  window.open("https://t.me/slbden");
}

function rate(){
  window.open("https://chromewebstore.google.com/detail/elshelp/bmdnfegelmgebfegdomphfckbplkgneg");
}

function open_github(){
  window.open("https://github.com/theslothbear/ElsHelpExt");
}

function open_bot(){
  window.open("https://t.me/elschool_help_bot");
}

function menu(){
	if (document.querySelector('#is_menu_closed').checked){
		document.querySelector('#menu').style.display = 'inline';
		document.querySelector('#is_menu_closed').checked = false;
		divs = document.getElementsByTagName('div');
		for (const d of divs){
			if(d.id != 'lines' && d.id != 'buttons' && d.id != 'menu') d.style.opacity = '0.5';
		}
	} else{
		document.querySelector('#menu').style.display = 'none';
		document.querySelector('#is_menu_closed').checked = true;
		divs = document.getElementsByTagName('div');
		for (const d of divs){
			if(d.id != 'lines' && d.id != 'buttons' && d.id != 'menu') d.style.opacity = '1';
		}
	}
}

function stat(){
	chrome.windows.create({url : "stats.html", width: 500, height: 700, type: "popup"});
}

function open_plan(){
	chrome.windows.create({url : "plan.html", width: 500, height: 700, type: "popup"});
	//alert('Скоро...');
}

function open_dz(){
	chrome.windows.create({url : "dz.html", width: 500, height: 700, type: "popup"});
}

function settings(){
	//alert('Скоро');
	chrome.windows.create({url : "settings.html", width: 500, height: 700, type: "popup"});
}

function vozm(){
	window.open("https://github.com/theslothbear/ElsHelpExt");
}

function ClickedGo() {
	var log = document.getElementById("login").value;
  var pass = document.getElementById("pass").value;
  chrome.storage.local.get(['login', 'password'], function(data) {
		var login = data.login;
		var password = data.password;
		if(login == log && password == pass){
			alert('Логин и пароль совпадают с текущими');
		}
		else{
			console.log(login, log, password, pass);
			get_info(log, pass);
		}
	});
}

function get_info(login, pass){
	httpGet('https://elschool.ru/Logon/Logout');
	var t = httpPost(login, pass);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpPost(login, password){
try{
	//alert(`${login} ${password}`);
	var xhr = new XMLHttpRequest();
	var params = `login=${login}&password=${password}`;
	xhr.withCredentials = true;
	xhr.open('POST', 'https://elschool.ru/Logon/Index', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
	  // do something to response
	  // alert(this.responseText);
		this.open('GET', 'https://elschool.ru/users/diaries', false);
		this.onload = function() {
			var text = this.responseText;
			//alert(this.responseText);
			var s = text.split('class=\"btn\">Табель</a>')[0].split('href=\"'); //[-1].split('\"')[0];
			var c = s[s.length - 1].split('\"')[0];
			//alert(c);
			this.open('GET', `https://elschool.ru/users/diaries/${c}`, false);
			this.onload = function() {
				var t = this.responseText;
				//alert(t);
				//spg, fl, col4 = [], True, -1
				var spg = [];
				var fl = true;
				var col4 = -1;

				for(var i=1; i<100;i++){
					var s1 = t.split(`<tbody period=\"${i}\"`);
					if(s1.length > 1){
						var pr = s1[0].split('<th colspan="').pop().split('>')[1].split('<')[0];
						var spo = [];
						var l1 = s1[1].split('<td class="grades-period-name">1')[1].split('<span>');
						var str_marks = '';
						var flag_norm = true;
						//alert(s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4));
						if (s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4) == 'чет') {
						    var col4 = s1[1].split('<td class=\"grades-period-name\">4')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1;
						    var col3 = s1[1].split('<td class=\"grades-period-name\">3')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col4;
						    var col2 = s1[1].split('<td class=\"grades-period-name\">2')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col3 - col4;
						    var col1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col2 - col3 - col4;
						} else if (s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4) == 'три') {
						    let col3 = s1[1].split('<td class=\"grades-period-name\">3')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1;
						    let col2 = s1[1].split('<td class=\"grades-period-name\">2')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col3;
						    let col1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col2 - col3;
						} else if (s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4) == 'пол') {
						    var col4 = 0;
						    var col3 = s1[1].split('<td class=\"grades-period-name\">2')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col4;
						    var col2 = 0;
						    var col1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col2 - col3 - col4;
						}

						for (let r of l1.slice(1)) {
						    let yu = r.split('</span>')[0];
						    spo.push(yu);
						    str_marks += `${yu} `;
						}
						if (col4 !== -1 && flag_norm) {
						    spg.push({ 'Предмет': pr, 'Оценки': spo.join(' '), 'Colvo': `${col1} ${col2} ${col3} ${col4}`, 'str': str_marks.trim() });
						} else if (flag_norm) {
						    spg.push({ 'Предмет': pr, 'Оценки': spo.join(' '), 'Colvo': `${col1} ${col2} ${col3}`, 'str': str_marks.trim() });
						}
					} else{
						if(i == 1){
							alert('Произошла ошибка. Проверьте правильность логина и пароля.Если ошибка сохраняется, обратитесь в тех.поддержку');
							return;
						}
						break;

					}
				}
				console.log(spg);
				chrome.storage.local.set({'marks': spg});
				chrome.storage.local.set({'login': login});
				chrome.storage.local.set({'password': password});
				alert('Готово!');
				chrome.alarms.clearAll();
				chrome.alarms.create("5min", {
				  periodInMinutes: 5
				});
			}
			this.send( null );
		}
		this.send( null );
	};
	xhr.send(params);
} catch(err){
	alert('Произошла ошибка. Проверьте правильность логина и пароля.Если ошибка сохраняется, обратитесь в тех.поддержку');
}
}

window.onload = function(){
	chrome.storage.local.get(['login', 'password'], function(data) {
		if(typeof data.login != 'undefined' && typeof data.password != 'undefined'){
			document.querySelector('#login').value = data.login;
			document.querySelector('#pass').value = data.password;
		}
	});

	var tb = document.querySelector('#tb');
	var history = [];
	chrome.storage.local.get(['history'], function(data) {
		if (typeof data.history !== 'undefined'){
			history = data.history;
		}

		for(const mark of history){
			if(mark['Оценка'] < 0){
				var color = '';
			}
			else if(mark['Оценка'] == "5"){
				var color = '#58f758';
			}
			else if(mark['Оценка'] == "4"){
				var color = '#84dbff';
			}
			else if(mark['Оценка'] == "3"){
				var color = '#f2d77a';
			} else{
				var color = '#ff6372';
			}

			tb.insertAdjacentHTML('afterbegin', `<tr><td><img src="images/mark${mark['Оценка']}.png" class="historymark" style="background-color: ${color}"/></td><td>${mark['Предмет']}</td><td>${mark['Дата']}</td></tr>`);
		}
	});

	var manifest = chrome.runtime.getManifest();
	//console.log(manifest);
	document.querySelector("#v").innerHTML = `ElsHelp Ext v.${manifest['version']}`;

};