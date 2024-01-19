import React from "react";
import Banner from "../../components/Banner";
import DailyRecommendation from "../../components/DailyRecommendation";
import TopListCom from "../../components/TopListCom";


const Home: React.FC = () => {

  return (
    <>
      <Banner/>
      <DailyRecommendation/>
      <TopListCom/>
    </>
  )
}

export default Home;
