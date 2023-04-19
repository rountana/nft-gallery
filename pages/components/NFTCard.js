export default function NFTCard({ nft }) {
  return (
    <div className="w-1/4 flex flex-col">
      <div className="rounded-md bg-slate-100">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
        <div className="flex flex-col y-gap-2 px-2 py-3">
          <h1 class="font-normal text-gray-600"> Title: {nft.title} </h1>
          <p class="font-normal text-gray-600">
            Token ID : {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <div className="flex flex-grow">
            <p class="font-normal text-gray-600">
              Description: {nft.description?.substr(0, 150)}
            </p>
          </div>
          <div class="flex">
            {/* format the address so we can display short form address */}
            <p class="font-normal text-gray-600">
              Owner: {nft.contract.address.substr(0, 4)}...
              {nft.contract.address.substr(nft.contract.address.length - 4)}
            </p>
            <p class="mx-2">
              <text
                class="font-normal text-blue-400"
                onClick={() => {
                  navigator.clipboard.writeText(nft.contract.address);
                }}
              >
                Copy
              </text>
            </p>
          </div>
          <div className="flex justify-center mb-1">
            <a
              className=" bg-blue-400 py-2 px-4 w-2/3 text-center rounded-md text-white cursor-pointer"
              target={"_blank"}
              href={`https://etherscan.io/token/${nft.contract.address}`}
            >
              View on etherscan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
