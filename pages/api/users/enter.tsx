import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: "anonymous",
  //     ...payload,
  //   },
  //   update: {},
  // });
  // console.log(user);

  const token = await client.token.create({
    data: {
      payload: payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  res.status(200).end();
}

export default withHandler("POST", handler);
