import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { trackWindowScroll } from 'react-lazy-load-image-component';

import { nftcontractaddress } from '../config'
import DaturiansNFT from '../artifacts/Daturians.json'
import { getMetadataById, getQueryMetadata } from "../lib/api";

import NFT from './components/nft';
import SearchBox from './components/search';

// export default function Home({scrollPosition}) {
const Home = ({scrollPosition}) => {
  const [totalNfts, setTotalNfts] = useState([])
  const [nfts, setNfts] = useState([])
  const [query, setQuery] = useState("");
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
    const data = Array.from({length: minted}, (x, i) => i+1);

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const ipfsUrl = 'https://daturians.mypinata.cloud/ipfs/QmWeRSySd3RJ9BhoRHzpDsu8PjjNnGYhWwHn44BKDpgvJG/'
    const items = await Promise.all(data.map(async i => {
  
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
    // console.log(items[13])
    setTotalNfts(items)
    setNfts(items)
    setLoadingState('loaded') 
  }

  const handleSubmit = async (e) => {
    await e.preventDefault();
    const res = getQueryMetadata(query, totalNfts);
    setNfts(res);
  }

  if (!totalNfts.length) return (<h1 className="px-20 py-10 text-3xl">Loading Daturians NFT</h1>)
  // if (!nfts.length) return (<h1 className="px-20 py-10 text-3xl">No Daturians match your search</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
      <SearchBox handleSubmit={handleSubmit} query={query} setQuery={setQuery} />
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