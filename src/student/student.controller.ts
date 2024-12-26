import { Body, Controller, Get, Post, Put, Param, Query, Delete} from '@nestjs/common';
import  { StudentService } from './student.service';
import { StudentDto } from './dto/studentDto';
import { ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enum/roles.enum';
import { Student } from './entities/student.entity';


@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
 
  @Post('/create')
  @Roles(Role.Teacher, Role.Admin)
  create(@Body(new ValidationPipe({ transform: true })) StudentDto: StudentDto){
    return this.studentService.create(StudentDto);
  }

  @Put()
  @Roles(Role.Teacher, Role.Admin)
  update(@Body(new ValidationPipe({ transform: true })) studentDto: StudentDto) {
    return this.studentService.update(studentDto.getStudentID(), studentDto);
  }
  @Get()
  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  getAllStudent(): Promise<Student[]>  {
    return this.studentService.getAllStudent();}

  @Get('searchid')
  @Roles(Role.Teacher, Role.Admin)
  getStudentByID(@Body('id') id: string): Promise<Student> {
    return this.studentService.getStudentByID(id);
  }

  @Get('/searchname')
  @Roles(Role.Teacher, Role.Admin)
  getStudentByName(@Query('name') studentName: string): Promise<Student[]> {
    return this.studentService.getStudentByName(studentName);
  }

  @Get('/searchclass')
  @Roles(Role.Teacher, Role.Admin)
  getStudentByClassName(@Query('className') className: string): Promise<Student[]>  {
    return this.studentService.getStudentByClassName(className);
  }

  @Delete()
  @Roles(Role.Teacher, Role.Admin)
  delete(@Body('id') id: string) {
    return this.studentService.delete(id);
  }
}
