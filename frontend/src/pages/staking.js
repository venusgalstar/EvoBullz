import { navigate } from '@reach/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const connectTheme = createTheme({
    palette: {
      primary: {
        main: "#ffbd59",
      },
    },
  });

const Staking = () =>
{    
    const evoItems  = useSelector(state => state.nft.evoList);

    return(
        <div className='container'>
            <div 
                style={{
                    marginTop: "100px",
                    marginBottom: "100px",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "40px",
                    fontFamily: "Opensans-ExtraBold"
                }}
            >
                Stake your Evo Bullz
            </div>
            <div 
                style={{
                    marginLeft: "120px",
                    justifyContent:"flex-start"
                }}
            >
                <ThemeProvider theme={connectTheme}>
                    <Button variant="contained" color="primary" className="btn_back2home" onClick={() => navigate("/") }>back to home</Button>
                </ThemeProvider>
            </div>
            <div 
                style={{ 
                    display:"flex", 
                    marginLeft: "100px",
                    marginRight: "100px"
                }}
            >
                {
                    evoItems && evoItems.length > 0 &&
                    evoItems.map((item, index) => (
                        <div key={index} style={{margin: "20px", width:"20%" }}>
                            <img src={JSON.parse(item.metadata).image && JSON.parse(item.metadata).image} alt="Evo NFT" 
                                style={{ width: "100%", height:"100%"}}    
                            >                                
                            </img>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Staking;
