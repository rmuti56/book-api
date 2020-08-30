import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GroupService } from "../services/group.service";
import { CreateGroupDto } from "../dto/create-group.dto";
import { Auth } from "src/common/decorators/auth.decorator";
import { Scope } from "src/common/enums/scope.enum";

@Auth([Scope.SUPER_ADMIN])
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