-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jun 10, 2016 at 04:46 AM
-- Server version: 5.5.41-log
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `food_finder_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `categories` int(11) NOT NULL,
  `food_cat` varchar(100) NOT NULL,
`category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
`id` int(10) unsigned NOT NULL,
  `age` int(3) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loc_lat` float NOT NULL,
  `loc_lon` float NOT NULL,
  `num_logins` mediumint(8) unsigned NOT NULL COMMENT 'number of logins total',
  `user_agent` varchar(200) NOT NULL COMMENT 'user-agent =  User-agent header sent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2762.0 Safari/537.36',
  `fb_login` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_interaction`
--

CREATE TABLE IF NOT EXISTS `user_interaction` (
`id` int(10) unsigned NOT NULL,
  `search_timestmp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `drop_dwn_select` tinyint(1) NOT NULL,
  `random_btn_selected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `num_of_nxt_clicks` int(11) NOT NULL,
  `num_of_prev_clicks` int(11) NOT NULL,
  `drop_dwn_select_timestmp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `back_click` tinyint(1) NOT NULL,
  `back_timestmp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `nav_click` tinyint(1) NOT NULL,
  `nav_click_timestmp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `random_click_log` int(11) NOT NULL,
  `drop_dwn_choice` varchar(100) NOT NULL,
  `selected_rstaurnt` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `restaurant_distance` float NOT NULL,
  `radius_selector` int(11) NOT NULL,
  `price_selector` int(11) NOT NULL,
  `init_timestmp_for_data_rqust` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `usr_uniq_assigned_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
 ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_interaction`
--
ALTER TABLE `user_interaction`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user_interaction`
--
ALTER TABLE `user_interaction`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
