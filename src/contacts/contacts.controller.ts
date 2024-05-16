import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { JwtAuthGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { ContactDto } from "./Dtos";

@UseGuards(JwtAuthGuard)
@Controller("contacts")
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Get("all")
  getContacts(@GetUser("id") id: string) {
    return this.contactService.getAllContacts(id);
  }

  @Post("add")
  addContact(@GetUser("id") id: string, @Body() contact: ContactDto) {
    return this.contactService.createContact(id, contact);
  }

  @Put("update/:id")
  updateContact(
    @Param("id") contactId: string,
    @GetUser("id") userId: string,
    @Body() contact: ContactDto
  ) {
    return this.contactService.updateContact(contactId, userId, contact);
  }

  @Delete("delete/:id") // Assuming the route is '/contacts/delete/:id'
  deleteContactById(
    @Param("id") contactId: string,
    @GetUser("id") userId: string
  ) {
    return this.contactService.deleteContact(contactId, userId);
  }
}
