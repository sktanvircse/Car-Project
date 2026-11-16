const mysql = require('mysql2/promise');
require('dotenv').config();

// Fallback in-memory dataset if MySQL/XAMPP is not running
const fallbackCars = [
  {
    id: 1,
    title: '2013 Subaru Forester',
    brand: 'Subaru',
    model: 'Forester',
    year: 2013,
    type: 'Used Car',
    price: 21000.00,
    mileage: '11,475 Miles',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    image: '/images/car1.png',
    featured: 1,
    description: 'Reliable all-weather SUV with symmetrical all-wheel drive, premium trim, and spacious interior.'
  },
  {
    id: 2,
    title: '2010 BMW X3',
    brand: 'BMW',
    model: 'X3',
    year: 2010,
    type: 'Used Car',
    price: 29000.00,
    mileage: '11,475 Miles',
    drivetrain: 'AWD',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    image: '/images/car2.png',
    featured: 1,
    description: 'Luxury compact crossover sports activity vehicle with dynamic handling and luxury leather styling.'
  },
  {
    id: 3,
    title: '2016 Toyota BRZ',
    brand: 'Toyota',
    model: 'BRZ',
    year: 2016,
    type: 'Used Car',
    price: 36000.00,
    mileage: '11,475 Miles',
    drivetrain: 'RWD',
    fuel_type: 'Petrol',
    transmission: 'Manual',
    image: '/images/car3.png',
    featured: 1,
    description: 'Pristine condition sports coupe engineered for agile performance and incredible responsiveness.'
  },
  {
    id: 4,
    title: '2021 Audi RS6 Avant',
    brand: 'Audi',
    model: 'RS6',
    year: 2021,
    type: 'New Car',
    price: 115000.00,
    mileage: '4,200 Miles',
    drivetrain: 'AWD',
    fuel_type: 'Twin-Turbo V8',
    transmission: 'Automatic',
    image: '/images/car1.png',
    featured: 0,
    description: 'High performance estate combining supercar speed with daily practical usability.'
  },
  {
    id: 5,
    title: '2022 Porsche 911 Carrera',
    brand: 'Porsche',
    model: '911',
    year: 2022,
    type: 'New Car',
    price: 128000.00,
    mileage: '3,100 Miles',
    drivetrain: 'RWD',
    fuel_type: 'Twin-Turbo Flat-6',
    transmission: 'PDK',
    image: '/images/car2.png',
    featured: 0,
    description: 'Iconic sports car delivering benchmark precision steering and legendary road presence.'
  },
  {
    id: 6,
    title: '2019 Mercedes-Benz C63 AMG',
    brand: 'Mercedes-Benz',
    model: 'C63',
    year: 2019,
    type: 'Used Car',
    price: 64500.00,
    mileage: '18,200 Miles',
    drivetrain: 'RWD',
    fuel_type: 'Bi-Turbo V8',
    transmission: 'Automatic',
    image: '/images/car3.png',
    featured: 0,
    description: 'Muscular luxury sedan boasting thrilling acceleration and aggressive AMG sport styling.'
  }
];

let pool = null;
let isConnected = false;

async function initDB() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'car_shop',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    isConnected = true;
    console.log('✅ Connected to MySQL (XAMPP) database successfully.');
  } catch (err) {
    console.warn('⚠️ Could not connect to MySQL database:', err.message);
    console.warn('ℹ️ Running in resilient mode with built-in car inventory.');
    isConnected = false;
  }
}

initDB();

module.exports = {
  getPool: () => pool,
  isDbConnected: () => isConnected,
  fallbackCars
};
