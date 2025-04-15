<?php
/**
 *
 * @author Lunalol - PERRIN Jean-Luc
 *
 */
declare(strict_types=1);

namespace Bga\Games\Tannhauser;

require_once(APP_GAMEMODULE_PATH . "module/table/table.game.php");

class Game extends \Table
{
	use gameStates;
	use gameStateArguments;
	use gameStateActions;
	use gameUtils;

	public function __construct()
	{
		parent::__construct();
//
		$this->initGameStateLabels(['ModesOfPlay' => 100, 'Factions' => 105, 'Map' => 110,]);
	}
	public function getGameProgression()
	{
		return 0;
	}
	public function upgradeTableDb($from_version)
	{

	}
	protected function getAllDatas(): array
	{
		$player_id = (int) $this->getCurrentPlayerId();
//
		$result = [];
//
		$result["ADJACENCY"] = Board::ADJACENCY;
//
		$result["players"] = $this->getCollectionFromDb("SELECT `player_id` `id`, `player_score` `score` FROM `player`");
//
		$result["factions"] = Factions::getAllDatas();
		$result["characters"] = Characters::getAllDatas();
		$result["tokens"] = Tokens::getAllDatas();
//
		$result["map"] = $this->globals->get('map');
//
		return $result;
	}
	protected function getGameName()
	{
		return "tannhauser";
	}
	protected function setupNewGame($players, $options = [])
	{
		$gameinfos = $this->getGameinfos();
		$default_colors = $gameinfos['player_colors'];
//
		foreach ($players as $player_id => $player)
		{
			$query_values[] = vsprintf("('%s', '%s', '%s', '%s', '%s')", [
				$player_id, array_shift($default_colors), $player["player_canal"],
				addslashes($player["player_name"]), addslashes($player["player_avatar"]),
			]);
		}
//
		static::DbQuery(sprintf("INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES %s", implode(",", $query_values)));
//
		$this->reattributeColorsBasedOnPreferences($players, $gameinfos["player_colors"]);
		$this->reloadPlayersBasicInfos();
	}
	protected function getAdminPlayerID(): int
	{
		return (int) self::getUniqueValueFromDB("SELECT global_value FROM global WHERE global_id = 5");
	}
	protected function zombieTurn(array $state, int $active_player): void
	{
		$state_name = $state["name"];
		if ($state["type"] === "activeplayer")
		{
			switch ($state_name)
			{
				default:
					{
						$this->gamestate->nextState("zombiePass");
						break;
					}
			}
			return;
		}
		if ($state["type"] === "multipleactiveplayer")
		{
			$this->gamestate->setPlayerNonMultiactive($active_player, '');
			return;
		}
		throw new \feException("Zombie mode not supported at this game state: \"{$state_name}\".");
	}
}
