<?php
/**
 *
 * @author Lunalol - PERRIN Jean-Luc
 *
 */

namespace Bga\Games\Tannhauser;

class Factions extends \APP_GameClass
{
	static function create(string $faction, int $player_id): int
	{
		self::DbQuery("INSERT INTO factions (faction,player_id) VALUES ('$faction',$player_id)");
		return self::DbGetLastId();
	}
	static function getAllDatas(): array
	{
		return self::getCollectionFromDB("SELECT * FROM factions", true);
	}
	static function getPlayer(string $faction): int
	{
		return (int) self::getUniqueValueFromDB("SELECT player_id FROM factions WHERE faction = '$faction'");
	}
}
