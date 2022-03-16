import axios from 'axios';

export const getMetadataById = async (id, contract) => {

    const tokenUri = await contract.tokenURI(id)
    const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"

    let newUri = tokenUri.replace("ipfs://", ipfs_gateway)
    const meta = await axios.get(newUri)
    let imgUri = meta.data.image.replace("ipfs://", ipfs_gateway)
    let item = {
      tokenId: id,
      image: imgUri,
      name: meta.data.name,
      description: meta.data.description,
      data: meta.data
    }
    return item
  };

  export const getQueryMetadata = (query, items) => {

    const resultItems = items.filter(item => item.name.includes(query) ? item : null);

    return resultItems
  };
