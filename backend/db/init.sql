CREATE DATABASE IF NOT EXISTS `app`;
USE `app`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(40) NOT NULL,
    `firstname` varchar(40) NOT NULL,
    `lastname` varchar(40) NOT NULL,
    `hash` varchar(256) NOT NULL,
    `role` varchar(40) NOT NULL,
    PRIMARY KEY(`id`, `email`)
);

CREATE TABLE `sightings` (
    `sightingid` int(11) NOT NULL AUTO_INCREMENT,
    `reporterid` int(11) NOT NULL,
    `reportername` varchar(40) NOT NULL,
    `reporteremail` varchar(40) NOT NULL,
    `ghostid` int(11) NOT NULL,
    `ghostname` varchar(50) NOT NULL,
    `month` int NOT NULL,
    `year` int NOT NULL,
    `day` int NOT NULL,
    `location` varchar(100) NOT NULL,
    `title` varchar(40) NOT NULL,
    `description` varchar(2000) NOT NULL,
    `imageurl` varchar(100) NOT NULL,
    PRIMARY KEY(`sightingid`)
);

CREATE TABLE `exorcistreviews` (
    `reviewid` int(11) NOT NULL AUTO_INCREMENT,
    `exorcistid` int(11) NOT NULL,
    `reviewerid` int(11) NOT NULL,
    `rating` int(2) NOT NULL,
    PRIMARY KEY(`reviewid`)
);
