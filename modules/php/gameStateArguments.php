<?php
/**
 *
 * @author Lunalol - PERRIN Jean-Luc
 *
 */

namespace Bga\Games\Tannhauser;

trait gameStateArguments
{
	function argChoosePacks()
	{
		$this->possible = [];
		foreach (Characters::getAllDatas() as $id => $character) $this->possible['_private'][Factions::getPlayer($character['faction'])]['packs'][$id] = Characters::CHARACTERS[$character['name']];
//
		return $this->possible;
	}
	function argSelectEntryPoint()
	{
		$this->globals->set('entryPoints', []);
		$this->possible = Tokens::getEntryPoints();

		return ['entryPoints' => $this->possible];
	}
}
