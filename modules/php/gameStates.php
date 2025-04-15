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
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('1. CHOOSE MODE OF PLAY')]);
//* -------------------------------------------------------------------------------------------------------- */
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
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', clienttranslate('<B>Deathmatch mode</B> is in play'), []);
//* -------------------------------------------------------------------------------------------------------- */
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Modes of Play');
		}
//
		$this->gamestate->nextState('continue');
	}
	function stFactions()
	{
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('2. CHOOSE FACTIONS')]);
//* -------------------------------------------------------------------------------------------------------- */
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
//* -------------------------------------------------------------------------------------------------------- */
		foreach (Factions::getAllDatas() as $faction => $player_id) self::notifyAllPlayers('msg', clienttranslate('${player_name} will play <B>${FACTION}</B>'), ['player_name' => self::getPlayerNameById($player_id), 'FACTION' => $faction]);
//* -------------------------------------------------------------------------------------------------------- */
		$this->gamestate->nextState('continue');
	}
	function stMap()
	{
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('3. CHOOSE MAP')]);
//* -------------------------------------------------------------------------------------------------------- */
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
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', clienttranslate('<B>Castle Ksiaz</B> map is used'), []);
//* -------------------------------------------------------------------------------------------------------- */
				break;
//
			case 1: // Catacombs
//
				$this->globals->set('map', 'Catacombs');
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', clienttranslate('<B>Catacombs beneath the castle</B> map is used'), []);
//* -------------------------------------------------------------------------------------------------------- */
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Map');
		}
//
		$this->gamestate->nextState('continue');
	}
	function stCharacters()
	{
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('4. CHOOSE CHARACTERS')]);
//* -------------------------------------------------------------------------------------------------------- */
//
// Each player chooses characters to control from among those available.
// Each player controls five characters (although some scenarios may change this number), and must choose them according to the following restrictions:
// • Each team is comprised of three Heroes and two Troopers
// • All characters chosen must be from the same faction (excluding Mercenaries; see below).
//
		foreach (Characters::REICH as $character) Characters::create($character, 'Reich');
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', clienttranslate('<B>${faction}</B> recruits:<HR>${CHARACTERS}<HR>'), ['faction' => 'Reich', 'CHARACTERS' => Characters::REICH]);
//* ------------------------------------------------------------------------------------------------------- */
		foreach (Characters::UNION as $character) Characters::create($character, 'Union');
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', clienttranslate('<B>${faction}</B> recruits:<HR>${CHARACTERS}<HR>'), ['faction' => 'Union', 'CHARACTERS' => Characters::UNION]);
//* -------------------------------------------------------------------------------------------------------- */
//
		$this->gamestate->nextState('continue');
	}
	function stPacks()
	{
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('5. CHOOSE PACKS')]);
//* -------------------------------------------------------------------------------------------------------- */
//
// Each player chooses one equipment pack (combat, stamina, each or command) for each of his characters individually,
// and fills that character’s equipment slots with the corresponding equipment tokens facedown.
// Once both players have chosen a pack for each of his characters, the tokens are flipped faceup.
//
		$this->gamestate->setAllPlayersMultiactive();
		$this->gamestate->nextState('continue');
	}
	function StPacksReveal()
	{
		foreach (Factions::getAll() as $faction)
		{
			foreach ($this->globals->get($faction) as $id => $equipment)
			{
				$character = Characters::get($id);
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', '${CHARACTER} ⇐ ${TOKENS}', ['preserve' => ['faction'], 'faction' => $faction, 'CHARACTER' => $character['name'], 'TOKENS' => $equipment]);
//* -------------------------------------------------------------------------------------------------------- */
				foreach ($equipment as $type) self::notifyAllPlayers('placeToken', '', ['token' => Tokens::get(Tokens::create($faction, $type, $character['name']))]);
//* -------------------------------------------------------------------------------------------------------- */
			}
			$this->globals->delete($faction);
		}
		$this->gamestate->nextState('continue');
	}
	function stBonus()
	{
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('6. CHOOSE BONUS')]);
//* -------------------------------------------------------------------------------------------------------- */
		$this->gamestate->nextState('continue');
	}
	function stSetUpRolls()
	{
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNphase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('7. SELECTING ENTRY POINTS')]);
//* -------------------------------------------------------------------------------------------------------- */
		self::notifyAllPlayers('msg', '<span class="TANNsubPhase">${LOG}</span>', ['i18n' => ['LOG'], 'LOG' => clienttranslate('SETUP ROLLS')]);
