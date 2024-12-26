import { AbstractEntity } from "src/database/abstract.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, Entity, OneToMany} from "typeorm";

@Entity()
export class Class extends AbstractEntity<Class> {

  @Column({unique: true})
  className: string;
  
}