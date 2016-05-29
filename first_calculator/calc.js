/*
	Фомченков Вячеслав
	16.05.16
*/

(function addListeners(){
		plus.addEventListener('click', function (){calc_plus()});
		minus.addEventListener('click', function (){calc_minus()});
		umn.addEventListener('click', function (){calc_umn()});
		delen.addEventListener('click', function (){calc_delen()});
		cdelete.addEventListener('click', function (){calc_cdelete()});
		document.addEventListener('keyup', function(){keyListener()});
})();

function calc_plus() {
	var result = text1.value - (-(text2.value));
	check(result);
};

function calc_minus() {
	var result = text1.value - text2.value;
	check(result);
};

function calc_umn() {
	var result = text1.value * text2.value;
	check(result);
};

function calc_delen() {
	var result = text1.value / text2.value;
	check(result);
};

function calc_cdelete(){
	text1.value = "";
	text2.value = "";
	text1.style.borderColor="";
	text2.style.borderColor="";
	res.value = "";
};

function check(result){
	if(isNaN(text1.value) || isNaN(text2.value)){
		text1.value = "";
		text2.value = "";
		res.value = "";
		text1.style.borderColor="";
		text2.style.borderColor="";
		alert('Введите число');
	} else if(text1.value.length==0){
		text1.style.borderColor="red";
		alert ('Заполните оба поля');
	} else if(text2.value.length==0){
		text2.style.borderColor="red";
		alert ('Заполните оба поля');
	} else {
		text1.style.borderColor="";
		text2.style.borderColor="";
		res.value=result;
	};
};

function keyListener(){
	if ((event.ctrlKey)&&(event.keyCode === 67)) {
		calc_cdelete();
	};
};