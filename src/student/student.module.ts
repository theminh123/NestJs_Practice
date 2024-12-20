import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ClassService } from 'src/class/class.service';

@Module({
  providers: [StudentService, ClassService],
  controllers: [StudentController]
})
export class StudentModule {}
