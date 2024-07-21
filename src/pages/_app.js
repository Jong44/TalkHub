import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Navbar from "@/components/global/navbar";
import { useRouter } from "next/router";

library.add(fas, fab)

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return <>
    {router.pathname.includes('/auth') ? null : <Navbar />}
    <div className="text-text-color">
      <Component {...pageProps} />
    </div>
  </>;
}
