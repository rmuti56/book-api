import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;
  
    @IsNotEmpty()
    description: string;
  
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsNotEmpty()
    imageUrl?: string;
}
