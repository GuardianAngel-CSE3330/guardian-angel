CREATE DATABASE IF NOT EXISTS `app`;
USE `app`;

CREATE TABLE `roles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `role` varchar(40),
    PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `roles` (`role`) VALUES ("admin"), ("user"), ("exorcist");

CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(40) NOT NULL,
    `firstname` varchar(40) NOT NULL,
    `lastname` varchar(40) NOT NULL,
    `hash` varchar(256) NOT NULL,
    `roleid` int (11) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`roleid`) 
        REFERENCES `roles`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `exorcistreviews` (
    `reviewid` int(11) NOT NULL AUTO_INCREMENT,
    `exorcistid` int(11) NOT NULL,
    `reviewerid` int(11) NOT NULL,
    `rating` int(2) NOT NULL,
    PRIMARY KEY(`reviewid`),
    FOREIGN KEY (`exorcistid`)
        REFERENCES `users`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (`reviewerid`)
        REFERENCES `users`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `ghosts` (
    `ghostid` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(40) NOT NULL,
    `biography` varchar(2000),
    PRIMARY KEY(`ghostid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `sightings` (
    `sightingid` int(11) NOT NULL AUTO_INCREMENT,
    `reporterid` int(11) NOT NULL,
    `ghostid` int(11),
    `month` int(11) NOT NULL,
    `year` int(11) NOT NULL,
    `day` int(11) NOT NULL,
    `location` varchar(100) NOT NULL,
    `title` varchar(40) NOT NULL,
    `description` varchar(2000) NOT NULL,
    `imageurl` varchar(100),
    `spookiness` int(2),
    PRIMARY KEY (`sightingid`),
    FOREIGN KEY (`reporterid`)
        REFERENCES `users`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (`ghostid`)
        REFERENCES `ghosts` (`ghostid`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8;


