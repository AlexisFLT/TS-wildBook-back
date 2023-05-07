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

  @ManyToOne(() => Wilder, (wilder) => wilder.grades, { onDelete: "CASCADE" }) 
  public wilder: Wilder;                                // Chaque instance de la classe Grade est associé à un seul Wilder et un seul Skill

  @ManyToOne(() => Skill, (skill) => skill.grades)
  public skill: Skill;
}