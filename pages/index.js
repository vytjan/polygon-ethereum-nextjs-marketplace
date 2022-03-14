import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import Web3Modal from 'web3modal'
import Link from "next/link"
// import Image from "next/image"
// import { Box, Container, Text, Wrap, WrapItem } from "@chakra-ui/react"

import {
  nftcontractaddress
} from '../config'

import DaturiansNFT from '../artifacts/Daturians.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  // const node_url = "https://mainnet.infura.io/v3/0470019fdf234b2cad2f660b9070bb45"
  const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(nftcontractaddress, DaturiansNFT.abi, provider)
    // console.log(contract)
    // const baseuri = await contract.baseURI()
    // console.log(baseuri)
    const data = await contract.walletOfOwner("0x55d9fc8d5f84cf151d9578c6713a0c0ec35e0e5f")
    // console.log(data)

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log(i.toNumber())
      const tokenUri = await contract.tokenURI(i.toNumber())
      // console.log(tokenUri)

      let newUri = tokenUri.replace("ipfs://", ipfs_gateway)
      const meta = await axios.get(newUri)
      // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      console.log(meta)
      let imgUri = meta.data.image.replace("ipfs://", ipfs_gateway)
      // const raw = await axios.get(imgUri, {
      //   responseType: "arraybuffer",
      // })
      // // create a base64 encoded string
      // let base64 = Buffer.from(raw.data, "binary").toString("base64");
      
      // // create image src
      // let img = 'data:${raw.headers["content-type"]};base64,${base64}';
      // console.log(img)
      let item = {
        // price,
        tokenId: i.toNumber(),
        // seller: i.seller,
        // owner: i.owner,
        image: imgUri,
        name: meta.data.name,
        description: meta.data.description,
        data: meta.data
      }
      console.log(item)
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft) => (
                <div
                  key={nft.tokenId} 
                  className="border shadow rounded-xl overflow-hidden"
                  >
                  <Link href={`/single_nft/${nft.tokenId}`}>
                    <a>
                      <img 
                        src={nft.image}
                        alt={nft.data.image}
                        />
                      <div className="p-4">
                        <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                        <div style={{ height: '70px', overflow: 'hidden' }}>
                          <p className="text-gray-400">{nft.description}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
      </div>
    </div>
  )
}