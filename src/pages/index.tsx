import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  // const { data: url, isLoading } = trpc.shortlink.getlink.useQuery({
  //   slug: "youtube",
  // });
  // // if (isLoading) return <div>Fetching url for youtube shortlink...</div>;

  const [formInput, setFormInput] = useState<string>("");
  const mutation = trpc.shortlink.createlink.useMutation();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    mutation.mutate({ url: formInput });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="long-url">
          Enter the Long Link:
          <input
            id="long-url"
            type="text"
            placeholder="here"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setFormInput(e.currentTarget.value);
            }}
          ></input>
        </label>
        <button type="submit">Get short link</button>
      </form>

      <div>{mutation.data?.slug}</div>
    </div>
  );
};

export default Home;
