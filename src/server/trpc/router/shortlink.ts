import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import cuid from "cuid";

export const shortlinkRouter = router({
  getlink: publicProcedure.input(z.object({ slug: z.string(), }))
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
    }),
  createlink: publicProcedure.input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const slug = cuid.slug();
        await ctx.prisma.shortLink.create({
          data: {
            slug: slug,
            url: input.url
          }
        })
        return {
          slug: slug,
        }
      }
      catch (error) {
        console.log(error);
      }
    })
})