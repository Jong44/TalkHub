import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Navbar from "@/components/global/navbar";

library.add(fas, fab)

export default function App({ Component, pageProps }) {
  return <>
    <Navbar />
    <div className="text-text-color bg-white">
      <Component {...pageProps} />
    </div>
  </>;
}
