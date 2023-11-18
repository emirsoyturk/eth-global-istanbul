const https = require("https");
var request = require("request");

async function checkAccess(req, res) {
  const {
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
    param8,
    user_address,
  } = req.params;
  const borderString = `${param1},${param2},${param3},${param4}|${param5},${param6},${param7},${param8}`;

  var requestJSON = {
    query:
      "query GetUserByIdAndBorderString($userId: ID!, $borderString: String!) {\n  user(id: $userId) {\n    id\n    totalDistance\n    lastBorderAvgLat\n    lastBorderAvgLng\n    borderHistory(where: {border_string: $borderString}) {\n      id\n      border_latitudes\n      border_longitudes\n      border_string\n      border_timestamp\n      blockTimestamp\n    }\n  }\n}",
    variables: {
      userId: user_address.toLowerCase(), // "0xa8003509743746eeeac2f978253a502edc535d44", // TODO: change this to the user's address
      borderString: borderString, // "82,79,99,122|66,61,58,71"
    },
    operationName: "GetUserByIdAndBorderString",
    extensions: {},
  };

  request(
    {
      url: "https://api.studio.thegraph.com/proxy/58684/ethglobal-istanbul/version/latest",
      method: "POST",
      json: true,
      body: requestJSON,
    },
    function (error, response, body) {
      const accessGranted = response.body.data.user?.borderHistory?.length > 0;
      if (accessGranted) res.status(200);
      else res.status(403);
      res.send();
    }
  );
}

module.exports = {
  checkAccess,
};
