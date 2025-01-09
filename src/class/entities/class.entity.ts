import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity} from "typeorm";

@Entity()
@ObjectType()
export class Class extends AbstractEntity<Class> {

  @Field()
  @Column({unique: true})
  className: string;
  
}