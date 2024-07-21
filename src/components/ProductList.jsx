/* eslint-disable react/prop-types */
import { FaPen } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Reorder, useDragControls } from "framer-motion";
import Accordion from "./Accordion";
import DiscountGroup from "./DiscountGroup";

function ProductList({ setCurrIdx, modalRef, allProducts, setAllProducts }) {
  const controls = useDragControls();

  function onProductEdit(index) {
    setCurrIdx(index);
    modalRef.current.showModal();
  }

  function onVariantReorder(newOrderedVars, item_index) {
    const updatedVarOrder = [...allProducts];
    updatedVarOrder[item_index].variants = newOrderedVars;
    setAllProducts(updatedVarOrder);
  }

  function onVariantClose(variant, item_index) {
    const updatedVarOrder = [...allProducts];
    updatedVarOrder[item_index].variants = updatedVarOrder[
      item_index
    ].variants.filter((el) => el.id !== variant.id);
    setAllProducts(updatedVarOrder);
  }

  function onItemClose(item_index) {
    const updatedItems = [
      ...allProducts.slice(0, item_index),
      ...allProducts.slice(item_index + 1, allProducts.length),
    ];
    setAllProducts(updatedItems);
  }
  return (
    <Reorder.Group
      className="flex flex-col mb-6"
      values={allProducts}
      onReorder={setAllProducts}
    >
      <div className="w-[630px] font-semibold mb-3 grid grid-cols-[10%_60%_30%]">
        <div> </div>
        <div>Product</div>
        <div>Discount</div>
      </div>
      {allProducts.map((product, prod_i) => {
        if (product.id < 0)
          return (
            <Reorder.Item
              className={`flex items-center w-[630px] gap-3 mb-4 text-black/80 ${
                allProducts.length !== prod_i + 1 && "border-b"
              }`}
              value={product}
              key={product.id}
            >
              <div className="w-full items-center grid grid-cols-[5%_60%_35%] mb-3 gap-x-2">
                <div className="flex items-center">
                  <RiDraggable
                    className="text-xl"
                    onPointerDown={(e) => controls.start(e)}
                  />
                  {prod_i + 1}.
                </div>
                <div className="bg-white grow border px-3 h-full flex items-center justify-between">
                  <div className="text-sm-1 ">Select Product</div>
                  <button
                    onClick={() => {
                      modalRef.current.showModal();
                    }}
                  >
                    <FaPen className="text-black/20" />
                  </button>
                </div>
                <DiscountGroup
                  elementType="product"
                  onItemClose={onItemClose}
                  prod_i={prod_i}
                />
              </div>
            </Reorder.Item>
          );
        return (
          <Reorder.Item
            key={product.id}
            value={product}
            dragListener={false}
            dragControls={controls}
            className={`flex flex-col w-[630px] gap-3 items-center mb-3 p-3 ${
              allProducts.length !== prod_i + 1 && "border-b"
            }`}
          >
            <div className="w-full grid grid-cols-[5%_60%_35%] gap-x-2">
              <div className="flex gap-1 items-center text-black/80">
                <RiDraggable
                  className="text-xl"
                  onPointerDown={(e) => controls.start(e)}
                />
                {prod_i + 1}.
              </div>
              <div className="bg-white grow border px-3 h-full flex items-center justify-between">
                <div className="text-sm-1">{product.title}</div>
                <button onClick={onProductEdit}>
                  <FaPen className="text-black/20" />
                </button>
              </div>
              <DiscountGroup
                elementType="product"
                onItemClose={onItemClose}
                prod_i={prod_i}
              />
            </div>

            <Accordion
              product={product}
              prod_i={prod_i}
              onVariantReorder={onVariantReorder}
              onVariantClose={onVariantClose}
            />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}

export default ProductList;
