const {
  addSchool,
  listSchoolsByProximity,
} = require("../services/schoolService");

async function createSchool(req, res, next) {
  try {
    const createdSchool = await addSchool({
      name: req.body.name,
      address: req.body.address,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
    });

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: createdSchool,
    });
  } catch (error) {
    return next(error);
  }
}

async function getSchools(req, res, next) {
  try {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const schools = await listSchoolsByProximity(latitude, longitude);

    return res.status(200).json({
      success: true,
      message: "Schools retrieved successfully",
      data: schools,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createSchool,
  getSchools,
};
