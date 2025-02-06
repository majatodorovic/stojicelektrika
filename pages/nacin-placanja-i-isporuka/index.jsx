import React from "react";
import dynamic from "next/dynamic";

const PagePreparation = dynamic(() =>
  import("../../components/PagePreparation/PagePreparation")
);
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const MethodOfPayment = () => (
  <>
    <Seo
      title="Način plaćanja"
      description="Način plaćanja"
      ogtitle="Način plaćanja"
      ogdescription="Način plaćanja"
      ogurl={`${process.env.BASE_URL}nacin-placanja-i-isporuka`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>Način plaćanja i isporuka</h3>
        <div className="staticPagesContent">
          <PagePreparation />
        </div>
      </div>
    </div>
  </>
);

export default MethodOfPayment;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
