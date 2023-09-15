import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCampaignSchema } from "../domain/campaign";

export const campaignRouter = createTRPCRouter({
  getMyCampaigns: protectedProcedure.query(() => {
    return [];
  }),
  createCampaign: protectedProcedure
    .input(createCampaignSchema)
    .mutation(() => {
      return { id: "1" };
    }),
});
