import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import NFTCard from "./components/NFTCard";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  // fetch NFTs by owner and filter by collection if it exists for the owner
  async function fetchNFTs() {
    let nfts;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    console.log("fetching NFTs by owner..");
    if (!collection.length) {
      const baseURL =
        "https://eth-mainnet.g.alchemy.com/nft/v2/SNab-mG2nJHyf_iSJ9rkbsA5asdEexnQ/getNFTs";

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, options)
        .then((response) => response.json())
        // .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } else {
      console.log("also retrieving collections for this owner..");
      const baseURL =
        "https://eth-mainnet.g.alchemy.com/nft/v2/SNab-mG2nJHyf_iSJ9rkbsA5asdEexnQ/getNFTs";

      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses[]=${collection}&withMetadata=true`;

      nfts = await fetch(fetchURL, options)
        .then((response) => response.json())
        // .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }

    if (nfts) {
      setNFTs(nfts.ownedNfts);
    }
    console.log(JSON.stringify(NFTs));
  }

  //fetch all NFTs owned by all owners that belong to a collection
  async function fetchNFTSCollection() {
    let nfts;
    const options = {
      method: "GET",
      // headers: { accept: "application/json" },
    };
    if (collection.length) {
      console.log("retrieving all NFTs in this collection..");
      const baseURL =
        "https://eth-mainnet.g.alchemy.com/nft/v2/SNab-mG2nJHyf_iSJ9rkbsA5asdEexnQ/getNFTsForCollection";

      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true`;

      nfts = await fetch(fetchURL, options)
        .then((response) => response.json())
        // .then((response) => console.log(response))
        .catch((err) => console.error(err));

      if (nfts) {
        setNFTs(nfts.nfts);
        console.log("stringified" + JSON.stringify(NFTs));
        console.log("as is " + NFTs);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <h1 className="text-7xl pb-6 mb-6">NFT Gallery</h1>
      {/* container for user input box */}
      <div className="grid w-2/3 grid-cols-2 p-3 m-3 gap-y-2">
        {/* <div className="flex flex-col w-full items-center justify-center gap-y-2"> */}
        <label>Wallet Address</label>
        <input
          disabled={fetchForCollection}
          className="w-3/5 h-9 bg-slate-100 rounded-sm text-gray-800 focus:outline-red-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          type={"text"}
          placeholder={"add your wallet address"}
        ></input>
        <label>Collection Address</label>
        <input
          className="w-3/5 h-9 bg-slate-100 rounded-sm text-gray-800 focus:outline-red-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={"text"}
          placeholder={"add collection address"}
        ></input>
      </div>
      <div className="flex flex-col justify-center">
        <label>Fetch collections </label>
        <input
          onChange={(e) => {
            setFetchForCollection(e.target.checked);
            console.log(fetchForCollection);
          }}
          className="m-3"
          type={"checkbox"}
        ></input>
      </div>
      <button
        className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 rounded-sm w-1/5"
        onClick={() => {
          if (fetchForCollection) {
            fetchNFTSCollection();
          } else {
            fetchNFTs();
          }
        }}
      >
        Let's go !
      </button>
      {/* NFT Collection */}
      <div className="flex flex-wrap gap-y-12 gap-x-2 mt-4 w-5/6 justify-center">
        {NFTs.length &&
          NFTs.map((nft) => {
            return <NFTCard key={nft.id.tokenId} nft={nft}></NFTCard>;
          })}
      </div>
    </div>
  );
}
