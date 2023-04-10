const Contact = () => {
  return (
    <section className="contact main-section flex-column-mobile" id="contact">
      {/* TITLE STARTS */}
      <div className="custom-title">
        {/* MAIN TITLE STARTS */}
        <h3>
          <span>
            <span className="animated-layer fade-in-left-animation fadeInUp wow">
              Get in touch
            </span>
          </span>
        </h3>
        {/* MAIN TITLE ENDS */}
      </div>
      {/* TITLE ENDS */}
      {/* CONTACTS STARTS */}
      <div className="boxes">
        <div>
          {/* CONTACT ITEM STARTS */}
          <div className="animated-layer fade-in-down-animation fadeInUp wow">
            <i className="fa fa-phone" />
            <p>
              <span className="small-text">phone</span>
              +90 553 538 17 17
            </p>
          </div>
          {/* CONTACT ITEM ENDS */}
          {/* CONTACT ITEM STARTS */}
          <div className="animated-layer fade-in-up-animation fadeInUp wow">
            <i className="fa fa-location-dot" />
            <p>
              <span className="small-text">address</span>
              Ankara TURKEY
            </p>
          </div>
          {/* CONTACT ITEM ENDS */}
        </div>
        <div>
          {/* CONTACT ITEM STARTS */}
          <div className="animated-layer fade-in-down-animation fadeInUp wow">
            <i className="fa fa-envelope" />
            <p>
              <span className="small-text">email</span>
              ahmetuslum@gmail.com
            </p>
          </div>
          {/* CONTACT ITEM ENDS */}
          {/* CONTACT ITEM STARTS */}
          <div className="animated-layer fade-in-up-animation fadeInUp wow">
            <i className="fa fa-share-nodes" />
            <span className="small-text">follow me</span>
            <ul className="social">
              <li>
                <a href="https://github.com/Kyhtera">
                  <i className="fa-brands fa-github" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Kytherauslu">
                  <i className="fa-brands fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-dribbble" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/kyhtera/">
                  <i className="fa-brands fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
          {/* CONTACT ITEM ENDS */}
        </div>
      </div>
      {/* CONTACTS ENDS */}
      <img
        alt=""
        className="separator hide-mobile"
        src="assets/separator.png"
      />
    </section>
  );
};
export default Contact;
