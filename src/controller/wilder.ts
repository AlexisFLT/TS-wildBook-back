import { Request, Response } from "express";
import dataSource from "../utils";
import { Grade } from "../entity/Grade";
import { Wilder } from "../entity/Wilder";


const wilderController = {
  create: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      console.log(error);
      res.send("Error while creating wilder");
    }
  },
  read: async (req: Request, res: Response) => {
    console.log("log");
    
    try {
      const grades = await dataSource.getRepository(Grade).find({relations: {wilder: true, skill: true}});
      console.log(grades);
      const wilders = await dataSource.getRepository(Wilder).find();
      console.log("wilders", wilders);
      const data = wilders.map((wilder) => {
        const wilderGrades = grades.filter(
          (grade) => grade.wilder.id=== wilder.id
        );
        const wilderGradesLean = wilderGrades.map((el) => {
          console.log(el, "mesage");
          
          return { title: el.skill.name, votes: el.grade };
        });
        const result = {
          ...wilder,
          skills: wilderGradesLean,
        };
        console.log(result);
        return result;
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send("error while querying wilders");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Grade).delete(req.params.id);
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.send("error while deleting wilder");
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("error while updating wilder");
    }
  },
};


export default wilderController;
