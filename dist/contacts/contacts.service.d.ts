import { ContactDto } from "./Dtos";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    createContact(id: string, contact: ContactDto): Promise<string>;
    getAllContacts(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        gender: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[] | "No contacts found for the provided user. Please create contacts.">;
    updateContact(contactId: string, userId: string, contact: ContactDto): Promise<string>;
    deleteContact(contactId: string, userId: string): Promise<string>;
}
