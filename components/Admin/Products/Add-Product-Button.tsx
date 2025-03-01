import {AddProductButtonProps} from './types'

const AddProductButton = ({ onAdd }: AddProductButtonProps) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={onAdd}
        className=" bg-carminePink text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
      >
        ADD PRODUCT
      </button>
    </div>
  );
};

export default AddProductButton;
