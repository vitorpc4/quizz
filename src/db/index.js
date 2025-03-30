const { drizzle } = require("drizzle-orm/singlestore/driver");

const db = drizzle(process.env.DATABASE_URL);
