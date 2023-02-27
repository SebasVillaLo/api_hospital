import { RequestHandler } from "express";
import User from "../model/User";
import CryptoJS from "crypto-js";
import { accessToken, decodeToken, refreshToken } from "../modules/jsonwtgenerator";
import { sendEmail } from "../api_service/send_email";
import { Auth } from "./types/auth.types";

const { SECRET } = process.env;

export const signin: RequestHandler = async (req, res) => {
  const { identification, password } = req.body;

  if (!identification || !password) return res.status(409).json({
    message: 'Parameters requiered'
  });
  try {
    const user = await User.findOne({ identification });
    if (!user) return res.status(401).json({
      message: 'User not found'
    });
    const hashPassword = CryptoJS.AES.decrypt(user.password, SECRET!);
    const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== password) return res.status(401).json({
      message: 'Password incorrect'
    });
    const { __v, ...dataUser } = user;
    const token = accessToken(dataUser);
    const tokenRefresh = refreshToken(dataUser);

    if (user.first_login) return res.status(401).json({
      message: 'Change password',
      url: `https://apihospital.azurewebsites.net/api/password_change_doctor/${token}`
    });

    return res.status(200).json({
      refreshToken: tokenRefresh,
      accessToken: token
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const signup: RequestHandler = async (req, res) => {
  const data = req.body;
  const { identification, email, phone, password, rol, name, address } = data;
  const [verifyUserExists] = await User.find({
    identification,
    email,
    phone
  });
  if (verifyUserExists) return res.status(409).json({
    message: 'User already exists'
  })
  if (!identification || !password || !email || !password || !phone || !name || !address) return res.status(409).json({
    message: 'Parameters requiered'
  });
  const userData = {
    ...data,
    password: CryptoJS.AES.encrypt(password, SECRET!).toString(),
  };

  const token = accessToken(userData, '24h');
  try {
    if (rol === 'Patient') {
      await sendEmail({ recipient: email, subject: 'Verificacion de cuenta', body: `https://apihospital.azurewebsites.net/api/verifyUser/${token}` });
      return res.status(200).json({
        message: 'Email has been sent',
      });
    }
    const newUser = new User(userData);
    await newUser.save();
    return res.status(200).json({
      message: 'User has been created',
      token: token
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const signup_doctor: RequestHandler = async (req, res) => {
  const data = req.body;
  const { identification, email, phone, password, name, address } = data;
  const { tokenHospital } = req.params;
  const [verifyUserExists] = await User.find({
    identification,
    email,
    phone
  });
  if (verifyUserExists) return res.status(409).json({
    message: 'User already exists'
  })
  if (!identification || !password || !email || !password || !phone || !name || !address) return res.status(409).json({
    message: 'Parameters requiered'
  });
  const hospitalToken = await decodeToken(tokenHospital) as Auth;
  const hospitalData = await User.findOne({ identification: hospitalToken.identification });
  const userData = {
    ...data,
    id_hospital: hospitalData!._id,
    password: CryptoJS.AES.encrypt(password, SECRET!).toString(),
    first_login: true,
  };
  const token = accessToken(userData, '24h');
  try {
    const newUser = new User(userData);
    await newUser.save();
    await sendEmail({
      recipient: email, subject: 'Cuenta creada por Hospital para doctor',
      body: `tu clave de ingreso a la
web es:\n${password} \nten encuenta
que al momento de ingresar, te pedira que
cambies la clave de inicio de sesion`
    });
    return res.status(200).json({
      message: 'User has been created',
      token: token
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const verifyUser: RequestHandler = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await decodeToken(token) as any;
    const newUser = new User(user);
    const { password, ...userNoPass } = newUser;
    await newUser.save();
    return res.status(200).json({
      message: 'User has been created',
      data: userNoPass
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const resetPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(409).json({
    message: 'Parameters requiered'
  });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({
      message: 'User not found'
    });
    const { __v, ...dataUser } = user;
    const token = accessToken(dataUser);
    const tokenRefresh = refreshToken(dataUser);
    await sendEmail({ recipient: email, subject: 'Restablecer contraseña', body: `https://apihospital.azurewebsites.net/api/reset_password/${token}` });
    return res.status(200).json({
      message: 'Email has been sent',
      refreshToken: tokenRefresh,
      accessToken: token
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const updatePassword: RequestHandler = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await decodeToken(token) as Auth;
    const { __v, ...dataUser } = user;
    await User.updateOne({ identification: dataUser.identification }, {
      $set: {
        password: CryptoJS.AES.encrypt(password, SECRET!).toString(),
        first_login: false
      }
    });
    return res.status(200).json({
      message: 'Password has been updated'
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}