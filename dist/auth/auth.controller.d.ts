import { AuthService } from "./auth.service";
import { RegisterDto } from "src/dtos";
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
}
