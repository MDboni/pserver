import { Router } from "express";
import { profileController } from "./profile.controler";

const router = Router()


router.post("/post",profileController.createProfile)
// router.get("/",userController.getAllUsers)
// router.get("/:id", userController.getSingaleUser)
// router.put("/:id", userController.updateUser)
// router.delete("/:id", userController.deleteUser)

export const profileRoute = router