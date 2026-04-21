-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: conciertos
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `conciertos`
--

/*!40000 DROP DATABASE IF EXISTS `conciertos`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `conciertos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `conciertos`;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `artista` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `aforo_maximo` int(11) DEFAULT NULL,
  `plazas_disponibles` int(11) DEFAULT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  `destacado` tinyint(1) NOT NULL DEFAULT 0,
  `estado` varchar(50) DEFAULT NULL,
  `tipo_evento_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_evento_id` (`tipo_evento_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`tipo_evento_id`) REFERENCES `tipos_evento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Rosalía - Lux Madrid','Rosalía','Madrid','Rosalía vuelve a la capital madrileña para presentar su Lux Tour 2 en el Madrid Arena. La artista catalana revolucionará el escenario con su fusión única de flamenco, pop y ritmos urbanos.','2026-05-16 19:00:00',125,95,12000,12000,'/img/evento1.jpg',1,'ACTIVO',2),(2,'MARO - Razzmatazz','MARO','Barcelona','MARO (Mariana Secca), la talentosa cantante portuguesa, llega a Barcelona (Sala Razzmatazz) con su estilo único que fusiona pop indie íntimo, folk y R&B.','2026-06-10 18:30:00',90,45,2500,2500,'/img/evento2.jpg',0,'ACTIVO',2),(3,'Tame Impala - Valencia','Tame Impala','Valencia','Tame Impala llega a Valencia con su impresionante propuesta musical que fusiona rock psicodélico, pop psicodélico y electrónica synth-pop.','2026-07-05 19:30:00',150,65,8000,8000,'/img/evento3.jpg',0,'ACTIVO',1),(4,'PLK - WiZink Center','PLK','Madrid','PLK, el rapero francés, llega al WiZink Center de Madrid con un estilo único que fusiona el rap francés con influencias del trap y el drill.','2026-11-15 20:00:00',110,30,15000,15000,'/img/evento4.jpg',0,'ACTIVO',7),(5,'Bad Gyal - Club Sauvage','Bad Gyal','Barcelona','Bad Gyal ofrece un concierto íntimo y exclusivo a puerta cerrada en Club Sauvage de Barcelona.','2026-12-05 21:00:00',90,65,250,250,'/img/evento5.jpg',0,'ACTIVO',8),(6,'Caroline - Barcelona','Caroline','Barcelona','caroline, el octeto londinense, presenta su segundo álbum en la sala Upload con su música que fusiona clasicismo en miniatura, avant-folk y post-rock.','2026-09-26 17:30:00',120,35,800,800,'/img/evento6.jpg',0,'ACTIVO',1),(11,'O\'Flynn - Laut','O\'Flynn','Barcelona','O\'Flynn, el reconocido productor y DJ británico de música electrónica, llega a la sala Laut de Barcelona.','2026-10-17 20:00:00',180,22,500,500,'/img/evento7.jpg',0,'ACTIVO',9),(12,'NIN - Razzmatazz','Nine Inch Nails','Barcelona','Nine Inch Nails vuelve a la Sala Razzmatazz de Barcelona con sus himnos oscuros y electrónica agresiva.','2026-11-28 20:00:00',150,45,2000,2000,'/img/evento8.jpg',0,'ACTIVO',10),(13,'Massive Attack - Kalorama','Massive Attack','Madrid','Massive Attack, los pioneros del trip-hop británico, llegan a Madrid como cabeza de cartel del festival Kalorama.','2026-09-15 19:30:00',120,75,10000,10000,'/img/evento9.jpg',0,'ACTIVO',6),(14,'Deftones - Madrid','Deftones','Madrid','Deftones regresa a España como parte de su gira europea presentando su décimo álbum de estudio.','2026-10-10 18:00:00',135,70,8000,8000,'/img/evento10.jpg',0,'ACTIVO',5),(15,'Rosalía - Lux Tour Bilbao','Rosalía','Bilbao','Rosalía llega al Bilbao Arena para presentar su Lux Tour 2. La artista catalana revolucionará el escenario con su fusión única de flamenco, pop y ritmos urbanos en el País Vasco.','2026-09-20 18:00:00',125,75,10000,10000,'/img/evento12.jpg',1,'ACTIVO',2),(16,'Rosalía - Lux Tour Barcelona','Rosalía','Barcelona','Rosalía vuelve a Barcelona para un concierto único en el Palau Sant Jordi. La artista catalana presenta su aclamado Lux Tour 2 en casa, con un espectáculo que fusiona flamenco, pop y ritmos urbanos.','2026-10-25 18:30:00',125,95,17000,17000,'/img/evento16.jpg',1,'ACTIVO',2),(17,'Massive Attack - Barcelona','Massive Attack','Barcelona','Massive Attack, los pioneros del trip-hop británico, llegan a Barcelona como parte de su gira europea. Presentarán su aclamado repertorio en el Palau Sant Jordi, con su característico sonido que fusiona trip-hop, electrónica y rock alternativo.','2026-09-28 19:00:00',120,75,12000,12000,'/img/evento13.jpg',0,'ACTIVO',6),(18,'Placebo - Valencia','Placebo','Valencia','Placebo, la icónica banda británica liderada por Brian Molko, llega a Valencia con su gira mundial. Repasarán sus grandes éxitos como \'Every You Every Me\', \'The Bitter End\' y \'Running Up That Hill\', además de presentar su nuevo material.','2026-11-08 20:00:00',130,45,8000,8000,'/img/evento11.jpg',1,'ACTIVO',1),(19,'Deftones - Razzmatazz','Deftones','Barcelona','Deftones regresa a Barcelona como parte de su gira europea presentando su décimo álbum de estudio. La banda californiana liderada por Chino Moreno ofrecerá un concierto único en Sala Razzmatazz, con su particular fusión de nu-metal, shoegaze y dream pop.','2026-10-25 20:00:00',135,45,5000,5000,'/img/evento14.jpg',0,'ACTIVO',5),(20,'Bad Gyal - WiZink Center','Bad Gyal','Madrid','Bad Gyal llega al WiZink Center de Madrid con su gira internacional. La reina del trap y el reggaetón español presentará sus mayores éxitos como \'Blin Blin\', \'Chulo\' y \'Santa María\', en un espectáculo de gran producción que hará vibrar la capital.','2026-12-18 20:30:00',105,45,15000,15000,'/img/evento15.jpg',1,'ACTIVO',8);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_reserva` datetime DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `evento_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `evento_id` (`evento_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_evento`
--

DROP TABLE IF EXISTS `tipos_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_evento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_evento`
--

LOCK TABLES `tipos_evento` WRITE;
/*!40000 ALTER TABLE `tipos_evento` DISABLE KEYS */;
INSERT INTO `tipos_evento` VALUES (1,'Rock','Conciertos de rock y metal'),(2,'Pop','Conciertos de pop'),(3,'Folk','Conciertos de folk'),(4,'Soul','Conciertos de soul'),(5,'Metal','Conciertos de metal'),(6,'Trip-hop','Conciertos de trip-hop'),(7,'Hip-Hop','Conciertos de hip-hop, rap y trap'),(8,'Trap','Conciertos de trap y esas cosas'),(9,'Electrónica','Conciertos de música electrónica, house, techno y dance'),(10,'Industrial','Conciertos de rock industrial, metal industrial y música experimental');
/*!40000 ALTER TABLE `tipos_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin Principal','admin@test.com','$2a$10$NkM5C6x3NkM5C6x3NkM5CuX3NkM5C6x3NkM5C6x3NkM5C6x3NkM5C6x','ROLE_ADMON'),(3,'admon','admon@test.com','$2a$10$qOfHKjepXTC0aG1v3w3Iqugj1qqWZmOniPwYfQgJsKlhd9XU83oEy','ROLE_ADMON');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-21 22:44:01
