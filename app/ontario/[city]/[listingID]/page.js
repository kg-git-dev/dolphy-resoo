import React from "react";
import Collapse from "@/components/reso/Collapse";
import BottomContactForm from "@/components/BottomContactForm";
import Map from "@/components/reso/Map";
import Gallery from "@/components/reso/Gallery";
import Link from "next/link";
import SearchBar from "@/components/reso/SearchBar";

export function timeAgo(modificationTimestamp) {
  const currentTime = new Date();
  const modificationTime = new Date(modificationTimestamp);

  const timeDifference = currentTime - modificationTime;
  const secondsAgo = Math.floor(timeDifference / 1000); // milliseconds to seconds
  const minutesAgo = Math.floor(secondsAgo / 60); // seconds to minutes
  const hoursAgo = Math.floor(minutesAgo / 60); // minutes to hours
  const daysAgo = Math.floor(hoursAgo / 24); // hours to days

  if (daysAgo > 0) {
    return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
  } else if (hoursAgo > 0) {
    return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
  } else if (minutesAgo > 0) {
    return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
  } else {
    return secondsAgo === 1 ? "1 second ago" : `${secondsAgo} seconds ago`;
  }
}

const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);

  const listingID = params.listingID;

  const url = `https://api.bridgedataoutput.com/api/v2/OData/itso/Property('${listingID}')?access_token=f36a468ba28f13fc2076c91b1e6eaf13`;
  const options = {
    method: "GET",
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data.rows[0]; //always a single object inside the array

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function formatCurrency(value) {
    // Check if the value is not null or undefined
    if (value != null) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  }

  const price = formatCurrency(data.ListPrice);
  const TaxAnnualAmount = formatCurrency(data.TaxAnnualAmount);
  const AssociationFee = formatCurrency(data.AssociationFee);

  return (
    <>
      <div className="container-fluid pt-3">
        <div className="input-group input-group-search me-2 me-md-0 mb-5 ">
          <SearchBar />

          <button
            className="input-group-text btn bg-light2 bg-lh mybtn d-block py-search"
            type="button"
            aria-label="Search Button"
          >
            <svg
              aria-hidden="true"
              className="svg"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              width="25"
            >
              <path
                d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                fill="#000000"
              ></path>
            </svg>
          </button>
        </div>

        <nav
          style={{
            "--bs-breadcrumb-divider":
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
          }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb fs-6 ps-2">
            <li className="breadcrumb-item ">
              <Link href="/ontario">ON</Link>
            </li>
            <li className="breadcrumb-item ">
              <Link href={`/ontario/${city}/`}>{data.City}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              # {data.StreetNumber} - {data.StreetName} {data.StreetSuffix}
            </li>
          </ol>
        </nav>
        <Gallery data={main_data} />
      </div>

      <section>
        <div className="container-fluid padding-top">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 pt-5">
              <div className="d-flex flex-column flex-md-row">
                <div className="">
                  <h1 className="main-title">
                    {data.StreetNumber} - {data.StreetName} {data.StreetSuffix}
                  </h1>
                  <p className="fs-5 ">
                    {data.City}, {data.StateOrProvince}
                  </p>
                  <p className="tet-s fw-bold">
                    <span className="">
                      <i className="fa-solid fa-bed card-icon"></i>{" "}
                      {data.ITSO_BedsAboveGrade + data.ITSO_BedsBelowGrade} Bed
                    </span>
                    <span className="px-4">
                      <i className="fa-solid fa-bath card-icon"></i>{" "}
                      {data.BathroomsTotalInteger} Bath
                    </span>
                    <span className="">
                      <i className="fa-sharp fa-solid fa-ruler"></i>{" "}
                      {data.BuildingAreaTotal} Sqft
                    </span>
                  </p>
                </div>
                <div className=" ms-0 ms-md-auto">
                  <h2>C{price}</h2>
                  <p className="tet-s">
                    est. ${(data.ListPrice / 60).toFixed(0)} / month
                  </p>
                  <div className="d-flex  ">
                    <p className="tet-s">
                      {" "}
                      {timeAgo(new Date(data.ModificationTimestamp))}
                    </p>
                    <p className="tet-s fw-bold px-3">
                      {" "}
                      <i className="bi bi-caret-right-fill"></i>{" "}
                      {data.ITSO_TransactionType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-5">
                <div className="border border-1 p-4  rounded">
                  <h3 className="fw-bold pb-3">Description</h3>
                  <div className="row row-cols-2 row-cols-md-4">
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-light">Last check for updates </h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-bold">
                        {timeAgo(new Date(data.ModificationTimestamp))}
                      </h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-light">Property type</h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-bold">{data.PropertyType}</h6>
                    </div>
                  </div>

                  <div className="row row-cols-2 row-cols-md-4">
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-light">Style </h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-bold">{data.ArchitecturalStyle}</h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-light">Community</h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-bold">{data.MLSAreaMinor}</h6>
                    </div>
                  </div>

                  <div className="row row-cols-2 row-cols-md-4">
                    <div className="col border-bottom border-sm   py-2 py-md-3">
                      <h6 className="fw-light">Home value ($/Sqft) </h6>
                    </div>
                    <div className="col border-bottom border-sm py-2 py-md-3">
                      <h6 className="fw-bold">
                        {(data.ListPrice / data.BuildingAreaTotal).toFixed(0)}/
                        Sqft
                      </h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-light">Garage spaces</h6>
                    </div>
                    <div className="col border-bottom py-2 py-md-3">
                      <h6 className="fw-bold">{data.ParkingTotal}</h6>
                    </div>
                  </div>
                  <p className="pty-description pt-4">{data.PublicRemarks}</p>
                </div>
              </div>

              {/*Home Overview  */}

              <div className="pt-5">
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col-md-12">
                    <div className="container bg-light rounded-3 p-4 border">
                      <h5 className="fw-bold fs-4 pb-4">Home Overview</h5>
                      <div className="row row-cols-2 row-cols-md-4">
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Basement information</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">
                            {data?.Basement &&
                            (Array.isArray(data.Basement)
                              ? data.Basement.length
                              : Object.keys(data.Basement).length) > 0
                              ? data.Basement.join(", ")
                              : "None"}
                          </h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Virtual tour</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">
                            <a
                              href={data.VirtualTourURLUnbranded}
                              target="_blank"
                            >
                              Tour Now
                            </a>
                          </h6>
                        </div>
                      </div>

                      <div className="row row-cols-2 row-cols-md-4">
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Mls® #</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{data.ListingId}</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Building size</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{data.BuildingAreaTotal}</h6>
                        </div>
                      </div>

                      <div className="row row-cols-2 row-cols-md-4">
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Status</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{data.MlsStatus}</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Property sub type</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{data.PropertySubType}</h6>
                        </div>
                      </div>

                      <div className="row row-cols-2 row-cols-md-4">
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Taxes</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{TaxAnnualAmount}</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Tax year</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold ">--</h6>
                        </div>
                      </div>

                      <div className="row row-cols-2 row-cols-md-4">
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Maintenance fee</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{AssociationFee}</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-light">Year built</h6>
                        </div>
                        <div className="col border-bottom py-2 py-md-3">
                          <h6 className="fw-bold">{data.YearBuilt || "--"}</h6>
                        </div>
                      </div>

                      <div className="collapse" id="collapseExample">
                        {/* Interior */}
                        <h5 className="py-2 fw-bold pt-5">Interior</h5>
                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light"># total bathrooms</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.BathroomsTotalInteger}
                            </h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light"># Full Bath</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.BathroomsFull}</h6>
                          </div>
                        </div>

                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">
                              # of above grade bedrooms
                            </h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.ITSO_BedsAboveGrade}
                            </h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">
                              # of below grade bedrooms
                            </h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.ITSO_BedsBelowGrade}
                            </h6>
                          </div>
                        </div>

                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Family room available</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">--</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Laundry information</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.LaundryFeatures}</h6>
                          </div>
                        </div>

                        {/* Exterior */}
                        <h5 className="py-2 fw-bold pt-5">Exterior</h5>
                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Construction materials</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.ConstructionMaterials}
                            </h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Building amenities</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.AssociationAmenities.join(", ")}
                            </h6>
                          </div>
                        </div>

                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light"># garage spaces</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.GarageSpaces}</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Parking desc</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">--</h6>
                          </div>
                        </div>

                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Garage features</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">--</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Has basement (y/n)</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">--</h6>
                          </div>
                        </div>

                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Has garage (y/n)</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.GarageYN}</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Parking spot #</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">--</h6>
                          </div>
                        </div>

                        {/* Amenities / Utilities */}
                        <h5 className="py-2 fw-bold pt-5">
                          Amenities / Utilities
                        </h5>
                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Cooling</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.Cooling}</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Heating</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.Heating.join(", ")}
                            </h6>
                          </div>
                        </div>

                        {/* Location */}
                        <h5 className="py-2 fw-bold pt-5">Location</h5>
                        <div className="row row-cols-2 row-cols-md-4">
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Area</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.City}</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Community</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.MLSAreaMinor}</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Community features</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">
                              {data.LotFeatures.join(", ")}
                            </h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-light">Directions</h6>
                          </div>
                          <div className="col border-bottom py-2 py-md-3">
                            <h6 className="fw-bold">{data.Directions}</h6>
                          </div>
                        </div>
                      </div>
                      {/* see more */}

                      <div className="pt-3">
                        <Collapse> </Collapse>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>

              <div className="pt-5 mt-md-3">
                <h3 className="main-title fs-2">Map View</h3>
                <Map latitude={data.Latitude} longitude={data.Longitude} />
              </div>
            </div>

            <div className="col-md-4">
              <div className="fixed-title">
                <BottomContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
