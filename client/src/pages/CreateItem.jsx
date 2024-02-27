import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CreateItem() {
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:3000/api/items", newItem)
        .then(() => {
          toast.success("Item Successfully Created");
          navigate("/");
        })
        .catch(() => {
          toast.error("Please Try Again");
        });
    } catch (error) {
      console.log(error);
      console.log("Asd");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div className="container mx-auto bg-gray-900 text-white px-40">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create Item</h1>
        </div>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-400">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-400">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newItem.quantity}
              onChange={handleChange}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-400">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleChange}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 w-full h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 border border-gray-700 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
