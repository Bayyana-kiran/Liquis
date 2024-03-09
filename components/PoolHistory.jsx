import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GoCopy } from "react-icons/go";
import { shortenAddress } from "../utils/shortaddress";
import {} from "../components/index";
import DotAnimation from "./DotAnimations";
const PoolHistory = ({setActiveComponent}) => {

  const [poolDetails,setPoolDetails]=useState([]);
  useEffect(()=>{
    const pools=JSON.parse(localStorage.getItem("poolHistory"));
    setPoolDetails(pools?.reverse());
  },[]);
 return (
   <div>
     {/* DotAnimation as background */}
     <DotAnimation />

     {/* Content positioned on top of DotAnimation */}
     <div className="absolute inset-0 flex items-center justify-center">
         <div className="container">
           {poolDetails ? (
             <div className="grid lg:grid-flow-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
               {poolDetails.map((pool, index) => {
                 return (
                   <div key={index}>
                     <div className="bg-slate-950/40 rounded-xl hover:-translate-y-2 transition-all duration-600">
                       <div className="p-6">
                         <a className="flex items-center justify-center gap-2 border-white/10 text-white py-2 mt-6 rounded-lg hover:bg-primary/75 translation-all duration-500">
                           {pool.network}
                         </a>
                         <hr className="my-5 border-dashed border-white/10" />
                         <ul
                           className="mt-3 text-sm text-default-700"
                           role="list"
                         >
                           <li className="flex items-center gap-2 py-2">
                             <i
                               onClick={() =>
                                 navigator.clipboard.writeText(pool.token_A)
                               }
                               className="inline-block w-5 text-primary"
                             >
                               <GoCopy />
                               <span className="text-default-50">
                                 Token A:{shortenAddress(pool.token_A)}
                               </span>
                             </i>
                           </li>
                           <li className="flex items-center gap-2 py-2">
                             <i
                               onClick={() =>
                                 navigator.clipboard.writeText(pool.token_A)
                               }
                               className="inline-block w-5 text-primary"
                             >
                               <GoCopy />
                               <span className="text-default-50">
                                 Token B:{shortenAddress(pool.token_B)}
                               </span>
                             </i>
                           </li>
                           <li className="flex items-center gap-2 py-2">
                             <i
                               onClick={() =>
                                 navigator.clipboard.writeText(pool.token_A)
                               }
                               className="inline-block w-5 text-primary"
                             >
                               <GoCopy />
                               <span className="text-default-50">
                                 Fee :{shortenAddress(pool.fee)}
                               </span>
                             </i>
                           </li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
           ) : null}
         </div>
     </div>
   </div>
 );
};

export default PoolHistory;
