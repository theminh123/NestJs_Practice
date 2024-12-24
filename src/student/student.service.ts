import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { StudentDto } from './dto/studentDto';
import {v4 as uuidv4} from 'uuid';
import { ClassService } from '../class/class.service';


export interface Student {
  id: string;
  studentName: string;
  className: string;
}
@Injectable()
export class StudentService {
  private students: Student[] = [
    {
      id: uuidv4(),
      studentName: 'Minh',
      className: 'Math'
    },
    {
      id: uuidv4(),
      studentName: 'John',
      className: 'Science'
    }
  ];

  constructor(private classService: ClassService) {}
  create(studentDto: StudentDto) {
    const isClassExist =  this.classService.getClasses().some(c => c.className === studentDto.getStudentClassName());
    if (!isClassExist) {
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    const isStudentExist = this.students.some(s => s.studentName === studentDto.getStudentName());
    if (isStudentExist) {
      throw new HttpException(
        { message: 'Student already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }
    this.students.push({
      id: uuidv4(),
      studentName: studentDto.getStudentName(),
      className: studentDto.getStudentClassName(),
    });
    return this.students;
  }

  update(id: string,studentDto: StudentDto) {
    const studentIndex = this.students.findIndex(s => s.id === id);
    if(studentIndex === -1){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    this.students[studentIndex] = {
      ...this.students[studentIndex],
      studentName: studentDto.getStudentName(),
      className: studentDto.getStudentClassName()
    }

    const isClassExist =  this.classService.getClasses().some(c => c.className === studentDto.getStudentClassName());
    if (!isClassExist) {
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    const isStudentExist = this.students.some(s => s.studentName === studentDto.getStudentName());
    if (isStudentExist) {
      throw new HttpException(
        { message: 'Student already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }
    return this.students;
  }

  delete(id: string) {
    const studentIndex = this.students.findIndex(s => s.id === id);    
    if(studentIndex === -1){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    this.students.splice(studentIndex, 1);
  }

  getAllStudent(): Student[] {
    return this.students;
  }

  getStudentByID(id: string) {
    const student = this.students.find(s => s.id === id);
    if(!student){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return student;
  }

  getStudentByName(studentName: string) {
    const student = this.students.filter(s => s.studentName.toLowerCase() === studentName.toLowerCase());
    if(student.length === 0){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return student;
  }

  getStudentByClassName(className: string) {
    const student = this.students.filter(s => s.className.toLowerCase() === className.toLowerCase());
    if(student.length === 0){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return student;
  }

  
}
