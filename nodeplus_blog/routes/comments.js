const express = require("express");
const { Comments } = require("../models");
const router = express.Router();

//댓글 생성
router.post("/comments/:postId", async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    const createComment = await Comments.create({
        postId,
        content
    })

    res.status(201).json({ createComment })
})

//댓글 목록 조회
router.get("/comments/:postId", async (req, res) => {
    const { postId } = req.params;

    const comments = await Comments.findAll({
        order: [["postId", "DESC"]],
        where:{postId}});

    if(!comments) {
        res.status(400).send({message: "댓글을 입력해주세요."})
    } res.status(200).send({comments})
})

//댓글 수정
router.put("/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const updateComment = await Comments.findOne({where:{commentId}});

    if(!updateComment){
        res.status(400).json({ message: "찾으시는 댓글이 없습니다."})
    } 
        await Comments.update(
            {content},
            {where:{commentId}})
    
    res.status(201).json({message: "댓글을 수정하였습니다."})
})

//댓글 삭제
router.delete("/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;
    // const { content } = req.body;

    const deleteComment = await Comments.findOne({where:{commentId}});

    if(!deleteComment) {
        res.status(400).json({message: "찾으시는 댓글이 없습니다."})
    } await Comments.destroy({where:{commentId}})

    res.status(200).json({message: "댓글이 삭제되었습니다."})
})


module.exports = router;