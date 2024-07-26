import db from "../models/index.js";
require("dotenv").config();
import emailService from "./emailService.js";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      if (!data.email || !data.doctorID || !data.timeType || !data.date) {
        resolve({
          errCode: -1,
          errMessage: "Missing required parameters",
        });
      } else {
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: "Nguyễn Văn A",
          time: "7:00 AM - 8:00 AM",
          doctorName: "BS. Nguyễn Văn B",
          redirectLink: "https://www.facebook.com/",
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
module.exports = {
  postBookAppointment: postBookAppointment,
};
