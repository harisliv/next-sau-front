const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");
const { faker } = require("@faker-js/faker");

console.log({ envPath });

require("dotenv").config({ path: envPath });

const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
});

async function query(q) {
  try {
    const results = await db.query(q);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    console.log(faker.finance.amount())
    await query(`
    CREATE TABLE IF NOT EXISTS offerings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      price TEXT NOT NULL
    )
    `);
    await query(`
    CREATE TABLE IF NOT EXISTS bundle (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      price TEXT NOT NULL
    )
    `);
    await query(
      `
      INSERT INTO bundle (name, price)
      VALUES (?, ?)
      `,
      [faker.name.findName(), "12"]
    )

    console.log("migration ran successfully");
  } catch (e) {
    console.error("could not run migration, double check your credentials.");
    process.exit(1);
  }
}

migrate().then(() => process.exit());
