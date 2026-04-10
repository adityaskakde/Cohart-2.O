export async function registerUser(req, res, next) {
  try {
    const user = req.body;

    return res.status(201).json({
      message: "User registered successfully 🔥",
      data: user
    });

  } catch (err) {
    err.status = 500;
    next(err);
  }
}