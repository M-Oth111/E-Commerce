import React from 'react';
import img1 from '../../assets/images/amazon-pay.png';
import img2 from '../../assets/images/American-Express-Color.png';
import img3 from '../../assets/images/paypal.png';
import img4 from '../../assets/images/mastercard.webp';
import img5 from '../../assets/images/get-apple-store.png';
import img6 from '../../assets/images/get-google-play.png';

export default function Footer() {
  return (
    <>
      <footer className="p-4 bg-gray-100">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Lorem ipsum dolor sit amet.</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ipsa!
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-2/3">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
             
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <button className="mx-3 px-10 py-2 text-white bg-green-400 rounded hover:bg-green-500">
              Share App Link
            </button>
          </div>
        </div>
      
      <hr className='my-7 ' />
      <div className="p-4 flex gap-4 container justify-center">
        <h3 className="text-lg font-semibold mb-4">Payment Partners</h3>
        <div className="flex gap-4">
          <img className="w-10 h-10 object-contain" src={img1} alt="Amazon Pay" />
          <img className="w-10 h-10 object-contain" src={img2} alt="American Express" />
 <img className="w-10 h-10 object-contain" src={img4} alt="MasterCard" />
                   <img className="w-10 h-10 object-contain" src={img3} alt="PayPal" />
        </div>
  <div className=' flex justify-center items-center ms-auto '>

        <h3 className='mx-2'>Lorem ipsum dolor sit.</h3>
        <div className='flex'><img className="w-24 h-24 object-contain" src={img5} alt="" />
        <img className="w-24 h-24 object-contain" src={img6} alt="" />
</div>

      </div>


      </div>
      
    
      </footer>
    </>
  );
}
