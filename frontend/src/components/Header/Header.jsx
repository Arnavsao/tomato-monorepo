const Header = () => {
    return (
      <div className="h-[34vw] mb-4 bg-[url('/header_img.png')] bg-no-repeat bg-contain relative">
        <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[60%] bottom-[10%] left-[6vw] animate-fadeIn lg:max-w-[55%] md:max-w-[65%]">
          <h2 className="font-medium text-white text-[max(4.5vw,22px)] leading-tight ">
            Order Your Favorite Food Here
          </h2>
          <p className="hidden lg:block text-white text-md w-[80%]">
            Choose from a diverse menu featuring a delectable array of dishes, each crafted with exceptional flavor and care.
          </p>
          <button className="text-[#747474] font-medium bg-white text-[max(1vw,13px)] rounded-[50px] py-2 px-4 lg:py-4 lg:px-8">
            View Menu
          </button>
        </div>
      </div>
    );
  }
  
  export default Header;