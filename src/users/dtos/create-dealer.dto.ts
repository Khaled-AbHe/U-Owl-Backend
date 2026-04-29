import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Dealer {
    
    @IsString()
    @IsNotEmpty()
    nomCompagnie: string;

    @IsString()
    @IsNotEmpty()
    adresse: string;

    @IsString()
    @IsNotEmpty()
    disponiblite: string;

    @IsArray()
    @IsString({ each: true})
    imageLieu: string[];

    @IsNumber()
    @IsNotEmpty()
    telephone: number;
}