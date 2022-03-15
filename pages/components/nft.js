import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Link from "next/link";


const getSingleNFT = function(imgUri, tokenId, scrollPosition) {
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

/**
 * NFT component
 * renders the data about a single NFT
 * @param {object} param - props
 * @param {object} param.values
 * @return {object} NFt component
 */
const NFT = ({ values, scrollPosition }) => {
  const nftIcon = getSingleNFT(values.image,
    values.tokenId, scrollPosition);

  return (
    <div className="border shadow rounded-xl overflow-hidden">
      <Link href={`/single_nft/${values.tokenId}`}>
        <a>
        {nftIcon}
            <div className="p-4">
            <p style={{ height: '64px' }} className="text-2xl font-semibold">{values.name}</p>
            <div style={{ height: '70px', overflow: 'hidden' }}>
                <p className="text-gray-400">{values.description}</p>
            </div>
            </div>
        </a>
        </Link>
    </div>
  );
};

// City.propTypes = {
//   values: PropTypes.shape({
//     LocalizedName: PropTypes.string.isRequired,
//     Temperature: PropTypes.shape({
//       Imperial: PropTypes.shape({
//         Unit: PropTypes.string.isRequired,
//         Value: PropTypes.number.isRequired
//       }).isRrequired,
//       Metric: PropTypes.shape({
//         Unit: PropTypes.string.isRequired,
//         Value: PropTypes.number.isRequired
//       }).isRrequired
//     }).isRequired,
//     WeatherText: PropTypes.string.isRequired,
//     WeatherIcon: PropTypes.number
//   }).isRequired
// };

export default NFT;