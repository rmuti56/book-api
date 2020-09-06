import { EntityRepository, Repository } from "typeorm";
import { Group } from "../entities/group.entity";
import {CreateGroupDto} from '../dto/create-group.dto'
import { ConflictException } from "@nestjs/common";
import { UpdateGroupDto } from "../dto/update-group.dto";

@EntityRepository(Group)
export class GroupRepository extends Repository<Group>{

  async createGroup(createGroupDto:CreateGroupDto){
    try{
      const group = this.create({
        name: createGroupDto.name,
        permission: createGroupDto.permission
      })
      return await this.save(group)
    }catch(error){
      throw new ConflictException('group_name_exist')
    }
  }

  async updateGroup(groupId: string,updateGroupDto: UpdateGroupDto){
    return await this.save({
      id: groupId,
      ...updateGroupDto
    })
  }
}