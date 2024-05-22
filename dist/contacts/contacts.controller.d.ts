import { ContactsService } from "./contacts.service";
import { ContactDto } from "./Dtos";
export declare class ContactsController {
    private contactService;
    constructor(contactService: ContactsService);
    getContacts(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        gender: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[] | "No contacts found for the provided user. Please create contacts.">;
    addContact(id: string, contact: ContactDto): Promise<string>;
    updateContact(contactId: string, userId: string, contact: ContactDto): Promise<string>;
    deleteContactById(contactId: string, userId: string): Promise<string>;
}
