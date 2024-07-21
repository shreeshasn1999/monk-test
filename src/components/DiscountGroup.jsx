/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdClose } from "react-icons/md";

function DiscountGroup({ elementType, onItemClose, prod_i, variant = null }) {
  const [discountToggle, setDiscountToggle] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountType, setDiscountType] = useState("% off");
  function handleClose() {
    if (elementType === "product") {
      onItemClose(prod_i);
    } else {
      onItemClose(variant, prod_i);
    }
  }
  return (
    <div className="flex items-center gap-2">
      {discountToggle ? (
        <div className="flex overflow-hidden items-center gap-0.5">
          <input
            type="text"
            value={discountAmount}
            onChange={(e) => {
              setDiscountAmount(e.target.value);
            }}
            className={`border w-[95px] h-[31px] px-3 overflow-hidden ${
              elementType === "variant" ? "rounded-[30px]" : ""
            }`}
          />
          <select
            name=""
            id=""
            defaultValue={discountType}
            onChange={(e) => {
              setDiscountType(e.target.value);
            }}
            className={`bg-white border w-[95px] h-[31px] px-3 ${
              elementType === "variant" ? "rounded-[30px]" : ""
            }`}
          >
            <option value="% off" className="text-sm bg-white">
              % off
            </option>
            <option value="flat off" className="text-sm bg-white">
              flat off
            </option>
          </select>
        </div>
      ) : (
        <button
          onClick={() => setDiscountToggle((prev) => !prev)}
          className="w-[90%] bg-[#008060] border-[#008060] text-sm py-[5px] rounded rounded-s border-2 text-white"
        >
          Add Discount
        </button>
      )}
      <button onClick={handleClose} className="px-3">
        <MdClose className="text-2xl" />
      </button>
    </div>
  );
}

export default DiscountGroup;
