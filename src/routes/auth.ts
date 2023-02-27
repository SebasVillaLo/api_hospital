import { Router } from "express";
import { updatePassword, signin, signup, verifyUser, resetPassword, signup_doctor } from "../middlewares/auth";

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signup_doctor/:tokenHospital', signup_doctor); // hospital registra doctores
router.put('/password_change_doctor/:token', updatePassword);
router.post('/reset_password', resetPassword);
router.put('/reset_password/:token', updatePassword);
router.get('/verifyUser/:token', verifyUser);

export default router;