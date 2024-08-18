/*function send(login) {
	chrome.notifications.create('test1', {
		type: 'basic',
		iconUrl: '../images/icon128.png',
		title: login,
		message: 'Оценка 2 по предмету \"Русский язык\"',
		priority: 2
	});
}

chrome.storage.local.get(['elschool_login', 'elschool_pass'], function(data) {
 	var log = data.elschool_login;
 	send(log);
});
*/
/*while(true){
	chrome.storage.local.get(['elschool_login1', 'elschool_pass1'], function(data) {
	 	var log = data.elschool_login;
	 	if (typeof log !== 'undefined'){
	 		chrome.notifications.create('test2', {
				type: 'basic',
				iconUrl: '../images/icon128.png',
				title: log,
				message: 'Оценка 2 по предмету \"Русский язык\"',
				priority: 2
			});
			vhkjln;
	 	} else{
	 		var a = 1;
	 	}
});
}*/

/*
This is the page for which we want to rewrite the User-Agent header.
*/


/*
Map browser names to UA strings.
*/
/*var uaStrings = {
  \"Firefox 41\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0\",
  \"Chrome 41\": \"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36\",
  \"IE 11\": \"Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko\"
}*/

/*
Initialize the UA to Firefox 41.
*/


chrome.notifications.onClicked.addListener(function(notifId){
	chrome.tabs.create({url : "popup.html"});
});


const wait = (duration, ...args) => new Promise(resolve => {
   setTimeout(resolve, duration, ...args);
});

String.prototype.count = function(search) {
    var m = this.match(new RegExp(search.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
    return m ? m.length:0;
}

const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);
const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: 'User-Agent',
          value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
        },
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: 'Referer',
          value: 'https://elschool.ru/Logon/Index',
        },
      ]
    },
    condition: {
      urlFilter: 'https://elschool.ru/*',
      resourceTypes: allResourceTypes,
    }
  }
];

chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1], // remove existing rule with ID 1
  addRules: rules
});


chrome.alarms.onAlarm.addListener(async function(alarm) {
  if (alarm.name === '5min') {
    await parse();
  }
});

