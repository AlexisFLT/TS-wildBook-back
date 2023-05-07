import { Entity, Column, PrimaryGeneratedColumn, OneToMany,  } from "typeorm"
import { Grade } from "./Grade";

@Entity()
export class Wilder{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @OneToMany(() => Grade, (grade) => grade.wilder) // Relation entre Wilder et Grade => un Wilder peut avoir plusieurs Grades et chaque Grade appartient à un Wilder spécifique
  public grades: Grade[] // tableau de de notes 'grades' défini come public

  // @OneToMany(() => *classe entité associée*, (*entité associée*) => *retourne la propriété dans la classe associée qui relie les deux entités* ) 
  // public grades: Grade[]
  
  @Column()
  city:string;
}