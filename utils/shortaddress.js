export const shortenAddress=(address)=>`${address.slice(0,8)}....${address.length-6}`;
export const parseErrorMsg=(e)=>{
    const json=JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message;
};


