import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "src/dtos";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | "Email already exists">;
}
