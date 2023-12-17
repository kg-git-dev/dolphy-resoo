"use client";
import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Gallery = ({ data }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <>
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        <div className=" row row-cols-md-3 g-3 ">
          {data.Media.length > 0 ? (
            data.Media.slice(0, 6).map((media, index) => (
              <div key={index}>
                <a href={`${media.MediaURL}`}>
                  <img
                    src={media.MediaURL}
                    className="prj-detail-img"
                    alt={`Image ${index + 1}`}
                  />
                </a>
              </div>
            ))
          ) : (
            <p>NO Image</p>
          )}
        </div>
      </LightGallery>
    </>
  );
};

export default Gallery;
