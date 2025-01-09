import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { StudentDto } from './dto/studentDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { CLASS_NOT_FOUND, STUDENT_EXISTS, STUDENT_NOT_FOUND } from 'src/error/constants';



@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}


  async create(studentDto: StudentDto) {
    const isClassExist = await this.classRepository.findOne({ where: { className: studentDto.className } });

    if (!isClassExist) {
      throw new NotFoundException(CLASS_NOT_FOUND);
    }
    const isStudentExist = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.studentName) = LOWER(:studentName)', { studentName: studentDto.studentName })
    .getOne();
  

    if (isStudentExist) {
      throw new BadRequestException(STUDENT_EXISTS);
    }

    const student = this.studentRepository.create({
      studentName: studentDto.studentName,
      className: studentDto.className,
    })

    return await this.studentRepository.save(student)
  }

   async update(id: string,studentDto: StudentDto) {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('student.id = :id', { id })
    .getOne();

    if(!student){
      throw new NotFoundException(STUDENT_NOT_FOUND);
    }

    const isClassExist = await this.classRepository.findOne({ where: { className: studentDto.className} });
    if (!isClassExist) {
      throw new NotFoundException(CLASS_NOT_FOUND);
    }

    const isStudentExist = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.studentName) = LOWER(:studentName)', { studentName: studentDto.studentName })
    .getOne();

    if (isStudentExist) {
      throw new BadRequestException(STUDENT_EXISTS);
    }

    student.studentName = studentDto.studentName;
    student.className = studentDto.className;    

     return await this.studentRepository.save(student);
  }

  async delete(id: string) {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('student.id = :id', { id })
    .getOne();

    if(!student){
      throw new NotFoundException(STUDENT_NOT_FOUND);
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
      throw new NotFoundException(STUDENT_NOT_FOUND);
    }
    return student;
  }

  async getStudentByName(studentName: string): Promise<Student[]> {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.studentName) LIKE :studentName', { studentName: `%${studentName.toLowerCase()}` })
    .getMany();

    if(student.length == 0){
      throw new NotFoundException(STUDENT_NOT_FOUND);
    }
    return student;
  }

  async getStudentByClassName(className: string): Promise<Student[]> {
    const student = await this.studentRepository
    .createQueryBuilder('student')
    .where('LOWER(student.className) LIKE :className', { className: `%${className.toLowerCase()}%` }) 
    .getMany();

    if(student.length == 0){
      throw new NotFoundException(STUDENT_NOT_FOUND);
    }
    return student;
  }

  
}
