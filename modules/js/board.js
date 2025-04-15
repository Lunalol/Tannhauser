define(["dojo", "dojo/_base/declare"], function (dojo, declare)
{
	return declare("Board", null,
	{
		constructor: function (bgagame, map)
		{
			console.log('Board constructor');
//
// Reference to BGA game
//
			this.bgagame = bgagame;
//
// Getting scrollArea & board container and map dimensions
//
			this.boardWidth = boardWidth;
			this.boardHeight = boardHeight;
//
			dojo.byId('game_play_area').insertAdjacentHTML('beforeend', `
<div style='position:absolute;display:flex;flex-direction:row;justify-content:center;width:100%;'>
	<div id='TANNzoom' class='TANNzoom'>
		<span id='TANNzoomMinus' class='TANNzoomIcon'>🔍</span>
		<input id='TANNzoomLevel' type='range' style='vertical-align:middle;'/>
		<span id='TANNzoomPlus' class='TANNzoomIcon'>🔎</span>
	</div>
</div>
<div id='TANNscrollArea' class='TANNscrollArea'>
	<div id='TANNboard' class='TANNboard'>
		<canvas id='TANNcanvas' class='TANNcanvas'></canvas>
		<div id='TANNbackground' class='TANNbackground' data-map='${map}'></div>
	</div>
</div>
`);
//
			this.scrollArea = dojo.byId('TANNscrollArea');
			this.board = dojo.byId('TANNboard');
//
			this.canvas = dojo.byId('TANNcanvas');
			dojo.setAttr(this.canvas, 'width', this.boardWidth);
			dojo.setAttr(this.canvas, 'height', this.boardHeight);
//
			this.zoomLevel = dojo.byId('TANNzoomLevel');
//
// Flag to follow drag gestures
//
			this.dragging = false;
//
			dojo.connect(document, 'oncontextmenu', (event) => dojo.stopEvent(event));
//
// Event listeners for drag gestures
//
			dojo.connect($('TANNbackground'), 'click', this, 'click');
			dojo.connect(this.scrollArea, 'mousedown', this, 'begin_drag');
			dojo.connect(this.scrollArea, 'mousemove', this, 'drag');
			dojo.connect(this.scrollArea, 'mouseup', this, 'end_drag');
			dojo.connect(this.scrollArea, 'mouseleave', this, 'end_drag');
//
// Event listeners for scaling
//
			this.zoomLevel.min = Math.floor(Math.log10(Math.min(this.scrollArea.clientWidth / this.boardWidth, this.scrollArea.clientHeight / this.boardHeight)) * 10000);
			this.zoomLevel.max = +this.zoomLevel.min + 10000;
			this.zoomLevel.value = +this.zoomLevel.min;
//
			this.setZoom(Math.pow(10., (parseInt(this.zoomLevel.value)) / 10000), this.scrollArea.clientWidth / 2, this.scrollArea.clientHeight / 2);
//
			dojo.connect(this.scrollArea, 'scroll', this, 'scroll');
			dojo.connect(this.scrollArea, 'wheel', this, 'wheel');
			dojo.connect(this.zoomLevel, 'oninput', this, () => {
				dojo.stopEvent(event);
				this.setZoom(Math.pow(10., event.target.value / 10000), this.scrollArea.clientWidth / 2, this.scrollArea.clientHeight / 2);
			});
			dojo.connect(dojo.byId('TANNzoomMinus'), 'click', () => {
				dojo.stopEvent(event);
				this.setZoom(Math.pow(10., (parseInt(this.zoomLevel.value) - 1000) / 10000), this.scrollArea.clientWidth / 2, this.scrollArea.clientHeight / 2);
			});
			dojo.connect(dojo.byId('TANNzoomPlus'), 'click', () => {
				dojo.stopEvent(event);
				this.setZoom(Math.pow(10., (parseInt(this.zoomLevel.value) + 1000) / 10000), this.scrollArea.clientWidth / 2, this.scrollArea.clientHeight / 2);
			});
//
			dojo.connect(this.scrollArea, 'gesturestart', this, () => this.zooming = this.board.scale);
			dojo.connect(this.scrollArea, 'gestureend', this, () => this.zooming = null);
			dojo.connect(this.scrollArea, 'gesturechange', this, (event) =>
			{
				event.preventDefault();
//
				if (this.zooming !== null)
				{
					const rect = this.scrollArea.getBoundingClientRect();
					this.setZoom(this.zooming * event.scale, event.clientX - rect.left, event.clientY - rect.top);
				}
			});
//
//
// Event listeners for hiding pieces/markers
//
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Shift') dojo.addClass(this.board, 'TANNhideTokens');
				if (event.key === 'Control') dojo.addClass(this.board, 'TANNhideCircles');
			});
			document.addEventListener('keyup', (event) => {
				if (event.key === 'Shift') dojo.removeClass(this.board, 'TANNhideTokens');
				if (event.key === 'Control') dojo.removeClass(this.board, 'TANNhideCircles');
			});
			window.onblur = () => {
//				dojo.removeClass(this.board, 'TANNhideTokens');
//				dojo.removeClass(this.board, 'TANNhideCircles');
			};
//
			const ctx = this.canvas.getContext('2d');
//
			ctx.lineWidth = 10;
			ctx.strokeStyle = '#00000040';
			for (let [i, neighboors] of Object.entries(bgagame.gamedatas.ADJACENCY[map]))
			{
				ctx.beginPath();
				ctx.arc(CIRCLES[i][0] * 2048 / 100, CIRCLES[i][1] * 2048 / 100, 55, 0, 2 * Math.PI);
				ctx.stroke();
			}
//
			ctx.lineWidth = 10;
			ctx.strokeStyle = '#00000080';
			for (let [i, neighboors] of Object.entries(bgagame.gamedatas.ADJACENCY[map]))
			{
				for (let j of neighboors)
				{
					if (!bgagame.gamedatas.ADJACENCY[map][j].includes(+i)) console.log(j, i);
//
					const x0 = CIRCLES[i][0] * 2048 / 100;
					const y0 = CIRCLES[i][1] * 2048 / 100;
					const x1 = CIRCLES[j][0] * 2048 / 100;
					const y1 = CIRCLES[j][1] * 2048 / 100;
					const dx = x1 - x0;
					const dy = y1 - y0;
					const d = Math.sqrt(dx * dx + dy * dy);
//
					ctx.beginPath();
					ctx.moveTo(x0 + dx * (50 + ctx.lineWidth) / d, y0 + dy * (50 + ctx.lineWidth) / d);
					ctx.lineTo(x1 - dx * (50 + ctx.lineWidth) / d, y1 - dy * (50 + ctx.lineWidth) / d);
					ctx.stroke();
				}
			}
//
			this.L = [];
//			for (let [i, c] of Object.entries(CIRCLES))
//			{
//				dojo.place(`<div style='position:absolute;left:${c[0] - 1.5}%;top:${c[1] - 1.5}%;width:3%;color:white;font-size:x-large;text-align:center;aspect-ratio:1/1;'>${i}</div>`, 'TANNbackground');
//			}
//
		},
		setZoom: function (scale, x, y)
		{
//
// Calc scale and store in session
//
			scale = Math.max(Math.max(this.scrollArea.clientWidth / this.boardWidth, this.scrollArea.clientHeight / this.boardHeight), scale);
			if (!this.bgagame.isSpectator) localStorage.setItem(`${this.bgagame.game_id}.${this.bgagame.table_id}.zoomLevel`, scale);
//
// Update range value
//
			this.zoomLevel.value = Math.log10(scale) * 10000;
//
// Get scroll positions and scale before scaling
//
			let sX = this.scrollArea.scrollLeft;
			let sY = this.scrollArea.scrollTop;
//
// Board scaling
//
			const oldScale = this.board.scale;
			this.board.scale = scale;
			this.board.style.transform = `scale(${scale})`;
			this.board.style.width = `${this.boardWidth * Math.min(1.0, scale)}px`;
			this.board.style.height = `${this.boardHeight * Math.min(1.0, scale)}px`;
//
// Set scroll positions after scaling
//
			this.scrollArea.scrollTo(Math.round((x + sX) * (scale / oldScale) - x), Math.round((y + sY) * (scale / oldScale) - y));
		}
		,
		wheel: function (event)
		{
			if (event.ctrlKey)
			{
//
// Ctrl + Wheel
//
				dojo.stopEvent(event);
//
// Update scale only when zoom factor is updated
//
				const oldZoom = parseInt(this.zoomLevel.value);
				const newZoom = Math.min(Math.max(this.zoomLevel.min, oldZoom - 1000 * Math.sign(event.deltaY)), this.zoomLevel.max);
				if (oldZoom !== newZoom)
				{
					const rect = this.scrollArea.getBoundingClientRect();
					this.setZoom(Math.pow(10., newZoom / 10000.), event.clientX - rect.left, event.clientY - rect.top);
				}
			}
		},
		centerMap: function (location)
		{
			const zoom = this.board.scale;
		},
		scroll: function ()
		{
			if (!this.bgagame.isSpectator)
			{
				localStorage.setItem(`${this.bgagame.game_id}.${this.bgagame.table_id}.sX`, this.scrollArea.scrollLeft);
				localStorage.setItem(`${this.bgagame.game_id}.${this.bgagame.table_id}.sY`, this.scrollArea.scrollTop);
			}
		},
		begin_drag: function (event)
		{
			this.dragging = true;
//
			this.startX = event.clientX;
			this.startY = event.clientY;
		},
		drag: function (event)
		{
			if (this.dragging)
			{
				this.scrollArea.scrollLeft -= (event.clientX - this.startX);
				this.scrollArea.scrollTop -= (event.clientY - this.startY);
//
				this.startX = event.clientX;
				this.startY = event.clientY;
			}
		},
		end_drag: function ()
		{
			this.dragging = false;
		},
		click: function (event)
		{
			const node = event.currentTarget;
//
			const x = Math.round(2 * 100 * event.offsetX / node.clientWidth) / 2;
			const y = Math.round(2 * 100 * event.offsetY / node.clientHeight) / 2;
//
			this.L.push([x, y]);
//
			dojo.stopEvent(event);
		}
	}
	);
});
