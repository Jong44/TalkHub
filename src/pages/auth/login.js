import React, { useState } from "react";
import Head from "next/head";
import CardLoginGoogle from "@/components/pages/auth/CardLoginGoogle";
import PrimaryButton from "@/components/global/primarybutton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "@/components/global/icon";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { loginWithEmailAndPassword } from "@/service/AuthService";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const alertSwal = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "Ok",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      setError({ ...error, email: "Email tidak boleh kosong" });
      return;
    }
    if (formData.password === "") {
      setError({ ...error, password: "Password tidak boleh kosong" });
      return;
    }
    setLoading(true);
    try{
      const response = await loginWithEmailAndPassword({
        email: formData.email,
        password: formData.password
      });
      if(response.status === "error"){
        alertSwal("Gagal", response.message, "error");
      }else{
        alertSwal("Berhasil", response.message, "success");
        router.push("/home");
      }
    } catch (error) {
      alertSwal("Gagal", error.message, "error");
    }
    setLoading(false);
  }

  

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-color"></div>
      </div>
    );
  }


  return (
    <>
      <Head>
        <title>Masuk</title>
        <meta name="description" content="Daftar" />
      </Head>
      <main className="w-screen h-screen flex justify-center items-center bg-white">
        <div className="w-[30rem] border p-5 ">
          <h1 className="text-3xl font-semibold">Masuk</h1>
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Selamat Datang Kembali di TalkHub
          </p>
          <CardLoginGoogle />
          <div className="flex gap-5 my-5 items-center">
            <hr className="border-t border-gray-300 w-1/2" />
            <p className="text-gray-400 text-xs">Atau</p>
            <hr className="border-t border-gray-300 w-1/2" />
          </div>
          <form className="flex flex-col gap-2 mb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded-md"
                name="email"
                onChange={handleChange}
              />
              {error.email && (
                <p className="text-xs text-red-500">{error.email}</p>
              )  
              }
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-md"
                name="password"
                onChange={handleChange}
              />
              {error.password && (
                <p className="text-xs text-red-500">{error.password}</p>
              )}
            </div>
            <PrimaryButton type={'submit'} text={"Masuk"} />
          </form>
          <p className="text-center text-sm">
            Belum punya akun?{" "}
            <Link href={"/auth/register"} className="text-primary-color">
              Daftar{" "}
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
