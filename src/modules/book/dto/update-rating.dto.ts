import { IsNumber, Max, Min } from "class-validator";

export class UpdateRatingDto{
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number
}