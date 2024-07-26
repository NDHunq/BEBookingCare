require("dotenv").config();
import { result } from "lodash";
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: `"BookingCare" <${process.env.EMAIL_APP}>`,
    to: dataSend.receiverEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTMLEmail(dataSend),
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi")
    result = `
    <h3>Xin chào</h3>
    <p>Bạn đã đặt lịch khám bệnh trên website BookingCare</p>
    <p>Thông tin lịch khám của bạn: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng, vui lòng click vào liên kết bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>BookingCare xin chân thành cảm ơn!</div>`;
  if (dataSend.language === "en") {
    result = `
    <h3>Hello</h3>
    <p>You have booked a medical examination on the BookingCare website</p>
    <p>Your examination information: </p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is correct, please click on the link below to confirm and complete the medical examination booking procedure.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>BookingCare sincerely thanks!</div>`;
  }
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
