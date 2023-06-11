const os = require("os");
const useragent = require("express-useragent");

const Device = require("../models/device");

//get device data
const getDevice = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId !== req.user?._id.toString()) {
      throw Error("unauthorized user");
    }
    const deviceData = {
      ip_address: getClientIp(req),
      hostname: os.hostname(),
      os: getOS(req),
      user_agent: req.headers["user-agent"],
      user: userId,
    };

    const device = await Device.create(deviceData);
    if (!device) {
      throw Error("no device data found");
    }
    res.status(200).json(device);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
