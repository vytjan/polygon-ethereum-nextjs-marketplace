import DaturiansNFT from '../../artifacts/Daturians.json';
import { ethers } from 'ethers';
import { nftcontractaddress } from '../../config'
import { getMetadataById } from "../../lib/api";

export async function getServerSideProps({ params }) {

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(nftcontractaddress, DaturiansNFT.abi, provider)

    const meta = await getMetadataById(params.id, contract);
    return {
      props: {
        meta,
      },
    };
  }

export default function Nft({meta}) {
    return (
        <div className="flex justify-center">
        <div className="px-1" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
                
                {/* image */}
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">
                    <div className="rounded-xl overflow-hidden">
                        <img className="object-cover content-center"
                            src={meta.image}
                            alt={meta.image}
                            />
                    </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 pt-4 ">
                    
                    {/* name */}
                    <div className="content rounded-xl overflow-hidden col-span-1">
                        <div className="p-4 ">
                            <p className="text-2l font-semibold">{meta.name}</p>
                        </div>
                    </div>
                    
                    {/* health */}
                    <div className="content rounded-xl overflow-hidden col-span-2">
                        <div className="p-4 w-full inline-flex">
                            <p className="text-2l font-semibold w-3/12">{meta.data.attributes[7].trait_type + ": "}</p>
                           
                                <p className="font-light w-1/5">{meta.data.attributes[7].value}</p>
                                <div className="relative pt-2 w-full rounded">
                                    <div className="h-2 text-xs flex rounded bg-white">
                                        <div style={{ width: meta.data.attributes[7].value + "%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink rounded">
                                            <div className="heart">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                     
                        </div>
                    </div>

                    {/* location */}
                    <div className="content rounded-xl overflow-hidden col-span-3">
                        <div className="two-columns">
                            <div className="p-4 attribute-title">
                                <p className="text-2l font-semibold">{meta.data.attributes[2].trait_type}: </p>
                                <p className="text-2l font-light">{meta.data.attributes[2].value}</p>
                            </div>
                            <div className="p-4 attribute-description">
                                <p className="font-light">{meta.data.extras[0].value}</p>
                            </div>
                        </div>
                    </div>

                    {/* genetics */}
                    <div className="content rounded-xl overflow-hidden col-span-3">
                        <div className="p-4 inline-flex text-center">
                            <p className="text-2l font-semibold">Genetics:  </p>
                                <p className="font-light">{meta.data.attributes[3].value}</p>
                        </div>
                    </div>

                    {/* family */}
                    <div className="content rounded-xl overflow-hidden col-span-3">
                        <div className="two-columns">
                            <div className="p-4 attribute-title">
                                <p className="text-2l font-semibold">{meta.data.attributes[3].trait_type}: </p>
                                <p className="text-2l font-light">{meta.data.attributes[3].value}</p>
                            </div>
                            <div className="p-4 attribute-description">
                                <p className="font-light">{meta.data.extras[1].value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Occupation */}
                    <div className="content rounded-xl overflow-hidden col-span-2">
                        <div className="p-4 ">
                            <p className="text-2l font-semibold text-center">{meta.data.attributes[4].trait_type + ": "}</p>
                            <p className="text-2l font-light text-center">{meta.data.attributes[4].value}</p>
                            <p>&nbsp;</p>
                            <div>
                                <p className="font-light">{meta.data.extras[2].value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Special ability */}
                    <div className="content rounded-xl overflow-hidden col-span-1">
                        <div className="p-4 ">
                            <p className="text-2l font-semibold text-center">{meta.data.extras[3].trait_type + ": "}</p>
                            <p>&nbsp;</p><p>&nbsp;</p>
                            <div>
                                <p className="font-light">{meta.data.extras[3].value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Plant */}
                    <div className="content rounded-xl overflow-hidden col-span-3">
                        <div className="two-columns">
                            <div className="p-4 flower-attribute-description">
                                <p className="font-light">{meta.data.extras[4].value}</p>
                            </div>
                            <div className="p-4 flower-attribute-title">
                                <p className="text-2l font-semibold">{meta.data.attributes[9].trait_type}: </p>
                                <p className="text-2l font-light">{meta.data.attributes[9].value}</p>
                            </div>
                            
                        </div>
                    </div>

                    {/* faction */}
                    <div className="content rounded-xl overflow-hidden col-span-1">
                        <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">{meta.data.attributes[1].trait_type + ": "}</p>
                            <div>
                                <p className="font-light">{meta.data.attributes[1].value}</p>
                            </div>
                        </div>
                    </div>

                    {/* type */}
                    <div className="content rounded-xl overflow-hidden col-span-2">
                        <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">{meta.data.attributes[0].trait_type + ": "}</p>
                            <div>
                                <p className="font-light">{meta.data.attributes[0].value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Character traits */}
                    <div className="content rounded-xl overflow-hidden col-span-3">
                        <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">{meta.data.extras[5].trait_type + ": "}</p>
                            <div>
                                <p className="font-light">{meta.data.extras[5].value}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }