<?php
/**
 *
 * @author Lunalol
 */

namespace Bga\Games\Tannhauser;

trait gameUtils
{
	function initiative($faction)
	{
		$bonus = 0;
//
		$equipment = Tokens::getEquipmentFromFaction($faction);
//
// GENERALLEUTNANT : Rank • Add +4 to your side’s Initiative Rolls.
//
		if (in_array('GENERALLEUTNANT', $equipment))
		{
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', clienttranslate('${TOKEN} +4 Initiative Rolls'), ['preserve' => ['faction'], 'faction' => $faction, 'TOKEN' => 'GENERALLEUTNANT']);
//* -------------------------------------------------------------------------------------------------------- */
			$bonus += 4;
		}
//
// OBERLEUTNANT : Rank • Add +3 to your side’s Initiative Rolls.
//
		if (in_array('OBERLEUTNANT', $equipment))
		{
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', clienttranslate('${TOKEN} +3 Initiative Rolls'), ['preserve' => ['faction'], 'faction' => $faction, 'TOKEN' => 'OBERLEUTNANT']);
//* -------------------------------------------------------------------------------------------------------- */
			$bonus += 3;
		}
//
// CAPTAIN : Rank • Add +4 to your side’s Initiative Rolls.
//
		if (in_array('CAPTAIN', $equipment))
		{
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', clienttranslate('${TOKEN} +4 Initiative Rolls'), ['preserve' => ['faction'], 'faction' => $faction, 'TOKEN' => 'CAPTAIN']);
//* -------------------------------------------------------------------------------------------------------- */
			$bonus += 4;
		}
//
// SERGEANT : Rank • Add +2 to your side’s Initiative Rolls.
//
		if (in_array('SERGEANT', $equipment))
		{
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', clienttranslate('${TOKEN} +2 Initiative Rolls'), ['preserve' => ['faction'], 'faction' => $faction, 'TOKEN' => 'SERGEANT']);
//* -------------------------------------------------------------------------------------------------------- */
			$bonus += 2;
		}
//
// CORPORAL : Rank • Add +1 to your side’s Initiative Rolls.
//
		if (in_array('CORPORAL', $equipment))
		{
//* -------------------------------------------------------------------------------------------------------- */
			self::notifyAllPlayers('msg', clienttranslate('${TOKEN} +1 Initiative Rolls'), ['preserve' => ['faction'], 'faction' => $faction, 'TOKEN' => 'CORPORAL']);
//* -------------------------------------------------------------------------------------------------------- */
			$bonus += 1;
		}
//
		return $bonus;
	}
	function entryPoints(string $map): void
	{
		foreach (Board::MAPS[$map] as $location => $type)
		{
			switch ($type)
			{
//
				case 'ENTRY_POINT_E':
				case 'ENTRY_POINT_N':
				case 'ENTRY_POINT_S':
				case 'ENTRY_POINT_W':
//* -------------------------------------------------------------------------------------------------------- */
					self::notifyAllPlayers('placeToken', '', ['token' => Tokens::get(Tokens::create('neutral', $type, $location))]);
//* -------------------------------------------------------------------------------------------------------- */
					break;
//
				case 'COMBAT':
				case 'MOVEMENT':
				case 'STAMINA':
				default:
//* -------------------------------------------------------------------------------------------------------- */
					self::notifyAllPlayers('placeToken', '', ['token' => Tokens::get(Tokens::create('neutral', $type, $location))]);
//* -------------------------------------------------------------------------------------------------------- */
					break;
			}
		}
	}
}
