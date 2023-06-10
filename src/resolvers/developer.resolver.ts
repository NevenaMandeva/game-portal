import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { DeveloperService } from '../services/developer.service'
import { BaseDeveloperInput, CreateDeveloperInput, Developer, PaginatedDeveloperResponse } from '../schema/developer.schema'
import { UserRole } from '../enums/user-role'

@Resolver()
export class DeveloperResolver {

  constructor(private developerService: DeveloperService) {
    this.developerService = new DeveloperService()
  }

  @Query(() => PaginatedDeveloperResponse)
  async developers(@Args()paginatedInput: PaginationInput):Promise<PaginatedDeveloperResponse> {
    return this.developerService.getDevelopers(paginatedInput)
  }

  @Query(() => Developer)
    async developer(@Arg('_id') _id: string):Promise<Developer> {
      return this.developerService.getDeveloper(_id)
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Developer)
  async createDeveloper(@Arg('developer') developer: CreateDeveloperInput):Promise<Developer> {
    return this.developerService.createDeveloper(developer)
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Developer)
  async deleteDeveloper(@Arg('_id') _id: string):Promise<Developer> {
    return this.developerService.deleteDeveloper(_id)
  }
  
  @Authorized([UserRole.ADMIN, UserRole.DEVELOPER])
  @Mutation(() => Developer)
  async updateDeveloper(@Arg('_id') _id: string,
                   @Arg('developer') developer: BaseDeveloperInput):Promise<Developer> {
    return this.developerService.updateDeveloper(_id, developer)
  }
}