//* -------------------------------------------------------------------------------------------------------- */
		while (true)
		{
			foreach (Factions::getAll() as $faction)
			{
				$die = bga_rand(1, 10);
				$bonus = self::initiative($faction);
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', clienttranslate('<B>${FACTION}</B> rolls ${DIE} + ${BONUS} = ${RESULT}'), [
					'FACTION' => $faction, 'DIE' => $die, 'BONUS' => $bonus, 'RESULT' => $die + $bonus]);
//* -------------------------------------------------------------------------------------------------------- */
				$this->globals->set($faction, $die + $bonus);
			}
			if ($this->globals->get('Reich') !== $this->globals->get('Union')) break;
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', clienttranslate('It is a tie, dice will be rolled again...'), []);
//* -------------------------------------------------------------------------------------------------------- */
		}
//
		if ($this->globals->get('Reich') < $this->globals->get('Union')) $this->gamestate->changeActivePlayer(Factions::getPlayer('Reich'));
		if ($this->globals->get('Reich') > $this->globals->get('Union')) $this->gamestate->changeActivePlayer(Factions::getPlayer('Union'));
//
		$this->gamestate->nextState('continue');
	}
	function stEntryPoints()
	{
		self::EntryPoints($this->globals->get('map'));
		self::sendNotifications();
//
		if ($this->globals->get('Reich') > $this->globals->get('Union')) $this->gamestate->changeActivePlayer(Factions::getPlayer('Reich'));
		if ($this->globals->get('Reich') < $this->globals->get('Union')) $this->gamestate->changeActivePlayer(Factions::getPlayer('Union'));
//
		$this->gamestate->nextState('continue');
	}
	function stModeSpecificSetup()
	{
		switch ($this->globals->get('mode'))
		{
//
			case 'deathmatch':
//
// Each player sets up his Command Point tokens to indicate that he has 2 Command Points.
//
				Factions::setCP('Reich', 2);
				Factions::setCP('Union', 2);
//
// Collect all available crate tokens depicting Command Points or equipment.
// Shuffle them facedown on the table or in a cup or unused box top.
// For each Action circle and Objective circle on the game board (see “Map Features” on page 15), randomly draw one of these tokens and place it facedown on the circle (crate icon side up), until each circle has a token.
//
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Modes of Play');
		}
//* -------------------------------------------------------------------------------------------------------- */
		foreach (Factions::getAll() as $faction) self::notifyAllPlayers('updateCP', '', ['CP' => Factions::getCP($faction)]);
//* -------------------------------------------------------------------------------------------------------- */
		$this->gamestate->nextState('continue');
	}
	function stStartOfTurn()
	{
		switch ($this->globals->get('mode'))
		{
//
			case 'deathmatch':
//
// Each player sets up his Command Point tokens to indicate that he has 2 Command Points.
//
				Factions::setCP('Reich', 2);
				Factions::setCP('Union', 2);
//
				break;
//
			default: throw new \BgaVisibleSystemException('INVALID GAME OPTION: Modes of Play');
		}
//* -------------------------------------------------------------------------------------------------------- */
		foreach (Factions::getAll() as $faction) self::notifyAllPlayers('updateCP', '', ['CP' => Factions::getCP($faction)]);
//* -------------------------------------------------------------------------------------------------------- */
	}
}
