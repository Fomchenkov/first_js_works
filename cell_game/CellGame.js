;'use strict';
/*
	Фомченков Вячеслав
	Fomchenkov Vyacheslav
	07.07.16
	Скрипт автоматически генерирует игровое поле,
	добавляет обработчики событий и логику.
*/

// класс игры CellGame
class CellGame {
	constructor(
		cellChangedColor = 'red', 
		defoultCellCount = 'blue', 
		totalTimer = 10000,
		cellCount = 9
	) {
		// цвет изменяющейся клетки
		this.cellChangedColor = cellChangedColor;
		// цвет клетки по умолчанию
		this.defoultCellCount = defoultCellCount;
		// общий таймер игры
		this._totalTimer = totalTimer;
		// количество клеток
		this.cellCount = cellCount;
		// счетчик очков за игру
		this.totalCore = 0;
		// активная клетка
		this.activeCell = null;
		// таймер окончания игры
		this.overTimer = null;
		// таймер обновления игры
		this.updateTimer = null;
	}
	// смена активной клетки
	_changeActiveCell() {
		// генрация числа от 0 до 8 (для id клетки)
		let randomCell = Math.floor(Math.random() * this.cellCount);
		this.activeCell = randomCell;
		// получение id рандомной клетки
		let cellId = document.getElementById(randomCell + 'cell');
		// изменение стиля рандомной клетки
		cellId.style.backgroundColor = this.cellChangedColor;
	}
	// возвращение игрового поля к начальному состоянию
	_clearGameFeeld() {
		// перебор клеток и изменение их цвета на стандартный
		for (let i = 0; i < this.cellCount; i++) {
			let element = document.getElementById(i + 'cell');
			element.style.backgroundColor = this.defoultCellCount;
		}
	}
	// обработка событий
	_eventListener() {
		let that = this;
		// div для вывода счета
		let coreDiv = document.getElementById('coreDiv');
		// Присваивание клеткам обработчиков событий
		for (let i = 0, max = this.cellCount; i < max; i++) {
			document.getElementById(i + 'cell')
			.addEventListener('click', function() {
				validateActiveCall(this);
			});
		}
		// проверка на действительность обработчика 
		function validateActiveCall(divObj) {
			if (that.activeCell == divObj.id[0]) {
				successValidate();
			} else {
				event.preventDefault();
			}
		}
		// при клике на клетку во время ее активности
		function successValidate() {
			that.totalCore++;
			coreDiv.innerHTML = 'Ваш счет: ' + that.totalCore;
		}
	}
	// запуск игры
	_start(interval = 1000) {
		// выводим счет на место кнопки
		document.getElementById('coreDiv').innerHTML = 
			'Ваш счет: ' + this.totalCore;
		this._eventListener();
		this.overTimer = setTimeout(
			this.reset.bind(this), this._totalTimer);
		this.updateTimer = setInterval(function() {
			this._clearGameFeeld();
			this._changeActiveCell();
		}.bind(this), interval);
	}
	reset() {
		// вывод результата
		alert('Вы набрали ' + this.totalCore 
			+ ' очков за ' + this._totalTimer/1000 + ' сек');
		// сброс параметров
		this.totalCore = 0;
		this.activeCell = null;
		this._clearGameFeeld();
		clearInterval(this.updateTimer);
		clearTimeout(this.overTimer);
		// заново создаем игровое поле
		this.render();
		// играть снова
		if (confirm('Play again?')) {
			this._start();
		}
	}
	// создание игрового поля
	render() {
		// сброс игрового поля
		if (document.getElementById('gameArea')) {
			let toDelete = document.getElementById('gameArea');
			document.body.removeChild(toDelete);
		}
		// смена титула
		document.getElementsByTagName('title')[0].innerHTML = 'CellGame';
		// gameArea
		let gameArea = document.createElement('div');
		gameArea.id = 'gameArea';
		document.body.appendChild(gameArea);
		// coreDiv
		let coreDiv = document.createElement('div');
		coreDiv.id = 'coreDiv';
		coreDiv.innerHTML = '<input type="button" value="Начать игру"></input>';
		// при нажатии на кнопку запускаем игру
		coreDiv.addEventListener('click', function() {
			this._start();
		}.bind(this));
		gameArea.appendChild(coreDiv);
		// cells (div)
		let cells = document.createElement('div');
		cells.id = 'cells';
		gameArea.appendChild(cells);
		// cell (множество)
		for (let i = 0, max = this.cellCount; i < max; i++) {
			let cell = document.createElement('div');
			cell.id = i + 'cell';
			cell.setAttribute('class', 'cell');
			cells.appendChild(cell);
		}
		// добавление стилей в cell
		for (let i = 0, max = this.cellCount; i < max; i++) {
		document.getElementsByClassName('cell')[i].style.cssText = 'height: 100px; \
			width: 100px; \
			display: inline-block; \
			margin: 5px; \
			background-color: blue;';
		}
		// стили в gameArea
		let height = Math.sqrt(this.cellCount) * 100 + 5 * this.cellCount;
		let width = Math.sqrt(this.cellCount) * 100 + 5 * this.cellCount;
		gameArea.style.cssText = 'height: ' + height + 
			' px; width: ' + width + 'px; float: center';
	}
};
