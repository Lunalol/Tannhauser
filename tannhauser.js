/* global ebg, g_gamethemeurl */

define(["dojo", "dojo/_base/declare", "ebg/core/gamegui", "ebg/counter",
	g_gamethemeurl + "modules/js/constants.js",
	g_gamethemeurl + "modules/js/board.js",
	g_gamethemeurl + "modules/js/tokens.js"
], function (dojo, declare)
{
	return declare("bgagame.tannhauser", ebg.core.gamegui,
	{
		constructor: function ()
		{
			console.log('tannhauser constructor');
		},
		setup: function (gamedatas)
		{
			console.log("Starting game setup", gamedatas);
//
			this.board = new Board(this, gamedatas.map);
			this.tokens = new Tokens(this);
//
			for (let faction of Object.keys(gamedatas.factions))
			{
				document.getElementById('game_play_area').insertAdjacentHTML('beforeend', `
<div id='TANNsheets-${faction}' class='TANNsheets' data-faction='${faction}'></div>
`);
			}
//
			for (let character of Object.values(gamedatas.characters))
			{
				document.getElementById(`TANNsheets-${character.faction}`).insertAdjacentHTML('beforeend', `
<div id='TANNsheet-${character.id}' class='TANNsheet' data-name='${character.name}' data-faction='${character.faction}'></div>
`);
			}
//
			for (let token of Object.values(gamedatas.tokens)) this.tokens.place(token);
//
			console.log("Ending game setup");
		},
		onEnteringState: function (stateName, state)
		{
			console.log('Entering state: ' + stateName, state.args);
//
			switch (stateName)
			{

			}
		},
		onLeavingState: function (stateName)
		{
			console.log('Leaving state: ' + stateName);
		},
		onUpdateActionButtons: function (stateName, args)
		{
			console.log('onUpdateActionButtons: ' + stateName, args);
//
			if (this.isCurrentPlayerActive())
			{
				switch (stateName)
				{
//
					case 'ChoosePacks':
//
						this.statusBar.addActionButton(_('Reset'), () => this.restoreServerGameState(), {color: 'secondary'});
						this.statusBar.addActionButton(_('Done'), () => this.bgaPerformAction('actChoosePacks', {faction: args._private.faction, packs: JSON.stringify(dojo.query('.bgabutton.TANNpack[data-pack]', 'generalactions').reduce((L, a) => {
									L[a.dataset.id] = a.dataset.pack;
									return L;
								}, {}))}), {id: 'TANNdone', color: 'alert', classes: 'disabled'});
//
						document.getElementById('generalactions').insertAdjacentHTML('beforeend', `
<div id='TANNcharacters' style='display:flex;justify-content:center;align-items:center'></div>
`);
//
						for (let [id, packs] of Object.entries(args._private.packs))
						{
							const node = $(`TANNsheet-${id}`);
							if (node)
							{
								document.getElementById('TANNcharacters').insertAdjacentHTML('beforeend', `
<div style='margin:5px;'>
<div class='TANNcharacter' style='height:75px;margin:auto;' data-faction='${args._private.faction}' data-name='${node.dataset.name}'></div>
<div id='TANNcharacter-${id}' class='bgabutton TANNpack bgabutton_darkgray' data-id='${id}'>${_('Choose pack')}</div>
</div>
`);
//
								dojo.connect($(`TANNcharacter-${id}`), 'click', (event) =>
								{
									const dialog = new ebg.popindialog();
									dialog.create('TANNchoosePacks');
									dialog.setTitle(_('Equipment packs'));
//
									let html = `<div style='display:flex;flex-direction:row';>`;
									for (let pack of ['COMBAT PACK', 'STAMINA PACK', 'COMMAND PACK'])
									{
										if (pack in packs)
										{
											html += `<div style='display:flex;flex-direction:column;flex: 1 1 100%;';>`;
											html += `<div id='TANN-${pack}' class='bgabutton TANNpack TANNpack-banner' data-pack='${pack}'>${pack}</div>`;
											for (let type of packs[pack]) html += this.tokens.pack(args._private.faction, pack, type);
											html += `</div>`;
										}
									}
									html += `</div>`;
//
									dialog.setContent(html);
									dialog.show();
//
									dojo.query('.bgabutton', 'popin_TANNchoosePacks').connect('click', (event) =>
									{
										dialog.destroy();
//
										const node = $(`TANNcharacter-${id}`);
										if (node)
										{
											node.dataset.pack = node.innerHTML = event.currentTarget.dataset.pack;
											dojo.toggleClass('TANNdone', 'disabled', dojo.query('.bgabutton.TANNpack[data-pack]', 'generalactions').length !== Object.keys(args._private.packs).length);
										}
									});
//
								}
								);
							}
						}
				}
			}
		},
		setupNotifications: function ()
		{
			console.log('notifications subscriptions setup');
//
			dojo.subscribe('placeToken', (notif) => this.tokens.place(notif.args.token));
//
			this.setSynchronous();
		},
		setSynchronous()
		{
			this.notifqueue.setSynchronous('placeToken', DELAY);
		},
		format_string_recursive: function (log, args)
		{
			if (log && args && !args.processed)
			{
				args.processed = true;
//
				if ('CHARACTER' in args)
					args.CHARACTER = `<div class='TANNcharacter' style='display:inline-block;height:50px;' data-faction='${args.faction}' data-name='${args.CHARACTER}'></div>`;
				if ('TOKEN' in args)
					args.TOKEN = `<div class='TANNtoken' style='display:inline-block;height:40px;' data-faction='${args.faction}' data-type='${args.TOKEN}'></div>`;
			}
			return this.inherited(arguments);
		}
	}
	);
});
