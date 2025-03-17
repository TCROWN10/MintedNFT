# AI-Generated NFT Assets

This repository contains 50 AI-generated SVG images and their corresponding metadata that you can freely use in your projects. The collection features various geometric and abstract designs that can be used for NFT projects.

## Contents

-   `images/` - Contains all NFT images
-   `metadata/` - Contains JSON metadata files for each NFT

## Usage Instructions

### 1. Upload Images to IPFS

First, upload the entire `images` folder to IPFS using your preferred method:

-   Using [Pinata](https://www.pinata.cloud/)
-   Using [NFT.Storage](https://nft.storage/)
-   Or any other IPFS service

Make sure to copy the IPFS URL of the uploaded images folder (usually starts with `ipfs://` or `https://ipfs.io/ipfs/`).

### 2. Update Metadata Files

After uploading, you need to update the metadata files to point to your uploaded images:

1. Navigate to the `metadata` folder
2. Find and replace all occurrences of `<image_folder_ipfs_url>` with your actual IPFS folder URL

Example:

-   If your IPFS folder URL is `ipfs://Qm...abc/`
-   Replace `<image_folder_ipfs_url>` with `ipfs://Qm...abc/`

### 3. Use in Your Project

You can now use these assets in your NFT project:

-   Upload the updated metadata folder to IPFS like you did with the image folder
-   Use the metadata IPFS URLs in your smart contract

## License

This repository is available under public domain. Feel free to use it in any way you like.

## Contributing

Feel free to submit issues and pull requests if you want to improve this collection.
