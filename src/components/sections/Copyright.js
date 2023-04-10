const Copyright = () => {
  return (
    <section className="copyright">
      <img
        alt=""
        className="z-1 hide-mobile"
        src="assets/separator-copyright.png"
      />
      <div>
        <span>© {new Date().getFullYear()} Ahmet USLU </span>
        <span>
          Designed By{"  "}
          <a
            target="_blank"
            href="#about"
          >
            Kythera
          </a>
        </span>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://github.com/Kyhtera">
              <i className="fa-brands fa-github" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://twitter.com/Kytherauslu">
              <i className="fa-brands fa-twitter" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/kyhtera/">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default Copyright;
