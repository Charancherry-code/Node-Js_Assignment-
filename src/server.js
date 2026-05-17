require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const port = Number(process.env.PORT || 3000);

async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `);
    connection.release();
    console.log("Database table initialized");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
}

async function start() {
  await initDatabase();
  app.listen(port, () => {
    console.log(`School Management API listening on port ${port}`);
  });
}

start();
