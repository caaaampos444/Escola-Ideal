-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_escola_ideal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_escola_ideal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_escola_ideal` DEFAULT CHARACTER SET utf8 ;
USE `db_escola_ideal` ;

-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_administrador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(15) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_sexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_sexo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(12) NOT NULL,
  `sigla` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

select * from tbl_responsaveis as r join tbl_responsavel_aluno as i on r.id=i.id_responsavel;
select * from tbl_enderecos;
desc tbl_enderecos;

select r.id, r.nome, r.data_nascimento, r.email, r.cpf, r.telefone, s.nome as sexo, e.bairro, e.cep, e.cidade, e.logradouro, e.número from tbl_responsaveis as r
join tbl_enderecos as e on r.id_endereco=e.id
join tbl_sexo as s on s.id=r.id_sexo;

select cast(last_insert_id() as decimal) as id from tbl_responsaveis limit 1;

select m.id as matricula, a.nome, t.nome as turma, a.data_nascimento, a.email from tbl_matricula_turma as i
join tbl_matriculas as m on m.id=i.id_matricula
join tbl_alunos as a on a.id=m.id_aluno
join tbl_turmas as t on t.id=i.id_turma
where t.id=1;

select * from tbl_disciplinas;
select * from tbl_turmas;
select * from tbl_matriculas;
select * from tbl_matricula_turma;
insert into tbl_sexo (nome, sigla) values ("Masculino", "M"), ("Feminino", "F");
insert into tbl_turmas (nome) values ("8º");
insert into tbl_matricula_turma (id_matricula, id_turma, `data`) values (2, 2, '2024-01-20');
select * from tbl_alunostbl_enderecos;
select cast(last_insert_id() as decimal) as id from tbl_alunos limit 1;
-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_alunos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_alunos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `foto` VARCHAR(300) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `id_sexo` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_alunos_tbl_sexo1_idx` (`id_sexo` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_alunos_tbl_sexo1`
    FOREIGN KEY (`id_sexo`)
    REFERENCES `db_escola_ideal`.`tbl_sexo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

insert into tbl_alunos (nome, data_nascimento, email, foto, cpf, id_sexo) values 
(
	"Antonio Meira",
    "2004-05-22",
    "antonio@meira.com",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0D1iGENjSwikmQPCEgt4lLN-8ChYuDu1JQg&s",
    "12350909012",
    "1"
);

-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_comunicados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_comunicados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `assunto` VARCHAR(150) NOT NULL,
  `data` DATE NOT NULL,
  `mensagem` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_professores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_professores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `id_sexo` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tbl_professores_tbl_sexo1`
    FOREIGN KEY (`id_sexo`)
    REFERENCES `db_escola_ideal`.`tbl_sexo` (`id`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

insert into tbl_professores (nome, data_nascimento, telefone, id_sexo) values 
(
	"Rosita Alves",
    "1984-12-01",
    "11920190123",
    "2"
);

-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_disciplinas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_disciplinas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(44) NOT NULL,
  `carga_horaria` VARCHAR(2) NOT NULL,
  `id_professor` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_disciplinas_tbl_professores1_idx` (`id_professor` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_disciplinas_tbl_professores1`
    FOREIGN KEY (`id_professor`)
    REFERENCES `db_escola_ideal`.`tbl_professores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_enderecos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cep` INT NOT NULL,
  `logradouro` VARCHAR(100) NOT NULL,
  `número` DECIMAL NOT NULL,
  `bairro` VARCHAR(100) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_endereco_aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_endereco_aluno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_endereco` INT NOT NULL,
  `id_aluno` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_ENDERECO_ENDERECOALUNO` (`id_endereco` ASC) VISIBLE,
  INDEX `fk_tbl_endereco_aluno_tbl_alunos1_idx` (`id_aluno` ASC) VISIBLE,
  CONSTRAINT `FK_ENDERECO_ENDERECOALUNO`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `db_escola_ideal`.`tbl_enderecos` (`id`),
  CONSTRAINT `fk_tbl_endereco_aluno_tbl_alunos1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `db_escola_ideal`.`tbl_alunos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_matriculas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_matriculas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_inicio` DATE NOT NULL,
  `id_aluno` INT NOT NULL,
  `data_fim` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_matriculas_tbl_alunos1_idx` (`id_aluno` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_matriculas_tbl_alunos1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `db_escola_ideal`.`tbl_alunos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

insert into tbl_matriculas (data_inicio, id_aluno, data_fim) values ("2023-01-28", "1", null);
insert into tbl_matriculas (data_inicio, id_aluno, data_fim) values ("2023-01-28", "2", null);

-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_frequencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_frequencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `status` TINYINT NOT NULL,
  `id_matricula` INT NOT NULL,
  `id_disciplina` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_frequencia_tbl_matriculas1_idx` (`id_matricula` ASC) VISIBLE,
  INDEX `fk_tbl_frequencia_tbl_disciplinas1_idx` (`id_disciplina` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_frequencia_tbl_matriculas1`
    FOREIGN KEY (`id_matricula`)
    REFERENCES `db_escola_ideal`.`tbl_matriculas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_frequencia_tbl_disciplinas1`
    FOREIGN KEY (`id_disciplina`)
    REFERENCES `db_escola_ideal`.`tbl_disciplinas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_notas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_notas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nota` VARCHAR(3) NOT NULL,
  `semestre` VARCHAR(1) NOT NULL,
  `id_matricula` INT NOT NULL,
  `id_disciplina` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_notas_tbl_matriculas1_idx` (`id_matricula` ASC) VISIBLE,
  INDEX `fk_tbl_notas_tbl_disciplinas1_idx` (`id_disciplina` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_notas_tbl_matriculas1`
    FOREIGN KEY (`id_matricula`)
    REFERENCES `db_escola_ideal`.`tbl_matriculas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_notas_tbl_disciplinas1`
    FOREIGN KEY (`id_disciplina`)
    REFERENCES `db_escola_ideal`.`tbl_disciplinas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_responsaveis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_responsaveis` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `id_endereco` INT NOT NULL,
  `id_sexo` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_responsaveis_tbl_enderecos1_idx` (`id_endereco` ASC) VISIBLE,
  INDEX `fk_tbl_responsaveis_tbl_sexo1_idx` (`id_sexo` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_responsaveis_tbl_enderecos1`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `db_escola_ideal`.`tbl_enderecos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_responsaveis_tbl_sexo1`
    FOREIGN KEY (`id_sexo`)
    REFERENCES `db_escola_ideal`.`tbl_sexo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_responsavel_aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_responsavel_aluno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_responsavel` INT NOT NULL,
  `id_aluno` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_RESPONSAVEL_RESPONSAVELALUNO` (`id_responsavel` ASC) VISIBLE,
  INDEX `fk_tbl_responsavel_aluno_tbl_alunos1_idx` (`id_aluno` ASC) VISIBLE,
  CONSTRAINT `FK_RESPONSAVEL_RESPONSAVELALUNO`
    FOREIGN KEY (`id_responsavel`)
    REFERENCES `db_escola_ideal`.`tbl_responsaveis` (`id`),
  CONSTRAINT `fk_tbl_responsavel_aluno_tbl_alunos1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `db_escola_ideal`.`tbl_alunos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_turmas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_turmas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(6) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_escola_ideal`.`tbl_matricula_turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_escola_ideal`.`tbl_matricula_turma` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_matricula` INT NOT NULL,
  `id_turma` INT NOT NULL,
  `data` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_matricula_turma_tbl_matriculas1_idx` (`id_matricula` ASC) VISIBLE,
  INDEX `fk_tbl_matricula_turma_tbl_turmas1_idx` (`id_turma` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_matricula_turma_tbl_matriculas1`
    FOREIGN KEY (`id_matricula`)
    REFERENCES `db_escola_ideal`.`tbl_matriculas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_matricula_turma_tbl_turmas1`
    FOREIGN KEY (`id_turma`)
    REFERENCES `db_escola_ideal`.`tbl_turmas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE tbl_disciplinas
ADD FOREIGN KEY fk_tbl_disciplinas_tbl_professores1;

ALTER TABLE tbl_disciplinas
ADD CONSTRAINT fk_tbl_disciplinas_tbl_professores1 FOREIGN KEY (id_professor)
REFERENCES tbl_professores(id);

drop table tbl_professores;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
