require("reflect-metadata");
const { DataSource } = require("typeorm");
const Contact = require("./entities/Contact");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
    entities: [Contact],
    migrations: [],
    subscribers: [],
});

module.exports = { AppDataSource }; 