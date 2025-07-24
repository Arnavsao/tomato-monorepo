import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo distinctio ratione modi delectus sit, corporis in autem quasi, iure atque, eum perferendis labore quae iste consequuntur repellat neque eius eaque.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-center">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-9787</li>
                    <li>contact@totmato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyrigth">Copyright 2024 @ Tomato.com - All Right Reserverd.</p>
        
    </div>
  )
}

export default Footer