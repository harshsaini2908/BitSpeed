require('dotenv').config();
const { AppDataSource } = require("./data-source");

async function testConnection() {
    try {
        await AppDataSource.initialize();
        console.log("Database connection successful!");
        process.exit(0);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

testConnection(); 