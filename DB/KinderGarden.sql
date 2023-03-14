DROP DATABASE IF EXISTS kinderGardenDB;
CREATE DATABASE kinderGardenDB;

USE `kinderGardenDB` ;
CREATE TABLE `Teacher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) not null,
  `lastName` varchar(20) not null,
  `isActive` boolean default true,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ClassTeacher` (
  `classId` int,
  `teacherId` int,
  PRIMARY KEY (`classId`, `teacherId`),
  FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`)
);

CREATE TABLE `inscription` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) not null,
  `lastName` varchar(20) not null,
  `phone` varchar(20) not null,
  `address` varchar(100) not null,
  `inscriptionDate` datetime not null,
  `openPlace` int,
  `status` varchar(10),
  PRIMARY KEY (`id`)
);

CREATE TABLE `class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(20) not null,
  `openDate` datetime not null,
  PRIMARY KEY (`id`)
);

CREATE TABLE `childRoster` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `classId` int,
  `firstName` varchar(20) not null,
  `lastName` varchar(20) not null,
  `inscriptionId` int,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`inscriptionId`) REFERENCES `inscription`(`id`),
  FOREIGN KEY (`classId`) REFERENCES `class`(`id`)
);

CREATE TABLE `News` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(100) not null,
  `issueDate` datetime not null,
  `picPath` varchar(100),
  `content` MEDIUMTEXT,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(20) not null,
  `password` varchar(20) not null,
  `description` varchar(50),
  `isActive` boolean default true,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Foods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(20) not null,
  `offerDate` datetime not null,
  `picPath` varchar(100),
  `description` varchar(500),
  PRIMARY KEY (`id`)
);

CREATE TABLE `activities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(20) not null,
  `activityDate` datetime not null,
  `picPath` varchar(100),
  `description` varchar(500),
  PRIMARY KEY (`id`)
);

CREATE TABLE `ClassActivities` (
  `classId` int,
  `activityId` int,
  PRIMARY KEY (`classId`, `activityId`),
  FOREIGN KEY (`classId`) REFERENCES `class`(`id`),
  FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`)
);

CREATE TABLE `ClassFood` (
  `classId` int,
  `foodId` int,
  PRIMARY KEY (`classId`, `foodId`),
  FOREIGN KEY (`classId`) REFERENCES `class`(`id`),
  FOREIGN KEY (`foodId`) REFERENCES `Foods`(`id`)
);

