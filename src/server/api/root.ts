import { createTRPCRouter } from "~/server/api/trpc";
import { campaignSystemRouter } from "./routers/campaignSystem";
import { campaignRouter } from "./routers/campaign";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  campaignSystemRouter,
  campaignRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
