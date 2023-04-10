import Preloader from "@/src/components/Preloader";
import Switcher from "@/src/components/Switcher";
import KytheraHead from "@/src/KytheraHead";
import "@/styles/globals.css";
import { Fragment } from "react";

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <KytheraHead />
      <Switcher />
      <Preloader />
      <Component {...pageProps} />
    </Fragment>
  );
};
export default App;
