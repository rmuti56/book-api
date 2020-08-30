import { EntityRepository, Repository } from "typeorm";

import { Menu } from "../entities/menu.entity";
import { CreateMenuDto } from "../dto/create-menu.dto";

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu>{

    async createMenu(createMenuDto:CreateMenuDto){
        const menu = this.create(createMenuDto)
        return await this.save(menu)
    }
}