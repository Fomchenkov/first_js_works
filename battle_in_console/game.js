/*
	Фомченков Вячеслав
	Fomchenkov Vyacheslav
	02.07.16
	Игра "Бой в консоли"
*/
;
(function() {
'use strict';
// Класс Person
function Person(params) {
	// Проверяем корректность переданных параметров
	validate(params);
	// Имя игрока
	this._name = params.name || 'Player';
	// Здоровье
	this._health = params.health || 1000;
	// Сила максимального удара
	this._maxForce = params.maxForce || 100;
};
// Атака
// who - АТАКУЕМЫЙ игрок
Person.prototype.attack = function(who) {
	// self - АТАКУЮЩИЙ игрок
	var self = this;
	// Вывод информации о ударе
	function info(diff) {
		console.log('Раунд №' + roundNumber);
		console.log('Игрок ' + self._name 
			+ ' наносит урон игроку ' + who._name 
			+ ' ' + diff + ' ед.');
		console.log('Игрок ' + who._name + ' получает урон ' 
			+ diff + ' ед. '+ '(Здоровье ' 
			+ who._name + ': ' + who._health + ')');
		console.log('\n');
	}
	// Сохраняем количество здоровья 
	// атакуемого игрока до удара
	var healthBeforeAttack = who._health;
	// Генерируем силу наносимого удара
	var attackForce = Math.round(Math.random() * this._maxForce);
	// Проверяем здоровье атакуемого на отрицательное значение
	if (who._health - attackForce <= 0) {
		// Обнуление здоровья игрока
		who._health = 0;
		// Остановка интервала
		clearInterval(roundInterval);
		// Вывод информации
		info(healthBeforeAttack);
		// Сообщаем результат игры
		console.log('Всего раундов: ' + roundNumber);
		console.log('Игрок ' + who._name
			+ ' проиграл (' + who._health + ')');
		console.log('Игрок ' + self._name
			+ ' победил (' + self._health + ')');
		return;
	} else {
		// Вычитаем из здоровья врага силу удара attackForce
		who._health -= attackForce;
		// Вывод информации
		info(attackForce);
		return;
	}
};
// Проверка на корректность параметров Person
function validate(params) {
	if (params.health > 5000) {
		throw new Error('health не может быть больше 5000');
	} else if (params.maxForce > 500) {
		throw new Error('maxForce не может быть больше 500');
	} else if (params.name == undefined) {
		throw new Error('Не заданы имена персонажей');
	}
}

// Создание игроков (Имена перемeнных не менять)
var personOne = new Person({
	name: 'Slava',
});
var personTwo = new Person({
	name: 'Dima',
});
// Номер раунда
var roundNumber = 0;
// Интервал раунда
var roundInterval = setInterval(function() {
	roundNumber++;
	// Вычисляем, кто ходит первый
	var generate = Math.round(Math.random() * 1);
	if (generate == 1) {
		personOne.attack(personTwo);
	} else {
		personTwo.attack(personOne);
	}
}, 100);
}).call(this);