import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserDto {
    @IsNumberString()
    id: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    teamName: string;
}
