import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from "@/config/axiosConfig";
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { username, password } = req.body
  await api.post("/api/auth/login", {username, password}).then((response) => {
    res.setHeader("Set-Cookie", serialize("token", response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/"
    }))
    res.status(200).json({ message: "Authentication Successful" })
  }).catch((error) => {
    if (error.response.status === 401) {
      res.status(401).json({ message: "Authentication error" });
    } else {
      res.status(500).json({ error: 'Something went wrong.' })
    }
  })
}
