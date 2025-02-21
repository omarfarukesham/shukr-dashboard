const ArrowDropdownIcon = ({ className }) => {
  return (
    <div>
      <svg
        width='10'
        height='8'
        viewBox='0 0 10 7'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className || 'stroke-primary'}
      >
        <path
          d='M9 1L5.2069 6.03448L1 1'
          stroke='inherit'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

export default ArrowDropdownIcon;
