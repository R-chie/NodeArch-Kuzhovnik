-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: beauty_salon_site
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `beauty_salon_site`
--

/*!40000 DROP DATABASE IF EXISTS `beauty_salon_site`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `beauty_salon_site` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `beauty_salon_site`;

--
-- Table structure for table `custom_orders`
--

DROP TABLE IF EXISTS `custom_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `master_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_custom_dim_order_status_id` (`status_id`),
  KEY `FK_orders_custom_masters_id` (`master_id`),
  KEY `FK_orders_custom_services_id` (`service_id`),
  CONSTRAINT `FK_orders_custom_dim_order_status_id` FOREIGN KEY (`status_id`) REFERENCES `dim_order_status` (`id`),
  CONSTRAINT `FK_orders_custom_masters_id` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`),
  CONSTRAINT `FK_orders_custom_services_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_orders`
--

LOCK TABLES `custom_orders` WRITE;
/*!40000 ALTER TABLE `custom_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_orders`
--

DROP TABLE IF EXISTS `daily_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `master_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_daily_dim_order_status_id` (`status_id`),
  KEY `FK_orders_daily_masters_id` (`master_id`),
  KEY `FK_orders_daily_services_id` (`service_id`),
  CONSTRAINT `FK_orders_daily_dim_order_status_id` FOREIGN KEY (`status_id`) REFERENCES `dim_order_status` (`id`),
  CONSTRAINT `FK_orders_daily_masters_id` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`),
  CONSTRAINT `FK_orders_daily_services_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_orders`
--

LOCK TABLES `daily_orders` WRITE;
/*!40000 ALTER TABLE `daily_orders` DISABLE KEYS */;
INSERT INTO `daily_orders` VALUES (1,'2020-01-13 09:00:00',NULL,NULL,1),(2,'2020-01-13 10:00:00',NULL,NULL,1),(3,'2020-01-13 11:00:00',NULL,NULL,1),(4,'2020-01-13 12:00:00',NULL,NULL,1),(5,'2020-01-13 13:00:00',NULL,NULL,1),(6,'2020-01-13 14:00:00',NULL,NULL,1),(7,'2020-01-13 15:00:00',NULL,NULL,1),(8,'2020-01-13 16:00:00',NULL,NULL,1),(9,'2020-01-13 17:00:00',NULL,NULL,1);
/*!40000 ALTER TABLE `daily_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dim_order_status`
--

DROP TABLE IF EXISTS `dim_order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dim_order_status` (
  `id` int(11) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  UNIQUE KEY `UK_dim_order_status_id` (`id`),
  KEY `IDX_dim_order_status_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dim_order_status`
--

LOCK TABLES `dim_order_status` WRITE;
/*!40000 ALTER TABLE `dim_order_status` DISABLE KEYS */;
INSERT INTO `dim_order_status` VALUES (1,'free','Свободно'),(2,'book','Запись'),(3,'clos','Закрыта');
/*!40000 ALTER TABLE `dim_order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masters`
--

DROP TABLE IF EXISTS `masters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `services` varchar(255) DEFAULT NULL,
  `order_count` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_masters_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masters`
--

LOCK TABLES `masters` WRITE;
/*!40000 ALTER TABLE `masters` DISABLE KEYS */;
INSERT INTO `masters` VALUES (1,'Булочкин А.А','Маникюр, педикюр',1);
/*!40000 ALTER TABLE `masters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_name` varchar(255) DEFAULT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `page_md` varchar(255) DEFAULT NULL,
  `page_html` varchar(255) DEFAULT NULL,
  `page_mk` varchar(255) DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'/main','Салон красоты','Маникюр, педикюр, стрижки модельные',NULL,'Салон, парикмахерская, маникюр','2020-01-30 10:17:58'),(2,'/strijka-m','Стрижка мужская','Стрижка муж.','<ul><li><em>Супер стрижка под горшок</em></li></ul>',NULL,'2020-01-30 13:28:40'),(3,'/manik','Маникюр','Маникюр',NULL,NULL,'2020-01-30 00:00:00');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_orders`
--

DROP TABLE IF EXISTS `random_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `random_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `master_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_random_dim_order_status_id` (`status_id`),
  KEY `FK_orders_random_masters_id` (`master_id`),
  KEY `FK_orders_random_services_id` (`service_id`),
  CONSTRAINT `FK_orders_random_dim_order_status_id` FOREIGN KEY (`status_id`) REFERENCES `dim_order_status` (`id`),
  CONSTRAINT `FK_orders_random_masters_id` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`),
  CONSTRAINT `FK_orders_random_services_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_orders`
--

LOCK TABLES `random_orders` WRITE;
/*!40000 ALTER TABLE `random_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `random_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `master_id` int(11) DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_services_id` (`id`),
  KEY `FK_services_masters_id` (`master_id`),
  KEY `FK_services_page_id` (`page_id`),
  CONSTRAINT `FK_services_masters_id` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`),
  CONSTRAINT `FK_services_page_id` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Стрижка муж.','strij_m','Стрижка модельная, стрижка под машинку',1,2,25.00),(2,'Маникюр','manik','Маникюр',1,3,40.00);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int(11) DEFAULT NULL,
  `jwt_key_id` varchar(255) DEFAULT NULL,
  `jwt_exp` varchar(255) DEFAULT NULL,
  `jwt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'130122','1612097056','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjEsImlzcyI6IkJlYXV0eVNhbG9uIiwia2lkIjoiMTMwMTIyIiwiaWF0IjoxNTgwNDc0NjU2LCJleHAiOjE2MTIwOTcwNTZ9.A_S0SDUhaSoX--XXagWneWoJz9kNMBi2tzW11cKVkmwnZXC1mayEDjYkbBA6hZZ_BnqudT53iujCOIJxrzIPSQ');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) DEFAULT NULL,
  `login` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(50) DEFAULT NULL,
  `role` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','344bba4200ad08694896aafa0b7507101798ac975744914bcc40856e87c3626d','232sssd43','adm');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-03 12:25:48
