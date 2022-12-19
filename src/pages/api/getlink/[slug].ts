import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "pls use with a slug" }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    select: {
      url: true,
    },
    where: {
      slug: {
        equals: slug,
      }
    }
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "slug not found" }));
    return;
  }

  return res.json({ url: data.url })
}