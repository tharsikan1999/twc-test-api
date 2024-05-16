import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "src/dtos";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(registerDto: RegisterDto) {
    // Hash the password
    registerDto.password = await argon2.hash(registerDto.password);
    // Create a new user
    try {
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: registerDto.password,
        },
      });

      // Remove password from the response
      delete user.password;

      return user;
    } catch (e) {
      if (e.code === "P2002") {
        return "Email already exists";
      }
      throw e;
    }
  }
}
