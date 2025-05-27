const validateIdentifyRequest = (req, res, next) => {
    const { email, phoneNumber } = req.body;

    // Check if at least one of email or phoneNumber is provided
    if (!email && !phoneNumber) {
        return res.status(400).json({
            error: "Either email or phoneNumber must be provided"
        });
    }

    // Validate email format if provided
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email format"
            });
        }
    }

    // Validate phone number format if provided
    if (phoneNumber) {
        const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone numbers
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                error: "Phone number must be 10 digits"
            });
        }
    }

    next();
};

module.exports = { validateIdentifyRequest }; 