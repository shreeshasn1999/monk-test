/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiDraggable } from "react-icons/ri";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Reorder, useDragControls } from "framer-motion";
import DiscountGroup from "./DiscountGroup";

function Accordion({ onVariantReorder, onVariantClose, product, prod_i }) {
  const controls = useDragControls();
  const [showVarinats, setShowVarinats] = useState(false);
  if (product.variants.length > 1)
    return (
      <div className="w-full flex flex-col gap-3 items-end">
        <button
          className="text-sm-1 text-[#006EFF] underline flex items-center"
          onClick={() => setShowVarinats((prev) => !prev)}
        >
          {showVarinats ? "Hide" : "Show"} Variants{" "}
          {showVarinats ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        <div
          className={`w-[90%] grid overflow-hidden transition-all duration-300 ease-in-out ${
            showVarinats
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <Reorder.Group
            values={product.variants}
            className="flex flex-col gap-6 overflow-hidden"
            onReorder={(newOrderedVars) => {
              onVariantReorder(newOrderedVars, prod_i);
            }}
          >
            {product.variants.map((variant) => {
              return (
                <Reorder.Item
                  key={variant.id}
                  value={variant}
                  className="grid gap-x-2 grid-cols-[5%_56%_39%]"
                >
                  <div className="flex items-center">
                    <RiDraggable
                      className="text-xl"
                      onPointerDown={(e) => controls.start(e)}
                    />
                  </div>
                  <div className="bg-white text-sm py-[5px] px-4 w-full rounded-[30px] border">
                    {variant.title}
                  </div>
                  <DiscountGroup
                    elementType="variant"
                    variant={variant}
                    prod_i={prod_i}
                    onItemClose={onVariantClose}
                  />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      </div>
    );
  else {
    return (
      <div className="w-full flex flex-col gap-3 items-end">
        <div
          key={product.variants[0].id}
          value={product.variants[0]}
          className="w-[90%] grid gap-x-2 grid-cols-[5%_56%_39%]"
        >
          <div className="flex items-center">
            <RiDraggable
              className="text-xl"
              onPointerDown={(e) => controls.start(e)}
            />
          </div>
          <div className="bg-white text-sm py-[5px] px-4 w-full rounded-[30px] border">
            {product.variants[0].title}
          </div>
          <DiscountGroup
            elementType="variant"
            variant={product.variants[0]}
            prod_i={prod_i}
            onItemClose={onVariantClose}
          />
        </div>
      </div>
    );
  }
}

export default Accordion;
