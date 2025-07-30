// eslint-disable-next-line no-unused-vars
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div>
        <div className="mx-auto mt-[100px] text-[max(3vw,20px)] text-center font-medium" id='app-download'>
            <p>For Better Experience Download <br />Tomato App</p>
            <div className="flex justify-center gap-[max(2vw,10px)] mt-10">
                <img src={assets.play_store} alt="" className="w-[max(10vw,120px)] max-w-[180px] transition-all duration-500 cursor-pointer hover:scale-105" />
                <img src={assets.app_store} alt="" className="w-[max(10vw,120px)] max-w-[180px] transition-all duration-500 cursor-pointer hover:scale-105" />
            </div>
        </div>
    </div>
  )
}

export default AppDownload