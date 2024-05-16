"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async register(registerDto) {
        registerDto.password = await argon2.hash(registerDto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: registerDto.email,
                    password: registerDto.password,
                },
            });
            delete user.password;
            return user;
        }
        catch (e) {
            if (e.code === "P2002") {
                return "Email already exists";
            }
            throw e;
        }
    }
    async login(loginDto) {
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
            delete user.password;
            return this.signToken(user.id, user.email);
        }
        catch (e) {
            return "Something went wrong";
        }
    }
    async signToken(userID, email) {
        const data = { userID, email };
        const secret = this.config.get("JWT_SECRET");
        const token = await this.jwt.signAsync(data, {
            expiresIn: "10m",
            secret: secret,
        });
        return { accessToken: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map