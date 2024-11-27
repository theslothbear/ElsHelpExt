function sum(s) {
  let dig = s;
  let sum = 0;
  for (let i = 0; i < dig.length; i++) sum += +dig[i];
  return sum;
}


window.onload = function() {
	var sel = document.querySelector('#predmets');
	chrome.storage.local.get(['marks'], function(data) {
		var marks = [];
        var trim = false;
		if(typeof data.marks != 'undefined') marks = data.marks;
		if(marks[0]['Colvo'].split(' ').length == 3) trim = true;
		
		var s = `<table id="table"><colgroup><col style="background-color: #E9F0F5;"><col style="width: 275px;"><col style="width: 50px"></colgroup>`;
		var s2 = `<table id="table2" style="display: none"><colgroup><col style="background-color: #E9F0F5;"><col style="width: 275px;"><col style="width: 50px"></colgroup>`;
		var h = 0;
		for(const pr of marks){
			h+=1;
			var c = pr['Colvo'].split(' ');
			if(!trim){
				/*console.log(`1 чет. — ${pr['str'].slice(0, c[0])}`);
				console.log(`2 чет. — ${pr['str'].slice(c[0], c[0]+c[1])}`);
				console.log(`3 чет. — ${pr['str'].slice(c[0]+c[1], c[0]+c[1]+c[2])}`);
				console.log(`4 чет. — ${pr['str'].slice(c[0]+c[1]+c[2])}`);*/
				var sr1 = sum(pr['str'].slice(0, c[0]))/(pr['str'].slice(0, c[0])).length;
				var sr2 = sum(pr['str'].slice(c[0], c[0]+c[1]))/(pr['str'].slice(c[0], c[0]+c[1])).length;
				var sr3 = sum(pr['str'].slice(c[0]+c[1], c[0]+c[1]+c[2]))/(pr['str'].slice(c[0]+c[1], c[0]+c[1]+c[2])).length;
				var sr4 = sum(pr['str'].slice(c[0]+c[1]+c[2]))/(pr['str'].slice(c[0]+c[1]+c[2])).length;
				var sr_pol1 = sum(pr['str'].slice(0, c[0]+c[1]))/(pr['str'].slice(0, c[0]+c[1])).length;
				var sr_pol2 = sum(pr['str'].slice(c[0]+c[1]))/(pr['str'].slice(c[0]+c[1])).length;

				if(sr1 != sr1.toFixed(2)) sr1 = sr1.toFixed(2);
				if(sr2 != sr2.toFixed(2)) sr2 = sr2.toFixed(2);
				if(sr3 != sr3.toFixed(2)) sr3 = sr3.toFixed(2);
				if(sr4 != sr4.toFixed(2)) sr4 = sr4.toFixed(2);
				if(sr_pol1 != sr_pol1.toFixed(2)) sr_pol1 = sr_pol1.toFixed(2);
				if(sr_pol2 != sr_pol2.toFixed(2)) sr_pol2 = sr_pol2.toFixed(2);

				if(sr1 >= 4.5) c1 = '#98FB98';
				else if(sr1 >= 3.5) c1 = '#87CEEB';
				else if(sr1 >= 2.5) c1 = '#f0e68c';
				else if(sr1 >=1) c1 = '#d46e7d';
				else c1 = '';
				if(sr2 >= 4.5) c2 = '#98FB98';
				else if(sr2 >= 3.5) c2 = '#87CEEB';
				else if(sr2 >= 2.5) c2 = '#f0e68c';
				else if(sr2 >=1) c2 = '#d46e7d';
				else c2 = '';
				if(sr3 >= 4.5) c3 = '#98FB98';
				else if(sr3 >= 3.5) c3 = '#87CEEB';
				else if(sr3 >= 2.5) c3 = '#f0e68c';
				else if(sr3 >=1) c3 = '#d46e7d';
				else c3 = '';
				if(sr4 >= 4.5) c4 = '#98FB98';
				else if(sr4 >= 3.5) c4 = '#87CEEB';
				else if(sr4 >= 2.5) c4 = '#f0e68c';
				else if(sr4 >=1) c4 = '#d46e7d';
				else c4 = '';
				if(sr_pol1 >= 4.5) c_pol1 = '#98FB98';
				else if(sr_pol1 >= 3.5) c_pol1 = '#87CEEB';
				else if(sr_pol1 >= 2.5) c_pol1 = '#f0e68c';
				else if(sr_pol1 >=1) c_pol1 = '#d46e7d';
				else c_pol1 = '';
				if(sr_pol2 >= 4.5) c_pol2 = '#98FB98';
				else if(sr_pol2 >= 3.5) c_pol2 = '#87CEEB';
				else if(sr_pol2 >= 2.5) c_pol2 = '#f0e68c';
				else if(sr_pol2 >=1) c_pol2 = '#d46e7d';
				else c_pol2 = '';

				if (isNaN(sr1)) sr1 = '';
				if (isNaN(sr2)) sr2 = '';
				if (isNaN(sr3)) sr3 = '';
				if (isNaN(sr4)) sr4 = '';
				if (isNaN(sr_pol1)) sr_pol1 = '';
				if (isNaN(sr_pol2)) sr_pol2 = '';
				//console.log(sr4)
				s += `<thead><tr><th colspan="3" style="position: sticky;">${pr['Предмет']}<img src="/images/stat.png" class="stat" title="Статистика"/></th></tr></thead><tbody period="${h}"><tr><td style="width: 80px;">1 чет.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(0, c[0])}</td><td style="background-color: ${c1}">${sr1}</td></tr><tr><td style="width: 80px;">2 чет.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(c[0], c[0]+c[1])}</td><td style="background-color: ${c2}">${sr2}</td></tr><tr><td style="width: 80px;">3 чет.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(c[0]+c[1], c[0]+c[1]+c[2])}</td><td style="background-color: ${c3}">${sr3}</td></tr><tr><td style="width: 80px;">4 чет.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(c[0]+c[1]+c[2])}</td><td style="background-color: ${c4}">${sr4}</td></tr></tbody>`;
				s2+= `<thead><tr><th colspan="3" style="position: sticky;">${pr['Предмет']}<img src="/images/stat.png" class="stat" title="Статистика"/></th></tr></thead><tbody period="${h}"><tr><td style="width: 80px;">1 пол.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(0, c[0]+c[1])}</td><td style="background-color: ${c_pol1}">${sr_pol1}</td></tr><tr><td style="width: 80px;">2 пол.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(c[0]+c[1])}</td><td style="background-color: ${c_pol2}">${sr_pol2}</td></tr>`;
			} else {
				document.querySelector('#div_pol').style.display = 'none';
				/*console.log(`1 трим. — ${pr['str'].slice(0, c[0])}`);
				console.log(`2 трим. — ${pr['str'].slice(c[0], c[0]+c[1])}`);
				console.log(`3 трим. — ${pr['str'].slice(c[0]+c[1], c[0]+c[1]+c[2])}`);*/
				var sr1 = sum(pr['str'].slice(0, c[0]))/(pr['str'].slice(0, c[0])).length;
				var sr2 = sum(pr['str'].slice(c[0], c[0]+c[1]))/(pr['str'].slice(c[0], c[0]+c[1])).length;
				var sr3 = sum(pr['str'].slice(c[0]+c[1]))/(pr['str'].slice(c[0]+c[1])).length;
				//var sr4 = sum(pr['str'].slice(c[0]+c[1]+c[2]))/(pr['str'].slice(c[0]+c[1]+c[2])).length;

				if(sr1 != sr1.toFixed(2)) sr1 = sr1.toFixed(2);
				if(sr2 != sr2.toFixed(2)) sr2 = sr2.toFixed(2);
				if(sr3 != sr3.toFixed(2)) sr3 = sr3.toFixed(2);
				//if(sr4 != sr4.toFixed(2)) sr4 = sr4.toFixed(2);

				if(sr1 >= 4.5) c1 = '#98FB98';
				else if(sr1 >= 3.5) c1 = '#87CEEB';
				else if(sr1 >= 2.5) c1 = '#f0e68c';
				else if(sr1 >=1) c1 = '#d46e7d';
				else c1 = '';
				if(sr2 >= 4.5) c2 = '#98FB98';
				else if(sr2 >= 3.5) c2 = '#87CEEB';
				else if(sr2 >= 2.5) c2 = '#f0e68c';
				else if(sr2 >=1) c2 = '#d46e7d';
				else c2 = '';
				if(sr3 >= 4.5) c3 = '#98FB98';
				else if(sr3 >= 3.5) c3 = '#87CEEB';
				else if(sr3 >= 2.5) c3 = '#f0e68c';
				else if(sr3 >=1) c3 = '#d46e7d';
				else c3 = '';
				//if(sr4 >= 4.5) c4 = '#98FB98';
				//else if(sr4 >= 3.5) c4 = '#87CEEB';
				//else if(sr4 >= 2.5) c4 = '#f0e68c';
				//else if(sr4 >=1) c4 = '#d46e7d';
				//else c4 = '';

				if (isNaN(sr1)) sr1 = '';
				if (isNaN(sr2)) sr2 = '';
				if (isNaN(sr3)) sr3 = '';
				//if (isNaN(sr4)) sr4 = '';
				//console.log(sr4)
				s += `<thead><tr><th style="position: sticky;" colspan="3">${pr['Предмет']}<img src="/images/stat.png" class="stat" title="Статистика"/></th></tr></thead><tbody period="${h}"><tr><td style="width: 80px;">1 трим.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(0, c[0])}</td><td style="background-color: ${c1}">${sr1}</td></tr><tr><td style="width: 80px;">2 трим.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(c[0], c[0]+c[1])}</td><td style="background-color: ${c2}">${sr2}</td></tr><tr><td style="width: 80px;">3 трим.</td><td style="letter-spacing: 3px; text-align: left;">${pr['str'].slice(c[0]+c[1], c[0]+c[1]+c[2])}</td><td style="background-color: ${c3}">${sr3}</td></tr></tbody>`;
			}
		}
		s+='</table>';
		s2+='</table>';
		document.querySelector("#tab").innerHTML = s+s2;
		for(const s of document.getElementsByClassName("stat")){
			s.addEventListener("click", stat);
		}
	});
}

document.getElementById("pol").addEventListener("click", pol);

function pol(){
	if(document.querySelector('#checkbox_pol').checked){
		document.querySelector('#table').style.display = 'none';
		document.querySelector('#table2').style.display = 'table';
	} else {
		document.querySelector('#table2').style.display = 'none';
		document.querySelector('#table').style.display = 'table';
	}
}

/*window.onwheel = (e) => {
	if(e.deltaY > 0){
		document.getElementById('tab').setAttribute("style","height:600px;overflow-y:scroll;");
		document.querySelector('#div_pol').style.display = 'none';
		//document.querySelector('#tab').style.height = '600px';
	}
	else document.querySelector('#div_pol').style.display = 'block';
	//document.querySelector('#tab').style.height = '585px';
	document.getElementById('tab').setAttribute("style","height:585px;overflow-y:scroll;");
};*/

function stat(e){
	var predm = e.target.parentNode.innerHTML.split('<')[0];
	console.log(predm);
	chrome.storage.local.set({'stat': predm}, function(a){
		chrome.windows.create({url : "stats.html", width: 500, height: 700, type: "popup"});
	});
}