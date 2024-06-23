import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { UserModel } from '@tensingn/jj-bott-models';
import { USERS_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Module({
    imports: [FirebaryModule.forFeatures([UserModel], USERS_COLLECTION_NAME)],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
