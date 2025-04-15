<?php
/**
 *
 * @author Lunalol - PERRIN Jean-Luc
 *
 */

namespace Bga\Games\Tannhauser;

class Tokens extends \APP_GameClass
{
	static function create(string $faction, string $type, string $location): int
	{
		self::DbQuery("INSERT INTO tokens (faction,type,location) VALUES ('$faction','$type','$location')");
		return self::DbGetLastId();
	}
	static function getAllDatas(): array
	{
		return self::getCollectionFromDB("SELECT * FROM tokens");
	}
	static function get(int $id): array
	{
		return self::getObjectListFromDB("SELECT * FROM tokens WHERE id = $id")[0];
	}
	static function getAtLocation(string $location): array
	{
		return self::getObjectListFromDB("SELECT * FROM tokens WHERE location = '$location'");
	}
	static function getEquipmentFromFaction(string $faction): array
	{
		return self::getObjectListFromDB("SELECT type FROM tokens JOIN characters ON tokens.location = characters.name WHERE characters.faction = '$faction'", true);
	}
	static function getEntryPoints(): array
	{
		return self::getObjectListFromDB("SELECT id FROM tokens WHERE type LIKE 'ENTRY\_POINT\__'", true);
	}
}
