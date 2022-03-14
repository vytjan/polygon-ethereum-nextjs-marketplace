import { getMetadataById } from "../../lib/api";

import {
  Box,
  Divider,
  Center,
  Text,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// import { InfoIcon, AtSignIcon } from "@chakra-ui/icons";

export async function getServerSideProps({ params }) {
    const meta = await getMetadataById(params.id);
    return {
      props: {
        meta,
      },
    };
  }

export default function Photos({meta}) {
    // console.log(meta)
    // const url = meta.image;
  
    return (
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
                <div className="p-4">
                    <p style={{ height: '64px' }} className="text-2xl font-semibold">Description</p>
                    <div>
                        <p className="text-gray-400">{meta.description}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }