import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

async function getData(city) {
  const res = await fetch(
    "https://api.dolphy.ca/api/preconstructions-city/" + city,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getCities() {
  const res = await fetch("https://api.dolphy.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  const data = await getData(params.city);
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/pre-construction-homes/${params.city}`,
    },
    title: data.preconstructions.length + " Preconstruction Homes in " + city,
    description: "Preconstruction Homes in " + city,
    description:
      "Search our selection of pre construction homes for sale in " +
      city +
      ". Our ever-changing portfolio of pre constructions brings you closer to your ideal homes in the growing city of " +
      city,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  let cities = await getCities();

  return (
    <>
      <div className="pt-4 position-relative">
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <h1 className="main-title">
              New Construction Homes in {CapitalizeFirst(params.city)} ( 2023 )
            </h1>
            <p className="text-dark">
              {data.preconstructions.length}+ New Preconstruction Townhomes,
              detached & condos for sale in {CapitalizeFirst(params.city)} |
              Check out plans, pricing, availability for pre construction homes
              in {CapitalizeFirst(params.city)}
            </p>
          </div>
        </div>
        <div className="bg-white py-2 pb-3 sticky-top ">
          <div className="container-fluid d-flex gap-2 flex-column flex-md-row justify-content-center justify-content-md-start align-items-start align-items-md-center fw-normal">
            <span className="fs-4 fw-bold text-mine me-3">
              🐬 Hey Dolphy! I am looking for a
            </span>
            <div className="d-flex">
              <select className="form-select form-select-sm bg-lightyellow mx-2 p-2 rounded-3">
                <option>Upcoming</option>
                <option>Selling</option>
                <option>Sold out</option>
              </select>
              <select className="form-select form-select-sm bg-lightyellow mx-2 p-2 rounded-3">
                <option>Preconstruction</option>
                <option>Resale</option>
                <option>Assignment</option>
              </select>
            </div>
            <div className="d-flex align-items-center">
              <select className="form-select form-select-sm bg-lightyellow mx-2 p-2 rounded-3">
                <option>Homes</option>
                <option>Detached Homes</option>
                <option>Townhomes</option>
                <option>Condos</option>
              </select>
              <select className="form-select form-select-sm bg-lightyellow mx-2 p-2 rounded-3">
                {cities &&
                  cities.map((city) => (
                    <option key={city.slug}>{city.name}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 gy-4 gx-3">
            {data.preconstructions &&
              data.preconstructions.map((item) => (
                <div className="col" key={item.id}>
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-2">
                Buying Preconstruction Home First Time ?
              </h2>
              <h2 className=" text-center px-md-4 fs-4">
                Don't know where to start ? Contact Dolphy now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5">
            {data.city && (
              <div className="container" id="make-img-responsive">
                <div className="row row-cols-1 g-0">
                  <div
                    className="col-12 mt-mine px-3 max-w-100"
                    dangerouslySetInnerHTML={{
                      __html: data.city.details,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
