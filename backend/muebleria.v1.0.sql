-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema muebleria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema muebleria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `muebleria` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `muebleria` ;

-- -----------------------------------------------------
-- Table `muebleria`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE INDEX `id_categoria_UNIQUE` (`id_categoria` ASC) ,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) )
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `muebleria`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(30) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(15) NOT NULL,
  `fecha_registro` DATETIME NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) ,
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) )
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `muebleria`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`productos` (
  `id_mueble` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(100) NULL,
  `precio` INT NOT NULL,
  `marca` VARCHAR(45) NULL,
  `modelo` VARCHAR(45) NULL,
  `id_categoria` INT NOT NULL,
  `stock` INT(4) NULL,
  `descripcion` VARCHAR(500) NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_mueble`),
  UNIQUE INDEX `id_mueble_UNIQUE` (`id_mueble` ASC) ,
  INDEX `id_categoria_idx` (`id_categoria` ASC) ,
  INDEX `id_usuario_idx` (`id_usuario` ASC) ,
  CONSTRAINT `id_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `muebleria`.`categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `muebleria`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `muebleria`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`facturas` (
  `id_factura` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `total_venta` DECIMAL(11,3) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_factura`),
  INDEX `id_usuario_idx` (`id_usuario` ASC) ,
  UNIQUE INDEX `id_factura_UNIQUE` (`id_factura` ASC) ,
  CONSTRAINT `id_fac_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `muebleria`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `muebleria`.`facturas_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`facturas_productos` (
  `id_mueble` INT NOT NULL,
  `id_factura` INT NOT NULL,
  `cantidad_vendida` VARCHAR(45) NOT NULL,
  `precio_unitario` DECIMAL(11,3) NOT NULL,
  INDEX `id_mueble_idx` (`id_mueble` ASC) ,
  INDEX `id_factura_idx` (`id_factura` ASC) ,
  CONSTRAINT `id_fac_mueble`
    FOREIGN KEY (`id_mueble`)
    REFERENCES `muebleria`.`productos` (`id_mueble`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_fac_factura`
    FOREIGN KEY (`id_factura`)
    REFERENCES `muebleria`.`facturas` (`id_factura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `muebleria`.`datos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`datos_usuarios` (
  `id_usuario` INT NOT NULL,
  `nombre` VARCHAR(30) NULL,
  `apellido` VARCHAR(30) NULL,
  `direccion` VARCHAR(100) NULL,
  `provincia` VARCHAR(45) NULL,
  `localidad` VARCHAR(45) NULL,
  `codPostal` VARCHAR(15) NULL,
  `telefono` INT(20) NULL,
  `dni` INT(8) NULL,
  `cuil` INT(11) NULL,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC),
  CONSTRAINT `id_datos_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `muebleria`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `muebleria`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muebleria`.`favoritos` (
  `id_usuario` INT NOT NULL,
  `id_mueble` INT NOT NULL,
  INDEX `usuario_fav_idx` (`id_usuario` ASC) ,
  INDEX `mueble_fav_idx` (`id_mueble` ASC) ,
  PRIMARY KEY (`id_usuario`, `id_mueble`),
  CONSTRAINT `usuario_fav`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `muebleria`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `mueble_fav`
    FOREIGN KEY (`id_mueble`)
    REFERENCES `muebleria`.`productos` (`id_mueble`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
