import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

const { networkConfig } = createNetworkConfig({
	devnet: { url: getFullnodeUrl('devnet') },
	testnet: { url: getFullnodeUrl('testnet') },
});

export { networkConfig };