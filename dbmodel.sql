CREATE TABLE IF NOT EXISTS `factions` (
	`faction` ENUM ('Reich','Union'), `player_id` INT(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `characters` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
	`faction` ENUM ('Reich','Union'), `name` VARCHAR(50), `location` VARCHAR(50) DEFAULT 'off'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `tokens` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `faction` ENUM ('Reich','Union'), `type` VARCHAR(50), `location` VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
