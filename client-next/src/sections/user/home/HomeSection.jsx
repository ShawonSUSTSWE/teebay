"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./HomeSection.module.css";
import Button from "@/components/Button/Button";
import { logout } from "@/actions/authActions";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProductList from "@/components/ProductList/ProductList";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PRODUCT,
  GET_OWNED_PRODUCTS_QUERY,
} from "@/actions/productActions";
import Loader from "@/components/Loader/Loader";
import { showErrorToast } from "@/lib/utils/toastUtils";
import { useRef, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const classNames = getClassNames(styles);

export default function HomeSection() {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [productToBeDeleted, setProductToBeDeleted] = useState("");
  const deleteModalRef = useRef(null);

  const router = useRouter();
  const { data, loading, error } = useQuery(GET_OWNED_PRODUCTS_QUERY);

  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
    update(cache, { data }) {
      const { getProductsByOwner } = cache.readQuery({
        query: GET_OWNED_PRODUCTS_QUERY,
      });

      cache.writeQuery({
        query: GET_OWNED_PRODUCTS_QUERY,
        data: {
          getProductsByOwner: getProductsByOwner.filter(
            (product) => product.id !== data.deleteProduct.id
          ),
        },
      });
    },
  });

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const deleteProduct = async () => {
    try {
      await deleteProductMutation({ variables: { id: productToBeDeleted } });
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

  useOnClickOutside(deleteModalRef, hideDeleteModal);

  return (
    <div className={classNames("container")}>
      <Button
        className={classNames("button")}
        variant="secondary"
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
      <div className={classNames("my-product-section")}>
        <SectionHeader header="MY PRODUCTS" />
        {loading ? (
          <Loader />
        ) : (
          <ProductList
            products={data?.getProductsByOwner || []}
            deleteProduct={showDeleteModal}
          />
        )}
        <Button className={classNames("add-product-btn")}>Add Product</Button>
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
