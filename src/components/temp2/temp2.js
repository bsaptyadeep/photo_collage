import React, { useCallback, useState, useRef } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ReactPhotoCollage } from "react-photo-collage";
import Axios from 'axios';
import { toPng } from 'html-to-image';
import useMediaQuery from '@mui/material/useMediaQuery';


function Temp2() {
    const ref = useRef(null)
    const matches = useMediaQuery('(min-width:650px)');


    const [color, setColor] = useColor("hex", "#121212");
    const [isUpload, setIsUpload] = useState(false);
    const [collage, setCollage] = useState(false);
    const [isGreyScale, setIsGreyScale] = useState(false);

    const [imageSelected1, setImageSelected1] = useState(null);
    const [publicId1, setPublicId1] = useState(null);

    const [imageSelected2, setImageSelected2] = useState(null);
    const [publicId2, setPublicId2] = useState(null);

    const [imageSelected3, setImageSelected3] = useState(null);
    const [publicId3, setPublicId3] = useState(null);

    const [imageSelected4, setImageSelected4] = useState(null);
    const [publicId4, setPublicId4] = useState(null);

    const [isBackImg, setIsBackImg] = useState(null);
    const [background, setBackground] = useState(null);
    const [bg_publicId, setbg_publicId] = useState(null);

    //to download Collage
    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    //collage function
    const setting = {
        width: matches ? "600px" : "250px",
        height: matches ? ["250px", "170px"] : ["150px", "100px"],
        layout: [1, 3],
        photos: [
            {
                source:
                    `https://res.cloudinary.com/saptya/image/upload/v1647524090/${publicId1}.jpg`
            },
            {
                source:
                    `https://res.cloudinary.com/saptya/image/upload/v1647524090/${publicId2}.jpg`
            },
            {
                source:
                    `https://res.cloudinary.com/saptya/image/upload/v1647524090/${publicId3}.jpg`
            },
            {
                source:
                    `https://res.cloudinary.com/saptya/image/upload/v1647524090/${publicId4}.jpg`
            }
        ],
        showNumOfRemainingPhotos: true
    };

    //reset function
    const resetApp = () => {
        setIsGreyScale(false);
        setIsUpload(false)
        setCollage(false)
        setImageSelected1(null)
        setPublicId1(null)
        setImageSelected2(null)
        setPublicId2(null)
        setImageSelected3(null)
        setPublicId3(null)
        setImageSelected4(null)
        setPublicId4(null)
        setIsBackImg(null)
        setBackground(null)
        setbg_publicId(null)
    }

    //upload function
    const uploadImage = (files) => {
        console.log(files[0]);
        if (!imageSelected1 || !imageSelected2 || !imageSelected3 || !imageSelected4) {
            alert("Upload All Images")
        }
        else {
            setIsUpload(true);
            const formData1 = new FormData();
            formData1.append("file", imageSelected1);
            formData1.append("upload_preset", "eet582tc")

            Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formData1).then(
                (Response) => {
                    console.log(Response.data.public_id)
                    setPublicId1(Response.data.public_id)
                    console.log(publicId1)
                }
            )
            const formData2 = new FormData();
            formData2.append("file", imageSelected2);
            formData2.append("upload_preset", "eet582tc")

            Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formData2).then(
                (Response) => {
                    console.log(Response.data.public_id)
                    setPublicId2(Response.data.public_id)
                    console.log(publicId2)
                }
            )

            const formData3 = new FormData();
            formData3.append("file", imageSelected3);
            formData3.append("upload_preset", "eet582tc")

            Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formData3).then(
                (Response) => {
                    console.log(Response.data.public_id)
                    setPublicId3(Response.data.public_id)
                    console.log(publicId3)
                }
            )

            const formData4 = new FormData();
            formData4.append("file", imageSelected4);
            formData4.append("upload_preset", "eet582tc")

            Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formData4).then(
                (Response) => {
                    console.log(Response.data.public_id)
                    setPublicId4(Response.data.public_id)
                    console.log(publicId4)
                }
            )
            if (isBackImg) {
                const formDataback = new FormData();
                formDataback.append("file", background);
                formDataback.append("upload_preset", "eet582tc")

                Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formDataback).then(
                    (Response) => {
                        console.log(Response.data.public_id)
                        setbg_publicId(Response.data.public_id)
                        console.log(bg_publicId)
                    }
                )
            }
        }
    };

    return (
        <div className="App">
            <div className="top">

                <button className="menu-btn" onClick={resetApp}>
                    Reset
                </button>

                <button className="menu-btn" style={(publicId1 && publicId2 && publicId3 && publicId4) ? {} : { display: "none" }} onClick={() => {
                    setCollage(true);
                }}>
                    Create Collage
                </button>
                <button className="menu-btn" style={(publicId1 && publicId2 && publicId3 && publicId4) ? { display: "none" } : {}} onClick={uploadImage}>
                    {isUpload ? "Uploading..." : "Upload Image"}
                </button>

                <button className={isGreyScale ? "menu-btn-selected" : "menu-btn"} style={(publicId1 && publicId2 && publicId3 && publicId4) ? {} : { display: "none" }} onClick={() => {
                    if (isGreyScale)
                        setIsGreyScale(false)
                    else
                        setIsGreyScale(true)
                }}>Add Greyscale</button>
                <button className="menu-btn" style={(publicId1 && publicId2 && publicId3 && publicId4) ? {} : { display: "none" }} onClick={onButtonClick}>Download Collage</button>

                <div className="collage-back">
                    <label>Set Background</label>
                    <div style={{ width: "10px" }}></div>
                    <Popup trigger={<button> <div className="back-col" style={{ background: color.hex }}> </div> </button>} position="bottom right">
                        <div><ColorPicker width={200} height={100}
                            color={color}
                            onChange={(event) => {
                                // console.log(color)
                                setColor(event)
                            }} hideHSV dark />

                            <label htmlFor="file-uploadback" className={background ? "custom-file-upload input-selected pop-btn" : "custom-file-upload input-not-selected pop-btn"}>
                                {background ? "Selected" : "Select Image"}
                            </label>
                            <input type="file" id="file-uploadback"
                                onChange={(event) => {
                                    setBackground(event.target.files[0]);
                                    setIsBackImg(true);
                                }}
                            />
                        </div>
                    </Popup>
                </div>
            </div>

            <div className="workplace">
                <div className="left">


                    <label htmlFor="file-upload1" className={imageSelected1 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected1 ? "Selected" : "Select Image 1"}
                    </label>
                    <input type="file" id="file-upload1"
                        onChange={(event) => {
                            setImageSelected1(event.target.files[0]);
                        }}
                    />

                    <label htmlFor="file-upload2" className={imageSelected2 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected2 ? "Selected" : "Select Image 2"}
                    </label>
                    <input type="file" id="file-upload2"
                        onChange={(event) => {
                            setImageSelected2(event.target.files[0]);
                        }}
                    />

                    <label htmlFor="file-upload3" className={imageSelected3 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected3 ? "Selected" : "Select Image 3"}
                    </label>
                    <input type="file" id="file-upload3"
                        onChange={(event) => {
                            setImageSelected3(event.target.files[0]);
                        }}
                    />

                    <label htmlFor="file-upload4" className={imageSelected4 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected4 ? "Selected" : "Select Image 4"}
                    </label>
                    <input type="file" id="file-upload4"
                        onChange={(event) => {
                            setImageSelected4(event.target.files[0]);
                        }}
                    />

                </div>

                <div id={isGreyScale ? "black-white" : ""} className="right" ref={ref}>
                    {collage ?
                        <div className="collage" style={isBackImg ? { backgroundImage: `url(https://res.cloudinary.com/saptya/image/upload/v1647524090/${bg_publicId}.jpg)`, backgroundRepeat: "no-repeat" } : { background: color.hex }}>
                            <ReactPhotoCollage {...setting} />
                        </div> :
                        <div className="empty-collage"></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Temp2;
