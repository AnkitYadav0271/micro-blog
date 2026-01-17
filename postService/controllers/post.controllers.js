import { postData } from "../tempData/postData.js";
import {randomBytes} from "crypto";
import axios from "axios";

const data = {}

export const postController = async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  data[id] = {id,title};
  try{
await axios.post('http://event-bus-srv:4040/events',{
    type:"postCreated",
    data:{
      id,
      title
    }
  })
  }catch (err){
    console.log(err.message);
  }
  
  
  res.status(200).json({
    success: true,
    message: "post created successfully",
    post:data[id]
  });
};


export const getPostsController = async(_req,res) =>{
 res.status(200).send(data);
}