define(["dojo", "dojo/_base/declare"], function (dojo, declare)
{
	return declare("Tokens", null,
	{
		constructor: function (bgagame)
		{
			console.log('Tokens constructor');
//
			this.bgagame = bgagame;
//
			this.PACKS = {
				'Reich': {
					'CELERITY': {
						lore: _('Those under the influence of Ghnoss’Goloss, one of the Majors of the U-Worlds, find their speed and reflexes increased substantially.'),
						description: [
							_('Ability • Add +2 to your current Movement value.')
						]
					},
					'COMBAT KNIFE': {
						lore: _('Designed for military use, combat knives vary considerably in appearance while sharing the same ultimate purpose.'),
						description: [
							_('Weapon, Hand-to-Hand')
						]
					},
					'CRITICAL HIT': {
						lore: _('Blutsturm Investigators receive special training in the art of striking vital points to ensure maximum damage.'),
						description: [
							_('Ability • Each Natural 10 you roll on any attack roll counts as two successes (rather than one).')
						]
					},
					'DEMON TAINT': {
						lore: _('Proximity to U-World beings can twist weaker spirits, sometimes transforming them into killing machines. Von Heïzinger’s bodyguards grew claws, a reflection of the grasping nightmares that now haunt their souls'),
						description: [
							_('Weapon, Hand-to-Hand • When attacking with this Weapon, add one additional die to your attack roll for each Hand-to-Hand Weapon in your inventory, including this one.')
						]
					},
					'DOOM': {
						lore: _('Rumor has it that when the spirit of Ghnoss’Goloss touched Karl Zermann, his weapon was covered with demonic writings and blessed with terrifying powers.'),
						description: [
							_('Weapon, Mental, Occult • When attacking with this weapon, you must choose any target up to (your Mental value + 1); this target may be out-of-path. Extra Ammunition may not be used to attack with Doom.')
						]
					},
					'EXTRA AMMUNITION': {
						lore: _('Veteran soldiers carry spare bullets wherever they can stash them – in clipped-on pouches, on specially designed belts, or even loose in their pockets – because sometimes a few extra rounds mark the difference between life and death.'),
						description: [
							_('Hardware • Discard this token at any time during your activation to make an attack. This attack does not require an action.')
						]
					},
					'EYE OF TAGES': {
						lore: _('Given to the Etruscans by the djinn Tages of the Tyrrhenian, this ring was stolen from the secret storage alcoves of the British Museum by Special Investigator Yula Korlïtz during the aerial attack on London in 1941.'),
						description: [
							_('Occult • As an action, once per game, return yourself or any adjacent character to full health. Turn this equipment token facedown when you do this, as a reminder that it has been used.')
						]
					},
					'FIRST AID KIT': {
						lore: _('Given the shortage of field hospitals behindenemy lines, prudent operatives carry the means to treat their own wounds.'),
						description: [
							_('Hardware • As an action, discard this token to dial up your health indicator token, or an adjacent character’s health indicator token, by up to two rows')
						]
					},
					'GENERALLEUTNANT': {
						lore: _('Approaching the highest military echelons, a lieutenant general is a superior officer who has proven his bravery, authority, and tactical expertise.'),
						description: [
							_('Rank • Add +4 to your side’s Initiative Rolls.')
						]
					},
					'HERMETICA ASTRA': {
						lore: _('When the words of this ninth text of the Corpus Hermeticum are uttered, demonic signs scratch themselves upon nearby walls as if engraved by invisible, hysterical hands.'),
						description: [
							_('Occult, Hermetica • When making a shock roll, all characters on the game board with the Obscura Korps unit affiliation symbol (including you) receive one automatic success, but roll one fewer die.')
						]
					},
					'HERMETICA OCCULTA': {
						lore: _('Considered one of the Hermetic texts discovered to date, the Hermetica Occulta transforms ambient cosmic energy into a psychic shield.'),
						description: [
							_('Occult, Hermetica • Any character lacking the Obscura Korps unit affiliation symbol who wishes to move into a circle on your path must win a Mental duel (which does not require an action) against you first.'),
							_('Losing the duel does not prevent that character from continuing his movement, it simply prevents him from moving into a circle on your path. A given character may only initiate this Mental duel once per activation. This duel must be fought each time a character wishes to enter into a circle on your path.')
						]
					},
					'HERMETICA UMBRA': {
						lore: _('The Hermetica Umbra was one of the first texts written in the Corpus Hermeticum. In the area it affects, sound itself is weakened as if reality had been altered, attacked by an occult cosmology.'),
						description: [
							_('Occult, Hermetica • You, and all characterswith the Obscura Korps unit affiliation symbol within 6 circles of you, add one die to all their attack rolls.')
						]
					},
					'IMMUNITY TO PAIN': {
						lore: _('The U-Worlds overflow with unnameable beings. Whosoever bears the mark of Kazul, the first guardian of Nosfero, on his skin becomes impervious to pain.'),
						description: [
							_('Ability • Always use your best Stamina value when making shock rolls.')
						]
					},
					'INFILTRATION': {
						lore: _('Blutsturm Investigators are masters of stealth, frequently shocking their enemies by appearing where they are least expected.'),
						description: [
							_('Ability • Prior to the game’s first turn, Eva may enter the board through any entry point (even an enemy entry point) and move using her full normal complement of movement points.'),
							_('This is not an activation, and she may not perform actions during this time. On the first game turn, she activates as normal. On the first game turn, enemy models do not need to Bull Rush in order to move through her')
						]
					},
					'IRON CROSS 1ST CLASS': {
						lore: _('This military distinction is awarded for bold action in critical wartime operations.'),
						description: [
							_('Medal • Discard this token to add 2 Command Points to your side’s pool once per game.')
						]
					},
					'IRON CROSS 2ND CLASS': {
						lore: _('This legendary Prussian decoration, instituted by Frederic-Guillaume in 1813, recognizes heroic accomplishment on the battlefield.'),
						description: [
							_('Medal • Discard this token to add 1 Command Point to your side’s pool once per game.')
						]
					},
					'KEEP FIRING': {
						lore: _('“For the Kaiser! Fire! Fiiire! Fiiirrre!”'),
						description: [
							_('Ability • While on Overwatch, you do not lose your Overwatch status after making an attack, you only lose it at the end of the turn. You only get to roll 2 dice when making an Overwatch attack, but this number may be modified by other abilities and equipment.')
						]
					},
					'LUGER P-08': {
						lore: _('The first pistol to use 10mm Parabellum rounds, the Luger P-08 has a reputation for precision.'),
						description: [
							_('Weapon, Pistol • When you attack with this weapon, your target may not counterattack.')
						]
					},
					'MAD MINUTE': {
						lore: _('In all combat conditions, against any enemy, even when using makeshift weaponry, the “Mad Minute” technique enables Schocktruppen to spray bullets over anything that moves while holding firm in their positions.'),
						description: [
							_('Ability • If you have not yet moved this turn, add one die to any attack roll made with an Automatic Weapon. (This includes overwatch attacks.)')
						]
					},
					'MAUSER C96': {
						lore: _('In 43 years of service, the C96 “Conehammer” has been notably improved with a 9.63mm barrel, a new extractor assembly, and a double-cartridge bullet case.'),
						description: [
							_('Weapon, Pistol')
						]
					},
					'MP40': {
						lore: _('A very reliable weapon, the MP40’s retractable metal shoulder brace also makes it extremely practical to transport. Over six million units have been manufactured. It is the standard weapon of the Empire.'),
						description: [
							_('Weapon, Automatic')
						]
					},
					'NOT DEAD YET': {
						lore: _('The Chasm of Achrakat is infested with Inferior Demons of the Fall. Their followers who are killed in combat are immediately possessed by occult spirits who command their bodies to rise again.'),
						description: [
							_('Ability • Once per game, when you die, you re-enter play on the following turn as a reinforcement would (at no Command Point cost), but with only Demon Taint in your inventory.')
						]
					},
					'OBERLEUTNANT': {
						lore: _('Lieutenants are either young officers in training or older, experienced field staff who have been promoted thanks to an aptitude for command.'),
						description: [
							_('Rank • Add +3 to your side’s Initiative Rolls.')
						]
					},
					'PATMOS AMULET': {
						lore: _('Dating to the very origins of humanity, this occult object – which shared the destiny of St. John – is the key to opening the Obscura Cardinal Cornerstone beneath Castle Ksiaz'),
						description: [
							_('Occult • As an action, engage in a Mental duel with any target within (your Mental value + 1). This target may be out-of-path. If you win, the target immediately attacks the closest character to him, friend or foe, with your choice of his Weapons.'),
							_('This attack may not use Mental Weapons. If multiple characters are equally close, you choose among them. If there are no available targets to attack, no attack is made, just the movement. After this attack, the target moves its full normal complement of movement points (or as many as possible) away from you through circles of your choice, and may not be activated for the rest of the turn')
						]
					},
					'RINGKRAGEN': {
						lore: _('This military police insignia is a symbol of authority, discipline, and loyalty to the Emperor. It is awarded to Kopfjägers who maintain order among the troops of the Reich.'),
						description: [
							_('Medal • Add one die to attacks made with Doom.')
						]
					},
					'SHA-NA-RA': {
						lore: _('This skull of pure quartz was discovered in the ruins of a Mayan temple in 1924 by the Union explorer Frederick Albert Mitchell-Hedges. A guardian of the sacred fire, it was used in mysterious rituals over 3,600 years ago.'),
						description: [
							_('Occult, Mental • As an action, once per game, engage in a Mental duel with any target within (your Mental value + 1). This target may be out-of-path. If you win, the target suffers automatic wounds equal to the number of your uncanceled successes in the duel.'),
							_('Turn this equipment token facedown when you do this, as a reminder that it has been used.')
						]
					},
					'STIELHANDGRENATE': {
						lore: _('These grenades’ wooden handles inspired the Union troops to nickname the stielhandgranate the “potato masher.”'),
						description: [
							_('Grenade')
						]
					},
					'STRAFE': {
						lore: _('“Strafe” is the nickname Eva has given to her weapon of choice, a whip into which fine, razor-sharp blades have been directly woven. Like Eva, it’s as beautiful as it is deadly.'),
						description: [
							_('Weapon, Hand-to-Hand • When attacking with this weapon, you may choose an adjacent target (as usual) or a target at range 2. When attacking with Strafe, add one additional die to your attack roll. Additionally, if you roll at least one Natural 10 on your attack roll, the target rolls two fewer dice when making his Shock Roll')
						]
					},
					'SUPERNATURAL STRENGTH': {
						lore: _('In spite of its legendary power, the Sacre Nosfero demon was thrown back into the netherworlds by St. Matthew of Briac during the first crusade for Jerusalem. The demon’s mark transforms the blood of his followers into a blackened and viscous substance that doubles their muscular force.'),
						description: [
							_('Ability • Always use your best Stamina value when making shock rolls.')
						]
					},
					'WALTHER P.38': {
						lore: _('This semi-automatic pistol first came off the assembly lines in 1939, and soon became the standard issue for Reich officers.'),
						description: [
							_('Weapon, Pistol')
						]
					}
				},
				Union: {
					'BA-27': {
						lore: _('The energy requirements of Ilirium-powered equipment pushed Union engineers to develop the BA-27 battery line, capable of absorbing resistance surges when condensers are coupled in series.'),
						description: [
							_('Hardware • When attacking with the Flash Machine Gun A6a, add one additional die to your attack roll.')
						]
					},
					'BG-42': {
						lore: _('A vest embedded with plates of Illirium. When the vest is hit by a bullet, a battery-powered counter-flux field activates at the entry point, stopping the projectile cold.'),
						description: [
							_('Hardware • If you roll a Natural 10 on any shock roll to resist an attack with a Pistol Weapon or Automatic Weapon, all attack roll successes are canceled')
						]
					},
					'CAPTAIN': {
						lore: _('Captains are hardy officers, born to command. Leading from the front line, their initiative and experience often decide the outcome of a battle.'),
						description: [
							_('Rank • Add +4 to your side’s Initiative Rolls.')
						]
					},
					'COLT .45 1911 A1': {
						lore: _('Many versions of this workhorse sidearm of the Union military have been manufactured over the years. The 1911 A1 is simply the latest in a long and successful line.'),
						description: [
							_('Weapon, Pistol')
						]
					},
					'COMBAT INFANTRY BADGE': {
						lore: _('The Combat Infantry Badge is awarded to soldiers whose performance under fire is considered exemplary.'),
						description: [
							_('Medal • When attacking, you may re-roll your lowest two dice, including Natural 1s.')
						]
					},
					'CORPORAL': {
						lore: _('After a few military operations, first-class soldiers are often promoted to Corporal, the lowest officer rank in the Union armed forces.'),
						description: [
							_('Rank • Add +1 to your side’s Initiative Rolls.')
						]
					},
					'EXPERT INFANTRY BADGE': {
						lore: _('The Expert Infantry Badge is awarded to officers and soldiers for spectacular performance in their physical exams.'),
						description: [
							_('Medal • Each Natural 10 you roll on a Shock Roll negates two wounds (rather than only one).')
						]
					},
					'EXTRA AMMUNITION': {
						lore: _('Veteran soldiers carry spare bullets wherever they can stash them – in clipped-on pouches, on specially designed belts, or even loose in their pockets – because sometimes a few extra rounds mark the difference between life and death.'),
						description: [
							_('Hardware • Discard this token at any time during your activation to make an attack. This attack does not require an action.')
						]
					},
					'FIRST AID KIT': {
						lore: _('Given the shortage of field hospitals behind enemy lines, prudent operatives carry the means to treat their own wounds.'),
						description: [
							_('Hardware • As an action, discard this token to dial up your health indicator token, or an adjacent character’s health indicator token, by up to two rows.')
						]
					},
					'FLASH MACHINE GUN A6A': {
						lore: _('The thick casing of this experimental weapon was inspired by the design of the Browning A6 and hides a battery of sophisticated accumulators. Its impressive rate of fire is fed by a semi-rigid 1,500 round ammo chain.'),
						description: [
							_('Weapon, Automatic, Heavy • When attacking with this weapon, you may choose two adjacent targets you could normally target. Apply the same attack roll to both targets (however, each target makes a separate shock roll). In addition, when attacking with this weapon, if you roll at least one Natural 10 on your attack roll, roll two additional dice and add their results to the attack roll.')
						]
					},
					'FLASH-GUN MK1': {
						lore: _('A prototype constructed from the pieces of several standard Union weapons coupled to a battery-powered propulsion unit that kicks in when the weapon is fired, this weapon shoots high-velocity rounds capable of piercing even the strongest armor.'),
						description: [
							_('Weapon, Automatic • When attacking with this weapon, if you roll at least one Natural 10 on your attack roll, roll two additional dice and add their results to the attack roll. You may only use this ability once per attack.')
						]
					},
					'GO! GO! GO!': {
						lore: _('This gutsy technique for advancing on enemy positions was improvised on the battlefield before it was taught to soldiers in boot camps across the Union.'),
						description: [
							_('Ability • At the beginning of your activation (before any movement or actions), you may receive 3 extra movement points this activation, but may not use your action to attack.')
						]
					},
					'INCREDIBLE STRENGTH': {
						lore: _('Many soldiers graduating from the training camps of the Marine Destruction Squad continue with an intense daily exercise regimen.'),
						description: [
							_('Ability • Always use your best Stamina value when making shock rolls.')
						]
					},
					'KEEP MOVING': {
						lore: _('The soldiers of the Marine Special Forces train by making incessant forced marches on the most hazardous terrain imaginable and, in so doing, learn to slog through anything.'),
						description: [
							_('Ability • Ignore one point of penalty from each movement modifier circle you enter.')
						]
					},
					'KNIFE': {
						lore: _('Knives of every stripe and sort find their way onto the battlefields of the Great War, from hunting knives to kitchen cleavers.'),
						description: [
							_('Weapon, Hand-to-Hand')
						]
					},
					'M3': {
						lore: _('The M3 submachine gun is fed by a 30-round magazine and functions without an arming lever. Its peculiar shape inspired its most popular nickname, the “Grease Gun.”'),
						description: [
							_('Weapon, Automatic')
						]
					},
					'M15': {
						lore: _('A white phosphor charge contained in a steel cylinder casing with an M6 A3 firing pin, this grenade’s thick smoke blocks enemy sight-lines and permits safe, speedy advancement on the battlefield.'),
						description: [
							_('Smoke Grenade')
						]
					},
					'MEDAL OF HONOR': {
						lore: _('Since its inception on December 12th, 1861, this decoration has been the Union’s highest military distinction. Congress honored MacNeal with the medal for extreme bravery in battle, when he risked his life above and beyond the requirements of duty during the attack on the island of Lampadosa.'),
						description: [
							_('Once per game, as an action, discard this token to place your character on overwatch without spending a Command Point.')
						]
					},
					'MKII A1': {
						lore: _('When a MKII A1 fragmentation grenade explodes, it discharges hundreds of lethal metal shards over a wide area.'),
						description: [
							_('Grenade')
						]
					},
					'MORPHINE SHOT': {
						lore: _('This little metal tube, complete with a pre-sterilized needle, is standard-issue equipment for Union airborne regiments. The morphine within instantly soothes pain, facilitating the intervention of field medical personnel.'),
						description: [
							_('Hardware • The Morphine Shot, once activated, cancels all wounds dealt to you by the next attack. To activate, as an action flip this token facedown; leave it on your character sheet but move it out of its equipment slot – it is no longer considered part of your inventory.'),
							_('Alternately, you may flip this token facedown as an action and move it onto the character sheet of an adjacent character, where it is considered activated and not considered to be in inventory.')
						]
					},
					'NIGHTEYES': {
						lore: _('This HB-4 Modified Vision Helmet is a prototype constructed with a lens salvaged from a mysterious machine discovered in New Mexico.'),
						description: [
							_('Hardware • You ignore the effects of smoke, and you add +2 to any single ranged attack die rolled each time you attack. (Choose which die to increase after the roll. This bonus cannot make a die result into a Natural 10.)')
						]
					},
					'REISING M50': {
						lore: _('Issued to help compensate for a shortage of Thompson M1A1s, the M50 is found mostly on the South Pacific Front, notably at Guadalcanal. The M55 – a newer model with a retractable brace – is currently on the assembly lines for the airborne troops.'),
						description: [
							_('Weapon, Automatic')
						]
					},
					'SERGEANT': {
						lore: _('Sergeants are low-ranking Union staff officers who have clawed their way up from mud and grit to serve as both leaders and mentors for new recruits. Without exception, each has tremendous combat experience.'),
						description: [
							_('Rank • Add +2 to your side’s Initiative Rolls.')
						]
					},
					'SILVER STAR': {
						lore: _('Created on July 9th, 1918, the Star Citation became a medal on August 3rd, 1932. It is given to acknowledge acts of extreme bravery in the face of the enemy.'),
						description: [
							_('Medal • Discard this token to add 2 Command Points to your side’s pool once per game.')
						]
					},
					'SMITH & WESSON 1917': {
						lore: _('A double-action revolver in production since 1917.'),
						description: [
							_('Weapon, Pistol')
						]
					},
					'TNT 440GR': {
						lore: _('“Non-regulation explosives” is the way the Union Engineering Corps arrest records usually refer to them.'),
						description: [
							_('Grenade • When used as a Grenade, TNT 440gr inflicts 5 (rather than 4) automatic attack successes and leaves a double-icon (rather than single-icon) rubble token behind.'),
							_('Alternately, as an action, you may place this token on your current circle. Then, in any of your later activations, you may spend an action to detonate it, dealing damage in that location as above and eliminating the token.'),
							_('If placed in this way any character with the Engineering skill can pick this equipment up and use it as a Grenade, with the increased effects described above. Only Tala may place it, and it may not be destroyed except by Tala detonating it or by it exploding when used as a grenade. This token does not block movement.'),
							_('Turn this equipment token facedown when you use it, as a reminder that it has been used.')
						]
					}
				}
			};
//
			new dijit.Tooltip({connectId: "ebd-body", selector: ".TANNtoken[data-faction='Reich'],.TANNtoken[data-faction='Unit']", showDelay: 1000, hideDelay: 250, getContent: (node) => this.pack(node.dataset.faction, '', node.dataset.type)});
		},
		pack: function (faction, pack, type)
		{
			let html = `<div class='TANNpack' style='width:250px' data-faction='${faction}' data-pack='${pack}'>`;
//
			html += `<div class='TANNpack-title'>${type}</div>`;
			html += `<div style='display:flex';>`;
			html += `<div style='flex: 1 1 40%;margin:5px;' class='TANNtoken' data-faction='${faction}' data-type='${type}'></div>`;
			html += `<div style='flex: 1 1 60%;margin:5px;' class='TANNpack-lore'>${this.PACKS[faction][type].lore}</div>`;
			html += `</div>`;
//
			for (let description of this.PACKS[faction][type].description) html += `<div class='TANNpack-description'>${description}</div>`;
//
			html += `</div>`;
//
			return html;
		},
		place: function (token)
		{
			console.log('place', token);
//
			if (isNaN(token.location))
			{
				const container = document.querySelector(`.TANNsheet[data-name='${token.location}']`, 'game_play_area');
				const node = dojo.place(`<div id='TANNtoken-${token.id}' class='TANNtoken' data-id='${token.id}' data-faction='${token.faction}' data-type='${token.type}' data-location='${token.location}'></div>`, container);
			}
			else
			{
				const container = 'TANNbackground';
				const node = dojo.place(`<div id='TANNtoken-${token.id}' class='TANNtoken' data-id='${token.id}' data-faction='neutral' data-type='${token.type}' data-location='${token.location}'></div>`, container);
				dojo.style(node, 'left', `${CIRCLES[token.location][0] - 2.5}%`);
				dojo.style(node, 'top', `${CIRCLES[token.location][1] - 2.5}%`);
//
				dojo.connect(node, 'click', (event) =>
				{
					dojo.stopEvent(event);
					if (dojo.hasClass(event.currentTarget, 'TANNselectable'))
					{
						dojo.query('.TANNselected').removeClass('TANNselected');
						dojo.toggleClass(event.currentTarget, 'TANNselected');
					}
				});
			}
		}
	}
	);
});
