import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  //slug not found
  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "slug not found" }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    select: {
      url: true,
    },
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  //record not found
  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "record not found" }));
    return;
  }


  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Cache-Control",
    "s-maxage=1000000000, stale-while-revalidate"
  );
  return res.json(data);
}
