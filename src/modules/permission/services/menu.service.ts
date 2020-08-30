import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuRepository } from "../repositories/menu.repository";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuRepository)
    private readonly menuRepository: MenuRepository

  ){}

  async getMenus(){
    return await this.menuRepository.find()
  }


}