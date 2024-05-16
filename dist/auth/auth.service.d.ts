import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "src/dtos";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | "Email already exists">;
    login(loginDto: LoginDto): Promise<"User not found" | "Invalid password" | {
        accessToken: string;
    } | "Something went wrong">;
    signToken(userID: string, email: string): Promise<{
        accessToken: string;
    }>;
}
