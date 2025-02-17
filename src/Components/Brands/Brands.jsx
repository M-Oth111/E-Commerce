import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

export default function Brands() {
  async function getBrands() {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands'); // جلب جميع البراندات
    return response.data.data;
  }

  const { data: brands, isLoading: brandload } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return (
    <>
      {brandload ? (
        <p className="text-center text-green-700 text-4xl">Loading Brands...</p>
      ) : (
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
          {brands?.map((brand) => (
            <div key={brand._id} className="productCard text-center bg-white shadow-lg p-3 rounded-lg flex justify-center  flex-column">
<img src={brand.image} alt="" classname="w-full h-40 object-contain mx-auto rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
