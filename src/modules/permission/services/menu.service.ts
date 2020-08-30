import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuRepository } from '../repositories/menu.repository';
import { GroupRepository } from '../repositories/group.repository';
import { CreateMenuDto } from '../dto/create-menu.dto';

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
    if(groups.length !== createMenuDto.groupIds.length){
      throw new BadRequestException('groupIds_not_found')
    }

    return this.menuRepository.createMenu(createMenuDto)
  }
}
