import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Student } from 'src/student/entities/student.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Class, Student])],
  providers: [ClassService],
  controllers: [ClassController],

})
export class ClassModule {}
