import { on } from "events";
import { Class } from "src/class/entities/class.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";

@Entity()
export class Student extends AbstractEntity<Student> {

  @Column()
  studentName: string;

  @Column()
  @ManyToOne(() => Class, (cla) => cla.className, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: 'className', referencedColumnName: 'className' })
  className: string;

}