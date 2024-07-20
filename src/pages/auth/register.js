import Head from "next/head";
import React from "react";
import CardLoginGoogle from "@/components/pages/auth/CardLoginGoogle";
import PrimaryButton from "@/components/global/primarybutton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "@/components/global/icon";

const Index = () => {
  return (
    <>
      <Head>
        <title>Daftar</title>
        <meta name="description" content="Daftar" />
      </Head>
      <main className="w-screen h-screen flex justify-center items-center">
        <div className="w-[30rem] border p-5">
          <h1 className="text-3xl font-semibold">Daftar</h1>
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Selamat Datang di TalkHub
          </p>
          <CardLoginGoogle />
          <div className="flex gap-5 my-5 items-center">
            <hr className="border-t border-gray-300 w-1/2" />
            <p className="text-gray-400 text-xs">Atau</p>
            <hr className="border-t border-gray-300 w-1/2" />
          </div>
          <form className="flex flex-col gap-2 mb-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">
                Nama
              </label>
              <input type="text" id="name" className="border p-2 rounded-md" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="password" className="text-sm">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-md"
              />
            </div>
            <PrimaryButton onClick={() => alert("Daftar")} />
          </form>
          <p className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href={"/auth/login"} className="text-primary-color">
              Masuk{" "}
              <span>
                <Icon
                  icon={["fas", "arrow-up"]}
                  className="text-xs rotate-45 "
                />
              </span>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Index;
