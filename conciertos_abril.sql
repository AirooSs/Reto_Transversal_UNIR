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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Rosalía','Rosalía vuelve a la capital madrileña para presentar su Lux Tour 2 en el Madrid Arena. La artista catalana revolucionará el escenario con su fusión única de flamenco, pop y ritmos urbanos. Un espectáculo visual y sonoro que no te puedes perder. Una noche mágica llena de arte, pasión y vanguardia musical.','2026-05-16 19:00:00',125,95,12000,12000,'/img/evento1.png',1,'ACTIVO',2),(2,'MARO','MARO (Mariana Secca), la talentosa cantante, compositora y multiinstrumentista portuguesa, llega a Barcelona con su estilo único que fusiona pop indie íntimo, folk y R&B con toques de música tradicional portuguesa. Su voz cálida y composiciones en inglés, acompañadas de arreglos acústicos sobrios, crearán una atmósfera melancólica y confesional. Una noche íntima para disfrutar de temas como \'saudade, saudade\' y \'Best You Ever Had\'. La artista promete un concierto emocionante lleno de sensibilidad y autenticidad.','2026-06-10 18:30:00',90,45,2500,2500,'/img/evento2.png',0,'ACTIVO',2),(3,'Tame Impala','Tame Impala, el proyecto del músico australiano Kevin Parker, llega a Valencia con su impresionante propuesta musical que fusiona rock psicodélico, pop psicodélico y electrónica synth-pop. Un concierto que recorrerá su evolución sonora desde los inicios con guitarras distorsionadas influenciadas por los años 60 hasta las texturas más pulidas, bailables y sintetizadas de sus últimos trabajos. Una experiencia inmersiva de luces, efectos visuales y paisajes sonoros que transportarán al público a otra dimensión. Temas como \'The Less I Know the Better\', \'Elephant\', \'Let It Happen\' y \'New Person, Same Old Mistakes\' sonarán en los emblemáticos Jardines de Viveros de Valencia.','2026-07-05 19:30:00',150,65,8000,8000,'/img/evento3.png',0,'ACTIVO',1),(4,'PLK','PLK (Mathieu Claude Daniel Pruski), el rapero francés de ascendencia polaca y corsa, llega al WiZink Center de Madrid. Con un estilo único que fusiona el rap francés con influencias del trap y el drill, PLK se ha consolidado como una de las figuras más importantes de la escena hip hop europea. El artista presentará su último trabajo discográfico junto a sus grandes éxitos como \'Un peu de haine\', \'Demain\' y \'Nouvelles\'. Una noche de rap contundente, letras afiladas y beats contundentes que harán vibrar al público madrileño.','2026-11-15 20:00:00',110,30,15000,15000,'/img/evento4.png',0,'ACTIVO',7),(5,'Bad Gyal','Bad Gyal ofrece un concierto íntimo y exclusivo a puerta cerrada en Club Sauvage de Barcelona. Una noche única donde la reina del reguetón, dancehall y trap catalán desplegará toda su chulería en un ambiente privado y selecto. La artista interpretará sus grandes éxitos como \'Chulo\', \'Real G\', \'Zorra\', \'Flow 2000\' y \'Blin Blin\', creando una atmósfera electrizante de pura actitud y estilo. Una experiencia exclusiva para 250 privilegiados que podrán disfrutar de la fusión de ritmos urbanos que han convertido a Bad Gyal en un fenómeno internacional.','2026-12-05 21:00:00',90,65,250,250,'/img/evento5.png',0,'ACTIVO',8),(6,'caroline','Hay secretos que no pueden guardarse durante mucho tiempo. Sencillamente porque es injusto: hay cosas que todo el mundo tiene derecho a saber. caroline, el octeto londinense, presenta su segundo álbum \'caroline 2\' (uno de los grandes discos de 2025) en la sala Upload. Su música fusiona clasicismo en miniatura, avant-folk y post-rock, creando un sonido único que recuerda a Talk Talk, The Books, Panda Bear, Deerhoof, Tortoise y Arthur Russell, pero sin parecerse a nadie más. Una noche de improvisación, texturas y emociones a fuego lento para los amantes de la música experimental. Organiza: Primavera Tours.','2026-09-26 17:30:00',120,35,800,800,'/img/evento6.png',0,'ACTIVO',1),(11,'O\'Flynn','O\'Flynn, el reconocido productor y DJ británico de música electrónica, llega a la sala Laut de Barcelona. Desde su debut en 2015, O\'Flynn se ha consolidado como una figura clave dentro de la escena de la música electrónica de baile del Reino Unido. Una noche de beats hipnóticos, ritmos envolventes y electrónica de vanguardia que harán vibrar al público barcelonés. Un plan perfecto para vivir la música en directo en uno de los espacios más emblemáticos de la ciudad.','2026-10-17 20:00:00',180,22,500,500,'/img/evento7.png',0,'ACTIVO',9),(12,'Nine Inch Nails','Nine Inch Nails, el icónico proyecto de rock industrial liderado por Trent Reznor, vuelve a la Sala Razzmatazz de Barcelona. Pioneros del rock industrial, la banda presentará un show impactante con sus himnos oscuros y electrónica agresiva. Sonarán clásicos como \'Hurt\', \'Closer\', \'The Hand That Feeds\', \'March of the Pigs\' y \'Head Like a Hole\'. Una noche de intensidad sonora, visuales inquietantes y la energía única que solo Nine Inch Nails puede desplegar sobre el escenario.','2026-11-28 20:00:00',150,45,2000,2000,'/img/evento8.png',0,'ACTIVO',10),(13,'Massive Attack','Massive Attack, los pioneros del trip-hop británico, llegan a Madrid como cabeza de cartel del festival Kalorama. La banda ofrecerá un show视听mente impactante con visuales de vanguardia y su característica crítica social. Sonarán clásicos como \'Teardrop\', \'Unfinished Sympathy\', \'Angel\', \'Paradise Circus\' y \'Safe from Harm\'. Una noche hipnótica donde la electrónica, el hip-hop y el ambient se fusionan con mensajes políticos y conciencia social. Una experiencia audiovisual única que no te puedes perder.','2026-09-15 19:30:00',120,75,10000,10000,'/img/evento9.png',0,'ACTIVO',6),(14,'Deftones','Deftones regresa a España como parte de su gira europea \'Deftones Europe Tour 2026\', presentando su décimo álbum de estudio. La banda de Sacramento, pionera del metal alternativo y shoegaze, estará acompañada por Denzel Curry y Drug Church. Tras sus exitosos conciertos en Madrid y Barcelona en 2024, Deftones consolida su vuelta con un tour enfocado en 2026. Sonarán clásicos como \'Change (In the House of Flies)\', \'My Own Summer (Shove It)\', \'Be Quiet and Drive (Far Away)\', \'Sextape\' y temas de su nuevo álbum. Una noche de intensidad, atmósferas etéreas y la energía única que solo Deftones puede ofrecer.','2026-10-10 18:00:00',135,70,8000,8000,'/img/evento10.png',0,'ACTIVO',5);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin Principal','admin@test.com','$2a$10$NkM5C6x3NkM5C6x3NkM5CuX3NkM5C6x3NkM5C6x3NkM5C6x3NkM5C6x','ADMIN'),(2,'alberto','adminalberto@test.com','$2a$10$sPl1SM1cwvomcWcHU8XmEenjoCfFwNRuxLT/Gw.SPlFSbbKWMXLoC','ROLE_ADMON');
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

-- Dump completed on 2026-04-20  0:35:06
