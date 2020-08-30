import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MenuService } from "../services/menu.service";
import { CreateMenuDto } from "../dto/create-menu.dto";

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private menuService: MenuService){}

  @Get('menus')
  getMenus(){
    return this.menuService.getMenus()
  }

  @Post()
  createMenu(
    @Body() createMenuDto: CreateMenuDto
  ){
    return this.menuService.createMenu(createMenuDto)
  }


}