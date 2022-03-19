import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Link from "next/link";


const getSingleNFT = (imgUri, tokenId, scrollPosition) => {
  if (!imgUri) {
    return null;
  }

  const altText = String(tokenId)+'.png';
//   const nftUrl = baseUri + nftId + '.png';

  return (
    <LazyLoadImage
      alt={altText}
      effect="opacity"
      scrollPosition={scrollPosition}
      src={imgUri}/>
  );
};


const NFT = ({ values, scrollPosition }) => {
  // console.log(value);
  const nftIcon = getSingleNFT(values.image,
    values.tokenId, scrollPosition);

  return (
    <div className="content rounded-xl overflow-hidden">
      <Link href={`/single_nft/${values.tokenId}`}>
        <a>
        {nftIcon}
            <div className="p-4">
            <p style={{ height: '35px' }} className="text-base font-semibold">{values.name}</p>
            </div>
        </a>
        </Link>
    </div>
  );
};

export default NFT;