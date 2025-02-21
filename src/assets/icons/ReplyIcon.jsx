const ReplyIcon = ({ className }) => {
  return (
    <svg
      width='16'
      height='12'
      viewBox='0 0 16 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || 'stroke-primary'}
    >
      <path
        d='M14.1854 11.918V8.20835C14.1854 7.47828 13.9298 6.85849 13.4186 6.34897C12.9074 5.83946 12.2885 5.5847 11.5617 5.5847H3.09932L6.22297 8.70835L5.2284 9.70291L0.395508 4.87502L5.2284 0.0471191L6.22297 1.04168L3.09932 4.16533H11.5617C12.6716 4.16533 13.623 4.55822 14.4157 5.34399C15.2084 6.12977 15.6048 7.08456 15.6048 8.20835V11.918H14.1854Z'
        fill='inherit'
      />
    </svg>
  );
};

export default ReplyIcon;
