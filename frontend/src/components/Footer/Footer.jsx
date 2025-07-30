import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 py-5 px-[8vw] pt-20 mt-[100px]'>
        <div className="w-full flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex flex-col items-start gap-5">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo distinctio ratione modi delectus sit, corporis in autem quasi, iure atque, eum perferendis labore quae iste consequuntur repellat neque eius eaque.</p>
                <div className="flex">
                    <img src={assets.facebook_icon} alt="" className='w-10 mr-4' />
                    <img src={assets.twitter_icon} alt="" className='w-10 mr-4' />
                    <img src={assets.linkedin_icon} alt="" className='w-10 mr-4' />
                </div>
            </div>
            <div className="flex flex-col items-start gap-5">
                <h2 className="text-white">COMPANY</h2>
                <ul className="list-none">
                    <li className="mb-2.5"><Link to="/">Home</Link></li>
                    <li className="mb-2.5"><Link to="/about-us">About us</Link></li>
                    <li className="mb-2.5"><Link to="/delivery">Delivery</Link></li>
                    <li className="mb-2.5"><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li className="mb-2.5"><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                    <li className="mb-2.5"><Link to="/refund-policy">Refund & Cancellation Policy</Link></li>
                </ul>
            </div>
            <div className="flex flex-col items-start gap-5">
                <h2 className="text-white">GET IN TOUCH</h2>
                <ul className="list-none">
                    <li className="mb-2.5">+1-212-456-9787</li>
                    <li className="mb-2.5">contact@totmato.com</li>
                </ul>
            </div>
        </div>
        <hr className="w-full h-0.5 my-5 bg-gray-500 border-none" />
        <p className="md:text-center">Copyright 2024 @ Tomato.com - All Right Reserverd.</p>
    </div>
  )
}

export default Footer