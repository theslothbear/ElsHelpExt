window.onload = function() {
	var sel = document.querySelector('#predmets');
	chrome.storage.local.get(['marks'], function(data) {
		var marks = [];
        var trim = false;
		if(typeof data.marks != 'undefined') marks = data.marks;
		for(const pr of marks){
			sel.insertAdjacentHTML('beforeend', `<option value="${pr['Предмет']}">${pr['Предмет']}</option>`);
            if(pr['Colvo'].split(' ').length == 3) trim = true;
		}
        if(trim){
            document.querySelector('#p4').style.display = 'none';
            document.querySelector('#l4').style.display = 'none';
            document.querySelector('#l1').innerHTML = '1 трим.';
            document.querySelector('#l2').innerHTML = '2 трим.';
            document.querySelector('#l3').innerHTML = '3 трим.';
        }
	});



    document.querySelectorAll('input[type="radio"][name="period"]').forEach(radio => {
        radio.addEventListener('change', () => {document.querySelector('#per').value = radio.value; graf()})
    });
}

document.querySelector("#link").addEventListener('click', function (){
	window.open('https://t.me/elschool_help_bot');	
});

document.querySelector("#predmets").addEventListener('change', function (e){
    document.querySelector('#predm').value = e.target.value;

    graf();
});

function graf(){
    var pr = document.querySelector('#predm').value;
    var period = document.querySelector('#per').value;
    chrome.storage.local.get(['marks'], function(data) {
        var marks = [];
        var predm = {};
        if(typeof data.marks != 'undefined') marks = data.marks;
        for(const el of marks){
            if(el['Предмет'] == pr){
                predm = el;
                break;
            }
        }
        if (JSON.stringify(predm).length - 2 <= 0) alert('Предмет не найден');
        else{
            //document.querySelector('#chooser').insertAdjacentHTML('afterend', '<canvas id="chart"></canvas>');
            //console.log(JSON.stringify(predm));
            var marks = [];
            var ball = [];
            var summ = 0;
            var str = '';
            if(period == "year"){
                str = predm['str'];
            } 
            else if(period == "1"){
                str = predm['str'].substr(0, parseInt(predm['Colvo'].split(' ')[0]));
            }
            else if(period == "2"){
                //console.log(parseInt(predm['Colvo'].split(' ')[0]));
                str = predm['str'].substr(parseInt(predm['Colvo'].split(' ')[0]), parseInt(predm['Colvo'].split(' ')[1]));
            }
            else if(period == "3"){
                str = predm['str'].substr(parseInt(predm['Colvo'].split(' ')[0])+parseInt(predm['Colvo'].split(' ')[1]), parseInt(predm['Colvo'].split(' ')[2]));
            }
            else if(period == "4"){
                str = predm['str'].substr(parseInt(predm['Colvo'].split(' ')[0])+parseInt(predm['Colvo'].split(' ')[1])+parseInt(predm['Colvo'].split(' ')[2]), parseInt(predm['Colvo'].split(' ')[3]));
            }
            //console.log(str);
            for(let i=0;i < str.length;i++){
                if(str.length - i <= 20){
                    marks.push(str[i]);
                    ball.push( ((summ+parseInt(str[i])))/(i+1) );
                }
                summ += parseInt(str[i]);
            }

        // data for showing the line chart
        /*let labels = ['1', '2', 
                      '3', '4', '5'];
        let dataset1Data = [10, 25, 13, 18, 30];
        let dataset2Data = [20, 15, 28, 22, 10];*/
 
        // Creating line chart
        try{
            var last_chart = Chart.getChart('chart');
            last_chart.destroy();
        } catch(err){
            var a = 0;
        }
        let ctx = 
            document.getElementById('chart').getContext('2d');
        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: marks,
                datasets: [
                    {
                        label: 'Cредний балл',
                        data: ball,
                        borderColor: 'blue',
                        borderWidth: 2,
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Оценки',
                            font: {
                                padding: 4,
                                size: 18,
                                weight: 'bold',
                                family: 'Arial'
                            },
                            color: 'darkblue'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Средний балл',
                            font: {
                                size: 16,
                                weight: 'bold',
                                family: 'Arial'
                            },
                            color: 'darkblue'
                        },
                        beginAtZero: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'Values',
                        }
                    }
                }
            }
        });
        }
    });
}