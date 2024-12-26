import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ClassService } from './class.service';
import { classDto } from './dto/classDto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enum/roles.enum';

@Controller('class')
export class ClassController {
  constructor( private readonly classService: ClassService) {}

  @Post()
  @Roles(Role.Admin, Role.Principal)
  create(@Body(new ValidationPipe({ transform: true })) classDto: classDto) {
    return this.classService.create(classDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  getClasses() {
    return this.classService.getClasses();
  }

  @Put()
  @Roles(Role.Admin, Role.Principal)
  update(@Body(new ValidationPipe({ transform: true })) classDto: classDto) {
    return this.classService.update(classDto.getClassID(), classDto);
  }

  @Get('searchid')
  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  getClassByID(@Body('id') id: string){
    return this.classService.getClassByID(id);
  }

  @Delete()
  @Roles(Role.Admin, Role.Principal)
  delete(@Body("id") id: string) {
    return this.classService.delete(id);
  }

}
