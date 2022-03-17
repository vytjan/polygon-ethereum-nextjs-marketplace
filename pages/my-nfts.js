import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
// import Link from "next/link"
// import { getMetadataById } from "../lib/api";
// import { useRouter } from 'next/router'
import { trackWindowScroll } from 'react-lazy-load-image-component';

import Web3 from "web3"
import Web3Modal from 'web3modal'

import { nftcontractaddress } from '../config'
import DaturiansNFT from '../artifacts/Daturians.json'
import NFT from './components/nft'


// export default function LoadNFTs(cookieData) {
const myNFT = ({scrollPosition}) => {
    const [nfts, setNfts] = useState([])
    const [address, setAddress] = useState('')
    const [loadingState, setLoadingState] = useState('not-loaded')
    // const router = useRouter()
  
    async function connectToWallet() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        // console.log(connection);
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)

        // load my nfts
        loadNFTs(address)
    }

    const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"

    /* next, load the NFTs of connected wallet */
    async function loadNFTs(address) {
      /* create a generic provider */
      const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
      // const provider = new ethers.providers.JsonRpcProvider(node_url)
      const contract = new ethers.Contract(nftcontractaddress, DaturiansNFT.abi, provider)
      
      const data = await contract.walletOfOwner(address)
  
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

  // check if there is an address connected
  useEffect(() => {
    const checkConnection = async () => {

        // Check if browser is running Metamask
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        };

        // Check if User is already connected by retrieving the accounts
        web3.eth.getAccounts()
            .then(async (addr) => {
              if (addr.length >0){
                setAddress(addr[0])
                loadNFTs(addr[0])
                // console.log(addr)
              } else {
                setAddress('')
              }
                // Set User account into state
            }).catch(async (err) => {
              console.log(err)
            });
    };
    checkConnection();
  }, []);

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
                  <NFT key={nft.tokenId} scrollPosition={scrollPosition} values={nft} />
                ))}
            </div>
        </div>
      </div>
    )
  }

export default trackWindowScroll(myNFT)