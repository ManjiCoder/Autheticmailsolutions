import type { NextApiRequest, NextApiResponse } from "next";
import emailChk from "email-chk";

export interface Data {
  email: string;
  result: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method !== "GET") {
    return res.status(400).json({ status: "error", message: "Not allowed" });
  }
  const { email } = req.query;
  try {
    const isEmail = await emailChk(email);
    res.status(200).json({
      email: email,
      result: `${email} is an ${isEmail ? "valid" : "invalid"} email address`,
    });
  } catch (e) {
    // connection refused or server error occurred
    res.status(500).json({ result: "some error occurs" });
  }
}
