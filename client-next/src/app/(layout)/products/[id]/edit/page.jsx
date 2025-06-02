import EditProduct from "@/sections/product/edit-product/EditProduct";

const Page = async ({ params }) => {
  const id = await params.id;
  return <EditProduct id={id} />;
};

export default Page;
