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
module.exports = {
  createNewClinic: createNewClinic,
};
