import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: getTopDoctorHome", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log("Error at doctorController: getAllDoctors", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postInfoDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInfoDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: postInfoDoctor", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: getDetailDoctorById", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let response = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: bulkCreateSchedule", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let response = await doctorService.getScheduleByDate(
      req.query.doctorID,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: getScheduleDate", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getExtraInforDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getExtraInforDoctorById(
      req.query.doctorId
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: getExtraInforDoctorById", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getProfileDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error at doctorController: getProfileDoctorById", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let infor = await doctorService.sendRemedy(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};
