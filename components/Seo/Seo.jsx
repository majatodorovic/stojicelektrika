import Head from "next/head";

const Seo = ({
  title,
  keywords,
  description,
  ogtitle,
  ogimage,
  ogurl,
  ogdescription,
}) => (
  <Head>
    <title>{String(title) ?? ""} | Stojić Elektrik</title>
    <meta charSet="utf-8" />{" "}
    {/* za brisanje utf-8 meta taga, ako se desi da je dupliran */}
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="Keywords" content={keywords || process.env.SEO_KEYWORDS} />
    <meta
      name="description"
      content={description || process.env.SEO_DESCRIPTION}
    />
    <link rel="icon" type="image/x-icon" href="/favicon.png" />
    <meta property="og:title" content={ogtitle || process.env.SEO_OGTITLE} />
    <meta
      property="og:description"
      content={ogdescription || process.env.SEO_OGDESCRIPTION}
    />
    <meta property="og:image" content={ogimage || process.env.SEO_OGIMAGE} />
    <meta property="og:url" content={ogurl || process.env.BASE_URL} />
    <meta property="og:type" content="website" />
  </Head>
);

export default Seo;
