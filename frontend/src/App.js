
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Web3 from 'web3';


const connectTheme = createTheme({
  palette: {
    primary: {
      main: "#ffbd59",
    },
  },
});

const mintTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9a3d"
    }
  }
})

const loadmapTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9a3d"
    }
  }
})


const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  }
];

const PrettoSlider = styled(Slider)({
  color: '#ff9a3d',
  height: 4,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#ff9a3d',
    border: '2px solid #df7a1d',
    borderRadius : "0",
    transform: "translate(-50%, -50%) rotate(45deg)",
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#ff9a3d',
    transformOrigin: 'bottom left',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(0%, -90%) rotate(270deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});


function RoadMap(props) {
  return (
    <div className='roadmap-row'>
      <div className='roadmap_index'>
        <div className='roadmap_item active'>
          <span className='fs-26 noto-bold c-black'>
            {props.index}
          </span>
        </div>
      </div>
      <div className='fs-30 m-l-10'>
        {props.content}
      </div>
    </div>
  );
}

const web3 = new Web3();

function App() {

  const [count, setCount] = useState(5);
  const [account, setAccount] = useState();

  const handleChange = (event, newValue) => {
    setCount(newValue);
  };

  const connectWallet = async () => {
    // var web3 = new Web3(web3)
    await window.ethereum.enable();
    // const provider = Web3.providers.HttpProvider(config.testNetUrl);
    const web3 = new Web3(Web3.givenProvider);
    web3.eth.getAccounts((err, accounts) => {
      setAccount(accounts[0]);
      console.log("account", accounts[0]);
    })
  }

  const onMint = () => {
    NotificationManager.info('Please connect wallet', "", 2000);
  }

  const List = [
    { index: 1, content: "Launch Discord Server, and Twitter Account." },
    { index: 2, content: "Airdrop for v1 holders." },
    { index: 3, content: "Private sale minting starts on own site, when it's sold ou the public goes live on own site and on Ebisu's Bay launchpad." },
    { index: 4, content: "Listing in Ebisu's Bay and Agora marketplace." },
    { index: 5, content: "First contest coming for minters." },
    { index: 6, content: " At 100% minted goes live rarity traits tools." },
    { index: 7, content: " Big prize for the holders" },
    { index: 8, content: " NFT stacking" },
    { index: 9, content: "Buy Metaverse land for Cro Rhino Clanz Holder" },
    { index: 10, content: "Try to be listed on CDC marketplace" },
    { index: 11, content: "Launch Baby Rhino Clanz (some rhino holders could recive for free)" },

  ]

  return (
    <>
      <div className='header padder-50' style={{justifyContent:"flex-end"}}>
        <ThemeProvider theme={connectTheme}>
          <Button variant="contained" color="primary" className="btn_connect" onClick={connectWallet}>Connect Wallet</Button>
        </ThemeProvider>
      </div>
      <div id='section_mint'>
        <div style={{ marginBottom: "20px" }}>
          <div className='mint-title' >
            Evo Bullz
          </div>
          <div className='mint-subtitle'>
            333 Bullz on the Cronos Chain
          </div>
        </div>
        <div 
          style={{
            width:"85%", 
            display:"flex", 
            justifyContent:"space-around",
            background: "#ff9a3d",
            padding: "25px",
            position: "relative"
          }}>
            <div className="pannel-pattern left-top"></div>
            <div className="pannel-pattern right-top"></div>
            <div className="pannel-pattern left-bottom"></div>
            <div className="pannel-pattern right-bottom"></div>
          <div className='mint_pannel' 
            style={{
              width:"100%", 
              display:"flex", 
              justifyContent:"space-around"
            }}>
            <div style={{width:"30%", justifyContent:"flex-end" }} >
              <img src="/img/Asset 1.png" alt="/" width="100%" height="100%" ></img>
            </div>
            <div style={{width:"30%", justifyContent:"flex-start" }}>
            <div className='c-w fs-60 h-60 flex align-center justify-center noto-bold font-bold'>
              0°  /  333
            </div>
            <div className='c-w h-50 fs-20 flex align-center noto-bold font-bold'>
              minted
            </div>
            <div className='c-w h-70 fs-32 flex align-center noto-bold font-bold'>
              Price: {count * 50} CRO
            </div>
            <div className='flex flex-col align-center justify-center h-100' >
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={3}
                min={1}
                max={10}
                value={count}
                onChange={handleChange}
              />
              <div className='flex w-full justify-between'>
                <span className='c-w fs-20 noto-bold font-extraBold'>1</span>
                <span className='c-w fs-15 flex1'></span>
                <span className='c-w fs-20 noto-bold font-extraBold'>10</span>
              </div>
            </div>
            <div className='flex justify-center'>
              <ThemeProvider theme={mintTheme}>
                <Button className='btn_mint font-bold' style={{ color: "white" }} variant='contained'>MINT</Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div id='section_clanz'>
        <div className='title fs-40 c-w noto-bold font-extraBold'>
          Evo Bullz NFT
        </div>
        <div className='clanz_content content-max'>
          <div className='left flex flex-col flex1'>
            <p className='fs-20 c-w'>
            Evo Bullz is a project that firmly believes in the Cronos
            Chain. We want to built an exclusive community around this
            project.
            Our goal is to grow together, bringing value to the
            ecosystem and its owners.<p></p>
            We are open to collaboration and we want to include the
            owners in the growth and management of the project.
            In our plans there are staking, governance tokens and DAO,
            read more in the roadmaps.
            </p>
            <div className='clanz_buttons'>
              <ThemeProvider theme={loadmapTheme}>
                <Button variant="contained" color="primary" className='btn_roadmap'>
                  <a href='#section_roadmap' style={{ width: "100%", height: "100%", color: "white", textDecoration:"none" }}>
                    See Roadmaps
                  </a>
                </Button>
              </ThemeProvider>
              <div style={{ width: "80px" }}></div>
              <ThemeProvider theme={loadmapTheme}>
                <Button variant="contained" color="primary" className='btn_collection' >View Collection</Button>
              </ThemeProvider>
            </div>
          </div>
          <div className='right'>
            <div className="right_image">
            </div>
          </div>
        </div>
        <div style={{ background: "white", height: "2px", marginTop: "100px", marginBottom: "100px" }}></div>     
      </div>   
      
      <div id="section_tokenomics_00">
        <div id="team_rate" className='title fs-40 c-w noto-bold font-extraBold'>
            Team<br></br>&nbsp;&nbsp;50%
        </div>
        <div className='half_image_area' >
        </div>
        <div id="airdrop_rate" className='title fs-40 c-w noto-bold font-extraBold'>
            Airdrop<br></br>&nbsp;&nbsp;&nbsp;&nbsp;50%
        </div>
      </div>
      <div id="section_tokenomics_11" >
        <div className='teamrate_explain' >
          <p className='fs-20 c-w'>
            The part destined for the team will be used for development and marketing.
          </p>
        </div>
        <div className='airdroprate_explain' >
          <p className='fs-20 c-w'>
            A big part of the minting proceeds will be <strong>airdropped
            to the holder</strong> who have not listed their Bullz in the first
            month. This as a reward for believing in us, only Gen 0
            will have such a great return for its owners.
          </p>
        </div>
      </div>
      <div id="section_tokenomics_22" >
        <div className='stakingpercent_image_area' >          
        </div>
        <div className='middle_empty_area'></div>
        <div className='growthchat_image_area' >
        </div>
      </div>
      <div id="section_tokenomics_33" >
        <div className='staking_explain' >
          <div className=" fs-30 c-w noto-bold font-extraBold" style={{ textAlign: "center" }} >Staking</div>
          <p className='fs-20 c-w'>
          Staking will return the 80% of the royalties to the stakers, every week, and further on, in our own token.          
          </p>
        </div>
        <div className='middle_empty_area'></div>
        <div className='growth_explain' >
          <div className=" fs-30 c-w noto-bold font-extraBold" style={{ textAlign: "center" }} >Growth</div>
          <p className='fs-20 c-w'>
            There will be an increase in the value of these NFTs with the increase of the volumes traded on the Cronos Chain.
          </p>
        </div> 
      </div>      

      <div id='section_roadmap'>  
        <div style={{ background: "white", height: "2px", marginTop: "100px", marginBottom: "10px" }}></div>     
        <div className='title flex align-center justify-center c-black noto-bold font-extraBold'>
          Roadmap
        </div>
        <div className='content m-t-50 content-max'>     
          <div className='roadmaprow' >     
            <div className='yellowpanel '>            
            </div>
          </div>     
          <div className='roadmaprow' 
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >         
            <div className='yellowpanel'>            
            </div>
          </div>     
          <div className='roadmaprow' >
            <div className='yellowpanel '>            
            </div>
          </div>
        </div>
      </div>

      {/* section footer */}
      <div id="section_footer">
        <div style={{ background: "white", height: "2px" }}></div>
        <div className='contract flex flex-col justify-around align-center'>
          <div className='c-w fs-50 noto-bold font-extraBold'>
            Contract Address
          </div>
          <div className='c-w fs-30'>
            0x000000000000000000000000000000000000
          </div>
        </div>
        <div style={{ background: "white", height: "2px" }}></div>
        <div className='h-220 link flex flex-col align-center justify-center'>
          <div>
            <img className='m-r-40' src='/img/twitter.png'></img>
            <img src='/img/discord.png'></img>
          </div>
          <div className='c-w fs-24 flex align-center text-center m-t-20'>
            Evo Bullz<br />© 2022
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
