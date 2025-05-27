require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./data-source");
const ContactService = require("./services/ContactService");
const { validateIdentifyRequest } = require("./middleware/validateRequest");
const { errorHandler, AppError } = require("./middleware/errorHandler");
const { requestLogger } = require("./middleware/logger");

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

const contactService = new ContactService();

app.post("/identify", validateIdentifyRequest, async (req, res, next) => {
    try {
        const { email, phoneNumber } = req.body;
        const result = await contactService.identifyContact(email, phoneNumber);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 