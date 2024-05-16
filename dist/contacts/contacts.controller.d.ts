import { ContactsService } from "./contacts.service";
export declare class ContactsController {
    private contactService;
    constructor(contactService: ContactsService);
    getContacts(): string;
}
