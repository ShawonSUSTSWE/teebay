import { PageRoutes } from "@/lib/utils/routeUtils";
import { redirect } from "next/navigation";

const Page = () => {
  redirect(PageRoutes.productCreate.addTitle);
};

export default Page;
