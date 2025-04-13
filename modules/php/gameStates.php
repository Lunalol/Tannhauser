<?php
/**
 *
 * @author Lunalol
 */

namespace Bga\Games\Tannhauser;

trait gameStates
{
	function stModesOfPlay()
	{
//
// Both players agree on the mode of play for the game.
// There are six modes, described under “Modes of Play” on page 28.
// Unless stated otherwise, this rulebook assumes that you are playing deathmatch mode, which is the recommended mode of play for first time players.
//
		switch (self::getGameStateValue("ModesOfPlay"))
		{
//
			case 0: // Deathmatch mode
//
				$this->globals->set('mode', 'deathmatch');
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Modes of Play');
		}
//
		$this->gamestate->nextState('continue');
	}
	function stFactions()
	{
//
// Each player chooses which they wish to play.
// The FACTION core game includes two factions: Union and TANNHÄUSER Reich.
//
		switch (self::getGameStateValue("Factions"))
		{
//
			case 0: // Faction is randomly chosen
//
				$factions = ['Union', 'Reich'];
				shuffle($factions);
//
				foreach (array_keys(self::loadPlayersBasicInfos()) as $player_id) Factions::create(array_pop($factions), $player_id);
//
				break;
//
			case 1: // Table administrator will play Union
//
				foreach (array_keys(self::loadPlayersBasicInfos()) as $player_id)
				{
					if ($player_id === self::getAdminPlayerID()) Factions::create('Union', $player_id);
					else Factions::create('Reich', $player_id);
				}
//
				break;
//
			case 2: // Table administrator will play Reich
//
				foreach (array_keys(self::loadPlayersBasicInfos()) as $player_id)
				{
					if ($player_id === self::getAdminPlayerID()) Factions::create('Reich', $player_id);
					else Factions::create('Union', $player_id);
				}
//
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Factions');
		}
//
		$this->gamestate->nextState('continue');
	}
	function stMap()
	{
//
// Both players agree which map will be used.
// The TANNHÄUSER core game comes with two maps, Castle Ksiaz and the Catacombs beneath the castle.
//
		switch (self::getGameStateValue("Map"))
		{
//
			case 0: // Castle Ksiaz
//
				$this->globals->set('map', 'Castle');
				break;
//
			case 1: // Catacombs
//
				$this->globals->set('map', 'Catacombs');
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Map');
		}
//
		$this->gamestate->nextState('continue');
	}
	function stCharacters()
	{
//
// Each player chooses characters to control from among those available.
// Each player controls five characters (although some scenarios may change this number), and must choose them according to the following restrictions:
// • Each team is comprised of three Heroes and two Troopers
// • All characters chosen must be from the same faction (excluding Mercenaries; see below).
//
		Characters::create('Eva Krämer', 'Reich');
		Characters::create('Hermann Von Heïzinger', 'Reich');
		Characters::create('Karl Zermann', 'Reich');
		Characters::create('Schocktruppen', 'Reich');
		Characters::create('Stosstruppen', 'Reich');
//
		Characters::create('John MacNeal', 'Union');
		Characters::create('Barry Daniel Brown', 'Union');
		Characters::create('Tala Aponi', 'Union');
		Characters::create('Commando Alpha', 'Union');
		Characters::create('Commando Delta', 'Union');
//
		$this->gamestate->nextState('continue');
	}
	function stPacks()
	{
		$this->gamestate->setAllPlayersMultiactive();
//
		$this->gamestate->nextState('continue');
	}
	function stBonus()
	{
		$this->gamestate->nextState('continue');
	}
	function stEntryPoints()
	{
		$this->gamestate->nextState('continue');
	}
	function stModeSpecificSetup()
	{
//		$this->gamestate->nextState('continue');
	}
}
