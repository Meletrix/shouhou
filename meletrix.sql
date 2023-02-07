SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for meletrix
-- ----------------------------
DROP TABLE IF EXISTS `meletrix`;
CREATE TABLE `meletrix` (
  `order_number` varchar(255) NOT NULL,
  `order_type` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `photo_1` varchar(255) DEFAULT 'NULL',
  `photo_2` varchar(255) DEFAULT 'NULL',
  `photo_3` varchar(255) DEFAULT 'NULL',
  PRIMARY KEY (`phone_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
