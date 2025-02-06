import React from "react";
import dynamic from "next/dynamic";

const PagePreparation = dynamic(() =>
  import("../../components/PagePreparation/PagePreparation")
);
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const Condition = () => (
  <>
    <Seo
      title="Opšti uslovi prodaje"
      description="Opšti uslovi prodaje"
      ogtitle="Opšti uslovi prodaje"
      ogdescription="Opšti uslovi prodaje"
      ogurl={`${process.env.BASE_URL}opsti-uslovi-prodaje`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>Opšti uslovi prodaje</h3>
        <div className="staticPagesContent">
          <PagePreparation />
        </div>
      </div>
    </div>
  </>
);

export default Condition;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
