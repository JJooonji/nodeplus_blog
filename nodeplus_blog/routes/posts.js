const express = require("express");
const { Posts } = require("../models");
const router = express.Router();

//게시글 전체 조회
router.get("/posts", async (req, res) => {
    const posts = await Posts.findAll({
        order : [["updatedAt", "DESC"]],//updatedAt으로 내림차순 정렬//order는 정렬처리?
        // where : postId? { postId } : undefined//삼항연산자로 postId가 참이면 postId를, 거짓이면 undifined 출력
    });
    res.send({ posts })
});

//게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params; //postId를 받아옴
    
    const posts = await Posts.findOne({where:{postId}});//Posts에서 postId를 따로 받아와서 posts에 받음
    
    if(!posts) {//posts가 없으면 400 status code send
        res.status(400).send({})
    } else {//있으면 posts를 send
        res.json({ posts })
    };
});

//게시글 생성
router.post("/posts", async (req, res) => {
    const { title, nickname, password, content } = req.body;

    const createPost = 
        await Posts.create({
        title, 
        nickname, 
        password, 
        content
    })
    // res.status(201).send({msg: "게시글 생성"})
    res.status(201).send({createPost})
})

//게시글 수정
router.put("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    await Posts.update({title, content}, {where: {postId}})

    res.status(201).send({msg: "게시글을 수정하였습니다."})
})

//게시글 삭제
router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    
    await Posts.destroy({where: {postId}})

    res.status(201).send({msg: "게시글이 삭제되었습니다."})
})

module.exports = router;