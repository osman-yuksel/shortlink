import { router } from "../trpc";
import { shortlinkRouter } from "./shortlink";

export const appRouter = router({
  shortlink: shortlinkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
