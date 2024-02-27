import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function DeleteItem() {
  const [updatedItem, setUpdatedItem] = useState({
    name: "",
    quantity: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleDelete = async () => {
    axios
      .delete(`http://localhost:3000/api/items/${id}`)
      .then(() => {
        toast.success("Item Successfully Deleted");
        navigate("/");
      })
      .catch(() => {
        toast.error("Please Try Again");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-white text-3xl font-bold mb-4">Delete Item</h1>
      <p className="text-white text-lg mb-8">
        Are you sure you want to delete item: {updatedItem.name}?
      </p>
      <div className="flex">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-4"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteItem;
