<?php
/**
 *
 * @author Lunalol - PERRIN Jean-Luc
 *
 */

namespace Bga\Games\Tannhauser;

use \Bga\GameFramework\Actions\CheckAction;
use Bga\GameFramework\Actions\Types\BoolParam;
use Bga\GameFramework\Actions\Types\StringParam;
use Bga\GameFramework\Actions\Types\IntParam;
use Bga\GameFramework\Actions\Types\JsonParam;

trait gameStateActions
{
	#[CheckAction(false)] function actCancel()
	{
		$player_id = intval(self::getCurrentPlayerId());
		$this->gamestate->setPlayersMultiactive([$player_id], null);
	}
	function actChoosePacks(#[StringParam] string $faction, #[JsonParam] array $packs)
	{
		$player_id = intval(self::getCurrentPlayerId());
//
		if (Factions::getPlayer($faction) !== $player_id) throw new \BgaVisibleSystemException("Invalid player_id: $player_id");
		if (sizeof($this->possible['_private'][$player_id]['packs']) !== sizeof($packs)) throw new \BgaVisibleSystemException("Invalid packs");
//
		$equipment = [];
		foreach ($packs as $id => $pack)
		{
			$character = Characters::get($id);
			if (!$character) throw new \BgaVisibleSystemException("Invalid character: $id");
			if ($character['faction'] !== $faction) throw new \BgaVisibleSystemException("Invalid character faction: $character[faction]");
			if (!array_key_exists($pack, Characters::CHARACTERS[$character['name']])) throw new \BgaVisibleSystemException("Invalid character pack: $pack");
//
			$equipment[$id] = Characters::CHARACTERS[$character['name']][$pack];
			$equipment[$id][] = Characters::CHARACTERS[$character['name']]['SPECIAL OBJECT'];
//
		}
		$this->globals->set($faction, $equipment);
//
		$this->gamestate->setPlayerNonMultiactive($player_id, 'continue');
	}
	function actReroll(#[StringParam] string $faction, #[BoolParam] bool $reroll)
	{
		$player_id = intval(self::getCurrentPlayerId());
//
		if (Factions::getPlayer($faction) !== $player_id) throw new \BgaVisibleSystemException("Invalid player_id: $player_id");
//
		if ($reroll)
		{
			while (true)
			{
				$die = bga_rand(1, 10);
				$bonus = self::initiative($faction);
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', clienttranslate('<B>${FACTION}</B> rolls ${DIE} + ${BONUS} = ${RESULT}'), [
					'FACTION' => $faction, 'DIE' => $die, 'BONUS' => $bonus, 'RESULT' => $die + $bonus]);
//* -------------------------------------------------------------------------------------------------------- */
				$this->globals->set($faction, $die + $bonus);
				if ($this->globals->get('Reich') !== $this->globals->get('Union')) break;
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', clienttranslate('It is a tie, die will be rolled again...'), []);
//* -------------------------------------------------------------------------------------------------------- */
			}
		}
		self::sendNotifications();
		$this->gamestate->nextState('continue');
	}
	function actSelectEntryPoint(#[StringParam] string $faction, #[IntParam] int $entryPoint)
	{
		$player_id = intval(self::getCurrentPlayerId());
//
		if (Factions::getPlayer($faction) !== $player_id) throw new \BgaVisibleSystemException("Invalid player_id: $player_id");
		if (!in_array($entryPoint, $this->possible)) throw new \BgaVisibleSystemException("Invalid entry point: $entryPoint");
//
		$entryPoints = $this->globals->get('entryPoints');
		$entryPoints[$faction] = $entryPoint;
		$this->globals->set('entryPoints', $entryPoints);
//
		Factions::activation($faction, 'do');
	}
}
