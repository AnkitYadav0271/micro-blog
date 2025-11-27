import { Router } from "express";
import { getPostsController, postController } from "../controllers/post.controllers.js";


const router = Router({mergeParams:true});

router.post("/post",postController);
router.get("/posts",getPostsController)



export default router;