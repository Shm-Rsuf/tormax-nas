const isAdmin = (req, res, next) => {
  if (req.user?.username === "admin") {
    next();
  } else {
    res.status(403).json({ error: "unauthorized access" });
  }
};

module.exports = isAdmin;
