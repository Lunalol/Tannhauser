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
		return self::getCollectionFromDB("SELECT faction,player_id FROM factions", true);
	}
	static function getAll(): array
	{
		return self::getObjectListFromDB("SELECT faction FROM factions", true);
	}
	static function getPlayer(string $faction): int
	{
		return (int) self::getUniqueValueFromDB("SELECT player_id FROM factions WHERE faction = '$faction'");
	}
	static function activation(string|null $faction = null, string|null $state = null)
	{
		$DB = "UPDATE factions SET activation = " . ($state ? "'$state'" : "'no'");
		if ($faction) $DB .= " WHERE faction = '$faction'";
		self::dBQuery($DB);
	}
	static function getCP(string $faction): int
	{
		return (int) self::getUniqueValueFromDB("SELECT CP FROM factions WHERE faction = '$faction'");
	}
	static function setCP(string $faction, int $CP): void
	{
		self::dBQuery("UPDATE factions SET CP = $CP WHERE faction = '$faction'");
	}
	static function incCP(string $faction, int $delta): void
	{
		self::dBQuery("UPDATE factions SET CP = CP + $delta WHERE faction = '$faction'");
	}
}
