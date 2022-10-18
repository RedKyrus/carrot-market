import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  if (!user) return res.status(400).json({ ok: false });
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

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
