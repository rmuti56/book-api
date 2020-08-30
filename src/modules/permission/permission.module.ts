import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './repositories/group.repository';
import { MenuService } from './services/menu.service';
import { MenuController } from './controllers/menu.controller';
import { MenuRepository } from './repositories/menu.repository';

@Module({
  imports:[TypeOrmModule.forFeature([GroupRepository,MenuRepository])],
  providers: [MenuService],
  controllers: [MenuController]
})
export class PermissionModule {}
