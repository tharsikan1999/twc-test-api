import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

import { PrismaModule } from "./prisma/prisma.module";
import { ContactsModule } from "./contacts/contacts.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ContactsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
