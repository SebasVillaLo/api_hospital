import { RequestHandler } from "express";
import { Auth } from "./types/auth.types";
import {  decodeToken } from "../modules/jsonwtgenerator";
import User from "../model/User";


export const updateUser: RequestHandler = async (req, res) => {
  const { token } = req.params;
  const data = req.body;

  try {
    const user = await decodeToken(token) as Auth;
    const { __v, ...dataUser } = user;
    await User.findOneAndUpdate({ identification: dataUser.identification }, data);
    return res.status(200).json({
      message: 'User has been updated'
    });
  }
  catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const deleteUser: RequestHandler = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await decodeToken(token) as Auth;
    const { __v, ...dataUser } = user;

    await User.findOneAndDelete({ identification: dataUser.identification });
    return res.status(200).json({
      message: 'User has been deleted'
    });
  }
  catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const getUser: RequestHandler = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await decodeToken(token) as Auth;
    const { __v, ...dataUser } = user;
    await User.findOne({ identification: dataUser.identification });
    return res.status(200).json({
      user
    });
  }
  catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const getUsers: RequestHandler = async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      users
    });
  }
  catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}

