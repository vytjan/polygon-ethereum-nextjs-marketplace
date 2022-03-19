/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="p-6 flex">
        <img className="logo" src="https://www.daturians.com/wp-content/uploads/2022/03/daturians_gallery.png"/>
        <div className="menu mt-4">
          <Link href="/">
            <a className="mr-4 text-pink font-semibold">
              Home
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink font-semibold">
              My Daturians
            </a>
          </Link>
        </div>
      </nav>
        <Component {...pageProps} />
    </div>
  )
}

export default MyApp
