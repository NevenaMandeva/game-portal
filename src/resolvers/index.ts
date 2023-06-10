import { UserResolver } from './user.resolver'
import { DeveloperResolver } from './developer.resolver'
import { GameResolver } from './game.resolver'
export const resolvers = [
  UserResolver,
  DeveloperResolver,
  GameResolver,
] as const