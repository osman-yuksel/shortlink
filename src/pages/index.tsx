import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: url, isLoading } = trpc.shortlink.getlink.useQuery({
    slug: "youtube",
  });
  if (isLoading) return <div>Fetching url for youtube shortlink...</div>;
  return (
    <>
      <Link href={`${url?.url}`}>{url?.url}</Link>
    </>
  );
};

export default Home;
