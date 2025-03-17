import { Contract } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { getReadOnlyProvider } from "../utils";
import NFT_ABI from "../ABI/nft.json";
import { useAccount, useConfig } from "wagmi";
import { getEthersSigner } from "../config/wallet-connection/adapter";

const appContext = createContext();

export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};

export const AppProvider = ({ children }) => {
    const {address: userAddress, isConnected} = useAccount();
    const wagmiConfig = useConfig()
    const [nextTokenId, setNextTokenId] = useState(null);
    const [maxSupply, setMaxSupply] = useState(null);
    const [baseTokenURI, setBaseTokenURI] = useState("");
    const [tokenMetaData, setTokenMetaData] = useState(new Map());
    const [mintPrice, setMintPrice] = useState(null);
    const [userNFTs, setUserNFTs] = useState([]);

    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );
        contract
            .nextTokenId()
            .then((id) => setNextTokenId(id))
            .catch((error) => console.error("error: ", error));

        contract
            .baseTokenURI()
            .then((uri) => setBaseTokenURI(uri))
            .catch((error) => console.error("error: ", error));

        contract
            .maxSupply()
            .then((supply) => setMaxSupply(supply))
            .catch((error) => console.error("error: ", error));

        contract
            .mintPrice()
            .then((price) => setMintPrice(price))
            .catch((error) => console.error("error: ", error));
    }, []);

    useEffect(() => {
        if (!maxSupply || !baseTokenURI) return;
        // const tokenIds = Array.from({ length: Number(maxSupply) }, (_, i) => i);

        const tokenIds = [];
        for (let i = 0; i < maxSupply; i++) {
            tokenIds.push(i);
        }

        const promises = tokenIds.map((id) => {
            return fetch(`${baseTokenURI}${id}.json`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
        });

       
        Promise.all(promises)
            .then((responses) => {
                const tokenMetaData = new Map();
                responses.forEach((response, index) => {
                    tokenMetaData.set(index, response);
                });
                setTokenMetaData(tokenMetaData);
            })
            .catch((error) => console.error("error: ", error));
    }, [baseTokenURI, maxSupply]);

    useEffect(()=>{
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );
        

            const switchMintButton = (Minter, NftId) =>{
                console.log(`The button has switched, The minter is ${Minter} and the NFT is ${NftId}`)
            }

            contract.on("Minted", switchMintButton)

            contract
            .nextTokenId()
            .then((id) => setNextTokenId(id))
            .catch((error) => console.error("error: ", error));

         return () =>{
            contract.off("Minted" , switchMintButton)
         }
    }, []);
    useEffect(() => {
        if (!userAddress || !isConnected || nextTokenId === null)
            return;
        fetchUserNFTs();
    }, [userAddress, isConnected , nextTokenId]);

    const fetchUserNFTs = async () => {
        try{
            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                getReadOnlyProvider()
            );
            const userGetNFTs =[];
            for (let i = 0; i < nextTokenId; i++) {
                const owner = await contract.ownerOf(i);
                if (owner.toLowerCase() === userAddress.toLocaleLowerCase()
                ) {
                    userGetNFTs.push(i);
                }
            }
            setUserNFTs(userGetNFTs);
        } catch (error) {
            console.error("Error fetching user NFTs: error");
        }
    };

    const transferNfts = async ( tokenId, reciever) => {
        try {
            const signer = await getEthersSigner(wagmiConfig);
        if (!signer) throw new Error("Wallet not connected");
            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                signer
            );
    
            const tx = contract.transferFrom(signer.getAddress(), reciever, tokenId);

            await tx.wait()
    
            setUserNFTs((prev) => prev.filter((id) => id !== tokenId))

        }catch(error){
            console.log(error)
        }

    }

    return (
        <appContext.Provider
            value={{
                nextTokenId,
                maxSupply,
                baseTokenURI,
                tokenMetaData,
                mintPrice,
                userNFTs,
                transferNfts
            }}
        >
            {children}
        </appContext.Provider>
    );
};
