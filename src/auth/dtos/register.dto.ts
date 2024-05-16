import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(20, {})
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
      always: true, // Suppress other error messages
    }
  )
  password: string;
}
