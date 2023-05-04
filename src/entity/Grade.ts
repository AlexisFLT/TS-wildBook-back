import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,  } from "typeorm"
import { Wilder } from "./Wilder"
import { Skill } from "./Skill"

@Entity()
export class Grade{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public wilderId: number;

  @Column()
  public skillId: number;

  @Column()
  public grade: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  public wilder: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  public skill: Skill;
}