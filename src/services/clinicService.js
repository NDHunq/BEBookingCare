const db = require("../models");
let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          descriptionMarkdown: data.descriptionMarkdown,
          descriptionHTML: data.descriptionHTML,
          image: data.imageBase64,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "OK",
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionMarkdown",
            "descriptionHTML",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "OK",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
