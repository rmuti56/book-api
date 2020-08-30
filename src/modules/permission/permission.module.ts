import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './repositories/group.repository';
import { MenuService } from './services/menu.service';
import { MenuController } from './controllers/menu.controller';
import { MenuRepository } from './repositories/menu.repository';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';
import { PageService } from './services/page.service';
import { PageController } from './controllers/page.controller';
import { PageRepository } from './repositories/page.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository, MenuRepository,PageRepository])],
  providers: [MenuService, GroupService, PageService],
  controllers: [MenuController, GroupController, PageController],
})
export class PermissionModule {}
