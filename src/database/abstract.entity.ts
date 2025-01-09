import { Field, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class AbstractEntity<T> {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}