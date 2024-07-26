require("dotenv").config();
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
    html: `
    <h3>Xin chào</h3>
    <p>Bạn đã đặt lịch khám bệnh trên website BookingCare</p>
    <p>Thông tin lịch khám của bạn: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng, vui lòng click vào liên kết bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>BookingCare xin chân thành cảm ơn!</div>`,
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
