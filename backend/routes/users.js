import express from "express";
import { Users } from "../schema/usersSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    if (!users.length) {
      return res.status(404).json({
        msg: "Hech qanday foydalanuvchi topilmadi",
        variant: "error",
        payload: null,
      });
    }
    res.status(200).json({
      msg: "Barcha foydalanuvchilar",
      variant: "success",
      payload: users,
      total: users.length,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Serverda xatolik yuz berdi",
      variant: "error",
      payload: null,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    const existUser = await Users.findOne({ username });
    if (existUser) {
      return res.status(400).json({
        msg: "Bu username allaqachon mavjud",
        variant: "error",
        payload: null,
      });
    }
    const user = await Users.create(req.body);
    res.status(201).json({
      msg: "Foydalanuvchi muvaffaqiyatli yaratildi",
      variant: "success",
      payload: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Serverda xatolik yuz berdi",
      variant: "error",
      payload: null,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        msg: "Foydalanuvchi topilmadi",
        variant: "error",
        payload: null,
      });
    }
    res.status(200).json({
      msg: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      variant: "success",
      payload: null,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Serverda xatolik yuz berdi",
      variant: "error",
      payload: null,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({
        msg: "Foydalanuvchi topilmadi",
        variant: "error",
        payload: null,
      });
    }
    res.status(200).json({
      msg: "Foydalanuvchi muvaffaqiyatli yangilandi",
      variant: "success",
      payload: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Serverda xatolik yuz berdi",
      variant: "error",
      payload: null,
    });
  }
});

export default router;
