import { Injectable, BadRequestException } from '@nestjs/common';
import { PageRepository } from '../repositories/page.repository';
import { CreatePageDto } from '../dto/create-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from '../repositories/group.repository';
import { UpdatePageDto } from '../dto/update-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageRepository)
    private pageRepository: PageRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async createPage(createPageDto: CreatePageDto) {
    const groups = await this.groupRepository.findByIds(createPageDto.groupIds);
    if (groups.length !== createPageDto.groupIds.length) {
      throw new BadRequestException('group_ids_not_found');
    }
    return this.pageRepository.createPage(createPageDto);
  }

  async updatePage(pageId: string, updatePageDto: UpdatePageDto) {
    const groups = await this.groupRepository.findByIds(updatePageDto.groupIds);
    const page = await this.pageRepository.findOne(pageId);

    if (groups.length !== updatePageDto.groupIds.length) {
      throw new BadRequestException('group_ids_not_found');
    }
    if (!page) {
      throw new BadRequestException('page_not_found');
    }
    return this.pageRepository.updatePage(pageId, updatePageDto);
  }
}
