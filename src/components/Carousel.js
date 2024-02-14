import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Carousel({ setSearch }) {
  useEffect(() => {
    const handleCarouselClick = (event) => {
      event.stopPropagation();
    };

    const carousel = document.getElementById("carouselExampleInterval");
    if (carousel) {
      carousel.addEventListener("click", handleCarouselClick);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("click", handleCarouselClick);
      }
    };
  }, []);

  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" style={{ maxHeight: "600px"}}>
          <div className="carousel-caption" style={{ zIndex: "2" }}>
            <div className="d-flex justify-content-center">
              <div className="searchbar" style={{ marginBottom: "auto", marginTop: "auto", height: "50px", width:"800px", backgroundColor: "#353b48", borderRadius: "30px", padding: "10px", display: "flex", alignItems: "center" }}>
                <input
                  className="search_input form-control me-2"
                  type="search"
                  placeholder="Craving something? Search our menu..."
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{ color: "white", border: "0", outline: "0", background: "none", width: "0", caretColor: "transparent", lineHeight: "40px", transition: "width 0.4s linear", flex: "1" }}
                />
                <button className="search_icon btn btn-outline-warning" onClick={() => console.log("Search clicked")} style={{ height: "35px", width: "35px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", color: "white", backgroundColor: "#e74c3c", border: "none" }}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="5000">
            <img
              src="https://source.unsplash.com/random/1920x1080/?pizza"
              className="d-block w-100 "
              style={{ filter: "brightness(50%)" }}
              alt="Pizza"
            />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              src="https://source.unsplash.com/random/1920x1080/?drinks"
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }}
              alt="Drinks"
            />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              src="https://source.unsplash.com/random/1920x1080/?fry"
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }}
              alt="Fry"
            />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }}
              alt="Pastry"
              src="https://source.unsplash.com/random/1920x1080/?pastry"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="https://source.unsplash.com/random/1920x1080/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }}
              alt="Burger"
            />
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
        style={{ border: "none", background: "none", cursor: "pointer", position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", zIndex: "1000" }}
      >
        <FontAwesomeIcon icon={faAngleLeft} size="3x" style={{ color: "gray" }} />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
        style={{ border: "none", background: "none", cursor: "pointer", position: "absolute", top: "50%", transform: "translateY(-50%)", right: "10px", zIndex: "1000" }}
      >
        <FontAwesomeIcon icon={faAngleRight} size="3x" style={{ color: "gray" }} />
      </button>
    </div>
  );
}
