CREATE DATABASE IF NOT EXISTS ARKAY_MAP;

USE ARKAY_MAP;

CREATE TABLE IF NOT EXISTS PLANOS (
id_plano INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(250) NOT NULL, 
descricao text NOT NULL,
precos DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS MENSAGENS (
id_mensagem INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(250) NOT NULL, 
mensagem longtext NOT NULL,  
nome_signatario VARCHAR(250) NOT NULL, 
email_signatario VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS ROTEIRO (
id_roteiro INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(250) NOT NULL,
descricao text NOT NULL,
data_criacao DATE
);


CREATE TABLE IF NOT EXISTS AREA (
id_area INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(250) NOT NULL,
descricao text NOT NULL
);

CREATE TABLE IF NOT EXISTS MOMENTO (
id_date bigINT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE IF NOT EXISTS PRODUTO (
id_produto INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200) NOT NULL,
descricao text NOT NULL,
preco DOUBLE NOT NULL,
id_area INT NOT NULL,
FOREIGN KEY (id_area) references AREA (id_area)
);

CREATE TABLE IF NOT EXISTS LOJA (
id_loja INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(250) NOT NULL,
descricao text NOT NULL,
tel INT NOT NULL, 
id_produto INT NOT NULL, 
email VARCHAR(45) NOT NULL,
url_loja_online  VARCHAR(200) NOT NULL,
FOREIGN KEY (id_produto) references PRODUTO (id_produto)
);

CREATE TABLE IF NOT EXISTS USUARIO (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(250) NOT NULL, 
email VARCHAR(250) NOT NULL,
senha VARCHAR(250) NOT NULL,
tipo INT NOT NULL, 
id_roteiro INT NOT NULL, 
data_inscricao DATE NOT NULL,
FOREIGN KEY (id_roteiro) references ROTEIRO (id_roteiro)
);

CREATE TABLE IF NOT EXISTS ADM_LOJA (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
id_loja INT NOT NULL,
FOREIGN KEY (id_loja) references LOJA (id_loja)
);

CREATE TABLE IF NOT EXISTS STATUS (
id_status INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(250) NOT NULL,
descricao text NOT NULL,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) references USUARIO (id_usuario)
);

CREATE TABLE IF NOT EXISTS VISITANTE (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
area_interesse VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS ENDERECO (
id_cep INT PRIMARY KEY AUTO_INCREMENT,
cidade  VARCHAR(45) NOT NULL,
logradouro VARCHAR(45) NOT NULL,
bairro VARCHAR(45) NOT NULL,
id_loja INT NOT NULL,
FOREIGN KEY (id_loja) references LOJA (id_loja)
);

CREATE TABLE IF NOT EXISTS RESPOSTAS (
respostas VARCHAR(50),
id_mensagem INT, 
PRIMARY KEY (respostas, id_mensagem)
);
CREATE TABLE IF NOT EXISTS FOTOS_LOJA (
fotos_loja VARCHAR(200),
id_loja INT,
PRIMARY KEY (fotos_loja, id_loja)
);

CREATE TABLE IF NOT EXISTS FOTOS_PRODUTO (
fotos_produto VARCHAR(200),
id_produto INT,
PRIMARY KEY (fotos_produto, id_produto)
);

CREATE TABLE IF NOT EXISTS TEL (
tel INT,
id_usuario INT,
PRIMARY KEY (tel, id_usuario)
);

CREATE TABLE IF NOT EXISTS LOCALIZA (
id_roteiro INT,
id_loja INT,
PRIMARY KEY (id_roteiro, id_loja),
FOREIGN KEY (id_roteiro) references ROTEIRO (id_roteiro),
FOREIGN KEY (id_loja) references LOJA (id_loja)
);

CREATE TABLE IF NOT EXISTS INTERMEDIARIO (
id_usuario INT NOT NULL,
id_loja INT NOT NULL,
id_date INT NOT NULL,
longitude INT NOT NULL,
latitude INT NOT NULL,
PRIMARY KEY (id_usuario, id_loja, id_date),
FOREIGN KEY (id_usuario) references USUARIO (id_usuario),
FOREIGN KEY (id_loja) references LOJA (id_loja),
FOREIGN KEY (id_date) references MOMENTO (id_date)
);

CREATE TABLE IF NOT EXISTS DIVULGA (
id_produto INT,
id_loja INT,
promocao VARCHAR(60),
PRIMARY KEY (id_produto, id_loja),
FOREIGN KEY (id_usuario) references USUARIO (id_usuario),
FOREIGN KEY (id_loja) references LOJA (id_loja)
);

CREATE TABLE IF NOT EXISTS IDENTIFICA (
id_usuario INT,
id_produto INT,
id_date INT,
PRIMARY KEY (id_usuario, id_produto, id_date),
FOREIGN KEY (id_usuario) references USUARIO (id_usuario),
FOREIGN KEY (id_produto) references PRODUTO (id_produto),
FOREIGN KEY (id_date) references MOMENTO (id_date)
);

CREATE TABLE IF NOT EXISTS SELECIONA (
id_loja INT,
id_area INT,
PRIMARY KEY (id_loja, id_area),
FOREIGN KEY (id_loja) references LOJA (id_loja),
FOREIGN KEY (id_area) references AREA (id_area)
);