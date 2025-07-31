import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 py-5 px-[8vw] pt-20 mt-[100px]'>
        <div className='lg:w-[93%] mx-auto'>
<div className="flex justify-between gap-5 w-full mb-10">
                <img src={assets.logo} alt="" />
            </div>
        <div className="w-full flex flex-col md:flex-row gap-15 mb-10">
            <div className="flex flex-col items-start gap-5 w-full">
                <h2 className="text-white font-bold">MENU</h2>
                <ul className="list-none font-light">
                    <li className="mb-2.5"><Link to="/">Home</Link></li>
                    <li className="mb-2.5"><Link to="/about-us">About us</Link></li>
                    <li className="mb-2.5"><Link to="/delivery">Delivery</Link></li>
                    <li className="mb-2.5"><Link to="/contact-us">Contact Us</Link></li>
                </ul>   
            </div>
            <div className="flex flex-col items-start gap-5 w-full">
                <h2 className="text-white font-bold">POLICIES</h2>
                <ul className="list-none font-light">
                    <li className="mb-2.5"><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li className="mb-2.5"><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                    <li className="mb-2.5"><Link to="/refund-policy">Refund & Cancellation Policy</Link></li>
                </ul>
            </div>
            <div className="flex flex-col items-start gap-5 w-full">
                <h2 className="text-white font-bold">GET IN TOUCH</h2>
                <ul className="list-none font-light">
                    <li className="mb-2.5">+1-212-456-9787</li>
                    <li className="mb-2.5">contact@totmato.com</li>
                </ul>
            </div>
            <div className="flex flex-col items-start gap-5 w-full">
                <h2 className="text-white font-bold">Social Media</h2>
                <div className="flex gap-2">
                    <img src={assets.facebook_icon} alt="" className='w-10 mr-4' />
                    <img src={assets.twitter_icon} alt="" className='w-10 mr-4' />
                    <img src={assets.linkedin_icon} alt="" className='w-10 mr-4' />
                </div>
            </div>
        </div>
        <hr className="w-full h-0.5 my-5 bg-gray-500 border-none" />
        <p className="md:text-center text-sm m-10">Copyright 2024 @ Tomato.com - All Right Reserverd.</p>
    </div>
        </div>
        
  )
}

export default Footer