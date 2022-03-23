
import {  useState , useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Web3 from 'web3';
import axios from 'axios';
import config from '../config';
import {useDispatch} from "react-redux";
import { setEvoNFTList } from '../store/actions/nft.actions';
import { useNavigate} from "@reach/router";

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
    borderRadius: "0",
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
 
const web3 = new Web3();

function Home() {

  const [count, setCount] = useState(5);
  const [account, setAccount] = useState();
  const [nftItems, setNFTItems] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => 
  {
    if(!account) return;
    async function init() {
      const res = await axios.get("https://deep-index.moralis.io/api/v2/" + account + "/nft?chain=bsc%20testnet&format=decimal", {
        headers: { "X-API-Key": "YEEwMh0B4VRg6Hu5gFQcKxqinJ7UizRza1JpbkyMgNTfj4jUkSaZVajOxLNabvnt" },
      });
      //console.log(res.data.result);
      const nftlist = res.data.result;
      if(nftlist && nftlist.length>0)
      {
        let nftItems = [];
        nftlist.forEach(item => {
          if(item.token_address.toLowerCase() === config.EvoNFTContractAddress.toLowerCase() ) 
            nftItems.push(item);
        });

        setNFTItems(nftItems);
        dispatch(setEvoNFTList(nftItems));

        console.log("nftItems = ", nftItems);
      }
    }
    init();
  }, [account])

  const onClickMint = () => {
    NotificationManager.info('Please connect wallet', "", 2000);
  }

  return (
    <>
      <div className='header padder-50' style={{ justifyContent: "flex-end" }}>
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
        <div className="minting_panel_out_borderdiv"
          style={{
            width: "85%",
            display: "flex",
            flexWrap: "wrap",
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
              width: "100%",
              display: "flex",
              justifyContent: "space-around"
            }}>
            <div className="NFT_image_preview" style={{ justifyContent: "flex-end" }} >
              <img src="/img/Asset 1.png" alt="/" width="100%" height="100%" ></img>
            </div>
            <div className="control_mint_panel" style={{ justifyContent: "flex-start" }}>
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
                  <Button className='btn_mint font-bold' style={{ color: "white" }} variant='contained' onClick={() => onClickMint()} >MINT</Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='section_clanz' >

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
              ecosystem and its owners.
              We are open to collaboration and we want to include the
              owners in the growth and management of the project.
              In our plans there are staking, governance tokens and DAO,
              read more in the roadmaps.
            </p>
            <div className='clanz_buttons'>
              <ThemeProvider theme={loadmapTheme}>
                <Button variant="contained" color="primary" className='btn_roadmap'>
                  <a href='#section_roadmap' style={{ width: "100%", height: "100%", color: "white", textDecoration: "none" }}>
                    See Roadmaps
                  </a>
                </Button>
              </ThemeProvider>
              <div style={{ width: "80px" }}></div>
              <ThemeProvider theme={loadmapTheme}>
                <Button variant="contained" color="primary" className='btn_collection' onClick={() => {navigate("/staking")}}>View Collection</Button>
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

      <div id="section_tokenomics_mobile" style={{display : "none"}}>
        <div className='airdroprate_explain' >
          <div className='fs-20 c-w'>
            The part destined for the team will be used for development and marketing.
          </div>
        </div>
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
          <div className='fs-20 c-w'>
            The part destined for the team will be used for development and marketing.
          </div>
        </div>
        <div className='airdroprate_explain' >
          <div className='fs-20 c-w'>
            A big part of the minting proceeds will be <strong>airdropped
              to the holder</strong> who have not listed their Bullz in the first
            month. This as a reward for believing in us, only Gen 0
            will have such a great return for its owners.
          </div>
        </div>
      </div>
      <div id="section_tokenomics_22" >
        <div className='staking_explain' style={{ display: "flex", flexDirection: "column" }}>
          <div className='stakingpercent_image_area'>
          </div>
            <div className=" fs-30 c-w noto-bold font-extraBold" style={{ textAlign: "center"}} >Staking</div>
            <div className='fs-20 c-w'>
              Staking will return the 80% of the royalties to the stakers, every week, and further on, in our own token.
            </div>
        </div>
          <div className='middle_empty_area'></div>
        <div className='growth_explain' style={{ display: "flex", flexDirection: "column" }}>
          <div className='growthchat_image_area' >
          </div>
            <div className=" fs-30 c-w noto-bold font-extraBold" style={{ textAlign: "center" }} >Growth</div>
            <div className='fs-20 c-w'>
              There will be an increase in the value of these NFTs with the increase of the volumes traded on the Cronos Chain.
            </div>
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
          <div className='roadmaprow1'
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
            <img className='m-r-40' src='/img/twitter.png' alt="twitter" ></img>
            <img src='/img/discord.png' alt="discord" ></img>
          </div>
          <div className='c-w fs-24 flex align-center text-center m-t-20'>
            Evo Bullz<br />© 2022
          </div>
        </div>
      </div>
    </>

  );
}

export default Home;
