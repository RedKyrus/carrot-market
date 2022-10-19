import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import smtpTransport from "@libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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
  console.log("성공");
  console.log(token);

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `헬로우~~ ${payload}`,
    // });
    // console.log(message);
  }

  if (email) {
    // const mailOptions = {
    //   from: process.env.MAIL_ID,
    //   to: email,
    //   subject: "테스트 토큰",
    //   text: `
    //     안녕하세요!!!
    //     인증번호 ${payload}
    //     `,
    // };
    // const emailResult = await smtpTransport.sendMail(
    //   mailOptions,
    //   (error, responses) => {
    //     if (error) {
    //       console.log(error);
    //       return null;
    //     } else {
    //       console.log(responses);
    //       return null;
    //     }
    //   }
    // );
    // smtpTransport.close();
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
