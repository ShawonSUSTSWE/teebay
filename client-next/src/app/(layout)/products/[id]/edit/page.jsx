import EditProduct from "@/sections/product/edit-product/EditProduct";

const Page = async ({ params }) => {
  const { id } = await params;
  return <EditProduct id={id} />;
};

export default Page;
