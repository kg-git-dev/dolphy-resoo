import Link from "next/link";
import React from "react";
import { timeAgo } from "@/app/ontario/[city]/[listingID]/page";

const ResoCard = ({ curElem, city }) => {
  const price = curElem.ListPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <div className="col">
        <Link
          href={`/ontario/${city}/${curElem.ListingId}`}
          className="text-decoration-none text-dark"
        >
          <div className="afte-proj">
          <div className="img-text ">
              <p className="m-0 ">  {" "}{timeAgo(new Date(curElem.ModificationTimestamp))}</p>
            </div>
            {curElem.Media.length > 0 ? (
              <img src={curElem.Media[0].MediaURL} className="imghei" />
              
            ) : (
              <p>NO Image</p>
            )}
          
            <div className="card-textt card">
              <p className="mb-0 card-price">{price}</p>
              <p className="mb-0 tet-s d-flex">
                <span className="">
                  <i class="fa-solid fa-bed card-icon"></i>{" "}
                  {curElem.ITSO_BedsAboveGrade + curElem.ITSO_BedsBelowGrade}{" "}
                  Bed
                </span>
                <span className="px-4">
                  <i class="fa-solid fa-bath card-icon"></i>{" "}
                  {curElem.BathroomsTotalInteger} Bath
                </span>
                <span className="">
                  <i class="fa-sharp fa-solid fa-ruler"></i>{" "}
                  {curElem.BuildingAreaTotal} Sqft
                </span>
              </p>
              <p className="mb-0 tet-s"> MLS® #{curElem.ListingId}</p>
              <p className="mb-0 tet-s">{curElem.UnparsedAddress}</p>

              <p className="mb-0 text-small">
                {" "}
                Listed by {curElem.ListOfficeName}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ResoCard;
