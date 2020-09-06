import { EntityRepository, Repository } from "typeorm";

import { Page } from '../entities/page.entity'
import { CreatePageDto }  from '../dto/create-page.dto'
import { UpdatePageDto } from "../dto/update-page.dto";

@EntityRepository(Page)
export class PageRepository extends Repository<Page>{

  async createPage (createPageDto: CreatePageDto) {
    const page = this.create(createPageDto)
    return await this.save(page)
  }

  async updatePage (pageId: string ,updatePageDto: UpdatePageDto) {
    return await this.save({
      id: pageId,
      ...updatePageDto
    })
  }
}

