import { commify } from "ethers/lib/utils";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DotAnimation from "./DotAnimations";
const GetPool = ({ GET_POOL_ADDRESS }) => {
  const [selectNetwork, setSelectedNetwork] = useState({});
  const [poolAddress, setPoolAddress] = useState([]);

  const notifyError = (msg) => toast.error(msg, { duration: 5000 });

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setSelectedNetwork(network);
  }, []);

  const [liquidity, setLiquidity] = useState({
    token_A: "",
    token_B: "",
    fee: "",
  });

  const handleFormFile = (fileName, e) => {
    setLiquidity({ ...liquidity, [fileName]: e.target.value });
  };

  const CALL_POOL_ADDRESS = async () => {
    const { token_A, token_B, fee } = liquidity;
    const { rpcUrl } = selectNetwork;
    if (!token_A || !token_B || !fee || !rpcUrl) {
      return notifyError("Provide details");
    }
    const poolAddress = await GET_POOL_ADDRESS(liquidity, selectNetwork);
    setPoolAddress(poolAddress);
  };

  return (
    <div>
      {/* DotAnimation as background */}
      <DotAnimation />

      {/* Content positioned on top of DotAnimation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col h-full p-10 lg:ps-0">
          <h4 className="text-2xl font-bold text-white mb-4">
            Check Liquidity Pool Address
          </h4>
          <p className="text-default-300 mb-8 max-w-sm">
            Enter details of the 2 token and pool fee
          </p>

          <div className="text-start ">
            <div className="mb-4">
              <label className="block text-base/normal font-semibold text-default-200 mb-2">
                Token A
              </label>
              <input
                type="text"
                onChange={(e) => handleFormFile("token_A", e)}
                className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                placeholder="Enter Token A"
              />
            </div>
          </div>
          <div className="text-start ">
            <div className="mb-4">
              <label className="block text-base/normal font-semibold text-default-200 mb-2">
                Token B
              </label>
              <input
                type="text"
                onChange={(e) => handleFormFile("token_B", e)}
                className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                placeholder="Enter Token B"
              />
            </div>
          </div>
          <div className="text-start ">
            <div className="mb-4">
              <label className="block text-base/normal font-semibold text-default-200 mb-2">
                Fee
              </label>
              <input
                type="text"
                onChange={(e) => handleFormFile("fee", e)}
                className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                placeholder="Enter Pool fee"
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => CALL_POOL_ADDRESS()}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary/75 transition-all duration-3"
              >
                <span>Get Pool Address</span>
              </button>
            </div>
            {poolAddress && (
              <>
                {poolAddress.map((pool, index) => (
                  <div className="mb-4">
                    <input
                      key={index + 2}
                      type="text"
                      onClick={(e) => navigator.clipboard.writeText(pool)}
                      value={`${index + 1}:${pool}`}
                      className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPool;
