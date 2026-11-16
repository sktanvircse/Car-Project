-- Database schema for SK Car Shop (XAMPP MySQL)
CREATE DATABASE IF NOT EXISTS `car_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `car_shop`;

-- Table for car listings
CREATE TABLE IF NOT EXISTS `cars` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  `type` VARCHAR(50) DEFAULT 'Used Car',
  `price` DECIMAL(10, 2) NOT NULL,
  `mileage` VARCHAR(50) DEFAULT '11,475 Miles',
  `drivetrain` VARCHAR(50) DEFAULT 'AWD',
  `fuel_type` VARCHAR(50) DEFAULT 'Petrol',
  `transmission` VARCHAR(50) DEFAULT 'Automatic',
  `image` VARCHAR(255) NOT NULL,
  `featured` BOOLEAN DEFAULT FALSE,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial cars using existing project images
INSERT INTO `cars` (`title`, `brand`, `model`, `year`, `type`, `price`, `mileage`, `drivetrain`, `fuel_type`, `transmission`, `image`, `featured`, `description`) VALUES
('2013 Subaru Forester', 'Subaru', 'Forester', 2013, 'Used Car', 21000.00, '11,475 Miles', 'AWD', 'Gasoline', 'Automatic', '/images/car1.png', 1, 'Reliable all-weather SUV with symmetrical all-wheel drive, premium trim, and spacious interior.'),
('2010 BMW X3', 'BMW', 'X3', 2010, 'Used Car', 29000.00, '11,475 Miles', 'AWD', 'Petrol', 'Automatic', '/images/car2.png', 1, 'Luxury compact crossover sports activity vehicle with dynamic handling and luxury leather styling.'),
('2016 Toyota BRZ', 'Toyota', 'BRZ', 2016, 'Used Car', 36000.00, '11,475 Miles', 'RWD', 'Petrol', 'Manual', '/images/car3.png', 1, 'Pristine condition sports coupe engineered for agile performance and incredible responsiveness.'),
('2021 Audi RS6 Avant', 'Audi', 'RS6', 2021, 'New Car', 115000.00, '4,200 Miles', 'AWD', 'Twin-Turbo V8', 'Automatic', '/images/car1.png', 0, 'High performance estate combining supercar speed with daily practical usability.'),
('2022 Porsche 911 Carrera', 'Porsche', '911', 2022, 'New Car', 128000.00, '3,100 Miles', 'RWD', 'Twin-Turbo Flat-6', 'PDK', '/images/car2.png', 0, 'Iconic sports car delivering benchmark precision steering and legendary road presence.'),
('2019 Mercedes-Benz C63 AMG', 'Mercedes-Benz', 'C63', 2019, 'Used Car', 64500.00, '18,200 Miles', 'RWD', 'Bi-Turbo V8', 'Automatic', '/images/car3.png', 0, 'Muscular luxury sedan boasting thrilling acceleration and aggressive AMG sport styling.');
