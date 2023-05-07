import { Request, Response } from "express";
import dataSource from "../utils";
import { Grade } from "../entity/Grade";
import { Wilder } from "../entity/Wilder";


const wilderController = {
  create: (req: Request, res: Response) => {
    dataSource
      .getRepository(Wilder)
      .save(req.body)
      .then(() => {
        res.send("Wilder Created");
      })
      .catch((err) => {
        console.log("error", err);
        res.send("Error while creating the Wilder");
      });
  },
  read: async (req: Request, res: Response) => {
    try {
      const wilders = await dataSource.manager.find(Wilder, {
        relations: {
          grades: {
            skill: true,
          },
        },
      });
      res.send(wilders);
    } catch (err) {
      console.log(err);
      res.send("Error while getting the wilders");
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
