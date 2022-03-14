import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import axios from 'axios'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import { parseCookies } from "../lib/api";

import Web3Modal from 'web3modal'

import {
    nftcontractaddress
  } from '../config'

import DaturiansNFT from '../artifacts/Daturians.json'

const client = ipfsHttpClient('https://daturians.mypinata.cloud/ipfs/')

export default function LoadNFTs(cookieData) {
    const [cookie, setCookie] = useCookies(["user"])
    const [nfts, setNfts] = useState([])
    const [address, setAddress] = useState('')
    const [provider, setProvider] = useState(null)
    const [loadingState, setLoadingState] = useState('not-loaded')
    // const [fileUrl, setFileUrl] = useState(null)
    const [connectState, setConnectState] = useState('not-connected')
    // const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    // const router = useRouter()
  
    async function connectToWallet() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        //   web3Modal.connect().then((connection) => {
        console.log(connection);
        const provider = new ethers.providers.Web3Provider(connection)
        //   const signer = provider.getSigner()
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        // const handleSignIn = async () => {
        //     try {
        //         console.log('trying to set up cookies')
        //     //   const address = await signer.getAddress()
        //       console.log(address)
        //       setCookie("user", JSON.stringify(address), {
        //         path: "/my-nfts",
        //         maxAge: 3600, // Expires after 1hr
        //         sameSite: true,
        //       })
        //       console.log('tried to set cookies')
        //     } catch (err) {
        //         console.log('error')
        //         console.log(err)
        //     }
        // }
        setConnectState('connected')
        
        console.log(cookieData.address)
        loadNFTs(address)
        // expected output: "Success!"
    //   });
    }

    const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"

    /* next, load the NFTs of connected wallet */
    async function loadNFTs(address) {
      /* create a generic provider and query for unsold market items */
      const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
      // const provider = new ethers.providers.JsonRpcProvider(node_url)
    //   console.log(provider)
      const contract = new ethers.Contract(nftcontractaddress, DaturiansNFT.abi, provider)
      
      const data = await contract.walletOfOwner(address)
  
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
        console.log(meta)
        let imgUri = meta.data.image.replace("ipfs://", ipfs_gateway)
        let item = {
          tokenId: i.toNumber(),
          image: imgUri,
          name: meta.data.name,
          description: meta.data.description,
          data: meta.data
        }
        // console.log(item)
        return item
      }))
      setNfts(items)
      setLoadingState('loaded')
    }

    // if (address.length !== 0) {
    //     console.log(address)
    //     // useEffect(() => {
    //     loadNFTs(address)
    //     // }, [])
    // }

    // useEffect(() => {
    //   loadNFTs()
    // }, [])

    if (address.length === 0) return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
            <button onClick={connectToWallet} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                Connect wallet
            </button>
            </div>
         </div>
    )
    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No Daturians NFT in your wallet</h1>)
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

// export async function getServerSideProps({ params }) {
//     const cookieData = await parseCookies();
//     return {
//       props: {
//         cookieData,
//       },
//     };
//   }

// export async function getServerSideProps(context) {
//     const address = context.req.cookies['user'];
//     console.log(address)
//     return { props: {} }
// };