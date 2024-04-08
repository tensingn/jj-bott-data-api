import { IsArray, ValidateNested } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';
import { Type } from 'class-transformer';

export class BulkCreatePlayersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlayerDto)
    players: Array<CreatePlayerDto>;
}
