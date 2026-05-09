import { IsNotEmpty, IsString } from "class-validator";

export class CreateFormDto {
    @IsString()
    @IsNotEmpty()
    fullName : string;

    @IsString()
    email : string;

    @IsString()
    @IsNotEmpty()
    businessName : string;

    @IsString()
    @IsNotEmpty()
    businessEmail : string;

    @IsString()
    @IsNotEmpty()
    phoneNumber : string;

    @IsString()
    @IsNotEmpty()
    city : string; 

    @IsString()
    @IsNotEmpty()
    postalCode : string

}