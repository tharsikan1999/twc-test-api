import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "src/auth/dtos";
import * as argon2 from "argon2";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
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

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: loginDto.email,
        },
      });
      if (!user) {
        return "User not found";
      }
      const valid = await argon2.verify(user.password, loginDto.password);
      if (!valid) {
        return "Invalid password";
      }
      // Remove password from the response
      delete user.password;
      return this.signToken(user.id, user.email);
    } catch (e) {
      return "Something went wrong";
    }
  }

  async signToken(
    userID: string,
    email: string
  ): Promise<{ accessToken: string }> {
    const data = { userID, email };
    const secret = this.config.get<string>("JWT_SECRET");
    const token = await this.jwt.signAsync(data, {
      expiresIn: "1h",
      secret: secret,
    });

    return { accessToken: token };
  }
}
