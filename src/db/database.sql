-- Active: 1691292660494@@127.0.0.1@3306@logininfo
CREATE DATABASE loginInfo;

USE loginInfo;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);


ALTER TABLE usuarios ADD COLUMN email VARCHAR(255);

drop table usuarios;

UPDATE usuarios SET email = 'Bryant02@yahoo.com';

INSERT INTO usuarios (usuario, contraseña) VALUES ("Bryant", "Berserker");

SELECT * FROM usuarios;