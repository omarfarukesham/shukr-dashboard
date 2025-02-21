const CrossIcon = ({ className, onClick }) => {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || 'fill-primary'}
      onClick={onClick}
    >
      <path
        d='M2.3377 21.2375L0.762695 19.6625L9.4252 11L0.762695 2.33751L2.3377 0.762512L11.0002 9.42501L19.6627 0.762512L21.2377 2.33751L12.5752 11L21.2377 19.6625L19.6627 21.2375L11.0002 12.575L2.3377 21.2375Z'
        fill='inherit'
      />
    </svg>
  );
};

export default CrossIcon;
