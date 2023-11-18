async function checkAccess(req, res) {
  const { param1, param2, param3, param4, param5, param6, param7, param8 } =
    req.params;

  res.status(200);
  res.send();
}

module.exports = {
  checkAccess,
};
