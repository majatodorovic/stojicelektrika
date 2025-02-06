/* eslint-disable camelcase */
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loader from "rsuite/Loader";
import { ApiHandler } from "../../helpers/api";
import { generateBreadcrumbs } from "../../helpers/generateBreadCrumbs";
import Seo from "../../components/Seo/Seo";

const Breadcrumbs = dynamic(() => import("../../components/Breadcrumbs"));
const ProductDetails = dynamic(() => import("../../components/ProductDetails"));

const ProductPage = ({
  basic_data,
  breadcrumbs,
  gallery,
  specifications,
  description,
}) => {
  const { asPath } = useRouter();
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader center content="Loading..." size="lg" vertical />
      </div>
    );
  }

  return (
    <>
      <>
        <Seo
          title={`${basic_data.data.item.basic_data.name}`}
          description={`${basic_data.data.item.basic_data.short_description}`}
          ogtitle={`${basic_data.data.item.basic_data.name}`}
          ogdescription={`${basic_data.data.item.basic_data.short_description}`}
          ogimage={`${gallery?.gallery[0]?.image}`}
          ogurl={`${process.env.BASE_URL}proizvod/${basic_data.data.item.id}`}
        />
        <div className="container">
          <Breadcrumbs
            crumbs={breadcrumbs.steps || []}
            end={{ label: basic_data.data.item.basic_data.name, path: asPath }}
          />
          <ProductDetails
            productData={basic_data.data.item}
            gallery={gallery}
            specifications={specifications}
            description={description}
          />
        </div>
      </>
    </>
  );
};

export default ProductPage;

export const getServerSideProps = async (context) => {
	const api = ApiHandler();
	const { productSlug } = context.query;
	return {
      props: {
        basic_data: await api
            .get(`/product-details/basic-data/${productSlug}`)
            .then((response) => response?.payload),
        breadcrumbs: await api
            .get(`/product-details/breadcrumbs/${productSlug}`)
            .then((response) => response?.payload),
        gallery: await api
            .get(`/product-details/gallery/${productSlug}`)
            .then((response) => response?.payload),
        specifications: await api
            .get(`/product-details/specification/${productSlug}`)
            .then((response) => response?.payload),
        description: await api
            .get(`/product-details/description/${productSlug}`)
            .then((response) => response?.payload),
      },
	};
};
