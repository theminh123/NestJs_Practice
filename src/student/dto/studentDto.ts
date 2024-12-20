import {IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator'
import {v4 as uuidv4} from 'uuid';

export class StudentDto {
  @IsUUID()
  private id: string = uuidv4();
  @IsNotEmpty()
  @IsString()
  private studentName: string;

  @IsOptional()
  private className: string;

  getStudentID() {
    return this.id;
  }

  getStudentName() {
    return this.studentName;
  }

  getStudentClassName() {
    return this.className;
  }
}