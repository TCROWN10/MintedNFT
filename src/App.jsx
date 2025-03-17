import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAppContext } from "./contexts/appContext";
import NFTCard from "./components/NFTCard";
import useMintToken from "./hooks/useMintToken";
import { motion } from "framer-motion";

function App() {
  const { nextTokenId, tokenMetaData, mintPrice, transferNfts } = useAppContext();
  const tokenMetaDataArray = Array.from(tokenMetaData.values());
  const mintToken = useMintToken();

  return (
    <div className="bg-[#0a0e17] text-white min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center py-16 mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] opacity-10 blur-3xl rounded-full"></div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e4aff] to-[#399EEA] mb-4">TCROWN NFT</h1>
          <p className="text-xl text-gray-400 max-w-md text-center">
            Discover, collect, and trade unique digital assets on the blockchain
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] rounded-lg font-bold hover:opacity-90 transition">
              SPREAD LOVE
            </button>
            <button className="px-6 py-3 bg-transparent border border-[#399EEA] rounded-lg font-bold hover:bg-[#399EEA]/10 transition">
              SHOW LOVE
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46] hover:border-[#399EEA] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Mint NFT</h2>
            <p className="text-gray-400">
              Create and mint your own unique digital assets with just a few clicks
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46] hover:border-[#399EEA] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Manage NFTs</h2>
            <p className="text-gray-400">
              View and manage your collection of digital assets in one place
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46] hover:border-[#399EEA] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#6e4aff] to-[#399EEA] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Marketplace</h2>
            <p className="text-gray-400">
              Buy, sell, and trade NFTs with other collectors worldwide
            </p>
          </motion.div>
        </div>

        {/* Collection Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured NFTs</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-[#131b2e] rounded-lg hover:bg-[#1f2b47] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className="p-2 bg-[#131b2e] rounded-lg hover:bg-[#1f2b47] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tokenMetaDataArray.map((token, i) => (
              <NFTCard
                key={token.name.split(" ").join("")}
                metadata={token}
                mintPrice={mintPrice}
                tokenId={i}
                nextTokenId={nextTokenId}
                mintNFT={mintToken}
                transferNft={transferNfts}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46]">
            <p className="text-gray-400 mb-2">Total Volume</p>
            <h3 className="text-2xl font-bold">1,245 ETH</h3>
          </div>
          <div className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46]">
            <p className="text-gray-400 mb-2">NFTs Minted</p>
            <h3 className="text-2xl font-bold">{nextTokenId || 0}</h3>
          </div>
          <div className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46]">
            <p className="text-gray-400 mb-2">Floor Price</p>
            <h3 className="text-2xl font-bold">0.5 ETH</h3>
          </div>
          <div className="bg-[#131b2e] p-6 rounded-xl border border-[#222e46]">
            <p className="text-gray-400 mb-2">Owners</p>
            <h3 className="text-2xl font-bold">358</h3>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;