async function parse(){
try{
	//alert(`${login} ${password}`);
	chrome.storage.local.get(['login', 'password'], async function(data) {
		var login = data.login;
		var password = data.password;
		const params = `login=${login}&password=${password}`;

		fetch('https://elschool.ru/Logon/Index', {
		    method: 'POST',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    body: params,
		    credentials: 'include' // Для отправки куки
		})
		.then(async response => response.text())
		.then(async responseText => {
			return fetch(`https://elschool.ru/users/diaries/`, {
		        method: 'GET',
		        credentials: 'include'
		    });
		})
		.then(async response => response.text())
		.then(async responseText => {
		    // Обработка ответа
		    // alert(responseText);
		    
		    const s = responseText.split('class=\"btn\">Табель</a>')[0].split('href=\"');
		    const c = s[s.length - 1].split('\"')[0];
		    // alert(c);

		    return fetch(`https://elschool.ru/users/diaries/${c}`, {
		        method: 'GET',
		        credentials: 'include'
		    });
		})
		.then(async response => response.text())
		.then(async t => {
		    // alert(t);
		    var spg = [];
		    var fl = true;
		    var col4 = -1;

		    for (var i = 1; i < 100; i++) {
		        var s1 = t.split(`<tbody period=\"${i}\"`);
		        if (s1.length > 1) {
		            var pr = s1[0].split('<th colspan=\"').pop().split('>')[1].split('<')[0];
		            var spo = [];
		            var l1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<span>');
		            var str_marks = '';
		            var flag_norm = true;

		            if (s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4) === 'чет') {
		                var col4 = s1[1].split('<td class=\"grades-period-name\">4')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1;
		                var col3 = s1[1].split('<td class=\"grades-period-name\">3')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col4;
		                var col2 = s1[1].split('<td class=\"grades-period-name\">2')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col3 - col4;
		                var col1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col2 - col3 - col4;
		            } else if (s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4) === 'три') {
		                var col3 = s1[1].split('<td class=\"grades-period-name\">3')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1;
		                var col2 = s1[1].split('<td class=\"grades-period-name\">2')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col3;
		                var col1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col2 - col3;
		            } else if (s1[1].split('<td class=\"grades-period-name\">1')[1].substring(1, 4) === 'пол') {
		                var col4 = 0;
		                var col3 = s1[1].split('<td class=\"grades-period-name\">2')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col4;
		                var col2 = 0;
		                var col1 = s1[1].split('<td class=\"grades-period-name\">1')[1].split('<td class=\"grades-period-name\">1')[0].split('<span>').length - 1 - col2 - col3 - col4;
		            }

		            for (let r of l1.slice(1)) {
		                let yu = r.split('</span>')[0];
		                spo.push(yu);
		                str_marks += `${yu}` ;
		            }
		            if (col4 !== -1 && flag_norm) {
		                spg.push({ 'Предмет': pr, 'Colvo': `${col1} ${col2} ${col3} ${col4}`, 'str': str_marks.trim() });
		            } else if (flag_norm) {
		                spg.push({ 'Предмет': pr, 'Colvo': `${col1} ${col2} ${col3}`, 'str': str_marks.trim() });
		            }
		        } else{
		            if(i == 1){
						await chrome.storage.local.get(['num'], async function(data) {
							var num = 0;
							if (typeof data.num !== 'undefined'){
								num = data.num;
							}
							await chrome.storage.local.set({'num': num+1}, async function(data){
								await chrome.notifications.create(`${num}`, {
									type: 'basic',
									iconUrl: '../images/icon128.png',
									title: 'Произошла ошибка:',
									message: 'Не удалось войти в аккаунт Elschool',
									priority: 2
								});
								console.log(login, password);
							});
						});
						return;
		            }
		            break;
		        }
	        }
	        await chrome.storage.local.get(['marks'], async function(data) {
	        	var sp = data.marks;
	        	if (typeof sp !== 'undefined'){ 	
	        		console.log(JSON.stringify(sp));
	        		if(sp.length == spg.length){
	        			for(let i=0; i<sp.length; i++){
	        				if(sp[i]['str'] != spg[i]['str']){
	        					for(let j=1; j<=5;j++){
	        						var count_before = sp[i]['str'].count(`${j}`);
	        						var count_after = spg[i]['str'].count(`${j}`);
	        						if (count_before != count_after){
	        							if(count_after > count_before){
	        								for (let k=0; k<count_after-count_before; k++){
	        									await wait(500);
	        									await chrome.storage.local.get(['num'], async function(data) {
	        										var num = 0;
	        										if (typeof data.num !== 'undefined'){
	        											num = data.num;
	        										}
	    											await chrome.storage.local.set({'num': num+1}, async function(data){
	    												var today = new Date();
														var dd = String(today.getDate()).padStart(2, '0');
														var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
														var yyyy = today.getFullYear();

														today = dd + '/' + mm + '/' + yyyy;

			        									await chrome.storage.local.get(['history'], async function(data) {
			        										var history = [];
			        										if (typeof data.history !== 'undefined'){
			        											history = data.history;
			        										}
			        										history.push({'Предмет': spg[i]['Предмет'], 'Оценка': j, 'Дата': today});

				        									await chrome.storage.local.set({'history': history}, async function(data){
				        										await chrome.notifications.create(`${num}`, {
																	type: 'basic',
																	iconUrl: '../images/icon128.png',
																	title: 'Новая оценка',
																	message: `Новая оценка ${j} по предмету ${spg[i]['Предмет']}`,
																	priority: 2
																}, async function(data){
																	console.log(`Новая оценка ${j} по предмету ${spg[i]['Предмет']}`);
																});//.then(() => {	
				        									});
			        									})
	    											});
			        							});		
	        								}
	        							} else{
	        								for (let k=0; k<count_before-count_after; k++){
	        									await wait(500);
	        									await chrome.storage.local.get(['num'], async function(data) {
	        										var num = 0;
	        										if (typeof data.num !== 'undefined'){
	        											num = data.num;
	        										}
	        										await chrome.storage.local.set({'num': num+1}, async function(data){
	        											var today = new Date();
														var dd = String(today.getDate()).padStart(2, '0');
														var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
														var yyyy = today.getFullYear();

														today = dd + '/' + mm + '/' + yyyy;

			        									await chrome.storage.local.get(['history'], async function(data) {
			        										var history = [];
			        										if (typeof data.history !== 'undefined'){
			        											history = data.history;
			        										}
			        										history.push({'Предмет': spg[i]['Предмет'], 'Оценка': -j, 'Дата': today});

				        									await chrome.storage.local.set({'history': history}, async function(data){
				        										await chrome.notifications.create(`${num}`, {
																	type: 'basic',
																	iconUrl: '../images/icon128.png',
																	title: 'Удаление оценки',
																	message: `Ваша оценка ${j} по предмету ${spg[i]['Предмет']} была удалена`,
																	priority: 2
																});        									
					        									console.log(`Ваша оценка ${j} по предмету ${spg[i]['Предмет']} была удалена`);
				        									});
			        									});
			        								});
	        									});
	        								}
	        							}
	        						}
	        					}
	        					
	        				}
	        			}
	        		} else{
						await chrome.storage.local.get(['num'], async function(data) {
							var num = 0;
							if (typeof data.num !== 'undefined'){
								num = data.num;
							}
							await chrome.storage.local.set({'num': num+1}, async function(data){
								await chrome.notifications.create(`${num}`, {
									type: 'basic',
									iconUrl: '../images/icon128.png',
									title: 'Произошла ошибка:',
									message: 'Обнаружено изменение списка предметов',
									priority: 2
								});
			        			console.log('Обнаружено изменение списка предметов');
							});
						})
	        		}

	        	} else{
	            	console.log('no marks');
	        	}
	        	await chrome.storage.local.set({'marks': spg});
	        });

		})
		.catch(error => {
		    console.error('Error:', error);
		});
	});

	
} catch(err){
	await chrome.storage.local.get(['num'], async function(data) {
		var num = 0;
		if (typeof data.num !== 'undefined'){
			num = data.num;
		}
		await chrome.storage.local.set({'num': num+1}, async function(data){
			await chrome.notifications.create(`${num}`, {
				type: 'basic',
				iconUrl: '../images/icon128.png',
				title: 'Произошла ошибка:',
				message: err.toString(),
				priority: 2
			});
		});
	})
}
}
