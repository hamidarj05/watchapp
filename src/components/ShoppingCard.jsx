import { useEffect, useState } from "react";

export default function ShoppingCard() {
    const [products, setProducts] = useState([]);
    const apiUrl = "http://localhost:3000/Watches";

    const fetchProducts = (apiUrl) => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    };

    useEffect(() => {
        fetchProducts(apiUrl);
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-black">
                                    {item.name}
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    {item.description}
                                </p>
                            </div>

                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-40 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
