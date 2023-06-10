import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { GameService } from '../services/game.service'
import { CreateGameInput, Game, GameInput, PaginatedGameResponse } from '../schema/game.schema'
import { UserRole } from '../enums/user-role'

@Resolver()
export class GameResolver {

  constructor(private gameService: GameService) {
    this.gameService = new GameService()
  }

  @Query(() => PaginatedGameResponse)
  async games(@Args()paginatedInput: PaginationInput):Promise<PaginatedGameResponse> {
    return this.gameService.getGames(paginatedInput)
  }

  @Query(() => Game)
  async game(@Arg('_id') _id: string):Promise<Game> {
    return this.gameService.getGame(_id)
  }
  
  @Authorized([UserRole.ADMIN, UserRole.DEVELOPER])
  @Mutation(() => Game)
  async createGame(@Arg('game') game: CreateGameInput):Promise<Game> {
    return this.gameService.createGame(game)
  }

  @Authorized([UserRole.ADMIN, UserRole.DEVELOPER])
  @Mutation(() => Game)
  async deleteGame(@Arg('_id') _id: string):Promise<Game> {
    return this.gameService.deleteGame(_id)
  }

  @Authorized([UserRole.ADMIN, UserRole.DEVELOPER])
  @Mutation(() => Game)
  async updateGame(@Arg('_id') _id: string,
                   @Arg('game') game: GameInput):Promise<Game> {
    return this.gameService.updateGame(_id, game)
  }
}