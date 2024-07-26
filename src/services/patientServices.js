import db from "../models/index.js";
require("dotenv").config();
import emailService from "./emailService.js";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      if (
        !data.email ||
        !data.doctorID ||
        !data.timeType ||
        !data.date ||
        !data.fullName
      ) {
        resolve({
          errCode: -1,
          errMessage: "Missing required parameters",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorID, token),
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientID: user[0].id,
            },
            defaults: {
              statusId: "S1",
              patientID: user[0].id,
              doctorID: data.doctorID,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor booking success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: -1,
          errMessage: "Missing required parameters",
        });
      } else {
        let booking = await db.Booking.findOne({
          where: {
            doctorID: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (booking) {
          booking.statusId = "S2";
          await booking.save();
          resolve({
            errCode: 0,
            errMessage: "Verify success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Booking not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
