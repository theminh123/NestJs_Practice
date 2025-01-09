import  { StudentService } from './student.service';
import { StudentDto } from './dto/studentDto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enum/roles.enum';
import { Student } from './entities/student.entity';
import { Args, Mutation, Resolver, Query} from '@nestjs/graphql';


@Resolver(() => Student)
export class StudentResolver{
  constructor(private readonly studentService: StudentService) {}
 

  @Roles(Role.Teacher, Role.Admin)
  @Mutation(() => Student)
  async createStudent(@Args('student')  studentDto: StudentDto) {
    return await this.studentService.create(studentDto);
  }

  @Roles(Role.Teacher, Role.Admin)
  @Mutation(() => Student)
  async updateStudent(@Args('id') id: string, @Args('student') studentDto: StudentDto) {
    return await  this.studentService.update(id, studentDto);
  }   

  
  @Roles(Role.Principal, Role.Teacher, Role.Admin)
  @Query(() => [Student])
  async getAllStudent(): Promise<Student[]> {
    return await  this.studentService.getAllStudent();
  }

  @Roles(Role.Teacher, Role.Admin)
  @Query(() => Student)
  async getStudentByID(@Args('id') id: string): Promise<Student> {
    return await  this.studentService.getStudentByID(id);
  }

  @Roles(Role.Teacher, Role.Admin)
  @Query(() => [Student])
  async getStudentByName(@Args('studentName') studentName: string): Promise<Student[]> {
    return await  this.studentService.getStudentByName(studentName);
  }


  @Roles(Role.Teacher, Role.Admin)
  @Query(() => [Student])
  async getStudentByClassName(@Args('className') className: string): Promise<Student[]> {
    return await  this.studentService.getStudentByClassName(className);
  }

  @Roles(Role.Teacher, Role.Admin)
  @Mutation(() => Student)
  async deleteStudent(@Args('id') id: string) {
    return await this.studentService.delete(id);
  }
}

