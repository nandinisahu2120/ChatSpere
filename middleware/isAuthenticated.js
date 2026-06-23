const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies;
  } catch (error) {
    console.log(error);
  }
};
