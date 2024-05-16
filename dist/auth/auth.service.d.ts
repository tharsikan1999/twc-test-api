import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "src/dtos";
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
    login(loginDto: LoginDto): Promise<"User not found" | "Invalid password" | "Logged in" | "Something went wrong">;
}
