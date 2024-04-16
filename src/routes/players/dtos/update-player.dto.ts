import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsEmpty } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    @IsEmpty()
    id: string;
}
