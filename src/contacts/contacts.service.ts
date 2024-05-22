import { Injectable, NotFoundException } from "@nestjs/common";
import { ContactDto } from "./Dtos";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  // Create a new contact
  async createContact(id: string, contact: ContactDto) {
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
    } catch (err) {
      throw new Error("Failed to create contact.");
    }
  }

  // Retrieve all contacts
  async getAllContacts(id: string) {
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
    } catch (err) {
      throw new Error("Failed to get contacts.");
    }
  }

  // Update a contact
  async updateContact(contactId: string, userId: string, contact: ContactDto) {
    try {
      const existingContact = await this.prisma.contact.findUnique({
        where: {
          id: contactId,
        },
      });

      if (!existingContact) {
        throw new NotFoundException("Contact not found.");
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
    } catch (error) {
      throw error;
    }
  }

  // Delete a contact
  async deleteContact(contactId: string, userId: string) {
    try {
      const contact = await this.prisma.contact.findUnique({
        where: {
          id: contactId,
        },
      });

      if (!contact) {
        throw new NotFoundException("Contact not found.");
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
    } catch (err) {
      throw new Error("Failed to delete contact.");
    }
  }
}
