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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const contacts_service_1 = require("./contacts.service");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
const Dtos_1 = require("./Dtos");
let ContactsController = class ContactsController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    getContacts(id) {
        return this.contactService.getAllContacts(id);
    }
    addContact(id, contact) {
        return this.contactService.createContact(id, contact);
    }
    updateContact(contactId, userId, contact) {
        return this.contactService.updateContact(contactId, userId, contact);
    }
    deleteContactById(contactId, userId) {
        return this.contactService.deleteContact(contactId, userId);
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "getContacts", null);
__decorate([
    (0, common_1.Post)("add"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Dtos_1.ContactDto]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "addContact", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, decorator_1.GetUser)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Dtos_1.ContactDto]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, decorator_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "deleteContactById", null);
exports.ContactsController = ContactsController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Controller)("contacts"),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService])
], ContactsController);
//# sourceMappingURL=contacts.controller.js.map