import { useRouter } from "next/router";
import CampaignForm from "~/components/campaings/form";
import { Card } from "~/components/ui/card";

export default function CampaignNew() {
  const router = useRouter();

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-lg p-4">
        <h1 className="mb-3 text-2xl font-semibold">Nova campanha</h1>
        <CampaignForm
          successDescription="Você será redirecionado para a página da campanha."
          onSuccessfulSubmit={(id) => {
            router.push(`/campaigns/${id}`).catch(console.error);
          }}
        />
      </Card>
    </div>
  );
}
