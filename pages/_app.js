/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <CookiesProvider>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Daturians Gallery</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">
              My Daturians
            </a>
          </Link>
        </div>
      </nav>
        <Component {...pageProps} />
      </CookiesProvider>
    </div>
  )
}

export default MyApp
