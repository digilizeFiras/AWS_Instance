import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const { name, email } = req.body;

      const user = await prisma.user.create({
        data: { name, email },
      });

      return res.status(201).json(user);
    }

    if (req.method === "PUT") {
      const { id, name, email } = req.body;

      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;

      await prisma.user.delete({
        where: { id: Number(id) },
      });

      return res.status(204).end();
    }

    return res.status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
