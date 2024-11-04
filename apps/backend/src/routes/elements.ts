import { avatars, elements } from "../actions/elements";
import express from "express";

export const elementsRouter = express.Router();
elementsRouter.get("/avatars", avatars);
elementsRouter.get("/elements", elements);