import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreatePlayerGameDto } from './create-player-game.dto';

export class BulkCreatePlayerGamesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlayerGameDto)
    playerGames: Array<CreatePlayerGameDto>;
}
