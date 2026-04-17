CREATE DATABASE IF NOT EXISTS conciertos;
USE conciertos;

DROP TABLE IF EXISTS `reservas`;
DROP TABLE IF EXISTS `eventos`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `tipos_evento`;

CREATE TABLE `tipos_evento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `eventos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `fecha` datetime DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `aforo_maximo` int DEFAULT NULL,
  `plazas_disponibles` int DEFAULT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  `destacado` tinyint(1) NOT NULL DEFAULT 0,
  `estado` varchar(50) DEFAULT NULL,
  `tipo_evento_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_evento_id` (`tipo_evento_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`tipo_evento_id`) REFERENCES `tipos_evento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `reservas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int DEFAULT NULL,
  `fecha_reserva` datetime DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `evento_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `evento_id` (`evento_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;