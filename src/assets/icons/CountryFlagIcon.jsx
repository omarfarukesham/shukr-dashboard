const CountryFlagIcon = ({ flagIcon, className }) => {
  return (
    <div className='relative '>
      <div className='absolute end-0 bottom-0 -m-1 '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='8'
          viewBox='0 0 8 8'
          fill='none'
        >
          <circle cx='4' cy='4' r='4' fill={className} />
        </svg>
      </div>
      <div className=''>
        <img src={flagIcon} alt='' className='w-4 h-4' />
      </div>
    </div>
  );
};

export default CountryFlagIcon;
