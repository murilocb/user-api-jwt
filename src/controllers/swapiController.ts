import { Request, Response } from "express";
import { swapiService } from "../services/swapiService";

export const getCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const character = await swapiService.getCharacter(Number(id));
    return res.json(character);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      if (error.message === "Character not found") {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const searchCharacters = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const characters = await swapiService.searchCharacters(query);
    return res.json(characters);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
