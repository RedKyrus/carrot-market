import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== "POST") {
  //   res.status(401).end();
  // }
  // console.log(req.body);

  const { Phone, email } = req.body;
  let user;

  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.log("유저 만들어라!!");
      user = await client.user.create({
        data: {
          name: "Aonymous",
          email,
        },
      });
    }
    console.log(user);
  }

  res.status(200).end();
}

export default withHandler("POST", handler);
