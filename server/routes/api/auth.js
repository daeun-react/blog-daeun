import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";

const { JWT_SECRET } = config;

import User from "../../models/user";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log("req", email, password);
  if (!email || !password) {
    return res.status(400).json({ msg: "모든 필드를 입력해주세요." });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "존재하지 않는 email 입니다." });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "패스워드가 일치하지 않습니다." });
      }
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    });
  });
});

router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw Error("유저가 존재하지 않습니다.");
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
