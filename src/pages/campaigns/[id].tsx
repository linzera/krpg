import { useRouter } from "next/router";

export default function Campaign() {
  const { query } = useRouter();

  return (
    <div>
      <h1>Campanha {query.id}</h1>
    </div>
  );
}
