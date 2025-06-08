"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./HomeSection.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProductList from "@/components/ProductList/ProductList";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PRODUCT,
  GET_AVAILABLE_PRODUCTS,
  GET_OWNED_PRODUCTS_QUERY,
} from "@/actions/productActions";
import Loader from "@/components/Loader/Loader";
import { showErrorToast, showSuccessToast } from "@/lib/utils/toastUtils";
import { useRef, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { removeFromCacheList } from "@/lib/utils/cacheUtils";

const classNames = getClassNames(styles);

export default function HomeSection() {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [productToBeDeleted, setProductToBeDeleted] = useState("");
  const deleteModalRef = useRef(null);

  const router = useRouter();
  const { data, loading, error } = useQuery(GET_OWNED_PRODUCTS_QUERY);

  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
    update(cache, { data }) {
      const removedProduct = data.deleteProduct;

      removeFromCacheList({
        cache,
        query: GET_OWNED_PRODUCTS_QUERY,
        fieldName: "getProductsByOwner",
        removedItem: removedProduct,
      });
      removeFromCacheList({
        cache,
        query: GET_AVAILABLE_PRODUCTS,
        fieldName: "getAllAvailableProducts",
        removedItem: removedProduct,
      });
    },
  });

  const deleteProduct = async () => {
    try {
      await deleteProductMutation({ variables: { id: productToBeDeleted } });
      showSuccessToast("Product deleted successfully");
    } catch (error) {
      showErrorToast(error.message);
    }
    hideDeleteModal();
  };

  const showDeleteModal = (productId) => {
    setProductToBeDeleted(productId);
    setIsDeleteModalShown(true);
  };

  const hideDeleteModal = () => {
    setProductToBeDeleted("");
    setIsDeleteModalShown(false);
  };

  const routeToAddProduct = () => {
    router.push("/add-product");
  };

  useOnClickOutside(deleteModalRef, hideDeleteModal);

  if (error) {
    return null;
  }

  return (
    <div className={classNames("container")}>
      <div className={classNames("my-product-section")}>
        <SectionHeader header="MY PRODUCTS" />
        {loading ? (
          <Loader />
        ) : (
          <ProductList
            products={data?.getProductsByOwner || []}
            deleteProduct={showDeleteModal}
            isOwned={true}
          />
        )}
        <Button
          className={classNames("add-product-btn")}
          onClick={routeToAddProduct}
        >
          Add Product
        </Button>
      </div>
      {isDeleteModalShown ? (
        <ConfirmationModal
          confirmMessage={"Are you sure you want to delete this product?"}
          confirm={deleteProduct}
          cancel={hideDeleteModal}
          ref={deleteModalRef}
        />
      ) : null}
    </div>
  );
}
