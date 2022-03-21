import React, { Component, useCallback, useState, useRef } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from 'axios';
import { ReactPhotoCollage } from "react-photo-collage";
import { Image } from 'cloudinary-react';
import { toPng } from 'html-to-image';
import { v4 as uuidv4 } from 'uuid';

function Temp5() {
    const ref = useRef(null)

    const [color, setColor] = useColor("hex", "#121212");
    const [isUpload, setIsUpload] = useState(false);

    const [imageSelected, setImageSelected] = useState([
        { id: uuidv4(), photo: null },
    ]);
    const [publicId, setPublicId] = useState([]);

    const [imageSelected1, setImageSelected1] = useState(null);
    const [publicId1, setPublicId1] = useState(null);

    const [imageSelected2, setImageSelected2] = useState(null);
    const [publicId2, setPublicId2] = useState(null);

    const [imageSelected3, setImageSelected3] = useState(null);
    const [publicId3, setPublicId3] = useState(null);

    const [imageSelected4, setImageSelected4] = useState(null);
    const [publicId4, setPublicId4] = useState(null);

    const [imageSelected5, setImageSelected5] = useState(null);
    const [publicId5, setPublicId5] = useState(null);

    const [background, setBackground] = useState(null);
    const [bg_publicId, setbg_publicId] = useState(null);


    const handleAddColumns = () => {
        setImageSelected([...imageSelected, { id: uuidv4(), photo: null }]);
        // setPublicId([...publicId, null]);
    }

    const handleRemoveColumns = (index) => {

        const values_im = [...imageSelected];
        values_im.splice(index, 1);
        setImageSelected(values_im);

        const values_id = [...publicId];
        values_id.splice(index, 1);
        setPublicId(values_id);

    }


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


    const setting = {
        width: "600px",
        height: ["250px", "170px"],
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
            //   {
            //     source:
            //       "https://images.unsplash.com/photo-1516832970803-325be7a92aa5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93d7ac9abad6167aecb49ebd67fd5b6d&auto=format&fit=crop&w=751&q=80"
            //   },
            //   {
            //     source:
            //       "https://images.unsplash.com/photo-1526938972776-11558ad4de30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=973795a277e861265b0fabbf4a96afe2&auto=format&fit=crop&w=750&q=80"
            //   },
            //   {
            //     source:
            //       "https://images.unsplash.com/photo-1464550838636-1a3496df938b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f22dbf6c13ea7c21e803aa721437b691&auto=format&fit=crop&w=888&q=80"
            //   }
        ],
        showNumOfRemainingPhotos: true
    };


    const uploadImage = (files) => {
        console.log(files[0]);
        if (!imageSelected1 || !imageSelected2 || !imageSelected3 || !imageSelected4 || !imageSelected5) {
            alert("Upload All Images")
        }
        else {
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

            const formData5 = new FormData();
            formData5.append("file", imageSelected5);
            formData5.append("upload_preset", "eet582tc")

            Axios.post("https://api.cloudinary.com/v1_1/saptya/image/upload", formData5).then(
                (Response) => {
                    console.log(Response.data.public_id)
                    setPublicId5(Response.data.public_id)
                    console.log(publicId5)
                }
            )
            setIsUpload(true)
        }

    };

    return (
        <div className="App">

            <div className="left">

                <button className="collage-btn" onClick={uploadImage}>
                    Create Collage
                </button>

                <div className="collage-back">
                    <label>Set Background</label>
                    <Popup trigger={<button> <div className="back-col" style={{ background: color.hex }}> </div> </button>} position="bottom center">
                        <div><ColorPicker width={200} height={100}
                            color={color}
                            onChange={(event) => {
                                console.log(color)
                                setColor(event)
                                // console.log(color);
                            }} hideHSV dark />
                        </div>
                    </Popup>
                </div>


                <form >
                    {imageSelected.map(imageSelected => (
                        <div key={imageSelected.id}>
                            <div className="left-comp">
                                <label htmlFor="file-upload1" className={imageSelected.photo ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                                    {imageSelected.photo ? "Uploaded" : "Upload Image 1"}
                                </label>
                                <input type="file" id="file-upload1"
                                    onChange={(event) => {
                                        setImageSelected1(event.target.files[0]);
                                    }}
                                />
                            </div>
                            <button disabled={imageSelected.length === 1} onClick={() => handleRemoveColumns(imageSelected.id)}>
                                Remove
                            </button>
                            <button
                                onClick={handleAddColumns}
                            >
                                Add
                            </button>
                        </div>
                    ))}
                    <button
                    >Send</button>
                </form>

                {/* <div className="left-comp">
                    <label htmlFor="file-upload1" className={imageSelected1 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected1 ? "Uploaded" : "Upload Image 1"}
                    </label>
                    <input type="file" id="file-upload1"
                        onChange={(event) => {
                            setImageSelected1(event.target.files[0]);
                        }}
                    />
                </div>

                <div className="left-comp">
                    <label htmlFor="file-upload2" className={imageSelected2 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected2 ? "Uploaded" : "Upload Image 2"}
                    </label>
                    <input type="file" id="file-upload2"
                        onChange={(event) => {
                            setImageSelected2(event.target.files[0]);
                        }}
                    />
                </div>

                <div className="left-comp">
                    <label htmlFor="file-upload3" className={imageSelected3 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected3 ? "Uploaded" : "Upload Image 3"}
                    </label>
                    <input type="file" id="file-upload3"
                        onChange={(event) => {
                            setImageSelected3(event.target.files[0]);
                        }}
                    />
                </div>

                <div className="left-comp">
                    <label htmlFor="file-upload4" className={imageSelected4 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected4 ? "Uploaded" : "Upload Image 4"}
                    </label>
                    <input type="file" id="file-upload4"
                        onChange={(event) => {
                            setImageSelected4(event.target.files[0]);
                        }}
                    />
                </div>

                <div className="left-comp">
                    <label htmlFor="file-upload5" className={imageSelected5 ? "custom-file-upload input-selected" : "custom-file-upload input-not-selected"}>
                        {imageSelected5 ? "Uploaded" : "Upload Image 5"}
                    </label>
                    <input type="file" id="file-upload5"
                        onChange={(event) => {
                            setImageSelected5(event.target.files[0]);
                        }}
                    />
                </div> */}

                {/* <div>
          <p>{publicId1}</p>
          {publicId1 != null ? <Image cloudName="eet582tc" publicId={`https://res.cloudinary.com/saptya/image/upload/v1647524090/${publicId1}.jpg`} /> : <p></p>}
        </div> */}
            </div>



            <div className="right">
                <button className="collage-btn download-btn" onClick={onButtonClick}>Download Collage</button>
                {isUpload ?
                    <ReactPhotoCollage {...setting} /> :
                    <div className="empty-collage"></div>
                }

            </div>
        </div>
    );
}

export default Temp5;
