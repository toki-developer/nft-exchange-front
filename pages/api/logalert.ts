// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);
    console.error(body);
    res.status(200).json(null);
  } catch {
    console.error(req.body);
    res.status(200).json(null);
  }
}
