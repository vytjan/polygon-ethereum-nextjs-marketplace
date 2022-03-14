import DaturiansNFT from '../artifacts/Daturians.json';
import { ethers } from 'ethers';
import axios from 'axios';
import {
    nftcontractaddress
  } from '../config'

export const getMetadataById = async (id) => {

    const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(nftcontractaddress, DaturiansNFT.abi, provider)
    const tokenUri = await contract.tokenURI(id)
    
    // console.log(tokenUri)

    let newUri = tokenUri.replace("ipfs://", ipfs_gateway)
    const meta = await axios.get(newUri)
    // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    // console.log(meta)
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
      tokenId: id,
      // seller: i.seller,
      // owner: i.owner,
      image: imgUri,
      name: meta.data.name,
      description: meta.data.description,
      data: meta.data
    }
    // console.log(item)
    return item
  };