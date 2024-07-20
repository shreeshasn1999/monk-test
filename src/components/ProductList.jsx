/* eslint-disable react/prop-types */
import { Reorder, useDragControls } from "framer-motion";
import { MdClose } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";

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
  return (
    <Reorder.Group values={allProducts} onReorder={setAllProducts}>
      {allProducts.map((product, prod_i) => {
        if (product.id < 0)
          return (
            <Reorder.Item
              className="flex items-center"
              value={product}
              key={product.id}
            >
              <RiDraggable
                className="text-xl"
                onPointerDown={(e) => controls.start(e)}
              />
              {prod_i + 1}.
              <div className="bg-white border text-sm h-8 w-[215px] flex items-center justify-between">
                Select Product
                <button
                  onClick={() => {
                    modalRef.current.showModal();
                  }}
                >
                  <FaPen className="text-black/20" />
                </button>
              </div>
              <button className="w-[141px] bg-[#008060] border-[#008060] text-sm p-2 rounded rounded-s border-2 text-white h-8">
                Add Discount
              </button>
            </Reorder.Item>
          );
        return (
          <Reorder.Item
            key={product.id}
            value={product}
            dragListener={false}
            dragControls={controls}
            className="flex flex-col items-center mb-3"
          >
            <div className="flex items-center">
              <RiDraggable
                className="text-xl"
                onPointerDown={(e) => controls.start(e)}
              />
              {prod_i + 1}.
              <div
                key={prod_i}
                className="bg-white border text-sm h-8 w-[215px] flex items-center justify-between"
              >
                {product.title}
                <button onClick={onProductEdit}>
                  <FaPen />
                </button>
              </div>
              <button className="w-[141px] h-8 bg-[#008060] border-[#008060] text-sm p-2 rounded rounded-s border-2 text-white">
                Add Discount
              </button>
            </div>
            <Reorder.Group
              values={product.variants}
              className="flex flex-col gap-6"
              onReorder={(newOrderedVars) => {
                onVariantReorder(newOrderedVars, prod_i);
              }}
            >
              {product.variants.map((variant) => {
                return (
                  <Reorder.Item
                    key={variant.id}
                    value={variant}
                    className="flex items-center"
                  >
                    <RiDraggable
                      className="text-xl"
                      onPointerDown={(e) => controls.start(e)}
                    />
                    <div className="text-sm py-[5px] px-4 w-[184px] rounded-[30px] border">
                      {variant.title}
                    </div>
                    <MdClose
                      onClick={() => {
                        onVariantClose(variant, prod_i);
                      }}
                    />
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}

export default ProductList;
