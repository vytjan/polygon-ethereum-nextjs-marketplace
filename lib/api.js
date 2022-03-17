import axios from 'axios';

export const getMetadataById = async (id, contract) => {

    const tokenUri = await contract.tokenURI(id)
    const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"

    let newUri = tokenUri.replace("ipfs://", ipfs_gateway)
    const meta = await axios.get(newUri)
    let imgUri = meta.data.image.replace("ipfs://", ipfs_gateway)
    // append class name
    meta.data.extras.forEach(element => {
      element['className'] = element.trait_type.toLowerCase().replace(" ", "-").replace("/","-");
    });
    meta.data.attributes.forEach(element => {
      console.log(element);
      element['className'] = element.trait_type.toLowerCase().replace(" ", "-").replace("/","-");
    });

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
