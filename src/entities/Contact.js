const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Contact",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        phoneNumber: {
            type: "varchar",
            nullable: true
        },
        email: {
            type: "varchar",
            nullable: true
        },
        linkedId: {
            type: "int",
            nullable: true
        },
        linkPrecedence: {
            type: "enum",
            enum: ["primary", "secondary"],
            default: "primary"
        },
        createdAt: {
            type: "timestamp",
            createDate: true
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true
        },
        deletedAt: {
            type: "timestamp",
            nullable: true,
            deleteDate: true
        }
    }
}); 