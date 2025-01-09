import { Field, InputType } from '@nestjs/graphql';
import {IsNotEmpty, IsString, IsUUID, MaxLength} from 'class-validator'
import {  CLASS_NAME_INVALID, CLASS_NAME_MAX_LENGTH, CLASS_NAME_REQUIRED } from 'src/error/constants';
import {v4 as uuidv4} from 'uuid';

@InputType()  
export class classDto {

  @Field()
  @IsUUID()
  id: string = uuidv4();

  @Field()
  @IsNotEmpty({message: CLASS_NAME_REQUIRED})
  @IsString({message: CLASS_NAME_INVALID})
  @MaxLength(20, {message: CLASS_NAME_MAX_LENGTH})
  className: string;

}