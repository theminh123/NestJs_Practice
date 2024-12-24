import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import { classDto } from './dto/classDto';
import { StudentService } from 'src/student/student.service';

export interface Class {
  id: string;
  className: string;
}
@Injectable()
export class ClassService {

  private classes: Class[] = [
    {
      id: uuidv4(),
      className: 'Math'
    }
  ]


  getClasses() : Class[] {
    return this.classes;
  }

  create(classDto: classDto) {
    const isClassExist = this.classes.some(c => c.className === classDto.getClassName());
    if(isClassExist){
      throw new HttpException(
        { message: 'Class already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }

    this.classes.push({
      id: uuidv4(),
      className: classDto.getClassName()
    });    
    return this.classes;
  }

  update(id: string, classDto: classDto) {
    const classIndex = this.classes.findIndex(c => c.id === id);
    if(classIndex === -1){
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    const isClassExist = this.classes.some(c => c.className === classDto.getClassName());
    if(isClassExist){
      throw new HttpException(
        { message: 'Class already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }

    this.classes[classIndex].className = classDto.getClassName();
    return this.classes;
  }

  getClassByID(id: string) {
    const cla = this.classes.find(c => c.id === id);
    if(!cla){
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return cla;
  }

  delete(id: string){
    const classIndex = this.classes.findIndex(c => c.id === id);    
    if(classIndex === -1){
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    this.classes.splice(classIndex, 1);
  }
}
