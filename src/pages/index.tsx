import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  // const { data: url, isLoading } = trpc.shortlink.getlink.useQuery({
  //   slug: "youtube",
  // });
  // // if (isLoading) return <div>Fetching url for youtube shortlink...</div>;

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <div className="min-w-screen flex min-h-screen flex-col items-center">
        <h1 className="my-5 text-6xl">Short-Link</h1>
        <Form />
      </div>
    </div>
  );
};

export default Home;

const Form = () => {
  const [formInput, setFormInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const mutation = trpc.shortlink.createlink.useMutation();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formInput) {
      mutation.mutate({ url: formInput });
    }
    setCopied(false);
  };
  return (
    <div className="m-2 w-screen max-w-3xl">
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col">
        <div className="group/item flex  flex-col rounded-lg border-neutral-800 bg-neutral-800 pt-1 pl-1 pb-3 pr-3 text-lg shadow-lg">
          <label
            htmlFor="long-url"
            className="w-full rounded-md bg-white p-4 hover:cursor-text"
          >
            <input
              className="w-full rounded-t-md border-b-4 border-inherit p-2 text-3xl !outline-none transition-all focus:!border-red-600 group-hover/item:border-red-400"
              id="long-url"
              type="text"
              placeholder="Enter the long-link here"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setFormInput(e.currentTarget.value);
              }}
            ></input>
          </label>
        </div>
        <div className="group/button">
          <div className="mt-2 flex justify-center rounded-md bg-neutral-800 pt-1 pl-1 pb-2 pr-2 transition-all group-active/button:pb-1 group-active/button:text-red-600">
            <button
              className="h-full w-full rounded-sm bg-white p-2 text-2xl transition-all group-active/button:pt-3"
              type="submit"
              disabled={mutation.isLoading}
            >
              Get your short link
            </button>
          </div>
        </div>
      </form>
      {mutation.data || mutation.isLoading ? (
        <div className="mt-2 flex justify-center rounded-md bg-neutral-800 pt-1 pl-1 pb-2 pr-2">
          <div className=" flex h-full w-full justify-center rounded-sm bg-white text-2xl">
            {mutation.isLoading ? (
              <div>Please wait...</div>
            ) : mutation.error ? (
              <div>An unexpected error happened!</div>
            ) : (
              <div className="flex w-full justify-between">
                <div className="ml-4 w-12"></div>
                <Link href={`/${mutation.data?.slug}`}>
                  {window
                    ? `${window.location.hostname}/${mutation.data?.slug}`
                    : ""}
                </Link>{" "}
                <button
                  className={`mr-4 mb-1 w-12 ${copied ? "text-green-500" : ""}`}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${window.location.hostname}/${mutation.data?.slug}`
                    );
                    setCopied(true);
                  }}
                >
                  copy
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
