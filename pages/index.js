import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { trackWindowScroll } from 'react-lazy-load-image-component';

import { nftcontractaddress } from '../config'
import DaturiansNFT from '../artifacts/Daturians.json'
import { getMetadataById } from "../lib/api";

import NFT from './components/nft';

// export default function Home({scrollPosition}) {
const Home = ({scrollPosition}) => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(nftcontractaddress, DaturiansNFT.abi, provider)
    // get minted number
    const minted = await contract.totalMinted.call();
    // console.log(minted.toNumber());
    // const data = await contract.walletOfOwner("0x55d9fc8d5f84cf151d9578c6713a0c0ec35e0e5f")
    const data = Array.from({length: minted}, (x, i) => i+1);
    // console.log(data);

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const ipfsUrl = 'https://daturians.mypinata.cloud/ipfs/QmWeRSySd3RJ9BhoRHzpDsu8PjjNnGYhWwHn44BKDpgvJG/'
    const items = await Promise.all(data.map(async i => {
  
      // let item = await getMetadataById(i, contract);
      const currentUrl = ipfsUrl+String(i)+'.json';
      const meta = await axios.get(currentUrl)
      let imgUri = meta.data.image.replace("ipfs://", ipfs_gateway)
      let item = {
        tokenId: i,
        image: imgUri,
        name: meta.data.name,
        description: meta.data.description,
        data: meta.data
      }

      return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
  }

  // if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  if (!nfts.length) return (<h1 className="px-20 py-10 text-3xl">Loading Daturians NFT</h1>)
  // return (
  //   <div className="flex justify-center">
  //     <div className="px-4" style={{ maxWidth: '1600px' }}>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
  //           {nfts.map((nft) => (
  //               <div
  //                 key={nft.tokenId} 
  //                 className="border shadow rounded-xl overflow-hidden"
  //                 >
  //                 <Link href={`/single_nft/${nft.tokenId}`}>
  //                   <a>
  //                     <img 
  //                       src={nft.image}
  //                       alt={nft.data.image}
  //                       />
  //                     <div className="p-4">
  //                       <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
  //                       <div style={{ height: '70px', overflow: 'hidden' }}>
  //                         <p className="text-gray-400">{nft.description}</p>
  //                       </div>
  //                     </div>
  //                   </a>
  //                 </Link>
  //               </div>
  //             ))}
  //         </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft) => (
                <NFT key={nft.tokenId} scrollPosition={scrollPosition} values={nft} />
              ))}
          </div>
      </div>
    </div>
  )
}

export default trackWindowScroll(Home);