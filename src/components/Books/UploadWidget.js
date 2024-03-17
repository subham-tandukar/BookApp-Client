import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../../img/CloseIcon.svg";
import AddIcon from "../../img/icon/add.svg";
const UploadWidget = ({ image, setImage }) => {
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "de3eu0mvq",
        uploadPreset: "library",
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done!", result.info);
          setImage(result?.info?.secure_url);
        }
      }
    );

    const handleClick = () => {
      myWidget.open();
    };

    if (uploadButtonRef.current) {
      uploadButtonRef.current.addEventListener("click", handleClick);
    }
    // Cleanup function
    return () => {
      if (uploadButtonRef.current) {
        uploadButtonRef.current.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      {image ? (
        <div className="media-uploader_cldImage">
          <img
            className="close-icon"
            src={CloseIcon}
            alt="CloseIcon"
            onClick={() => {
              setImage(null);
            }}
          />
          <img className="uploadedimg" src={image} alt="Book Image" />
        </div>
      ) : (
        <div className="media-uploader_cta" ref={uploadButtonRef}>
          <div className="media-uploader_cta-image">
            <img src={AddIcon} alt="Add Image" width={24} height={24} />
          </div>
          <p>Click here to upload image</p>
        </div>
      )}
    </>
  );
};

export default UploadWidget;
