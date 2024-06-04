import prisma from "../lib/prismaC.js";

export const test = async (req, res) => {
  console.log("test route works");
  try {
    res.status(200).json({ message: "test route works" });
  } catch (err) {
    res.status(500).json({ message: "failed to test route" });
  }
};
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "failed to get posts" });
  }
};
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  console.log(tokenUserId);
  //console.log(body);
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "failed to create posts" });
  }
};
export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    res.status(500).json({ message: "failed to get posts" });
  }
};
export const deletePost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const deletePost = await prisma.post.delete({
      where: { id },
    });
    if (tokenUserId !== post.userId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this post" });
    }
    res.status(200).json();
  } catch (err) {
    res.status(500).json({ message: "failed to get posts" });
  }
};
