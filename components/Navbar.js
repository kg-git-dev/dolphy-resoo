"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white py-3">
      <div className="container-fluid">
        <Link href="/" className="logo d-flex align-items-center">
          <img src="/Logo.svg" alt="Dolphy logo" className="img-fluid" />
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Latest Projects
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active fw-bold"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Top Cities
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                {cities &&
                  cities.map((city) => (
                    <Link
                      className="dropdown-item"
                      href={`/pre-construction-homes/${city.slug}`}
                      key={city.id}
                    >
                      {city.name}
                    </Link>
                  ))}
              </div>
            </li> */}

            <li className="nav-item dropdown dropdown-fullwidth">
              <a
                className="nav-link dropdown-toggle show"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Top Cities
              </a>
              <div
                className="dropdown-menu dropdown-menu-end show"
                data-bs-popper="static"
              >
                <div className="row p-4">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <h6 className="mb-2 fw-mine fs-4">Toronto</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a className="dropdown-item" href="#">
                          Alfie Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Temple Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Temple Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Maison Wellesley Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          400 Front Street Condos
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center mt-4"
                          href="#"
                        >
                          View All
                          <i className="bi bi-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <h6 className="mb-2 fw-mine fs-4">Calgary</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a className="dropdown-item" href="#">
                          Myne Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Cornerview Towns
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Novella 2 Townhomes
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Highgate Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Metroside Condos
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center mt-4"
                          href="#"
                        >
                          View All
                          <i className="bi bi-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <h6 className="mb-2 fw-mine fs-4">Brampton</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a className="dropdown-item" href="#">
                          Honeystone House
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Bramalea Square Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Bodhi Towns
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Arbor West Homes
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Boutin Tower
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center mt-4"
                          href="#"
                        >
                          View All
                          <i className="bi bi-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <h6 className="mb-2 fw-mine fs-4">Mississauga</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a className="dropdown-item" href="#">
                          Whitehorn Wood Towns
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          M6 Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          The Southland Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          MW Condos
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Canopy Towers 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center mt-4"
                          href="#"
                        >
                          View All
                          <i className="bi bi-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12">
                    <div
                      className="alert alert-success bg-lightyellow alert-dismissible fade show mt-2 mb-0 rounded-3 d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row justify-content-start align-items-start gap-3"
                      role="alert"
                    >
                      <div>
                        Top Featured : Niagara Joy Towns Coming Soon
                        <a href="#" className="text-dark fw-bld ms-3">
                          Join Event Now
                          <span className="ms-2"></span>
                          <i className="bi bi-arrow-right"></i>
                        </a>
                      </div>
                      <button className="btn btn-call">
                        Explore all cities
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Builders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <Link
            href="tel:6476745958"
            className="btn btn-outline-dark my-2 my-sm-0 ms-md-3"
          >
            Call : 647 527 4970
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
