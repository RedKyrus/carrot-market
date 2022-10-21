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
  console.log(req.session.user);
  // const profile = await client.user.findUnique({
  //   where:
  // });
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password:
    "56465489451231574465491984816516513218945513489446132184796446546449687khkhklh8948",
});
