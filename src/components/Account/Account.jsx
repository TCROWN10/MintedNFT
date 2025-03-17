import { useAppContext } from "../../contexts/appContext";
import { useAccount } from "wagmi";
import NFTCard from "../NFTCard";

const Account = () => {
  const { userNFTs, tokenMetaData, mintPrice, nextTokenId } = useAppContext();
  const { address: userAddress, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">NFT Dashboard</h1>
        
        {isConnected ? (
          <div className="space-y-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Connected Wallet</h2>
                  <p className="font-mono text-sm md:text-base bg-gray-900 py-2 px-4 rounded-lg border border-gray-700 truncate max-w-xs md:max-w-md">
                    {userAddress}
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900 py-2 px-4 rounded-lg border border-gray-700">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-500 font-medium">Connected</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-900 bg-opacity-20 rounded-lg border border-purple-800">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="font-medium text-lg">You have <span className="font-bold text-purple-400">{userNFTs.length}</span> NFT{userNFTs.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">Your Collection</span>
                <div className="h-px flex-grow bg-gradient-to-r from-purple-500 to-transparent ml-4"></div>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {userNFTs.length > 0 ? (
                  userNFTs.map((tokenId) => {
                    const metadata = tokenMetaData.get(tokenId);
                    if (!metadata) return null;

                    return (
                      <NFTCard
                        key={tokenId}
                        metadata={metadata}
                        mintPrice={mintPrice}
                        tokenId={tokenId}
                        nextTokenId={nextTokenId}
                        mintNFT={() => console.log(`Minting NFT ${tokenId}`)}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xl font-medium text-gray-400">No NFTs found in your collection</p>
                      <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Explore Marketplace
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
            <div className="rounded-full p-4 bg-gray-900 mb-6">
              <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Wallet Not Connected</h2>
            <p className="text-gray-400 mb-6 text-center max-w-md">Connect your wallet to view your NFT collection and access exclusive features</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
              </svg>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;