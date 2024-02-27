import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditItem = () => {
  const [updatedItem, setUpdatedItem] = useState({
    name: "",
    quantity: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/items/${id}`)
      .then((response) => {
        if (response.data.status === "Success") {
          setUpdatedItem(response.data.data.item);
        } else {
          console.error("API request failed:", response.data);
        }
      })
      .catch(() => {
        toast.error("Please Try Again");
      });
  }, [id]);

  async function handleChange(e) {
    const { name, value } = e.target;
    setUpdatedItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/items/${id}`, updatedItem)
      .then((response) => {
        if (response.data.status === "Success") {
          toast.success("Item Successfully Updated");
          navigate("/");
        } else {
          toast.error("Please Try Again");
        }
      })
      .catch(() => {
        toast.error("Please Try Again");
      });
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="container mx-auto bg-gray-900 text-white px-40">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Item</h1>
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
              value={updatedItem.name}
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
              value={updatedItem.quantity}
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
              value={updatedItem.description}
              onChange={handleChange}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 w-full h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border border-gray-700 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
