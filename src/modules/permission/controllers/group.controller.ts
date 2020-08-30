import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GroupService } from "../services/group.service";
import { CreateGroupDto } from "../dto/create-group.dto";

@Controller('group')
@ApiTags('group')
export class GroupController {
  constructor(private groupService: GroupService){}

  @Get('groups')
  getGroups(){
    return this.groupService.getGroups()
  }

  @Post()
  createGroup(
    @Body() createGroupDto:CreateGroupDto
  ){
    return this.groupService.createGroup(createGroupDto)
  }


}