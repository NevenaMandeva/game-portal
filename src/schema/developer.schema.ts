import { Field, InputType, ObjectType } from 'type-graphql'
import { getModelForClass, prop as Prop } from '@typegoose/typegoose'
import { IsDate, MinLength } from 'class-validator'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'

@ObjectType()
export class Developer extends BaseModel {

    @Prop({ required: true })
    @Field()
      name: string

    @Field(() => Date)
    @Prop({ required: true })
      founded: Date

    @Prop({ required: true })
    @Field()
      website: string

    @Prop()
    @Field({ nullable:true })
      revenue?: number

    @Prop()
    @Field({ nullable:true })
      numberOfEmployees?: number
}

export const DeveloperModel = getModelForClass(Developer,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class BaseDeveloperInput {

    @MinLength(3)
    @Field()
      name: string

    @Field()
      website: string

    @Field({ nullable:true })
      revenue?: number

    @Field({ nullable:true })
      numberOfEmployees?: number
  
}

@InputType()
export class CreateDeveloperInput extends BaseDeveloperInput {

    @IsDate()
    @Field(() => Date)
      founded: Date
}

@ObjectType()
export class PaginatedDeveloperResponse extends PaginatedResponse(Developer){}