import Head from "next/head";
import React, { useState } from "react";
import CardLoginGoogle from "@/components/pages/auth/CardLoginGoogle";
import PrimaryButton from "@/components/global/primarybutton";
import Link from "next/link";
import Icon from "@/components/global/icon";
import { registerWithEmailAndPassword } from "@/service/AuthService";
import { doc, setDoc } from "@firebase/firestore";
import db from "@/config/firestore";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const alertSwal = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "Ok",
    });
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.name === ""){
      setError({...error, name: "Nama tidak boleh kosong"})
      return;
    }
    if(formData.email === ""){
      setError({...error, email: "Email tidak boleh kosong"})
      return;
    }
    if(formData.password === ""){
      setError({...error, password: "Password tidak boleh kosong"})
      return;
    }
    if(formData.confirmPassword === ""){
      setError({...error, confirmPassword: "Konfirmasi Password tidak boleh kosong"})
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: "Password tidak sama" });
      return;
    }
    setLoading(true);
    try {
      const response = await registerWithEmailAndPassword({
        email: formData.email,
        password: formData.password,
      });
      if (response.status === "success") {
        uploadFirestore(response.data.uid);
        alertSwal("Berhasil", response.message, "success");
        router.push("/auth/login");
      } else {
        alertSwal("Gagal", response.data, "error");
      }
    }
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const uploadFirestore = async (uid) => {
    try {
        const docRef = await setDoc(doc(db, "users", uid), {
            fullname: formData.name,
            email: formData.email,
            uid: uid,
        });
    }catch(e){
        throw Error(e.message);
    }
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
        <title>Daftar</title>
        <meta name="description" content="Daftar" />
      </Head>
      <main className="w-screen h-screen flex justify-center items-center bg-white">
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
          <form className="flex flex-col gap-2 mb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">
                Nama
              </label>
              <input type="text" id="name" className="border p-2 rounded-md" onChange={handleChange} name="nama"  />
              {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded-md" onChange={handleChange} name="email"
              />
              {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-md" onChange={handleChange} name="password"
              />
              {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="confirmPassword" className="text-sm">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border p-2 rounded-md" onChange={handleChange} name="confirmPassword"
              />
              {error.confirmPassword && <p className="text-red-500 text-xs">{error.confirmPassword}</p>}
            </div>
            <PrimaryButton type={'submit'} text={"Daftar"} />
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
