import { EntityRepository, Repository } from 'typeorm';

import { Menu } from '../entities/menu.entity';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
  async createMenu(createMenuDto: CreateMenuDto) {
    const menu = this.create(createMenuDto);
    return await this.save(menu);
  }

  async updateMenu(menuId: string,updateMenuDto: UpdateMenuDto) {
    return await this.save({
      id: menuId,
      ...updateMenuDto
    });
  }
}
