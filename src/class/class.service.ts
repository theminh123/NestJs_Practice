import { BadRequestException,Injectable, NotFoundException } from '@nestjs/common';
import { classDto } from './dto/classDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import {  Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { CLASS_EXISTS, CLASS_EXISTS_STUDENT, CLASS_NOT_FOUND } from 'src/error/constants';


@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getClasses() : Promise<Class[]> {
    return await this.classRepository.find();
  }

  async create(classDto: classDto) {

    const isClassExist = await this.classRepository.findOne({where: {className: classDto.className}});

    if(isClassExist){
      throw new BadRequestException(CLASS_EXISTS);
    }
    const newClass = this.classRepository.create({
      className: classDto.className
    });
    return await this.classRepository.save(newClass);
  }

  async update(id: string, classDto: classDto) {
    const cla = await this.classRepository.findOne({where: {id: id}});

    if(!cla){
      throw new NotFoundException(CLASS_NOT_FOUND);
    }

    const isClassExist = await this.classRepository.findOne({where: {className: classDto.className}});
    if(isClassExist){
      throw new BadRequestException(CLASS_EXISTS);
    }

    return await this.classRepository.update(cla, {className: classDto.className});
      
  }

  async getClassByID(id: string) {
    const cla = await this.classRepository.findOne({where: {id: id}});

    if(!cla){
      throw new NotFoundException(CLASS_NOT_FOUND);
    }
    return cla;
  }

  async delete(id: string){
    const cla = await this.classRepository.findOne({where: {id: id}});

    if(!cla){
      throw new NotFoundException(CLASS_NOT_FOUND);
    }

    const studentInClass = await this.studentRepository.count({where:  {className: cla.className}});
    if(studentInClass > 0){
      throw new BadRequestException(CLASS_EXISTS_STUDENT);
    }

    return await this.classRepository.remove(cla);
  }
}
