const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { getPool, isDbConnected, fallbackCars } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static images from root/images
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    mysqlConnected: isDbConnected(),
    timestamp: new Date().toISOString()
  });
});

// GET /api/cars - Get all cars with filtering support
app.get('/api/cars', async (req, res) => {
  const { type, brand, model, minYear, maxPrice, search } = req.query;

  if (isDbConnected()) {
    try {
      let query = 'SELECT * FROM cars WHERE 1=1';
      const params = [];

      if (type && type !== 'All') {
        query += ' AND type = ?';
        params.push(type);
      }
      if (brand && brand !== 'All') {
        query += ' AND brand = ?';
        params.push(brand);
      }
      if (model && model !== 'All') {
        query += ' AND model = ?';
        params.push(model);
      }
      if (minYear) {
        query += ' AND year >= ?';
        params.push(Number(minYear));
      }
      if (maxPrice) {
        query += ' AND price <= ?';
        params.push(Number(maxPrice));
      }
      if (search) {
        query += ' AND (title LIKE ? OR brand LIKE ? OR model LIKE ?)';
        const term = `%${search}%`;
        params.push(term, term, term);
      }

      query += ' ORDER BY id DESC';
      const [rows] = await getPool().query(query, params);
      return res.json({ success: true, data: rows, source: 'mysql' });
    } catch (err) {
      console.error('Database query error:', err.message);
    }
  }

  // Fallback filtering in memory
  let results = [...fallbackCars];
  if (type && type !== 'All') {
    results = results.filter(c => c.type.toLowerCase() === type.toLowerCase());
  }
  if (brand && brand !== 'All') {
    results = results.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
  }
  if (model && model !== 'All') {
    results = results.filter(c => c.model.toLowerCase() === model.toLowerCase());
  }
  if (minYear) {
    results = results.filter(c => c.year >= Number(minYear));
  }
  if (maxPrice) {
    results = results.filter(c => c.price <= Number(maxPrice));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.brand.toLowerCase().includes(q) || 
      c.model.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, data: results, source: 'fallback' });
});

// GET /api/cars/:id - Single car details
app.get('/api/cars/:id', async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      const [rows] = await getPool().query('SELECT * FROM cars WHERE id = ?', [id]);
      if (rows.length > 0) {
        return res.json({ success: true, data: rows[0], source: 'mysql' });
      }
    } catch (err) {
      console.error('Database query error:', err.message);
    }
  }

  const car = fallbackCars.find(c => c.id === Number(id));
  if (!car) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }

  res.json({ success: true, data: car, source: 'fallback' });
});

// POST /api/cars - Add new car listing
app.post('/api/cars', async (req, res) => {
  const { title, brand, model, year, type, price, mileage, drivetrain, fuel_type, transmission, image, description } = req.body;

  if (!title || !brand || !price) {
    return res.status(400).json({ success: false, message: 'Title, brand, and price are required.' });
  }

  if (isDbConnected()) {
    try {
      const [result] = await getPool().query(
        `INSERT INTO cars (title, brand, model, year, type, price, mileage, drivetrain, fuel_type, transmission, image, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, brand, model || brand, year || 2024, type || 'Used Car', price, mileage || '0 Miles', drivetrain || 'AWD', fuel_type || 'Petrol', transmission || 'Automatic', image || '/images/car1.png', description || '']
      );
      return res.status(201).json({ success: true, id: result.insertId, message: 'Car added to MySQL database' });
    } catch (err) {
      console.error('Insert error:', err.message);
      return res.status(500).json({ success: false, message: 'Database insert failed' });
    }
  }

  const newCar = {
    id: fallbackCars.length + 1,
    title,
    brand,
    model: model || brand,
    year: year || 2024,
    type: type || 'Used Car',
    price: Number(price),
    mileage: mileage || '0 Miles',
    drivetrain: drivetrain || 'AWD',
    fuel_type: fuel_type || 'Petrol',
    transmission: transmission || 'Automatic',
    image: image || '/images/car1.png',
    featured: 0,
    description: description || ''
  };
  fallbackCars.push(newCar);

  res.status(201).json({ success: true, data: newCar, message: 'Car added to temporary inventory' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 SK Car Shop Express Server running on http://localhost:${PORT}`);
});
