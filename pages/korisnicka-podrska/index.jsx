import React from "react";
import dynamic from "next/dynamic";

const Seo = dynamic(() => import("../../components/Seo/Seo"));
const PagePreparation = dynamic(() =>
  import("../../components/PagePreparation/PagePreparation")
);

function CustomerSupport() {
  return (
    <>
      {/* <Seo
				title="Korisnička podrška"
				description="Korisnička podrška"
				ogtitle="Korisnička podrška"
				ogdescription="Korisnička podrška"
				// ogurl={`${process.env.BASE_URL}korisnicka-podrska`}
			/> */}
      <div className="staticPages">
        <div className="container">
          <h3>Korisnička podrška</h3>
          <div className="staticPagesContent">
            <PagePreparation />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerSupport;
