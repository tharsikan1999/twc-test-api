import { Controller, Get, UseGuards } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { JwtAuthGuard } from "src/auth/guard";

@Controller("contacts")
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get("all")
  getContacts() {
    return this.contactService.getContacts();
  }
}
