import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateNFLGameDto } from './create-nfl-game.dto';

export class BulkCreateNFLGamesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateNFLGameDto)
    nflGames: Array<CreateNFLGameDto>;
}
