import clinicService from "../services/clinicService";
let createNewClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinic(req.body);
    return res.status(200).send(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinic();
    return res.status(200).send(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).send(infor);
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  createNewClinic: createNewClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
