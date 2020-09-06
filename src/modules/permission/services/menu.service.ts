import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuRepository } from '../repositories/menu.repository';
import { GroupRepository } from '../repositories/group.repository';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuRepository)
    private readonly menuRepository: MenuRepository,
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
  ) {}

  async getMenus() {
    return await this.menuRepository.find();
  }

  async createMenu(createMenuDto: CreateMenuDto) {
    const groups = await this.groupRepository.findByIds(createMenuDto.groupIds);
    if (groups.length !== createMenuDto.groupIds.length) {
      throw new BadRequestException('group_ids_not_found');
    }

    return this.menuRepository.createMenu(createMenuDto);
  }

  async updateMenu(menuId: string, updateMenuDto: UpdateMenuDto) {
    const groups = await this.groupRepository.findByIds(updateMenuDto.groupIds);
    const menu = await this.menuRepository.findOne(menuId);

    if (groups.length !== updateMenuDto.groupIds.length) {
      throw new BadRequestException('group_ids_not_found');
    }
    if (!menu) {
      throw new BadRequestException('page_not_found');
    }
    return this.menuRepository.updateMenu(menuId, updateMenuDto);
  }
}
