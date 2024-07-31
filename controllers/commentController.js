const db = require("../models");

exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const comment = await db.Comment.create({
      content,
      postId,
      userId: req.user.userId,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await db.Comment.findAll({
      where: { postId: req.params.postId },
      include: [{ model: db.User, attributes: ["username"] }],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await db.Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await db.Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
