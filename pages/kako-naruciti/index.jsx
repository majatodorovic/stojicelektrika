import React from "react";
import dynamic from "next/dynamic";

const PagePreparation = dynamic(() =>
  import("../../components/PagePreparation/PagePreparation")
);
const Seo = dynamic(() => import("../../components/Seo/Seo"));

function HowToOrder() {
  return (
    <>
      <Seo
        title="Kako naručiti"
        description="Kako naručiti"
        ogtitle="Kako naručiti"
        ogdescription="Kako naručiti"
        ogurl={`${process.env.BASE_URL}kako-naruciti`}
      />
      <div className="staticPages">
        <div className="container">
          <h3>Kako naručiti?</h3>
          <div className="staticPagesContent">
            <PagePreparation />
          </div>
        </div>
      </div>
    </>
  );
}

export default HowToOrder;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
