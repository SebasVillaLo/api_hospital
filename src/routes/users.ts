import {updateUser, deleteUser, getUser, getUsers } from "../middlewares/users";
import { Router } from "express";

const routes = Router();

routes.put("/users_update/:token", updateUser);
routes.delete("/users_delete/:token", deleteUser);
routes.get("/user_get/:token", getUser);
routes.get("/users_get", getUsers);

export default routes;