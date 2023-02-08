import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../Components/Layout/Layout";
import classes from "./Favourites.module.css";

const Favourites = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <Helmet>
          <script
            type="application/javascript"
            src="https://widget.enetscores.com/FW70B372EC34CBEB2C/ev/3854559/lng/en"
          ></script>
        </Helmet>
      </div>
    </Layout>
  );
};

export default Favourites;
