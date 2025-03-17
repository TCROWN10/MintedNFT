import { Icon } from "@iconify/react/dist/iconify.js";
import { formatEther } from "ethers";
import React, { useState } from "react";
import { truncateString } from "../../utils";
import { motion } from "framer-motion";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOwned = Number(nextTokenId) > tokenId;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-[#131b2e] rounded-xl cursor-pointer overflow-hidden border border-[#222e46] hover:border-[#399EEA] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* NFT Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={metadata.image}
          alt={`${metadata.name} image`}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
        />
        {isOwned && (
          <div className="absolute top-3 right-3 bg-[#399EEA] text-white text-xs font-bold px-2 py-1 rounded-md">
            OWNED
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg text-white">{metadata.name}</h3>
          <div className="bg-[#0a0e17] px-2 py-1 rounded-md text-xs font-medium text-gray-400">
            #{tokenId}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 min-h-[40px]">
          {truncateString(metadata.description, 80)}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#0a0e17] p-1 rounded-md">
              <Icon icon="ri:file-list-3-line" className="w-4 h-4 text-[#399EEA]" />
            </div>
            <span className="text-sm text-gray-300">{metadata.attributes.length} Attributes</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#0a0e17] p-1 rounded-md">
              <Icon icon="ri:eth-line" className="w-4 h-4 text-[#399EEA]" />
            </div>
            <span className="text-sm font-bold text-white">{`${formatEther(mintPrice)} ETH`}</span>
          </div>
        </div>

        <button
          disabled={Number(nextTokenId) !== tokenId}
          onClick={mintNFT}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
            Number(nextTokenId) !== tokenId
              ? isOwned
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#6e4aff] to-[#399EEA] text-white hover:shadow-lg hover:shadow-[#399EEA]/20"
          }`}
        >
          {isOwned ? "OWNED" : "MINT NFT"}
        </button>
      </div>

      {/* Hover overlay */}
      {isHovered && !isOwned && Number(nextTokenId) === tokenId && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] to-transparent opacity-30 flex items-center justify-center">
          <div className="bg-[#399EEA] p-2 rounded-full">
            <Icon icon="ri:shopping-cart-line" className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NFTCard;