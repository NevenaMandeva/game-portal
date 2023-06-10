import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { CreateGameInput, GameInput, GameModel } from '../schema/game.schema'

export class GameService {
  
  async getGames(paginatedInput: PaginationInput) {
    const developerPaginationServices =
        new PaginationService(
          {
            model: GameModel,
            populate: 'developer',
          })
    return developerPaginationServices.getPaginatedItems(paginatedInput)
  }

  async getGame(_id: string) {
    return GameModel.findById(_id).populate('developer').lean()
  }

  async createGame(game: CreateGameInput) {
    const createdGame = await GameModel.create(game)
    return createdGame.populate('developer')
  }

  async deleteGame(_id: string) {
    return GameModel.findByIdAndRemove(_id).populate('developer')
  }

  async updateGame(_id: string, game: GameInput) {
    return GameModel.findByIdAndUpdate(_id, game, { new: true }).populate('developer')
  }
}