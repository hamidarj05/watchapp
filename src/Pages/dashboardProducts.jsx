import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  setProducts,
} from "../redux/productsSlice";

export default function DashboardProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const apiUrl = useMemo(() => "http://localhost:3001/watches", []);
 
  const [modalMode, setModalMode] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setErrorMsg("");
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        dispatch(setProducts(data));
      } catch (err) {
        setErrorMsg(err?.message || "Something went wrong");
      }
    })();
  }, [apiUrl, dispatch]);

  const closeModal = () => {
    setModalMode(null);
    setSelectedId(null);
    setErrorMsg("");
    setIsSubmitting(false);
  };
 
  const openAddModal = () => {
    setErrorMsg("");
    setSelectedId(null);
    setForm({ name: "", description: "", image: "" });
    setModalMode("add");
  };
 
  const openEditModal = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) {
      setErrorMsg("Product not found.");
      return;
    }

    setErrorMsg("");
    setSelectedId(id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      image: product.image || "",
    });
    setModalMode("edit");
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.description.trim()) {
      setErrorMsg("Name and Description are required.");
      return false;
    }
    return true;
  };
 
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim() || "https://via.placeholder.com/300x200",
    };

    try {
      setIsSubmitting(true);
      setErrorMsg("");

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const savedProduct = await res.json();
      dispatch(addProduct(savedProduct));
      closeModal();
    } catch (err) {
      setErrorMsg(err?.message || "Could not add product");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!selectedId) {
      setErrorMsg("No product selected for update.");
      return;
    }

    const current = products.find((p) => p.id === selectedId);
    if (!current) {
      setErrorMsg("Product not found.");
      return;
    }

    const updatedProduct = {
      ...current,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim() || "https://via.placeholder.com/300x200",
    };

    try {
      setIsSubmitting(true);
      setErrorMsg("");

      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      dispatch(updateProduct(data));
      closeModal();
    } catch (err) {
      setErrorMsg(err?.message || "Could not update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setErrorMsg("");
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      dispatch(deleteProduct(id));
    } catch (err) {
      setErrorMsg(err?.message || "Could not delete product");
    }
  };

  const isModalOpen = modalMode === "add" || modalMode === "edit";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Products Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your watches: add, update, and delete products.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white font-medium shadow-sm hover:opacity-90 active:opacity-80 transition"
          >
            + Add Product
          </button>
        </div>
 
        {errorMsg && !isModalOpen && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {errorMsg}
          </div>
        )}
 
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-44 bg-gray-100">
                <img
                  src={item.image || "https://via.placeholder.com/600x400"}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {item.name}
                </h2>
                <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(item.id)}
                    className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() =>
                      window.confirm("Are you sure you want to delete it?") &&
                      handleDelete(item.id)
                    }
                    className="flex-1 rounded-xl bg-red-600 px-3 py-2 text-white text-sm font-medium hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full rounded-2xl bg-white p-10 text-center text-gray-600 ring-1 ring-gray-100">
              No products yet. Click{" "}
              <span className="font-semibold">Add Product</span> to create one.
            </div>
          )}
        </div>
      </div>
 
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        > 
          <button
            onClick={closeModal}
            className="absolute inset-0 bg-black/50"
            aria-label="Close modal"
          />
 
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === "add" ? "Add New Product" : "Update Product"}
              </h3>
              <button
                onClick={closeModal}
                className="rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={modalMode === "add" ? handleAddSubmit : handleEditSubmit}
              className="px-5 py-4 space-y-4"
            > 
              {errorMsg && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {errorMsg}
                </div>
              )}
 
              {modalMode === "edit" && (
                <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
                  <span className="font-semibold">Product ID:</span>{" "}
                  <span className="font-mono">{selectedId}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onFormChange}
                  placeholder="e.g., Rolex Submariner"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onFormChange}
                  placeholder="Short description of the watch..."
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Image URL
                </label>
                <input
                  name="image"
                  value={form.image}
                  onChange={onFormChange}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
                <p className="mt-1 text-xs text-gray-500">
                  If empty, a placeholder image will be used.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-black px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-60 transition"
                >
                  {isSubmitting
                    ? modalMode === "add"
                      ? "Adding..."
                      : "Updating..."
                    : modalMode === "add"
                    ? "Add Product"
                    : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
