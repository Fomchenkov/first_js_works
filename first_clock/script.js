window.onload = function(){
	
	timenow(); //вызов часов сразу после загрузки

	document.body.children[0].className = 'time';

	setInterval(function(){timenow()}, 1000);

	function timenow() {

		var now = 	new Date();
		var Hours = now.getHours();
		var Minutes = now.getMinutes();
		var Seconds = now.getSeconds();

		if (Hours < 10) { Hours = "0" + Hours};
		if (Minutes < 10) { Minutes = "0" + Minutes};
		if (Seconds < 10) { Seconds = "0" + Seconds};

		document.body.children[0].innerHTML = 
		(Hours + ':'+ Minutes + ':' + Seconds);
	};
};