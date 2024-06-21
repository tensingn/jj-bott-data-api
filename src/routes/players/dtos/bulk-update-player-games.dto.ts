import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { UpdatePlayerGameDto } from './update-player-game.dto';

export class BulkUpdatePlayerGamesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePlayerGameDto)
    playerGames: Array<UpdatePlayerGameDto>;
}
