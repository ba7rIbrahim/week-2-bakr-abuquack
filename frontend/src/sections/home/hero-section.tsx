export const HeroSection = () => {
  return (
    <>
      <img
        src="/images/hero.jpg"
        alt="hero-image"
        className="mx-auto lg:max-h-[800px] w-full"
      />
      <div className="flex flex-col md:flex-row md:items-center sm:items-start gap-4 my-8 w-full">
        <h1 className="text-h1 text-[50px] md:text-[53px] lg:text-[72px]">
          Simply Unique/ <br /> Simply Better.
        </h1>
        <p className="text-lg text-gray-500 max-w-md flex-1 md:ml-20 lg:ml-42">
          <span className="text-primary font-medium">3elgant</span> is gift &
          decorations store based in HCMC, Vietnam. Est since 2019.
        </p>
      </div>
    </>
  );
};
