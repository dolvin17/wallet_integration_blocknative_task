import { ethers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";
import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";

const injected = injectedModule();

const infuraKey = "<INFURA_KEY>";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

init({
  apiKey,
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl,
    },
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
    {
      id: "0xa4ba",
      token: "ARB",
      label: "Arbitrum Nova",
      rpcUrl: "https://nova.arbitrum.io/rpc",
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
    },
  ],
});
export default function ButtonCon() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  let ethersProvider;
  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }
  return (
    <div className="flex justify-center">
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
      </button>
    </div>
  );
}
