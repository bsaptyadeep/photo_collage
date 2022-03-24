import React, { useCallback, useState, useRef } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ReactPhotoCollage } from "react-photo-collage";
import Axios from 'axios';
import { toPng } from 'html-to-image';
import useMediaQuery from '@mui/material/useMediaQuery';
// import promises from 'promise'


function Temp2() {
    const ref = useRef(null)
    const matches = useMediaQuery('(min-width:650px)');


    const [color, setColor] = useColor("hex", "#121212");
    const [isUpload, setIsUpload] = useState(false);
    const [collage, setCollage] = useState(false);
    const [isGreyScale, setIsGreyScale] = useState(false);
    const [selection, setSelection] = useState(false);

    const [imageSelected, setImageSelected] = useState([]);
    const [publicId, setPublicId] = useState([]);

    const [height, setHeight] = useState([]);
    const [pics, setPics] = useState([]);
    const [element, setElement] = useState([]);

    const [isBackImg, setIsBackImg] = useState(null);
    const [background, setBackground] = useState(null);
    const [bg_publicId, setbg_publicId] = useState(null);
    const [rows, setRows] = useState(0);
    const [col, setCol] = useState(0);
    const [numSel, setNumSel] = useState(0);

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


    const collageProps = () => {
        console.log("hello")
        var h = matches ? 400 : 250;
        h = h / rows;
        let high = `${h}px`;
        for (var i = 0; i < rows; i++) {
            console.log(high)
            height[i] = high;
        }
        var ar = Array(3).fill(rows);
        console.log("arr", ar);

        for (var i = 0; i < numSel; i++) {
            var sor = {
                source: `https://res.cloudinary.com/saptya/image/upload/v1647524090/${publicId[i]}.jpg`
            }
            pics[i] = sor;
        }
        for (i = 0; i < rows; i++)
            element.push(parseInt(col));
        console.log(element)
        console.log(pics);
        console.log(height);
    }

    //collage function
    const setting = {
        width: matches ? "600px" : "250px",
        height: height,
        layout: element,
        photos: pics,
        showNumOfRemainingPhotos: true
    };

    //reset function
    const resetApp = () => {
        setIsGreyScale(false);
        setIsUpload(false)
        setCollage(false)
        setSelection(false)
        setImageSelected([])
        setPublicId([])
        setHeight([])
        setPics([])
        setElement([])
        setIsBackImg(null)
        setBackground(null)
        setbg_publicId(null)
        setRows(0)
        setCol(0)
        setNumSel(0)
    }

    const upImg = async () => {
        for (let i = 0; i < numSel; i++) {
            const formData = new FormData();
            formData.append("file", imageSelected[i]);
            formData.append("upload_preset", "eet582tc")
            // console.log("Hel")
            const response = await Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formData)
            // const data = await response.json();
            console.log(response);
            // let pub = Response.data;
            publicId[`${i}`] = response.data.public_id;
            // setPublicId([...publicId, pub])
            console.log(publicId);
            // console.log(isUpload);
        }
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
        setSelection(true);
        collageProps();
    }

    //upload function
    const uploadImage = () => {
        if (imageSelected.length !== numSel) {
            alert("Upload All Images")
        }
        else {
            setIsUpload(true);
            upImg();
            console.log(publicId);
        }
    };

    return (
        <div className="App">
            <div className="top">

                <button className="menu-btn" onClick={resetApp}>
                    Reset
                </button>

                <button className="menu-btn" style={selection ? {} : { display: "none" }} onClick={() => {
                    setCollage(true);
                }}>
                    Create Collage
                </button>
                <button className="menu-btn" style={selection ? { display: "none" } : {}} onClick={() => {
                    uploadImage();
                }}>
                    {isUpload ? "Uploading..." : "Upload Image"}
                </button>

                <button className={isGreyScale ? "menu-btn-selected" : "menu-btn"} style={selection ? {} : { display: "none" }} onClick={() => {
                    if (isGreyScale)
                        setIsGreyScale(false)
                    else
                        setIsGreyScale(true)
                }}>Add Greyscale</button>
                <button className="menu-btn" style={selection ? {} : { display: "none" }} onClick={onButtonClick}>Download Collage</button>

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
                    <label>Columns</label>
                    <input name="col" type="number" placholder="Columns" onChange={(event) => {
                        setCol(event.target.value)
                    }} />
                    <label>Rows</label>
                    <input name="row" type="number" placholder="Rows" onChange={(event) => {
                        setRows(event.target.value)
                    }} />
                    <button onClick={() => {
                        setNumSel(rows * col);
                        for (var i = 0; i < numSel; i++) {
                            imageSelected.push(null)
                            publicId.push(null)
                        }
                        // console.log(imageSelected)
                    }} style={{width:"134px", margin:"5px"}} className="custom-file-upload input-not-selected">Next</button>
                    <div>
                        <tbody>
                            {[...Array(numSel)].map((x, i) =>
                                <div>
                                    <label htmlFor={`file-upload${i}`} className={imageSelected[i] ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                                        {imageSelected[i] ? "Selected" : `Image ${i+1}`}
                                    </label>
                                    <input type="file" id={`file-upload${i}`}
                                        onChange={(event) => {
                                            let data = event.target.files[0];
                                            setImageSelected([...imageSelected, data]);
                                            setPublicId([...publicId, null]);
                                            console.log(publicId);
                                        }}
                                    />
                                </div>
                            )}
                        </tbody>
                    </div>
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
