import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { StudentService } from 'src/student/student.service';


@Module({
  providers: [ClassService, StudentService],
  controllers: [ClassController],

})
export class ClassModule {}
