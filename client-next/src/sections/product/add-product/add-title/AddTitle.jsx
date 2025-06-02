import AddProductFormStep from "../AddProductFormStep";

export default function AddTitle({}) {
  return (
    <AddProductFormStep
      fieldKey={"title"}
      promptText={"Select a title for your product"}
      nextRoute={"/add-product/description"}
      showBackButton={false}
    />
  );
}
