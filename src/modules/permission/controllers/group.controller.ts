import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GroupService } from "../services/group.service";

@Controller('group')
@ApiTags('group')
export class GroupController {
  constructor(private groupService: GroupService){}

  @Get('groups')
  getGroups(){
    return this.groupService.getGroups()
  }

  @Post()
  createGroup(){
    return this.groupService.createGroup()
  }


}