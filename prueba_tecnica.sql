-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 30-08-2022 a las 21:29:51
-- Versión del servidor: 10.3.31-MariaDB-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_tecnica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `ci` varchar(250) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `telefono` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `ci`, `direccion`, `telefono`, `created_at`, `updated_at`) VALUES
(2, 'cristian rojas', '12418371 sc', 'barrio el triunfo zona los lotes', '591 76014864', '2022-08-30 11:02:43', '2022-08-30 11:02:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `camas` int(11) DEFAULT 1,
  `precio` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `numero`, `estado`, `tipo`, `camas`, `precio`, `created_at`, `updated_at`) VALUES
(3, 108, 'Disponible', 'Suit', 1, 350.5, '2022-08-30 11:04:52', '2022-08-30 11:04:52'),
(5, 109, 'Disponible', 'Duo', 2, 250.5, '2022-08-30 20:18:51', '2022-08-30 20:18:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `id` int(11) NOT NULL,
  `fechaini` datetime NOT NULL,
  `fechafin` datetime NOT NULL,
  `met_pago` enum('EFECTIVO','TARJETA','CHEQUE') NOT NULL,
  `estado` enum('PENDIENTE','PAGADO','ELIMINADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_estonian_ci NOT NULL,
  `pago` double NOT NULL DEFAULT 0,
  `habitacion_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`id`, `fechaini`, `fechafin`, `met_pago`, `estado`, `pago`, `habitacion_id`, `cliente_id`, `created_at`, `updated_at`) VALUES
(1, '2022-08-01 11:27:15', '2022-08-17 12:03:53', 'EFECTIVO', 'PAGADO', 350, 3, 2, '2022-08-30 11:27:15', '2022-08-30 11:27:15'),
(16, '2022-08-31 17:27:15', '2022-09-30 12:03:53', 'EFECTIVO', 'ELIMINADO', 350, 3, 2, '2022-08-30 16:23:42', '2022-08-30 16:23:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
