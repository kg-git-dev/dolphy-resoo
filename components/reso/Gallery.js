"use client";
import dynamic from "next/dynamic";
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
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
      {LightGallery ? (
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="row row-cols-md-3 g-3"
        >
          <>
            {data.length > 0 ? (
              data.slice(0, 6).map((url, index) => (
                <a href={`${url}`} key={index}>
                  <img
                    src={url}
                    className="prj-detail-img"
                    alt={`Image ${index + 1}`}
                  />
                </a>
              ))
            ) : (
              <p>NO Image</p>
            )}
          </>
        </LightGallery>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Gallery;
