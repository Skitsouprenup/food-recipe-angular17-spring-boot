-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 12, 2024 at 03:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food-recipe-spring-boot`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_vegetarian` bit(1) NOT NULL,
  `likes` varbinary(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `recipe_link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `created_at`, `description`, `image`, `is_vegetarian`, `likes`, `title`, `user_id`, `recipe_link`) VALUES
(1, '2024-03-10 20:12:47.000000', 'Our Instant Pot chicken marinara recipe is a simple equation for an easy, satisfying dinner that goes something like this: chicken thighs + a jar of marinara sauce = dinner’s done.', 'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Instant-Pot-Chicken-Marinara-with-Polenta-12.jpg?w=800&q=82&fm=jpg&fit=crop&dm=1693943981&s=22acf10f9b53b9fa5873af0ba7f34086', b'0', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000017704000000017372000e6a6176612e6c616e672e4c6f6e673b8be490cc8f23df0200014a000576616c7565787200106a6176612e6c616e672e4e756d62657286ac951d0b94e08b0200007870000000000000000178, 'Instant Pot Chicken Marinara With Polenta', 1, 'https://themodernproper.com/instant-pot-chicken-marinara-with-polenta'),
(152, '2024-03-11 10:11:00.000000', 'This simple Italian salad is the only side salad recipe you need. It fits perfectly with any pasta dish and finds good company alongside a whole roasted chicken or delicate fish dinner.', 'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=800&q=82&fm=jpg&fit=crop&crop=focalpoint&fp-x=0.5019&fp-y=0.3986&dm=1674525642&s=db3e282ed9efc7514e54cd5d57204c15', b'1', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a6578700000000077040000000078, 'Simple Italian Salad', 1, NULL),
(202, '2024-03-12 16:01:02.000000', 'This chicken and waffles casserole is a great way to change up the brunch casserole. It has all the sweet and savory notes you love from chicken and waffles. Using chicken nuggets and frozen waffles makes it super easy to put together.', 'https://www.allrecipes.com/thmb/_RUrp_1nfoVWL53eelQoQArrxeI=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8584860_Chicken-and-Waffles-Casserole_Dotdash-Meredith-Food-Studios_4x3-a89bc7762c964ca7bc3dd20fa85420b7.jpg', b'0', 0xaced0005737200136a6176612e7574696c2e41727261794c6973747881d21d99c7619d03000149000473697a657870000000017704000000017372000e6a6176612e6c616e672e4c6f6e673b8be490cc8f23df0200014a000576616c7565787200106a6176612e6c616e672e4e756d62657286ac951d0b94e08b0200007870000000000000000178, 'Chicken and Waffles Casserole', 1, 'https://www.allrecipes.com/chicken-and-waffles-casserole-recipe-8584860');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_seq`
--

CREATE TABLE `recipe_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_seq`
--

INSERT INTO `recipe_seq` (`next_val`) VALUES
(401);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `full_name`, `password`, `profile_image`) VALUES
(1, 'my_email@gmail.com', 'John Doe', '$2a$10$r/7jLUs/VDrv8E.TXMmfGOpIldBXtWs/XabHYhelunwZuvOd69tf.', ''),
(52, 'email@yahoo.com', 'Jane Doe', '$2a$10$CRJNFUmHXTPupZ0H48bFOe3Sv.vmtMuvzKprAMuIhY91ZL6sfThL.', 'https://i.ibb.co/7SS7dv2/survey-papers-icon.png');

-- --------------------------------------------------------

--
-- Table structure for table `user_seq`
--

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_seq`
--

INSERT INTO `user_seq` (`next_val`) VALUES
(151);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKc8o8io8s0f7nqcd3429u6cxjs` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `FKc8o8io8s0f7nqcd3429u6cxjs` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
