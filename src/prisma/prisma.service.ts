import { Injectable } from "@nestjs/common";
/* import { ConfigService } from "@nestjs/config";
 */ import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "mysql://root:@127.0.0.1:3306/twc",
        },
      },
    });
  }
}
