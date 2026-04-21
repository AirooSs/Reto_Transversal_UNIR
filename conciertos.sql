/*!40000 DROP DATABASE IF EXISTS `conciertos`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `conciertos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `conciertos`;

DROP TABLE IF EXISTS `reservas`;
DROP TABLE IF EXISTS `eventos`;
DROP TABLE IF EXISTS `tipos_evento`;
DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `tipos_evento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tipos_evento` VALUES
(1,'Rock','Conciertos de rock y metal'),
(2,'Pop','Conciertos de pop'),
(3,'Folk','Conciertos de folk'),
(4,'Soul','Conciertos de soul'),
(5,'Metal','Conciertos de metal'),
(6,'Trip-hop','Conciertos de trip-hop'),
(7,'Hip-Hop','Conciertos de hip-hop, rap y trap'),
(8,'Trap','Conciertos de trap y esas cosas'),
(9,'Electrónica','Conciertos de música electrónica, house, techno y dance'),
(10,'Industrial','Conciertos de rock industrial, metal industrial y música experimental');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `eventos` VALUES
(1,'Rosalía','Rosalía','Madrid','Rosalía vuelve a la capital madrileña para presentar su Lux Tour 2 en el Madrid Arena. La artista catalana revolucionará el escenario con su fusión única de flamenco, pop y ritmos urbanos.','2026-05-16 19:00:00',125,95,12000,12000,'/img/evento1.png',1,'ACTIVO',2),
(2,'MARO','MARO','Barcelona','MARO (Mariana Secca), la talentosa cantante portuguesa, llega a Barcelona con su estilo único que fusiona pop indie íntimo, folk y R&B.','2026-06-10 18:30:00',90,45,2500,2500,'/img/evento2.png',0,'ACTIVO',2),
(3,'Tame Impala','Tame Impala','Valencia','Tame Impala llega a Valencia con su impresionante propuesta musical que fusiona rock psicodélico, pop psicodélico y electrónica synth-pop.','2026-07-05 19:30:00',150,65,8000,8000,'/img/evento3.png',0,'ACTIVO',1),
(4,'PLK','PLK','Madrid','PLK, el rapero francés, llega al WiZink Center de Madrid con un estilo único que fusiona el rap francés con influencias del trap y el drill.','2026-11-15 20:00:00',110,30,15000,15000,'/img/evento4.png',0,'ACTIVO',7),
(5,'Bad Gyal','Bad Gyal','Barcelona','Bad Gyal ofrece un concierto íntimo y exclusivo a puerta cerrada en Club Sauvage de Barcelona.','2026-12-05 21:00:00',90,65,250,250,'/img/evento5.png',0,'ACTIVO',8),
(6,'caroline','caroline','Barcelona','caroline, el octeto londinense, presenta su segundo álbum en la sala Upload con su música que fusiona clasicismo en miniatura, avant-folk y post-rock.','2026-09-26 17:30:00',120,35,800,800,'/img/evento6.png',0,'ACTIVO',1),
(11,'O\'Flynn','O\'Flynn','Barcelona','O\'Flynn, el reconocido productor y DJ británico de música electrónica, llega a la sala Laut de Barcelona.','2026-10-17 20:00:00',180,22,500,500,'/img/evento7.png',0,'ACTIVO',9),
(12,'Nine Inch Nails','Nine Inch Nails','Barcelona','Nine Inch Nails vuelve a la Sala Razzmatazz de Barcelona con sus himnos oscuros y electrónica agresiva.','2026-11-28 20:00:00',150,45,2000,2000,'/img/evento8.png',0,'ACTIVO',10),
(13,'Massive Attack','Massive Attack','Madrid','Massive Attack, los pioneros del trip-hop británico, llegan a Madrid como cabeza de cartel del festival Kalorama.','2026-09-15 19:30:00',120,75,10000,10000,'/img/evento9.png',0,'ACTIVO',6),
(14,'Deftones','Deftones','Madrid','Deftones regresa a España como parte de su gira europea presentando su décimo álbum de estudio.','2026-10-10 18:00:00',135,70,8000,8000,'/img/evento10.png',0,'ACTIVO',5);

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

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuarios` VALUES
(1,'Admin Principal','admin@test.com','$2a$10$NkM5C6x3NkM5C6x3NkM5CuX3NkM5C6x3NkM5C6x3NkM5C6x3NkM5C6x','ROLE_ADMON'),
(2,'alberto','adminalberto@test.com','$2a$10$sPl1SM1cwvomcWcHU8XmEenjoCfFwNRuxLT/Gw.SPlFSbbKWMXLoC','ROLE_ADMON');