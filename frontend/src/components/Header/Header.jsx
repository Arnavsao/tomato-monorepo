const Header = () => {
    return (
      <div className="h-[34vw] mb-4 bg-[url('/header_img.png')] bg-no-repeat bg-contain relative">
        <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn lg:max-w-[45%] md:max-w-[65%]">
          <h2 className="font-medium text-white text-[max(4.5vw,22px)]">
            Order Your Favorite Food Here
          </h2>
          <p className="text-white text-[1vw] md:hidden">
            Choose from a diverse menu featuring a delectable array of dishes, each crafted with exceptional flavor and care.
          </p>
          <button className="text-[#747474] font-medium py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-[50px] md:py-[2vw] md:px-[4vw]">
            View Menu
          </button>
        </div>
      </div>
    );
  }
  
  export default Header;