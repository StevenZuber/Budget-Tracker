-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema BudgetTracker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `BudgetTracker` ;

-- -----------------------------------------------------
-- Schema BudgetTracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BudgetTracker` DEFAULT CHARACTER SET utf8 ;
USE `BudgetTracker` ;

-- -----------------------------------------------------
-- Table `Expense`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Expense` ;

CREATE TABLE IF NOT EXISTS `Expense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cost` INT NOT NULL,
  `description` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO admin;
 DROP USER admin;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'admin' IDENTIFIED BY 'password';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'admin';

-- -----------------------------------------------------
-- Data for table `Expense`
-- -----------------------------------------------------
START TRANSACTION;
USE `BudgetTracker`;
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (1, 'Phone Bill', 105, 'Sprint unlimited everything, insurance');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (2, 'Comcast', 84, 'High speed internet, no cable or phone');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (3, 'Electric Bill', 35, 'Just electricity, often higher in colder months');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (4, 'Life Insurance', 27, '$110,000 policy');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (5, 'Student Loans', 104, 'less than 7k left');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (6, 'Netflix', 9, 'We all know what Netflix is');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (7, 'Rent', 765, 'Rachel pays the other half, includes water and trash');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (8, 'Food', 200, 'Probably undershooting this, also doesn\'t include going out');
INSERT INTO `Expense` (`id`, `name`, `cost`, `description`) VALUES (9, 'Gas', 80, 'Assuming about two fills per month');

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
