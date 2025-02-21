const CheckboxIcon = ({ className }) => {
  return (
    <>
      <svg
        width='12'
        height='12'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className || 'stroke-primary'}
      >
        <rect
          x='0.5'
          y='0.5'
          width='13'
          height='13'
          rx='1.5'
          stroke='inherit'
        />
      </svg>
    </>
  );
};

export default CheckboxIcon;
