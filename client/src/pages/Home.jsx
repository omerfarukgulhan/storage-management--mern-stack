import { useEffect, useState } from "react";
import axios from "axios";
import { RiEdit2Line, RiDeleteBin6Line, RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/items")
      .then((response) => {
        if (response.data.status === "Success") {
          setItems(response.data.data.items);
        } else {
          toast.error("Please Try Again");
        }
      })
      .catch(() => {
        toast.error("Please Try Again");
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center p-5">
        <h1 className="text-white text-4xl font-bold">Storage Management</h1>
      </div>

      <div className="container mx-auto bg-gray-900 text-white px-40">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Items</h1>{" "}
          <Link to="/items/create">
            <button className="hover:bg-gray-600 border border-gray-300 rounded">
              <RiAddFill size={40} />
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 border-r border-gray-700">Name</th>
                <th className="px-4 py-2 border-r border-gray-700">Quantity</th>
                <th className="px-4 py-2 border-r border-gray-700">
                  Description
                </th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-gray-900">
              {items.map((item) => (
                <tr key={item._id} className="border-t border-gray-700">
                  <td className="px-4 py-2 border-r border-gray-700">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-700">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-700 whitespace-normal max-w-xs">
                    {item.description}
                  </td>
                  <td className="py-2 flex gap-2 items-center justify-evenly">
                    <Link to={`/items/edit/${item._id}`}>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 border border-gray-700 rounded">
                        <RiEdit2Line size={20} />
                      </button>
                    </Link>
                    <Link to={`/items/delete/${item._id}`}>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 border border-gray-700 rounded">
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
