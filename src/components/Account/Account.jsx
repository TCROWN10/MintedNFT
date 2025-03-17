import { useAppContext } from "../../contexts/appContext";
import { useAccount } from "wagmi";
import NFTCard from "../NFTCard";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const { userNFTs, tokenMetaData, mintPrice, nextTokenId, transferNfts } = useAppContext();
  const { address: userAddress, isConnected } = useAccount();
  const [receiverAddress, setReceiverAddress] = useState({});
  const navigate = useNavigate();

  const addressInput = (tokenId, value) => {
    setReceiverAddress((prev) => ({ ...prev, [tokenId]: value }));
  };

  const handleBackToDashboard = () => {
  navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button 
          onClick={handleBackToDashboard}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-8 mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] opacity-10 blur-3xl rounded-full"></div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e4aff] to-[#399EEA] mb-4">
          My Collection
        </h1>
        {isConnected ? (
          <div className="flex flex-col items-center">
            <div className="bg-[#131b2e] px-4 py-2 rounded-lg border border-[#222e46] mb-2 flex items-center">
              <span className="text-gray-400 mr-2">Wallet:</span>
              <span className="text-white font-mono">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span>
              <div className="ml-2 w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="bg-[#131b2e] px-4 py-2 rounded-lg border border-[#222e46] flex items-center">
              <span className="text-gray-400 mr-2">NFTs Owned:</span>
              <span className="text-2xl font-bold text-white">{userNFTs.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-[#131b2e] px-6 py-8 rounded-xl border border-[#222e46] mb-4 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-gray-400 text-xl mb-4">Connect your wallet to view your NFTs</p>
              <button className="px-6 py-3 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] rounded-lg font-bold hover:opacity-90 transition">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NFT Collection */}
      {isConnected && (
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Your NFTs</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-[#131b2e] rounded-lg hover:bg-[#1f2b47] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button className="p-2 bg-[#131b2e] rounded-lg hover:bg-[#1f2b47] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {userNFTs.length > 0 ? (
              userNFTs.map((tokenId) => {
                const metadata = tokenMetaData.get(tokenId);
                if (!metadata) return null;

                return (
                  <motion.div
                    key={tokenId}
                    whileHover={{ y: -5 }}
                    className="bg-[#131b2e] rounded-xl overflow-hidden border border-[#222e46] transition-all duration-300"
                  >
                    <div className="p-4">
                      <NFTCard
                        metadata={metadata}
                        mintPrice={mintPrice}
                        tokenId={tokenId}
                        nextTokenId={nextTokenId}
                        mintNFT={() => console.log(`Minting NFT ${tokenId}`)}
                      />
                      
                      <div className="mt-4 space-y-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter recipient wallet address"
                            className="w-full bg-[#0a0e17] border border-[#222e46] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#399EEA] focus:border-transparent"
                            value={receiverAddress[tokenId] || ""}
                            onChange={(e) => addressInput(tokenId, e.target.value)}
                          />
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <button
                          onClick={() => transferNfts(tokenId, receiverAddress[tokenId])}
                          disabled={!receiverAddress[tokenId]}
                          className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                            !receiverAddress[tokenId]
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#6e4aff] to-[#399EEA] text-white hover:shadow-lg hover:shadow-[#399EEA]/20"
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Transfer NFT
                          </div>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-[#131b2e] p-6 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-400 mb-2">No NFTs Found</p>
                  <p className="text-gray-500 mb-6 text-center max-w-md">
                    You don't have any NFTs in your collection yet. Start by minting or purchasing NFTs.
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] rounded-lg font-bold hover:opacity-90 transition">
                    Explore Marketplace
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;