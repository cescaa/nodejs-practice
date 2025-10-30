const incidentsData = [
  { incident_num: 1, desc: "Mock description..." },
  { incident_num: 2, desc: "Mock description..." },
  { incident_num: 3, desc: "Mock description..." },
];

exports.getAllIncidents = (req, res) => {
  res.status(200).json({
    // send json format standard
    status: "success",
    results: incidentsData.length,
    data: { incidents: incidentsData },
  });
};

exports.createNewIncident = (req, res) => {
  console.log(req.body);
  res.send("Done");
};

exports.getIncident = (req, res) => {
  console.log(req.params.id);

  const id = req.params.id * 1; // convert to number type
  if (id > incidentsData.length)
    return res
      .status(404)
      .json({ status: "fail", message: "Invaid Incident Number" });

  const selectedIncident = incidentsData.find(
    (elem) => elem.incident_num === id
  );
  res.status(200).json({
    status: "success",
    data: { incident: selectedIncident },
  });
};

exports.updateIncident = (req, res) => {
  if (req.params.id * 1 > incidentsData.length)
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid ID for PATCH" });

  res.status(200).json({
    status: "success",
    data: { incident: "Upated data here..." },
  });
};

exports.deleteIncident = (req, res) => {
  if (req.params.id * 1 > incidentsData.length)
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid ID for DELETE" });

  res.status(204).json({
    status: "success",
    data: null,
  });
};
