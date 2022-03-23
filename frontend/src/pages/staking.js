import React from 'react';
import { useSelector } from 'react-redux';

const Staking = () =>
{    
    const evoItems  = useSelector(state => state.nft.evoList);

    return(
        <div style={{ display:"flex" }}>
            {
                evoItems && evoItems.length>0 &&
                evoItems.map((item, index) => (
                    <div key={index} style={{margin: "20px", width:"20%" }}>
                        <img src={JSON.parse(item.metadata).image} alt="Evo NFT" 
                        style={{ width: "100%", height:"100%"}}    
                    ></img>
                    </div>
                ))
            }
        </div>
    )
}

export default Staking;
