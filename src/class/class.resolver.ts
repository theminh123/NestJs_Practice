import { ClassService } from './class.service';
import { classDto } from './dto/classDto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enum/roles.enum';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Class } from './entities/class.entity';

@Resolver(() => Class)
export class ClassResolver {
  constructor( private readonly classService: ClassService) {}

  @Roles(Role.Admin, Role.Principal)
  @Mutation(() => Class)
  async createClass(@Args('class') classDto: classDto){
    return await this.classService.create(classDto);
  }

  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  @Query(() => [Class])
  async getClasses() {
    return await this.classService.getClasses();
  }

  @Roles(Role.Admin, Role.Principal)
  @Mutation(() => Class)
  async updateClass(@Args('id') id: string, @Args('class') classDto: classDto) {
    return await this.classService.update(id, classDto);
  }

  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  @Query(() => Class)
  async getClassByID(@Args('id') id: string): Promise<Class> {
    return await this.classService.getClassByID(id);
  }

  @Roles(Role.Admin, Role.Principal)
  @Mutation(() => Class)
  async deleteClass(@Args('id') id: string) {
    return await this.classService.delete(id);
  }

}
