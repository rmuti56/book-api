import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from '../repositories/group.repository';
import { CreateGroupDto } from '../dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
  ) {}

  async getGroups() {
    return await this.groupRepository.find();
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    return this.groupRepository.createGroup(createGroupDto);
  }
}
