<?php
/**
 *
 * @author Lunalol - PERRIN Jean-Luc
 *
 */

namespace Bga\Games\Tannhauser;

class Characters extends \APP_GameClass
{
	const CHARACTERS = [
		'Eva Krämer' => [
			'SPECIAL OBJECT' => 'STRAFE',
			'COMBAT PACK' => ['MAUSER C96', 'IRON CROSS 1ST CLASS', 'CRITICAL HIT'],
			'STAMINA PACK' => ['LUGER P-08', 'FIRST AID KIT', 'IRON CROSS 2ND CLASS'],
			'COMMAND PACK' => ['MAUSER C96', 'IRON CROSS 2ND CLASS', 'INFILTRATION'],
		],
		'Hermann Von Heïzinger' => [
			'SPECIAL OBJECT' => 'PATMOS AMULET',
			'COMBAT PACK' => ['WALTHER P.38', 'SHA-NA-RA', 'HERMETICA UMBRA'],
			'STAMINA PACK' => ['WALTHER P.38', 'EYE OF TAGES', 'HERMETICA ASTRA'],
			'COMMAND PACK' => ['WALTHER P.38', 'GENERALLEUTNANT', 'HERMETICA OCCULTA'],
		],
		'Karl Zermann' => [
			'SPECIAL OBJECT' => 'DOOM',
			'COMBAT PACK' => ['STIELHANDGRENATE', 'SUPERNATURAL STRENGTH', 'IMMUNITY TO PAIN'],
			'STAMINA PACK' => ['STIELHANDGRENATE', 'CELERITY', 'FIRST AID KIT'],
			'COMMAND PACK' => ['STIELHANDGRENATE', 'OBERLEUTNANT', 'RINGKRAGEN'],
		],
		'Schocktruppen' => [
			'SPECIAL OBJECT' => 'MAD MINUTE',
			'COMBAT PACK' => ['MP40', 'STIELHANDGRENATE', 'KEEP FIRING'],
			'STAMINA PACK' => ['MP40', 'EXTRA AMMUNITION', 'FIRST AID KIT'],
		],
		'Stosstruppen' => [
			'SPECIAL OBJECT' => 'DEMON TAINT',
			'COMBAT PACK' => ['COMBAT KNIFE', 'SUPERNATURAL STRENGTH', 'IMMUNITY TO PAIN'],
			'STAMINA PACK' => ['NOT DEAD YET', 'CELERITY', 'IMMUNITY TO PAIN'],
		],
		'John MacNeal' => [
			'SPECIAL OBJECT' => 'NIGHTEYES',
			'COMBAT PACK' => ['FLASH-GUN MK1', 'COMBAT INFANTRY BADGE', 'MEDAL OF HONOR'],
			'STAMINA PACK' => ['FLASH-GUN MK1', 'EXPERT INFANTRY BADGE', 'MEDAL OF HONOR'],
			'COMMAND PACK' => ['COLT .45 1911 A1', 'CAPTAIN', 'SILVER STAR'],
		],
		'Barry Daniel Brown' => [
			'SPECIAL OBJECT' => 'FLASH MACHINE GUN A6A',
			'COMBAT PACK' => ['KNIFE', 'BA-27', 'MKII A1'],
			'STAMINA PACK' => ['INCREDIBLE STRENGTH', 'BA-27', 'FIRST AID KIT'],
			'COMMAND PACK' => ['SMITH & WESSON 1917', 'SERGEANT', 'MKII A1'],
		],
		'Tala Aponi' => [
			'SPECIAL OBJECT' => 'TNT 440GR',
			'COMBAT PACK' => ['M3', 'M15', 'EXTRA AMMUNITION'],
			'STAMINA PACK' => ['SMITH & WESSON 1917', 'FIRST AID KIT', 'MORPHINE SHOT'],
			'COMMAND PACK' => ['SMITH & WESSON 1917', 'CORPORAL', 'M15'],
		],
		'Commando Alpha' => [
			'SPECIAL OBJECT' => 'KEEP MOVING',
			'COMBAT PACK' => ['FLASH-GUN MK1', 'MKII A1', 'M15'],
			'STAMINA PACK' => ['REISING M50', 'MKII A1', 'GO! GO! GO!'],
		],
		'Commando Delta' => [
			'SPECIAL OBJECT' => 'BG-42',
			'COMBAT PACK' => ['SMITH & WESSON 1917', 'KEEP MOVING', 'M15'],
			'STAMINA PACK' => ['SMITH & WESSON 1917', 'M15', 'GO! GO! GO!'],
		],
	];
//
	static function create(string $name, string $faction): int
	{
		self::DbQuery("INSERT INTO characters (faction,name) VALUES ('$faction','$name')");
		return self::DbGetLastId();
	}
	static function getAllDatas()
	{
		return self::getCollectionFromDB("SELECT * FROM characters ORDER BY faction");
	}
	static function get(int $id): array
	{
		return self::getObjectListFromDB("SELECT * FROM characters WHERE id = $id")[0];
	}
}
