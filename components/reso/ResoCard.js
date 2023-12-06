import Link from "next/link";
import React from "react";
import { timeAgo } from "@/app/ontario/[city]/[listingID]/page";
import { resenditial } from "@/api/routes";

const ResoCard = ({ curElem, city }) => {
  const price = curElem.ListPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const imgSrc = resenditial.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });

  return (
    <>
      <div className="col">
        <Link
          href={`/ontario/${city}/${curElem.MLS}`}
          className="text-decoration-none text-dark"
        >
          <div className="afte-proj">
            <div className="img-text ">
              <p className="m-0 "> {timeAgo(new Date(curElem.PixUpdtedDt))}</p>
            </div>

            <img src={imgSrc} className="imghei" alt={curElem.MLS} />

            <div className="card-textt card">
              <p className="mb-0 card-price">{price}</p>
              <p className="mb-0 tet-s d-flex">
                <span className="">
                  <i className="fa-solid fa-bed card-icon"></i>{" "}
                  {curElem.Bedrooms} Bed
                </span>
                <span className="px-4">
                  <i className="fa-solid fa-bath card-icon"></i> 2 Bath
                </span>
                <span className="">
                  <i className="fa-sharp fa-solid fa-ruler"></i>{" "}
                  {curElem.ApproxSquareFootage} Sqft
                </span>
              </p>
              <p className="mb-0 tet-s"> MLS® #{curElem.MLS}</p>
              <p className="mb-0 tet-s">{curElem.UnparsedAddress}</p>

              <p className="mb-0 text-small">
                {" "}
                Listed by {curElem.ListBrokerage}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ResoCard;
