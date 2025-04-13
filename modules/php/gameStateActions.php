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
	function actChoosePacks(#[StringParam] string $faction, #[JsonParam] array $packs)
	{
		$player_id = intval(self::getCurrentPlayerId());
//
		if (Factions::getPlayer($faction) !== $player_id) throw new \BgaVisibleSystemException("Invalid player_id: $player_id");
		if (sizeof($this->possible['_private'][$player_id]['packs']) !== sizeof($packs)) throw new \BgaVisibleSystemException("Invalid packs");
//
		foreach ($packs as $id => $pack)
		{
			$character = Characters::get($id);
			if (!$character) throw new \BgaVisibleSystemException("Invalid character: $id");
			if ($character['faction'] !== $faction) throw new \BgaVisibleSystemException("Invalid character faction: $character[faction]");
			if (!array_key_exists($pack, Characters::CHARACTERS[$character['name']])) throw new \BgaVisibleSystemException("Invalid character pack: $pack");
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', '<B>${CHARACTER}</B> gets ${TOKEN}', ['preserve' => ['faction'], 'faction' => $faction, 'CHARACTER' => $character['name'], 'TOKEN' => Characters::CHARACTERS[$character['name']]['SPECIAL OBJECT']]);
			self::notifyAllPlayers('placeToken', '', ['token' => Tokens::get(Tokens::create($faction, Characters::CHARACTERS[$character['name']]['SPECIAL OBJECT'], $character['name']))]);
//* -------------------------------------------------------------------------------------------------------- */
			foreach (Characters::CHARACTERS[$character['name']][$pack] as $objet)
			{
//* -------------------------------------------------------------------------------------------------------- */
				self::notifyAllPlayers('msg', '<B>${CHARACTER}</B> gets ${TOKEN}', ['preserve' => ['faction'], 'faction' => $faction, 'CHARACTER' => $character['name'], 'TOKEN' => $objet]);
				self::notifyAllPlayers('placeToken', '', ['token' => Tokens::get(Tokens::create($faction, $objet, $character['name']))]);
//* -------------------------------------------------------------------------------------------------------- */
			}
		}
//
//		$this->gamestate->setPlayerNonMultiactive($player_id, 'continue');
	}
}
