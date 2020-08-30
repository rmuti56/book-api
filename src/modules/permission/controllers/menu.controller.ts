import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MenuService } from "../services/menu.service";

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private menuService: MenuService){}

  @Get('menus')
  getMenus(){
    return this.menuService.getMenus()
  }


}