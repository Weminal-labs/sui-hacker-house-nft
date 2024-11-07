// import { TransactionBlock } from '@mysten/sui.js';

import { Transaction } from "@mysten/sui/transactions";

interface UploadResponse {
  success: boolean;
  blobId?: string;
  downloadUrl?: string;
  txHash?: string;
  message?: string;
}

export const uploadToWalrus = async (
  file: File,
  epochs: number,
  proofObjectId: string,
  signer: any
): Promise<UploadResponse> => {
  const PACKAGE_ID = "0x2ecd0db840b24cdf1330b20008704f567cbee21e5ab61c77b52a6aa82b31e59a";

  try {
    // 1. Upload to Walrus
    const response = await fetch(`https://publisher.walrus-testnet.walrus.space/v1/store?epochs=${epochs}`, {
      method: "PUT",
      body: file
    });

    if (!response.ok) {
      throw new Error("Upload to Walrus failed");
    }

    const data = await response.json();
    console.log("Walrus upload response:", data);

    // 2. Get image URL
    let imageUrl = "";
    if (data.newlyCreated) {
      imageUrl = `https://aggregator.walrus-testnet.walrus.space/v1/${data.newlyCreated.blobObject.blobId}`;
    } else if (data.alreadyCertified) {
      imageUrl = `https://aggregator.walrus-testnet.walrus.space/v1/${data.alreadyCertified.blobId}`;
    }

    // 3. Call smart contract to add image URL
    const tx = new Transaction();

    // Call add_img_url_day01
    tx.moveCall({
      target: `${PACKAGE_ID}::proof_of_sui_build::add_img_url_day01`,
      arguments: [
        tx.object(proofObjectId),
        tx.pure.string(imageUrl),
        // get clock system
        tx.object('0x0000000000000000000000000000000000000000000000000000000000000006'),
      ],
    });

    const txResult = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });

    return {
      success: true,
      blobId: data.newlyCreated?.blobObject.blobId || data.alreadyCertified?.blobId,
      downloadUrl: imageUrl,
      txHash: txResult.digest
    };

  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Upload failed"
    };
  }
}; 