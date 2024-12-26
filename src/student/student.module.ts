import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Class } from 'src/class/entities/class.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Student, Class])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
