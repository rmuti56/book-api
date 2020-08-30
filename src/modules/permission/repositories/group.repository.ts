import { EntityRepository, Repository } from "typeorm";
import { Group } from "../entities/group.entity";
import {CreateGroupDto} from '../dto/create-group.dto'
import { ConflictException } from "@nestjs/common";

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
}