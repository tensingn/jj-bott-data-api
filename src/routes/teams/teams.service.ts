import { Injectable } from '@nestjs/common';
import { TeamModel } from '@tensingn/jj-bott-models';

@Injectable()
export class TeamsService {
  create(team: TeamModel) {
    return 'This action adds a new team';
  }

  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: string) {
    return `This action returns a #${id} team`;
  }

  update(id: string, team: TeamModel) {
    return `This action updates a #${id} team`;
  }

  remove(id: string) {
    return `This action removes a #${id} team`;
  }
}
