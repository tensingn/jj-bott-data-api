import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerGameDto } from './create-player-game.dto';

export class UpdatePlayerGameDto extends PartialType(CreatePlayerGameDto) {}
