import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactsService {
  getContacts() {
    return "All contacts will be returned from here.";
  }
}
