DROP DATABASE IF EXISTS kinderGardenDB;
CREATE DATABASE kinderGardenDB;

USE `kinderGardenDB` ;
CREATE TABLE `Teacher` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(20) not null,
  `LastName` varchar(20) not null,
  `IsActive` boolean default true,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `ClassTeacher` (
  `ClassId` int,
  `TeacherId` int,
  PRIMARY KEY (`ClassId`, `TeacherId`),
  FOREIGN KEY (`TeacherId`) REFERENCES `Teacher`(`ID`)
);

CREATE TABLE `Inscription` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(20) not null,
  `LastName` varchar(20) not null,
  `Phone` varchar(20) not null,
  `Address` varchar(100) not null,
  `InscriptionDate` datetime not null,
  `OpenPlace` int,
  `Status` varchar(10),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Class` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `ClassName` varchar(20) not null,
  `OpenDate` datetime not null,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `ChildRoster` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `ClassId` int,
  `FirstName` varchar(20) not null,
  `LastName` varchar(20) not null,
  `InscripId` int,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`InscripId`) REFERENCES `Inscription`(`ID`),
  FOREIGN KEY (`ClassId`) REFERENCES `Class`(`ID`)
);

CREATE TABLE `News` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) not null,
  `IssueDate` datetime not null,
  `PicPath` varchar(100),
  `Content` varchar(500),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Admin` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) not null,
  `Password` varchar(20) not null,
  `Description` varchar(50),
  `IsActive` boolean default true,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Foods` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) not null,
  `offerDate` datetime not null,
  `PicPath` varchar(100),
  `Description` varchar(500),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Activities` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) not null,
  `activityDate` datetime not null,
  `PicPath` varchar(100),
  `Description` varchar(500),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `ClassActivities` (
  `ClassId` int,
  `ActivityId` int,
  PRIMARY KEY (`ClassId`, `ActivityId`),
  FOREIGN KEY (`ClassId`) REFERENCES `Class`(`ID`),
  FOREIGN KEY (`ActivityId`) REFERENCES `Activities`(`ID`)
);

CREATE TABLE `ClassFood` (
  `ClassId` int,
  `FoodId` int,
  PRIMARY KEY (`ClassId`, `FoodId`),
  FOREIGN KEY (`ClassId`) REFERENCES `Class`(`ID`),
  FOREIGN KEY (`FoodId`) REFERENCES `Foods`(`ID`)
);

