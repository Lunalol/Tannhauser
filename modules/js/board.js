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
// Getting playarea & board container and map dimensions
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
		<div class='TANNbackground' data-map='${map}'></div>
	</div>
</div>
`);
//
			this.playarea = dojo.byId('TANNscrollArea');
			this.board = dojo.byId('TANNboard');
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
//			dojo.connect(this.playarea, 'click', () => this.resize());
			dojo.connect(this.playarea, 'mousedown', this, 'begin_drag');
			dojo.connect(this.playarea, 'mousemove', this, 'drag');
			dojo.connect(this.playarea, 'mouseup', this, 'end_drag');
			dojo.connect(this.playarea, 'mouseleave', this, 'end_drag');
//
// Event listeners for scaling
//
			this.zoomLevel.min = Math.floor(Math.log10(Math.min(this.playarea.clientWidth / this.boardWidth, this.playarea.clientHeight / this.boardHeight)) * 10000);
			this.zoomLevel.max = +this.zoomLevel.min + 10000;
			this.zoomLevel.value = +this.zoomLevel.min;
//
			this.setZoom(Math.pow(10., (parseInt(this.zoomLevel.value)) / 10000), this.playarea.clientWidth / 2, this.playarea.clientHeight / 2);
//
			dojo.connect(this.playarea, 'scroll', this, 'scroll');
			dojo.connect(this.playarea, 'wheel', this, 'wheel');
			dojo.connect(this.zoomLevel, 'oninput', this, () => {
				dojo.stopEvent(event);
				this.setZoom(Math.pow(10., event.target.value / 10000), this.playarea.clientWidth / 2, this.playarea.clientHeight / 2);
			});
			dojo.connect(dojo.byId('TANNzoomMinus'), 'click', () => {
				dojo.stopEvent(event);
				this.setZoom(Math.pow(10., (parseInt(this.zoomLevel.value) - 1000) / 10000), this.playarea.clientWidth / 2, this.playarea.clientHeight / 2);
			});
			dojo.connect(dojo.byId('TANNzoomPlus'), 'click', () => {
				dojo.stopEvent(event);
				this.setZoom(Math.pow(10., (parseInt(this.zoomLevel.value) + 1000) / 10000), this.playarea.clientWidth / 2, this.playarea.clientHeight / 2);
			});
//
			dojo.connect(this.playarea, 'gesturestart', this, () => this.zooming = this.board.scale);
			dojo.connect(this.playarea, 'gestureend', this, () => this.zooming = null);
			dojo.connect(this.playarea, 'gesturechange', this, (event) =>
			{
				event.preventDefault();
//
				if (this.zooming !== null)
				{
					const rect = this.playarea.getBoundingClientRect();
					this.setZoom(this.zooming * event.scale, event.clientX - rect.left, event.clientY - rect.top);
				}
			});
//
		},
		setZoom: function (scale, x, y)
		{
//
// Calc scale and store in session
//
			scale = Math.max(Math.max(this.playarea.clientWidth / this.boardWidth, this.playarea.clientHeight / this.boardHeight), scale);
			if (!this.bgagame.isSpectator) localStorage.setItem(`${this.bgagame.game_id}.${this.bgagame.table_id}.zoomLevel`, scale);
//
// Update range value
//
			this.zoomLevel.value = Math.log10(scale) * 10000;
//
// Get scroll positions and scale before scaling
//
			let sX = this.playarea.scrollLeft;
			let sY = this.playarea.scrollTop;
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
			this.playarea.scrollTo(Math.round((x + sX) * (scale / oldScale) - x), Math.round((y + sY) * (scale / oldScale) - y));
		},
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
					const rect = this.playarea.getBoundingClientRect();
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
				localStorage.setItem(`${this.bgagame.game_id}.${this.bgagame.table_id}.sX`, this.playarea.scrollLeft);
				localStorage.setItem(`${this.bgagame.game_id}.${this.bgagame.table_id}.sY`, this.playarea.scrollTop);
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
				this.playarea.scrollLeft -= (event.clientX - this.startX);
				this.playarea.scrollTop -= (event.clientY - this.startY);
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
			dojo.stopEvent(event);
		}
	}
	);
});
