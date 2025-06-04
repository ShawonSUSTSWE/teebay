import ProductDetails from "@/sections/product/details-section/ProductDetailsSection";

const Page = async ({ params }) => {
  const { id } = await params;
  return <ProductDetails id={id} />;
};

export default Page;
