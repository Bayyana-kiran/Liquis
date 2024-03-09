import React from "react";

import DotAnimation from "./DotAnimations";
const Networks = ({ setActiveComponent, activeNetwork, setActiveNetwork }) => {
  //network list
  const networks = [
    {
      name: "Ethereum",
      rpcUrl: "https://rpc.ankr.com/eth",
      logo: "assets/images/ethereum.png",
    },
    {
      name: "Poly Mumbai",
      rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
      logo: "assets/images/polygon.png",
    },
    {
      name: "Polygon",
      rpcUrl: "https://rpc.ankr.com/polygon",
      logo: "assets/images/polygon.png",
    },
    {
      name: "Goerli",
      rpcUrl: "https://rpc.ankr.com/eth_goerli",
      logo: "assets/images/ethereum.png",
    },
    {
      name: "Sepolia",
      rpcUrl: "https://rpc.ankr.com/eth_sepolia",
      logo: "assets/images/ethereum.png",
    },
  ];

  const selectNetwork = (network) => {
    setActiveComponent("Networks");
    setActiveNetwork(network.name);

    localStorage.setItem("activeNetwork", JSON.stringify(network));
  };
  return (
    <div>
      {/* DotAnimation as background */}
      <DotAnimation />

      {/* Content positioned on top of DotAnimation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="py-14 text-center">
            <section id="generator" className="py-14">
              <div className="container z-10">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-20">
                  {networks?.map((network, index) => (
                    <div key={index + 1} onClick={() => selectNetwork(network)}>
                      <div
                        className={`group p-8 rounded-xl bg-default-950/40 transition-all duration-500 hover:-translate-y-2 hover:bg-primary/40 ${
                          activeNetwork == network.name ? "bg-primary/40" : ""
                        }`}
                      >
                        <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-primary text-primary group-hover:bg-white/20 group-hover:text-white">
                          <img src={network.logo} alt="" className="h-10" />
                        </div>
                        <h3 className="text-xl font-medium text-default-200 mt-8">
                          {network.name}
                        </h3>
                        <p className="text-base font-normal text-default-300 mt-4">
                          by use of Web3{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networks;
