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
module.exports = {
  createClinic: createClinic,
};
