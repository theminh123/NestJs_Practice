import {IsNotEmpty, IsString, IsUUID} from 'class-validator'
import {v4 as uuidv4} from 'uuid';

export class classDto {
  @IsUUID()
  private id: string = uuidv4();
  @IsNotEmpty()
  @IsString()
  private className: string;

  getClassID() {
    return this.id;
  }

  getClassName() {
    return this.className;
  }
}