import prisma from "../lib/prismaC.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const userTokenId = req.userId;
  const { password, ...inputs } = req.body;
  if (id !== userTokenId) {
    return res
      .status(401)
      .json({ message: "You are not authorized to update this user" });
  }
  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
      },
    });
    const { password: updatedUserPassword, ...rest } = updatedUser;
    console.log(updatedUser);
    res.status(200).json(rest);
  } catch (err) {
    console.log("Error updating user: ", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const userTokenId = req.userId;
  const { password, ...inputs } = req.body;
  if (id !== userTokenId) {
    return res
      .status(401)
      .json({ message: "You are not authorized to update this user" });
  }
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    console.log("Error deleting user: ", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
