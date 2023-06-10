import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { BaseDeveloperInput, CreateDeveloperInput, DeveloperModel } from '../schema/developer.schema'

export class DeveloperService {
  
  async getDevelopers(paginatedInput: PaginationInput) {
    const developerPaginationServices =
        new PaginationService({ model:  DeveloperModel })
    return developerPaginationServices.getPaginatedItems(paginatedInput)
  }

  async getDeveloper(_id: string) {
    return DeveloperModel.findById(_id).lean()
  }

  async createDeveloper(developer: CreateDeveloperInput) {
    return DeveloperModel.create(developer)
  }

  async deleteDeveloper(_id: string) {
    return DeveloperModel.findByIdAndRemove(_id)
  }

  async updateDeveloper(_id: string, developer: BaseDeveloperInput) {
    return DeveloperModel.findByIdAndUpdate(_id, developer, { new: true })
  }
}