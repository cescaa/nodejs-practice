const Incidents = require('../models/incidentModel');

const incidentsData = [
  { incident_num: 1, desc: "Mock description..." },
  { incident_num: 2, desc: "Mock description..." },
  { incident_num: 3, desc: "Mock description..." },
];

/*
// for middleware
exports.checkID = (req, res, next, val) => {
  console.log("Selected ID: ", val);
  if (req.params.id * 1 > incidentsData.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log("checkBody function running...");
  console.log("Req Body DESC: ", req.body.desc);
  if (!req.body.desc) {
    console.log("DESC not provided");
    return res.status(400).json({
      status: "fail",
      message: "Body does not contain 'desc'",
    });
  }
  next();
};
*/

// /v1/incidents?Date[gte]=2018-01-01&Date[lte]=2018-12-31
exports.getAllIncidents = async (req, res) => {
  try {

  const queryObj = {...req.query};
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach(elem => delete queryObj[elem])

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


  const formattedQuery = JSON.parse(queryStr, (key, value) => {
      if (typeof value === 'string' && value.trim() !== '' && !isNaN(value)) {
        return Number(value);
      }
      return value;
    });

  const query = Incidents.find(formattedQuery);

  const allIncidents = await query;

  res.status(200).json({
    // send json format standard
    status: "success",
    results: allIncidents.length,
    data: { incidents: allIncidents },
  });
} catch(err){
  res.status(400).json({status: "fail", message: err});
}
};

exports.createNewIncident = async (req, res) => {
  try {
 const newIncident = await Incidents.create(req.body);
 res.status(201).json({status: "success", data: {incident: newIncident}})
  } catch (err){
    res.status(400).json({status: "fail", message: err});

  }
};

exports.getIncident = async (req, res) => {
 try {
  const incident = await Incidents.findById(req.params.id);
  res.status(200).json({
    // send json format standard
    status: "success",
    data: { incident },
  });
} catch(err){
  res.status(400).json({status: "fail", message: err});
}
};

exports.updateIncident = (req, res) => {
  res.status(200).json({
    status: "success",
    data: { incident: "Upated data here..." },
  });
};

exports.deleteIncident = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
