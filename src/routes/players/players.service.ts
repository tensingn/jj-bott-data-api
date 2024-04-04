import { Injectable } from '@nestjs/common';
import { PlayerModel } from '@tensingn/son-of-botker-models';

@Injectable()
export class PlayersService {
  create(player: PlayerModel) {
    return 'This action adds a new player';
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: string) {
    return `This action returns a #${id} player`;
  }

  update(id: string, player: PlayerModel) {
    return `This action updates a #${id} player`;
  }

  remove(id: string) {
    return `This action removes a #${id} player`;
  }
}
