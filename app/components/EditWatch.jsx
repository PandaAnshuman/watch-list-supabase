"use client";
import { useState } from "react";
import { updateWatch } from "../server-actions/updateWatch";

export default function EditWatch({ watch }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: watch.id,
    brand: watch.brand,

    when_todo: watch.when_todo,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-300"
      >
        Edit
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white p-6 rounded shadow-lg z-10 w-96 relative">
            <span
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 cursor-pointer text-gray-500"
            >
              &times;
            </span>
            <form action={updateWatch} onSubmit={() => setShowModal(false)}>
              <input type="hidden" name="id" value={watch.id} />
              <div className="mb-4">
                <label htmlFor="brand" className="block text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="when_todo" className="block text-gray-700">
                  When Todo
                </label>
                <input
                  type="date"
                  name="when_todo"
                  id="when_todo"
                  value={formData.when_todo}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Update Watch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
