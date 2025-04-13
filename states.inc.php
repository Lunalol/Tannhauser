<?php
$machinestates = [
	1 =>
	[
		'name' => 'gameSetup',
		'description' => '',
		'type' => 'manager',
		'action' => 'stGameSetup',
		'transitions' => ['' => 10]
	],
// 1. CHOOSE MODE OF PLAY
	10 => [
		'name' => 'ModesOfPlay',
		'type' => 'game',
		'action' => 'stModesOfPlay',
		'transitions' => ['continue' => 20]
	],
// 2. CHOOSE FACTIONS
	20 => [
		'name' => 'Factions',
		'type' => 'game',
		'action' => 'stFactions',
		'transitions' => ['continue' => 30]
	],
// 3. CHOOSE MAP
	30 => [
		'name' => 'Map',
		'type' => 'game',
		'action' => 'stMap',
		'transitions' => ['continue' => 40]
	],
// 4. CHOOSE CHARACTERS
	40 => [
		'name' => 'Characters',
		'type' => 'game',
		'action' => 'stCharacters',
		'transitions' => ['continue' => 50]
	],
// 5. CHOOSE PACKS
	50 => [
		'name' => 'Packs',
		'type' => 'game',
		'action' => 'stPacks',
		'transitions' => ['continue' => 55]
	],
	55 => [
		'name' => 'ChoosePacks',
		'description' => clienttranslate('Players must choose one equipment pack for each of their characters'),
		'descriptionmyturn' => clienttranslate('${you} must choose one equipment pack for each of your characters'),
		'type' => 'multipleactiveplayer',
		'args' => 'argChoosePacks',
		'possibleactions' => ['actChoosePacks'],
		'transitions' => ['continue' => 60]
	],
// 6. CHOOSE BONUS TOKENS
	60 => [
		'name' => 'Bonus',
		'type' => 'game',
		'action' => 'stBonus',
		'transitions' => ['continue' => 70]
	],
// 7. SELECTING ENTRY POINTS
	70 => [
		'name' => 'EntryPoints',
		'type' => 'game',
		'action' => 'stEntryPoints',
		'transitions' => ['continue' => 80]
	],
// 8. MODE-SPECIFIC SETUP
	80 => [
		'name' => 'ModeSpecificSetup',
		'type' => 'game',
		'action' => 'stModeSpecificSetup',
		'transitions' => ['continue' => 100]
	],
	99 =>
	[
		'name' => 'gameEnd',
		'description' => clienttranslate('End of game'),
		'type' => 'manager',
		'action' => 'stGameEnd',
		'args' => 'argGameEnd'
	],
];
