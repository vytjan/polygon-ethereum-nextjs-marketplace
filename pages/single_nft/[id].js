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
<<<<<<< HEAD
        <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-4">
                <div className="px-1" style={{ maxWidth: '1600px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">
                        <div className="border shadow rounded-xl overflow-hidden">
                            <img 
                                src={meta.image}
                                alt={meta.image}
                                />
                        </div>
                         {/* attributes */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 border shadow rounded-xl overflow-hidden">
                            <p className="text-2xl font-semibold px-4 gap-4 pt-4">Attributes</p>
                            {meta.data.attributes.map((item, i) => (
                                <div className="p-4" 
                                key={item.trait_type}>
                                    <p className="text-2l font-semibold">{item.trait_type}</p>
                                    <div>
                                        <p className="text-gray-400">{item.value}</p>
                                    </div>
                                </div>
                            ))}
=======
        <div className="flex justify-center">
        <div className="px-1" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                <div className="border shadow rounded-xl overflow-hidden">
                    <img 
                        src={meta.image}
                        alt={meta.image}
                        />
                    <p style={{ height: '64px' }} className="text-2xl font-semibold">{meta.name}</p>
                </div>
                {/* extras */}
                {meta.data.extras.map((item, i) => (
                <div
                key={item.trait_type}
                className={"border shadow rounded-xl overflow-hidden "+item.className}>
                        <div className="p-4" >
                            <p className="text-2xl font-semibold">{item.trait_type}</p>
                            <div>
                                <p className="text-gray-400">{item.value}</p>
                            </div>
>>>>>>> 062e073b4eca96132b21cf39e2c543531f7bb940
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
                <div className="px-1" style={{ maxWidth: '1600px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">
                        <div className="border shadow rounded-xl overflow-hidden">
                            <p style={{ height: '64px' }} className="gap-4 pt-4 px-4 text-2xl font-semibold">{meta.name}</p>
                            <p style={{ height: '64px' }} className="gap-4 pt-4 px-4 text-2xl font-semibold text-gray-400"></p>
                        </div>
                        {/* extras */}
                        {meta.data.extras.map((item, i) => (
                        <div
                        key={item.trait_type} 
                        className={"border shadow rounded-xl overflow-hidden" + item.className}>
                                <div className="p-4" >
                                    <p className="text-2xl font-semibold">{item.trait_type}</p>
                                    <div>
                                        <p className="text-gray-400">{item.value}</p>
                                    </div>
                                </div>
=======
                ))}
                {/* attributes */}
                <div className="border shadow rounded-xl overflow-hidden">
                    <p className="text-2xl font-semibold">Attributes</p>
                    {meta.data.attributes.map((item, i) => (
                        <div className={"p-4 "+item.className} 
                        key={item.trait_type}>
                            <p className="text-2l font-semibold">{item.trait_type}</p>
                            <div>
                                <p className="text-gray-400">{item.value}</p>
                            </div>
>>>>>>> 062e073b4eca96132b21cf39e2c543531f7bb940
                        </div>
                        ))}
                    </div>
                </div>
            </div>
      </div>
    )
  }