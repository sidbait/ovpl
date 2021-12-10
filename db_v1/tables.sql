CREATE TABLE `teams` (
  `team_id` INT(11) NOT NULL AUTO_INCREMENT,
  `team_name` VARCHAR(100) NOT NULL,
  `team_owner` VARCHAR(100) NOT NULL,
  `team_motto` VARCHAR(255) NOT NULL,
  `status` SMALLINT DEFAULT 2,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`team_id`),
  UNIQUE KEY `team_name` (`team_name`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;

CREATE TABLE `players` (
  `player_id` INT(11) NOT NULL AUTO_INCREMENT,
  `team_id` INT(11),
  `player_name` VARCHAR(100) NOT NULL,
  `bat` VARCHAR(50) NOT NULL,
  `bowl` VARCHAR(50) NOT NULL,
  `wicket` TINYINT NOT NULL DEFAULT 0,
  `captain` TINYINT NOT NULL DEFAULT 0,
  `status` SMALLINT DEFAULT 2,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_id`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;

CREATE TABLE `tournaments` (
  `tournament_id` INT(11) NOT NULL AUTO_INCREMENT,
  `tournament_name` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NOT NULL,
  `duration` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tournament_id`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;

CREATE TABLE `matches` (
  `match_id` INT(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` INT(11) NOT NULL,
  `team_1` INT(11) NOT NULL,
  `team_2` INT(11) NOT NULL,
  `toss_won` INT(11) NOT NULL,
  `toss_decision` VARCHAR(50) NOT NULL,
  `wickets_per_inn` INT(11) NOT NULL,
  `overs_per_inn` INT(11) NOT NULL,
  `max_overs_bowler` INT(11),
  `mom` INT(11),
  `label` VARCHAR(255) NOT NULL,
  `status` SMALLINT DEFAULT 2,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`match_id`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;

CREATE TABLE `overs` (
  `over_id` BIGINT NOT NULL AUTO_INCREMENT,
  `match_id` INT(11) NOT NULL,
  `inning` TINYINT NOT NULL,
  `over_no`  INT(11) NOT NULL,
  `is_super_over` TINYINT NOT NULL,
  `status` SMALLINT DEFAULT 2,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`over_id`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;

CREATE TABLE `ball_by_ball` (
  `ball_id` INT(11) NOT NULL AUTO_INCREMENT,
  `over_id` BIGINT NOT NULL,
  `batsman` INT(11) NOT NULL,
  `bowler` INT(11) NOT NULL,
  `runs` INT(11) NOT NULL,
  `wicket` INT(11) NOT NULL,
  `caught` VARCHAR(100) NOT NULL,
  `runout` VARCHAR(50) NOT NULL,
  `noball` INT(11) NOT NULL,
  `wide` INT(11) NOT NULL,
  `status` SMALLINT DEFAULT 2,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ball_id`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;