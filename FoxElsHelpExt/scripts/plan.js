document.getElementById("addtask").addEventListener("click", addtask);
function addtask(){
	var n = document.querySelector('#number_tasks').value;
	n-=-1; 
	document.querySelector('#tasks').insertAdjacentHTML('beforeend', `<div><input type="checkbox" id="c${n}" class="c" /><div contenteditable="true" class="t" id="t${n}">Задача</div></div>`);
	document.querySelector('#number_tasks').value = n;
	document.querySelector(`#t${n}`).focus();
}