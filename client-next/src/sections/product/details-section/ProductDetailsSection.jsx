"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductDetailsSection.module.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_DETAILS } from "@/actions/productActions";
import Loader from "@/components/Loader/Loader";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { PageRoutes } from "@/lib/utils/routeUtils";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { useRef, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const classNames = getClassNames(styles);

export default function ProductDetailsSection({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });
  const { user, loading: sessionLoading } = useSession();
  const router = useRouter();
  const [modalType, setModalType] = useState(null);
  const buyModalRef = useRef(null);

  const productData = data?.getProductById;

  const routeToEditPage = () => {
    const page = PageRoutes.productEditPage(productData.id);
    router.push(page);
  };

  const showModal = (type) => {
    setModalType(type);
  };

  const buyProduct = () => {
    console.log("Buying product: " + productData.id);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const renderModal = () => {
    switch (modalType) {
      case "BUY":
        return (
          <ConfirmationModal
            confirmMessage="Are you sure you want to buy the product?"
            confirm={buyProduct}
            cancel={closeModal}
            ref={buyModalRef}
          />
        );

      case "RENT":
        return <div>Rent</div>;

      default:
        return null;
    }
  };

  useOnClickOutside(buyModalRef, closeModal);

  if (loading) return <Loader />;

  if (error) return null;

  return (
    <div className={classNames("wrapper")}>
      <div className={classNames("container")}>
        <ProductDetails {...productData} />
        <div className={classNames("button-container")}>
          {user?.id === productData?.owner?.id ? (
            <Button onClick={routeToEditPage}>Edit Product</Button>
          ) : (
            <div className={classNames("button-container")}>
              {productData?.rentalPrice && (
                <Button onClick={() => showModal("RENT")}>Rent</Button>
              )}
              {productData?.price && (
                <Button onClick={() => showModal("BUY")}>Buy</Button>
              )}
            </div>
          )}
          {renderModal()}
        </div>
      </div>
    </div>
  );
}
