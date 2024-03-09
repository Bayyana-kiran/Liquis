import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import {
  Header,
  Home,
  GetPool,
  Networks,
  LiqudityHistory,
  PoolHistory,
  Promo,
  Loader,
} from "../components/index";
import { CONTEXT } from "../context/index";

const index = () => {
  const { DAPP_NAME, loader, GET_POOL_ADDRESS, GET_POOL_DETAILS } =
    useContext(CONTEXT);
  //sTATE VARIABLE
  const [activeNetwork, setActiveNetwork] = useState("");
  const [activeComponent, setActiveComponent] = useState("Home");

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setActiveNetwork(network?.name);
  }, [activeNetwork]);
  return (
    <div className="bg-slate-900">
      <Header
        setActiveComponent={setActiveComponent}
        activeNetwork={activeNetwork}
       
      />
      {activeComponent == "Home" ? (
        <Home
          setActiveComponent={setActiveComponent}
          GET_POOL_DETAILS={GET_POOL_DETAILS}
        />
      ) : activeComponent == "Liquidity" ? (
        <GetPool GET_POOL_ADDRESS={GET_POOL_ADDRESS} />
      ) : activeComponent == "Pool History" ? (
        <PoolHistory setActiveComponent={setActiveComponent} />
      ) : activeComponent == "Liquidity History" ? (
        <LiqudityHistory setActiveComponent={setActiveComponent} />
      ) : activeComponent == "Networks" ? (
        <Networks
          setActiveComponent={setActiveComponent}
          activeNetwork={activeNetwork}
           setActiveNetwork={setActiveNetwork}
        />
      ) : (
        ""
      )}


      {loader && (
        <div className="new_loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default index;
