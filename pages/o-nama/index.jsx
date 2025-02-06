import React from "react";
import dynamic from "next/dynamic";

const PagePreparation = dynamic(() =>
  import("../../components/PagePreparation/PagePreparation")
);
const Seo = dynamic(() => import("../../components/Seo/Seo"));

const About = () => (
  <>
    <Seo
      title="O nama"
      description="O nama"
      ogtitle="O nama"
      ogdescription="O nama"
      ogurl={`${process.env.BASE_URL}o-nama`}
    />
    <div className="staticPages">
      <div className="container">
        <h3>O nama</h3>
        <div className="staticPagesContent">
          <PagePreparation />
        </div>
      </div>
    </div>
  </>
);

export default About;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
