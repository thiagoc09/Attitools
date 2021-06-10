CREATE DATABASE IF NOT EXISTS attitools;
USE attitools;

CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  senha varchar(100) NOT NULL, 
  token char(32) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UN (email)
);
