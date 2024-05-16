import { AuthService } from "./auth.service";
import { RegisterDto } from "src/auth/dtos";
import { LoginDto } from "src/auth/dtos";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
