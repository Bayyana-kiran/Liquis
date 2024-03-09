import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IconOne, IconTwo, Networks } from "./index";
import toast from "react-hot-toast";
import DotAnimation from "./DotAnimations";
const Home = ({ setActiveComponent, GET_POOL_DETAILS }) => {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [poolAddress, setPoolAddress] = useState("");
  const [poolDetails, setpoolDetails] = useState();

  const notifyError = (msg) => toast.error(msg, { duration: 5000 });

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setSelectedNetwork(network);
  }, []);

  //calling

  const CALL_POOL_DETAIL = async (inputAddress) => {
    if (!selectedNetwork || !selectedNetwork.rpcUrl) {
      return notifyError("Network not selected or invalid");
    }

    const { rpcUrl } = selectedNetwork;
    const zeroAddress = "0x";

    if (!inputAddress || inputAddress === zeroAddress) {
      return notifyError("Provide valid data or address");
    }

    const poolDetails = await GET_POOL_DETAILS(inputAddress, selectedNetwork);
    setpoolDetails(poolDetails);
  };
  return (
    <>
      <div>
        {/* DotAnimation as background */}
        <DotAnimation />

        {/* Content positioned on top of DotAnimation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto">
            <div className="py-14 text-center">
              <div className="max-w-6xl">
                <h2 className="md:text-6xl/tight text-5xl text-default-100 font-semibold mb-6">
                  LiquiS: Uniswap Pool & Liquidity Finder
                </h2>
                <p className="text-base text-default-200 font-medium px-5">
                  Welcome to our Uniswap Pool & Liquidity Finder! Dive into
                  decentralized finance with ease. Uniswap, the leading DEX,
                  awaits. Explore pools, trade, provide liquidity, and earn
                  rewards effortlessly. Join the DeFi revolution now!
                </p>
                <div className="backdrop-blur-2xl bg-white/10 rounded-md max-w-xl mx-auto">
                  <div className="w-full flex items-center justify-between mt-7">
                    <input
                      type="text"
                      className="w-full p-4 border-0 focus:outline-none focus:ring-0 text-sm placeholder:text-white bg-transparent"
                      placeholder="Enter pool address"
                      autoComplete="off"
                      onChange={(e) => setPoolAddress(e.target.value)}
                    />
                    <button className="py-2 px-6 me-2 border-0 text-white font-semibold text-sm rounded-md backdrop-blur-2xl bg-primary hover:bg-primary/85 hover:text-white transition-all duration-500">
                      <div
                        onClick={() => CALL_POOL_DETAIL(poolAddress)}
                        className="flex items-center justify-center gap-1"
                      >
                        <span>Submit</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                  <a
                    onClick={() => setActiveComponent("Liquidity History")}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary/75 transition-all duration-300"
                  >
                    {poolAddress ? "Check Liquidity" : "Get Pool Liquidity"}
                    <FaArrowRightLong />
                  </a>
                  <a
                    onClick={() => setActiveComponent("Liquidity")}
                    className="inline-flex items-center justify-center gap-2 border border-white/10 text-white py-2 px-6 rounded-full hover:bg-primary/85 transition-all duration-300"
                  >
                    Liquidity
                    <FaArrowRightLong />
                  </a>
                </div>
                <p className="text-sm font-medium text-default-400 mt-5">
                  Get all details about the pools and liquidity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
