// pages/api/auth.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Простая проверка для демонстрации (реально нужно использовать бэкенд)
    if (email === "test@example.com" && password === "password") {
      res.status(200).json({ success: true, token: "fake-jwt-token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
