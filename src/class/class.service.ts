import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { classDto } from './dto/classDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';


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

    const isClassExist = await this.classRepository.findOne({where: {className: classDto.getClassName()}});

    if(isClassExist){
      throw new HttpException(
        { message: 'Class already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }
    const newClass = this.classRepository.create({
      className: classDto.getClassName()
    });
    return await this.classRepository.save(newClass);
  }

  async update(id: string, classDto: classDto) {
    const cla = await this.classRepository.findOne({where: {id: id}});

    if(!cla){
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    const isClassExist = await this.classRepository.findOne({where: {className: classDto.getClassName()}});
    if(isClassExist){
      throw new HttpException(
        { message: 'Class already exist.' },
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.classRepository.update(cla, {className: classDto.getClassName()});
      
  }

  async getClassByID(id: string) {
    const cla = await this.classRepository.findOne({where: {id: id}});

    if(!cla){
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }
    return cla;
  }

  async delete(id: string){
    const cla = await this.classRepository.findOne({where: {id: id}});

    if(!cla){
      throw new HttpException(
        { message: 'Class not found.' },
        HttpStatus.NOT_FOUND
      );
    }

    const studentInClass = await this.studentRepository.count({where:  {className: cla.className}});
    if(studentInClass > 0){
      throw new HttpException(
        { message: 'This class still have student.' },
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.classRepository.remove(cla);
  }
}
