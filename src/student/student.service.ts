import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { StudentDto } from './dto/studentDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';



@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}


  async create(studentDto: StudentDto) {
    const isClassExist = await this.classRepository.findOne({ where: { className: studentDto.getStudentClassName() } });

    if (!isClassExist) {
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    const isStudentExist = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.studentName) = LOWER(:studentName)', { studentName: studentDto.getStudentName() })
    .getOne();
  

    if (isStudentExist) {
      throw new HttpException(
        { message: 'Student already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }

    const student = this.studentRepository.create({
      studentName: studentDto.getStudentName(),
      className: studentDto.getStudentClassName() ,
    })

    return await this.studentRepository.save(student)
  }

   async update(id: string,studentDto: StudentDto) {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('student.id = :id', { id })
    .getOne();

    if(!student){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    const isClassExist = await this.classRepository.findOne({ where: { className: studentDto.getStudentClassName() } });
    if (!isClassExist) {
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    const isStudentExist = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.studentName) = LOWER(:studentName)', { studentName: studentDto.getStudentName() })
    .getOne();

    if (isStudentExist) {
      throw new HttpException(
        { message: 'Student already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }

    student.studentName = studentDto.getStudentName();
    student.className = studentDto.getStudentClassName();    

     return await this.studentRepository.save(student);
  }

  async delete(id: string) {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('student.id = :id', { id })
    .getOne();

    if(!student){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return await this.studentRepository.remove(student);
  }

   async getAllStudent(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudentByID(id: string) {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('student.id = :id', { id })
    .getOne();

    if(!student){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return student;
  }

  async getStudentByName(studentName: string): Promise<Student[]> {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.studentName) LIKE :studentName', { studentName: `%${studentName.toLowerCase()}` })
    .getMany();

    if(student.length == 0){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return student;
  }

  async getStudentByClassName(className: string): Promise<Student[]> {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.className) LIKE :className', { className: `%${className.toLowerCase()}%` }) 
    .getMany();

    if(student.length == 0){
      throw new HttpException(
        { message: 'Student not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return student;
  }

  
}
