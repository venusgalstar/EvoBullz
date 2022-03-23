import React, { useEffect, useState } from "react";
import styles from "./UploadDetails.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
// import Preview from "./Preview";
// import axios from 'axios';
// import config from "../config";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import isEmpty from "../utilities/isEmpty";

const Upload = ({ asset_id = null }) => {
  const [textName, setTextName] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

//   const [visiblePreview, setVisiblePreview] = useState(false);
  const [logoImg, setLogoImg] = useState("");
  const [sel_files, setSelFiles] = useState([]);
  let history = useHistory(); let dispatch = useDispatch();
//   const [alertParam, setAlertParam] = useState({});
  const MAXMUM_UPLOAD = 100;
//   const [creatingStep, setCreatingStep] = useState(0);
//   const [visibleStepModal, setVisibleStepModal] = useState(false);

  const walletStatus = useSelector(state => state.auth.walletStatus);

  const changeFile = (event) => {
    var file = event.target.files[0];
    if (file == null) return;
    console.log(file);
    if (event.target.files.length > MAXMUM_UPLOAD) {
      setAlertParam({ state: "warning", title: "Warning", content: `You can not upload more than ${MAXMUM_UPLOAD} files at once.` });
      setVisibleModal(true);
      return;
    }
    setSelFiles([...event.target.files]);
    setSelectedFile(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLogoImg(reader.result);
    };
    reader.onerror = function (error) {
    }
  }

  // my-nft.json
  // {   
  //    "description": "Friendly OpenSea Creature",      
  //    "image": "https://opensea-prod.appspot.com/puffs/3.png",  
  //    "name": "Dave Starbelly",   
  //    "attributes": [
  //        { "trait_type": "Base", "value": "Starfish" },      
  //        { "trait_type": "Eyes", "value": "Big" },      
  //        { "trait_type": "Mouth","value": "Surprised" },
  //    ]
  // }

//   const saveMultipleItem = (params, paths) => {
//     //setCreatingStep(4);
//     let names = []; let i;
//     for (i = 0; i < paths.length; i++)
//       names.push(textName + " #" + `${i + 1}`.padStart(3, 0));
//     axios({
//       method: "post",
//       url: `${config.baseUrl}item/multiple_create`,
//       data: { params, names, paths }
//     })
//       .then(async function (response) {
//         console.log("response = ", response);
//         if (response.status === 200) 
//         {
//           //setCreatingStep(5);
//           if (sale > 0) 
//           {
//             var aucperiod = (instant === true ? 0 : params.auctionPeriod);
//             var price = params.price ;
//             //setCreatingStep(7);
//             try {
//               let ret = await batchMintOnSale(
//                 currentUsr.address,
//                 response.data,
//                 aucperiod * 24 * 3600,
//                 price,
//                 0);
//               if (ret.success === true) 
//               {
//                 console.log("succeed in put on sale");
//                 // setAlertParam({ state: "success", title: "Success", content: "You 've put new items on sale." });
//                 //setCreatingStep(8);
//                 return;
//               }
//               else {
//                 //setCreatingStep(9);
//                 console.log("failed in put on sale : ", ret.message);
//                 return;
//               }
//             } catch (err) {    
//               //setCreatingStep(9);
//               console.log("multiple uploading error : ", err.message);
//             }
//           }
//         }else { 
//           //setCreatingStep(6);
//           if(sale>0) //setCreatingStep(9);
//         }
//       })
//       .catch(function (error) {
//         console.log("multiple uploading error : ", error);
//         //setCreatingStep(6);
//         if(sale>0) //setCreatingStep(9);
//       });
//   }

  const createItem = async () => {
    if(instant === true)
    {    
      if(walletStatus === false )
      {
        setAlertParam( {state: "warning", title:"Warning", content: "Please connect and unlock your wallet." } );      
        setVisibleModal( true );
        return;
      }
    }
    // if (Object.keys(currentUsr).length === 0) {
    //   console.log("Invalid account.");
    //   setAlertParam({ state: "warning", title: "Warning", content: "You have to sign in before doing a trading." });
    //   setVisibleModal(true);
    //   return;
    // }
    if (selectedFile === null) {
      console.log("Invalid file.");
      setAlertParam({ state: "warning", title: "Warning", content: "Image is not selected." });
      setVisibleModal(true);
      return;
    }
    if (textName === "") {
      setAlertParam({ state: "error", title: "Error", content: "Item name cannot be empty." });
      setVisibleModal(true);
      return;
    }
    setVisibleStepModal(true);
    //setCreatingStep(1);
    if (sel_files.length > 0 && sel_files.length <= MAXMUM_UPLOAD) {
      console.log("sel_files = ", sel_files);
      var formData = new FormData();
      for (var i = 0; i < sel_files.length; i++) {
        formData.append("fileItem" + i.toString(), sel_files[i]);
      }
      formData.append("fileArryLength", sel_files.length);
      formData.append("collectionName", collectionName);
      console.log("uploading multiple files...:", formData);

    //   axios({
    //     method: "post",
    //     url: `${config.baseUrl}utils/upload_multiple_file`,
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //     .then(function (response) {
    //       //setCreatingStep(2);
    //       console.log("Mutiple upload response : ", response.data.paths);
    //       let params = {};
    //       params.itemLogoURL = response.data.path;
    //       params.itemDescription = textDescription;
    //       // params.itemProperty = textProperty;
    //       // params.itemSize = textSize;
    //       // params.itemRoyalty = royalties.value;
    //       params.collectionId = collectionId;
    //       params.creator = currentUsr._id;
    //       params.owner = currentUsr._id;
    //       params.isSale = 0;
    //       params.price = !sale ? 0 : Number(price);
    //       params.auctionPeriod = !sale ? 0 : period;
    //       params.metaData = metaStr;
    //       saveMultipleItem(params, response.data.paths);
    //     })
    //     .catch((err) => {
    //       // console.log("mutiple creation, file uploading error : ", err);
    //       //setCreatingStep(3); 
    //       //setCreatingStep(6); 
    //     });
    }
  }

//   const clearAll = () => {
//     setSelectedFile(null);
//     setTextName("");
//     setPrice(0);
//     setSelFiles([]);
//     setLogoImg("");
//     document.getElementById("fileInput1").value = "";
//   }


  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create multiple items
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
                onClick={() => history.push("/upload-details/0")}
              >
                "Switch to Single"
              </button>
            </div>
            <form className={styles.form} action="">
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload files</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      {
                        sel_files.length > 0 ?
                          `You selected ${sel_files.length} files.`
                          :
                          "PNG, GIF, JPEG, WEBP. Max 100MB."
                      }
                    </div>
                    <input className={styles.load} type="file" id="fileInput1" name="file[]" onChange={changeFile}
                      accept="image/*" multiple
                    />
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Item name"
                      name="Item"
                      type="text"
                      value={textName}
                      onChange={(event) => {
                        setTextName(event.target.value);
                      }}
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Description"
                      name="Description"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      value={textDescription}
                      onChange={(event) => {
                        setTextDescription(event.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            imgSrc={logoImg ? logoImg : "/images/content/blank.png"}
            itemTitle={textName}
            itemPrice={price}
            clearAll={clearAll}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Upload;
