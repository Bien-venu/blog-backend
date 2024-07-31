const db = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await db.Post.create({
      title,
      content,
      userId: req.user.userId,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [{ model: db.User, attributes: ["username"] }],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id, {
      include: [
        { model: db.User, attributes: ["username"] },
        {
          model: db.Comment,
          include: [{ model: db.User, attributes: ["username"] }],
        },
      ],
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await db.Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
