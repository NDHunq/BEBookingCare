import db from "../models/index.js";
require("dotenv").config();

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorID || !data.timeType || !data.date) {
        resolve({
          errCode: -1,
          errMessage: "Missing required parameters",
        });
      } else {
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
