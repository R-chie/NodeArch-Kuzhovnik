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
-- Table structure for table `dim_order_status`
--

DROP TABLE IF EXISTS `dim_order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dim_order_status` (
  `id` int(11) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  KEY `IDX_dim_order_status_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dim_order_status`
--

LOCK TABLES `dim_order_status` WRITE;
/*!40000 ALTER TABLE `dim_order_status` DISABLE KEYS */;
INSERT INTO `dim_order_status` VALUES (1,'free','–°–≤–æ–±–æ–¥–Ω–æ'),(2,'book','–ó–∞–ø–∏—Å—å'),(3,'clos','–ó–∞–∫—Ä—ã—Ç–∞');
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
INSERT INTO `masters` VALUES (1,'–ë—É–ª–æ—á–∫–∏–Ω –ê.–ê',NULL,1);
/*!40000 ALTER TABLE `masters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_custom`
--

DROP TABLE IF EXISTS `orders_custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_custom` (
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
-- Dumping data for table `orders_custom`
--

LOCK TABLES `orders_custom` WRITE;
/*!40000 ALTER TABLE `orders_custom` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_custom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_daily`
--

DROP TABLE IF EXISTS `orders_daily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_daily` (
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_daily`
--

LOCK TABLES `orders_daily` WRITE;
/*!40000 ALTER TABLE `orders_daily` DISABLE KEYS */;
INSERT INTO `orders_daily` VALUES (1,'2020-01-13 09:00:00',NULL,NULL,1),(2,'2020-01-13 10:00:00',NULL,NULL,1),(3,'2020-01-13 11:00:00',NULL,NULL,1),(4,'2020-01-13 12:00:00',NULL,NULL,1),(5,'2020-01-13 13:00:00',NULL,NULL,1),(6,'2020-01-13 14:00:00',NULL,NULL,1);
/*!40000 ALTER TABLE `orders_daily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_random`
--

DROP TABLE IF EXISTS `orders_random`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_random` (
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
-- Dumping data for table `orders_random`
--

LOCK TABLES `orders_random` WRITE;
/*!40000 ALTER TABLE `orders_random` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_random` ENABLE KEYS */;
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
  `desc` varbinary(255) DEFAULT NULL,
  `master_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_services_id` (`id`),
  KEY `FK_services_masters_id` (`master_id`),
  CONSTRAINT `FK_services_masters_id` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'–°—Ç—Ä–∏–∂–∫–∞ –º—É–∂.','strij_m',_binary '\—\Ú\\Ë\Ê\Í\‡ \Ï\Ó\‰\Â\Î¸\Ì\‡ˇ, \Ò\Ú\\Ë\Ê\Í\‡ \Ô\Ó\‰ \Ï\‡¯\Ë\Ì\Í\Û',1);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
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
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin',NULL,NULL);
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

-- Dump completed on 2020-01-12 14:42:47
