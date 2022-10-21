import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import smtpTransport from "@libs/server/email";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) return res.status(404).end();
  console.log(exists);
  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password:
    "56465489451231574465491984816516513218945513489446132184796446546449687khkhklh8948",
});
