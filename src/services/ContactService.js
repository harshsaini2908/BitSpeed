const { AppDataSource } = require("../data-source");

class ContactService {
    constructor() {
        this.contactRepository = AppDataSource.getRepository("Contact");
    }

    async identifyContact(email, phoneNumber) {
        if (!email && !phoneNumber) {
            throw new Error("Either email or phoneNumber must be provided");
        }

        // Find all contacts that match either email or phoneNumber
        const matchingContacts = await this.contactRepository.find({
            where: [
                { email: email || undefined },
                { phoneNumber: phoneNumber || undefined }
            ],
            order: { createdAt: "ASC" }
        });

        if (matchingContacts.length === 0) {
            // Create new primary contact
            const newContact = this.contactRepository.create({
                email,
                phoneNumber,
                linkPrecedence: "primary"
            });
            await this.contactRepository.save(newContact);

            return {
                contact: {
                    primaryContatctId: newContact.id,
                    emails: email ? [email] : [],
                    phoneNumbers: phoneNumber ? [phoneNumber] : [],
                    secondaryContactIds: []
                }
            };
        }

        // Get the primary contact (oldest one)
        const primaryContact = matchingContacts[0];
        const secondaryContacts = matchingContacts.slice(1);

        // Check if we need to create a new secondary contact
        const hasNewInfo = (email && !matchingContacts.some(c => c.email === email)) ||
                          (phoneNumber && !matchingContacts.some(c => c.phoneNumber === phoneNumber));

        if (hasNewInfo) {
            const newSecondaryContact = this.contactRepository.create({
                email,
                phoneNumber,
                linkedId: primaryContact.id,
                linkPrecedence: "secondary"
            });
            await this.contactRepository.save(newSecondaryContact);
            secondaryContacts.push(newSecondaryContact);
        }

        // Collect all unique emails and phone numbers
        const allContacts = [primaryContact, ...secondaryContacts];
        const emails = Array.from(new Set(allContacts.map(c => c.email).filter(Boolean)));
        const phoneNumbers = Array.from(new Set(allContacts.map(c => c.phoneNumber).filter(Boolean)));

        return {
            contact: {
                primaryContatctId: primaryContact.id,
                emails,
                phoneNumbers,
                secondaryContactIds: secondaryContacts.map(c => c.id)
            }
        };
    }
}

module.exports = ContactService; 