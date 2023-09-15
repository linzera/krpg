import { createTRPCRouter, publicProcedure } from "../trpc";

export const campaignSystemRouter = createTRPCRouter({
  getCampaignSystems: publicProcedure.query(({ ctx }) =>
    ctx.db.campaignSystem.findMany(),
  ),
});
