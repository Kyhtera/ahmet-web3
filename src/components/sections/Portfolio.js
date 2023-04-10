import { salimovSlider } from "@/src/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

const Portfolio = () => {
  return (
    <section
      className="portfolio main-section flex-column-mobile"
      id="portfolio"
    >
      {/* TITLE STARTS */}
      <div className="custom-title">
        {/* MAIN TITLE STARTS */}
        <h3>
          <span>
            <span className="animated-layer fade-in-left-animation fadeInUp wow">
              My Portfolio
            </span>
          </span>
        </h3>
        {/* MAIN TITLE ENDS */}
      </div>
      {/* TITLE ENDS */}
      <Swiper
        {...salimovSlider.portfolio}
        className="swiper swiper-portfolio animated-layer fade-in-right-animation fadeInUp wow"
        data-wow-offset={200}
      >
        {/* PORTFOLIO ITEM STARTS */}
        <SwiperSlide className="single-item swiper-slide">
          {/* ITEM MAIN CONTENT STARTS */}
          <div className="main-content">
            <img
              className="img-fluid"
              src="assets/portfolio/uslum-saglik-project1.png"
              alt="Image Project"
            />
          </div>
          {/* ITEM MAIN CONTENT ENDS */}
          {/* ITEM DETAILS STARTS */}
          <div className="details">
            <h4> Medical WebSite</h4>
            <div>
              <ul>
                <li>
                  <span>
                    <i className="fa-regular fa-file-lines" /> Project :
                  </span>
                  <span>Website</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-user" /> Client :
                  </span>
                  <span>Uslum Sağlık Co.</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-hourglass" /> Duration :
                  </span>
                  <span>2 Months</span>
                </li>
                <li>
                  <span>
                    <i className="fa-solid fa-code-branch" /> Frameworks :
                  </span>
                  <span>ASP.Net</span>
                </li>
              </ul>
            </div>
            <a href="http://uslumsaglik.com/" target="_blank" className="custom-btn">
              <span>
                preview <i className="fa-solid fa-arrow-up-right-from-square" />
              </span>
            </a>
          </div>
          {/* ITEM DETAILS ENDS */}
        </SwiperSlide>
        {/* PORTFOLIO ITEM ENDS */}
        {/* PORTFOLIO ITEM STARTS */}
        <SwiperSlide className="single-item swiper-slide">
          {/* ITEM MAIN CONTENT STARTS */}
          <div className="main-content">
            <div className="videocontainer">
              <iframe
                className="youtube-video"
                src="https://www.youtube.com/embed/PqDijVhebII"
                allowFullScreen=""
              />
            </div>
          </div>
          {/* ITEM MAIN CONTENT ENDS */}
          {/* ITEM DETAILS STARTS */}
          <div className="details">
            <h4>Youtube Channel</h4>
            <div>
              <ul>
                <li>
                  <span>
                    <i className="fa-regular fa-file-lines" /> Project :
                  </span>
                  <span>Music Channel</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-user" /> Client :
                  </span>
                  <span>Personal Channel</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-hourglass" /> Duration :
                  </span>
                  <span>3 years</span>
                </li>
                <li>
                  <span>
                    <i className="fa-solid fa-code-branch" /> Frameworks :
                  </span>
                  <span>Final Cut - Logic ProX</span>
                </li>
              </ul>
            </div>
            <a href="https://www.youtube.com/@kyhtera" target="_blank" className="custom-btn">
              <span>
                preview <i className="fa-solid fa-arrow-up-right-from-square" />
              </span>
            </a>
          </div>
          {/* ITEM DETAILS ENDS */}
        </SwiperSlide>
        {/* PORTFOLIO ITEM ENDS */}
        {/* PORTFOLIO ITEM STARTS */}
        <SwiperSlide className="single-item swiper-slide">
          {/* ITEM MAIN CONTENT STARTS */}
          <div className="main-content">
            <Swiper
              {...salimovSlider.portfolioItems}
              className="swiper swiper-portfolio-item"
            >
              <SwiperSlide className="swiper-slide">
                <img src="assets/portfolio/diyafoncu-com-1.png" title="img" />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <img src="assets/portfolio/diyafoncu-com-2.png" title="img" />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <img src="assets/portfolio/diyafoncu-com-3.png" title="img" />
              </SwiperSlide>
              <div className="swiper-pagination" />
            </Swiper>
          </div>
          {/* ITEM MAIN CONTENT ENDS */}
          {/* ITEM DETAILS STARTS */}
          <div className="details">
            <h4>Diyafoncu.com</h4>
            <div>
              <ul>
                <li>
                  <span>
                    <i className="fa-regular fa-file-lines" /> Project :
                  </span>
                  <span>diyafoncu.com</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-user" /> Client :
                  </span>
                  <span>NTS</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-hourglass" /> Duration :
                  </span>
                  <span>5 Months</span>
                </li>
                <li>
                  <span>
                    <i className="fa-solid fa-code-branch" /> Frameworks :
                  </span>
                  <span>ASP.Net</span>
                </li>
              </ul>
            </div>
            <a href="https://www.diafoncu.com.tr/" target="_blank" className="custom-btn">
              <span>
                preview <i className="fa-solid fa-arrow-up-right-from-square" />
              </span>
            </a>
          </div>
          {/* ITEM DETAILS ENDS */}
        </SwiperSlide>
        {/* PORTFOLIO ITEM ENDS */}
        {/* PORTFOLIO ITEM STARTS */}
        <SwiperSlide className="single-item swiper-slide">
          {/* ITEM MAIN CONTENT STARTS */}
          <div className="main-content">
            <Swiper
              {...salimovSlider.portfolioItems}
              className="swiper swiper-portfolio-item"
            >
              <SwiperSlide className="swiper-slide">
                <img src="assets/portfolio/fithome-com-1.png" title="img" />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <img src="assets/portfolio/fithome-com-2.png" title="img" />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <img src="assets/portfolio/fithome-com-3.png" title="img" />
              </SwiperSlide>
              <div className="swiper-pagination" />
            </Swiper>
          </div>
          {/* ITEM MAIN CONTENT ENDS */}
          {/* ITEM DETAILS STARTS */}
          <div className="details">
            <h4>Gym WebSite</h4>
            <div>
              <ul>
                <li>
                  <span>
                    <i className="fa-regular fa-file-lines" /> Project :
                  </span>
                  <span>fithome.com.tr</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-user" /> Client :
                  </span>
                  <span>FITHOME Co</span>
                </li>
                <li>
                  <span>
                    <i className="fa-regular fa-hourglass" /> Duration :
                  </span>
                  <span>2 month</span>
                </li>
                <li>
                  <span>
                    <i className="fa-solid fa-code-branch" /> Frameworks :
                  </span>
                  <span>WordPress</span>
                </li>
              </ul>
            </div>
            <a href="https://fithome.com.tr/" target="_blank" className="custom-btn">
              <span>
                preview <i className="fa-solid fa-arrow-up-right-from-square" />
              </span>
            </a>
          </div>
          {/* ITEM DETAILS ENDS */}
        </SwiperSlide>
        {/* PORTFOLIO ITEM ENDS */}
        <div className="nav-item next-item animated-btn">
          <span />
        </div>
        <div className="nav-item prev-item animated-btn">
          <span />
        </div>
      </Swiper>
      <img
        alt=""
        className="separator hide-mobile"
        src="assets/separator.png"
      />
    </section>
  );
};
export default Portfolio;
