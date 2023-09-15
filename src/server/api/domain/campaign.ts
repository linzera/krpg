import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string(),
  systemName: z.string(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
