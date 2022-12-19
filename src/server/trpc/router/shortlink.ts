import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const shortlinkRouter = router({
  getlink: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.shortLink.findFirst({
          select: {
            url: true,
          },
          where: {
            slug: {
              equals: input.slug,
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    })
})