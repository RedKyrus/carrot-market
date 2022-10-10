import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";



export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
){
  
  // await client.user.create({
  //   data: {
  //     email: "hi",
  //     name: "hi"
  //   }
  // });
  const test = await client.user.count();


  res.json({
    ok: true,
    count: test
  })


}