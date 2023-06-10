import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'
import { IsDate, MinLength } from 'class-validator'
import { Types } from 'mongoose'
import { ObjectIdScalar } from '../object-id.scalar'
import { GameGenre } from '../enums/game-genre'
import { Developer } from './developer.schema'

registerEnumType(GameGenre, {name: 'GameGenre' });

@ObjectType()
export class Game extends BaseModel {

    @Prop({ required: true })
    @Field()
      title: string

    @Prop({ type: [String], enum: GameGenre })
    @Field(() => [GameGenre])
      genre: GameGenre[]

    @Field(() => Developer)
    @Prop({ ref: Developer, required: true })
      developer: Ref<Developer, Types.ObjectId>

    @Prop()
    @Field({ nullable:true })
      franchise?: string

    @Field(() => Date)
    @Prop({ required: true })
      releaseDate: Date
}

export const GameModel = getModelForClass(Game,
  { schemaOptions: { timestamps: true },
  })

  @InputType()
  export class GameInput {

    @MinLength(3)
    @Field()
      title: string

    @Field(() => GameGenre)
      genre: GameGenre

    @MinLength(3)
    @Field({ nullable:true })
      franchise?: string

    @IsDate()
    @Field(() => Date)
      releaseDate: Date
  }
  
  @InputType()
  export class CreateGameInput extends GameInput {

    @Field(() => ObjectIdScalar)
    developer:Ref<Developer, Types.ObjectId>
  }

  @ObjectType()
  export class PaginatedGameResponse extends PaginatedResponse(Game){}
