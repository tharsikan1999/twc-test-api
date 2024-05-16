import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
declare const jwtStrategy_base: new (...args: any[]) => any;
export declare class jwtStrategy extends jwtStrategy_base {
    private prismaService;
    constructor(config: ConfigService, prismaService: PrismaService);
    validate(payload: {
        userID: string;
        email: string;
    }): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
