"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContactsService = class ContactsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createContact(id, contact) {
        try {
            const newContact = await this.prisma.contact.create({
                data: {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    gender: contact.gender,
                    userId: id,
                },
            });
            return "Contact created successfully.";
        }
        catch (err) {
            throw new Error("Failed to create contact.");
        }
    }
    async getAllContacts(id) {
        try {
            const contacts = await this.prisma.contact.findMany({
                where: {
                    userId: id,
                },
            });
            if (!contacts || contacts.length === 0) {
                return "No contacts found for the provided user. Please create contacts.";
            }
            return contacts;
        }
        catch (err) {
            throw new Error("Failed to get contacts.");
        }
    }
    async updateContact(contactId, userId, contact) {
        try {
            const existingContact = await this.prisma.contact.findUnique({
                where: {
                    id: contactId,
                },
            });
            if (!existingContact) {
                throw new common_1.NotFoundException("Contact not found.");
            }
            if (existingContact.userId !== userId) {
                throw new Error("You are not authorized to update this contact.");
            }
            await this.prisma.contact.update({
                where: {
                    id: contactId,
                },
                data: {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    gender: contact.gender,
                },
            });
            return "contact updated successfully.";
        }
        catch (error) {
            throw error;
        }
    }
    async deleteContact(contactId, userId) {
        try {
            const contact = await this.prisma.contact.findUnique({
                where: {
                    id: contactId,
                },
            });
            if (!contact) {
                throw new common_1.NotFoundException("Contact not found.");
            }
            if (contact.userId !== userId) {
                throw new Error("You are not authorized to delete this contact.");
            }
            await this.prisma.contact.delete({
                where: {
                    id: contactId,
                },
            });
            return "Contact deleted successfully.";
        }
        catch (err) {
            throw new Error("Failed to delete contact.");
        }
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map