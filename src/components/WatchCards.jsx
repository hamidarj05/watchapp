import { useEffect, useState } from "react";

export default function WatchCards() {
  const [products, setProducts] = useState([]);
  const apiUrl = "http://localhost:3001/Watches";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Our Timeless Collection
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Premium watches designed for every lifestyle
        </p>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Text */}
              <div className="pr-4">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-snug">
                  {item.description}
                </p>
              </div>
 
              <div className="h-16 w-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
