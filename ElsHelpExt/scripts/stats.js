window.onload = function() {
	var sel = document.querySelector('#predmets');
	chrome.storage.local.get(['marks'], function(data) {
		var marks = [];
		if(typeof data.marks != 'undefined') marks = data.marks;
		for(const pr of marks){
			sel.insertAdjacentHTML('beforeend', `<option value="${pr['Предмет']}">${pr['Предмет']}</option>`)
		}
	});
}

document.querySelector("#link").addEventListener('click', function (){
	window.open('https://t.me/elschool_help_bot');	
});

document.querySelector("#predmets").addEventListener('change', function (e){
	var pr = e.target.value;
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
			var marks = [];
			var ball = [];
			var summ = 0;
			for(let i=0;i < predm['str'].length;i++){
				if(predm['str'].length - i <= 20){
					marks.push(predm['str'][i]);
					ball.push( ((summ+parseInt(predm['str'][i])))/(i+1) );
				}
				summ += parseInt(predm['str'][i]);
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
});