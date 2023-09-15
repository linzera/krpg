import { useForm } from "react-hook-form";
import {
  type CreateCampaignInput,
  createCampaignSchema,
} from "~/server/api/domain/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";

interface CampaignFormProps {
  onSuccessfulSubmit: (id: string) => void;
  successDescription?: string;
}

const CampaignForm = ({
  onSuccessfulSubmit,
  successDescription,
}: CampaignFormProps) => {
  const { toast } = useToast();

  const form = useForm<CreateCampaignInput>({
    resolver: zodResolver(createCampaignSchema),
  });

  const { isLoading, data: systems } =
    api.campaignSystemRouter.getCampaignSystems.useQuery();

  const createCampaign = api.campaignRouter.createCampaign.useMutation();

  const onSubmit = async (values: CreateCampaignInput) => {
    try {
      const result = await createCampaign.mutateAsync(values);
      toast({
        title: "Campanha criada com sucesso! 🎉",
        description: successDescription,
        duration: 3000,
      });
      onSuccessfulSubmit(result.id);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Erro ao criar campanha.",
          description: error.message,
          variant: "destructive",
          duration: 8000,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder=""
                  autoComplete="Campaign name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                O nome da campanha, como será exibido para os jogadores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="systemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sistema</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      id="systemName"
                      placeholder={isLoading ? "Carregando..." : ""}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {systems?.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                O sistema que será utilizado na campanha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loadingText="Criando campanha">
          Enviar
        </Button>
      </form>
    </Form>
  );
};

export default CampaignForm;
