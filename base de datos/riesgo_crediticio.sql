-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: riesgo_crediticio
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assessments`
--

DROP TABLE IF EXISTS `assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `income` decimal(10,2) DEFAULT NULL,
  `debt` decimal(10,2) DEFAULT NULL,
  `active_credits` int DEFAULT NULL,
  `age` int DEFAULT NULL,
  `employment_duration` int DEFAULT NULL,
  `requested_amount` decimal(10,2) DEFAULT NULL,
  `risk_level` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessments`
--

LOCK TABLES `assessments` WRITE;
/*!40000 ALTER TABLE `assessments` DISABLE KEYS */;
INSERT INTO `assessments` VALUES (1,7,'pepito',5000.00,1000.00,2,30,48,1500.00,'MEDIUM','2025-05-25 14:34:47'),(2,8,'vulgarcito',5000.00,1000.00,2,30,48,1500.00,'MEDIUM','2025-05-25 14:34:47'),(3,9,'yeison',5000.00,1000.00,2,30,48,1500.00,'MEDIUM','2025-05-25 14:34:47'),(4,10,'sofia',5000.00,1000.00,2,30,48,1500.00,'MEDIUM','2025-05-25 14:34:47');
/*!40000 ALTER TABLE `assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_info`
--

DROP TABLE IF EXISTS `financial_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `last_updated` date DEFAULT NULL,
  `monthly_expenses` decimal(38,2) DEFAULT NULL,
  `monthly_income` decimal(38,2) DEFAULT NULL,
  `net_worth` decimal(38,2) DEFAULT NULL,
  `total_debt` decimal(38,2) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_info`
--

LOCK TABLES `financial_info` WRITE;
/*!40000 ALTER TABLE `financial_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `financial_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(11,1),(7,2),(8,2),(9,2),(10,2),(12,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sebastian','$2a$10$z8x6LFyzTDUuv4pDOxrH0O99zGuOPMnw93RlbU0OGnPtm5sS7fiIq',1),(2,'laura','$2a$10$Ttp0zEyByNKKXjXh463ofu9Jxp4tF/2wUbZAjPt3fjhPxz6CdT3Vu',1),(3,'Santiago','$2a$10$.IhlMTw3l3.knp5P6lUCFOb52WeHMrHaS6HSjTJreVuYR0lc5y.P2',1),(4,'Camila','$2a$10$ZH6SeBgO9.TbKkepf1y76uVJcb2m.4MwAr3JzCZwkHgvB5UjoRScO',1),(5,'Alex','$2a$10$u.6aIbqMFDQ/b6v0kFovF.HH8lfBAUl7dEJpW9.snb0gJ9D4NwSZu',1),(6,'Harold','$2a$10$Cs5Jxf1JpO4y5D/SwtbEV.t8Fr2NYktHUDHpuf693zvyWX8f6diJm',1),(7,'pepito','$2a$10$akVRmhQHzOE0OqI/iWqx0utzDEECMvJRw.uIbR6ePYWoq0Iz38mia',1),(8,'vulgarcito','$2a$10$W591zpj6rrcnCjRGxvwiOezd68kW6O.1M7s78KS3Boffris3KKE6W',1),(9,'yeison','$2a$10$6bUE6Gp.526R5AybGWTLC.VtiLhaTUNVwXUU0oy7E9mGcRiaXKvve',1),(10,'sofia','$2a$10$YlO9sjv4MsfOw6cSEaajpei5ar3z3gMx3PCtxkA5Huo9NebA.1H5q',1),(11,'admin','$2a$10$091sPqnIP3OkSo3GaJkGJuAZmIcuc5A.zUwoCAjOiQ0msj.5zULtW',1),(12,'user','$2a$10$x8SFPnS6QOmUaRfXAYOPHuKVkHUXFOwkpj0lCE0foMjvhK6g37BKu',1);
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

-- Dump completed on 2025-05-25 16:13:02
