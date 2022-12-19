import { type NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: url, isLoading} = trpc.shortlink.getlink.useQuery({slug: "youtube"});
  if (isLoading) return <div>Fetching url...</div>;
  return (
    <>
      <div>
        {url?.url}
      </div>
    </>
  );
};

export default Home;
