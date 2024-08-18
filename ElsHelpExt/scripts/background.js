/*function send(login) {
	chrome.notifications.create('test1', {
		type: 'basic',
		iconUrl: '../images/icon128.jpeg',
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
				iconUrl: '../images/icon128.jpeg',
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


chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '5min') {
    parse();
  }
});

function parse(){
try{
	//alert(`${login} ${password}`);
	var login = '';
	var password = '';
	chrome.storage.local.get(['login', 'password'], function(data) {
		login = data.login;
		password = data.password;
	});

	const params = `login=${login}&password=${password}`;

	fetch('https://elschool.ru/Logon/Index', {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    body: params,
	    credentials: 'include' // Для отправки куки
	})
	.then(response => response.text())
	.then(responseText => {
		return fetch(`https://elschool.ru/users/diaries/`, {
	        method: 'GET',
	        credentials: 'include'
	    });
	})
	.then(response => response.text())
	.then(responseText => {
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
	.then(response => response.text())
	.then(t => {
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
	            	var num = 0;
					chrome.storage.local.get(['num'], function(data) {
						if (typeof data.num !== 'undefined'){
							num = data.num;
						}
					})
					chrome.storage.local.set({'num': num+1});

					chrome.notifications.create(`${num}`, {
						type: 'basic',
						iconUrl: '../images/icon128.jpeg',
						title: 'Произошла ошибка:',
						message: 'Не удалось войти в аккаунт Elschool',
						priority: 2
					});
	              	return;
	            }
	            break;
	        }
        }
        chrome.storage.local.get(['marks'], function(data) {
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
        									var num = 0;
        									chrome.storage.local.get(['num'], function(data) {
        										if (typeof data.num !== 'undefined'){
        											num = data.num;
        										}
        									})
        									chrome.storage.local.set({'num': num+1});

        									chrome.notifications.create(`${num}`, {
												type: 'basic',
												iconUrl: '../images/icon128.jpeg',
												title: 'Новая оценка',
												message: `Новая оценка ${j} по предмету ${spg[i]['Предмет']}`,
												priority: 2
											});
        									console.log(`Новая оценка ${j} по предмету ${spg[i]['Предмет']}`);
        								}
        							} else{
        								for (let k=0; k<count_before-count_after; k++){
        									var num = 0;
        									chrome.storage.local.get(['num'], function(data) {
        										if (typeof data.num !== 'undefined'){
        											num = data.num;
        										}
        									})
        									chrome.storage.local.set({'num': num+1});

        									chrome.notifications.create(`${num}`, {
												type: 'basic',
												iconUrl: '../images/icon128.jpeg',
												title: 'Удаление оценки',
												message: `Ваша оценка ${j} по предмету ${spg[i]['Предмет']} была удалена`,
												priority: 2
											});        									
        									console.log(`Ваша оценка ${j} по предмету ${spg[i]['Предмет']} была удалена`);
        								}
        							}
        						}
        					}
        					
        				}
        			}
        		} else{
					var num = 0;
					chrome.storage.local.get(['num'], function(data) {
						if (typeof data.num !== 'undefined'){
							num = data.num;
						}
					})
					chrome.storage.local.set({'num': num+1});

					chrome.notifications.create(`${num}`, {
						type: 'basic',
						iconUrl: '../images/icon128.jpeg',
						title: 'Произошла ошибка:',
						message: 'Обнаружено изменение списка предметов. Пожалуйста, пройдите процедуру регистрации заново',
						priority: 2
					});
        			console.log('Обнаружено изменение списка предметов. Пожалуйста, пройдите процедуру регистрации заново');
        		}

        	} else{
            	console.log('no marks');
        	}
        	chrome.storage.local.set({'marks': spg});
        });

	})
	.catch(error => {
	    console.error('Error:', error);
	});
} catch(err){
	var num = 0;
	chrome.storage.local.get(['num'], function(data) {
		if (typeof data.num !== 'undefined'){
			num = data.num;
		}
	})
	chrome.storage.local.set({'num': num+1});

	chrome.notifications.create(`${num}`, {
		type: 'basic',
		iconUrl: '../images/icon128.jpeg',
		title: 'Произошла ошибка:',
		message: err.toString(),
		priority: 2
	});

}
}
