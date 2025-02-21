const CustomerIcon = ({ className }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || 'fill-primary'}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 3.75C9.86193 3.75 9.75 3.86193 9.75 4V6C9.75 6.41421 9.41421 6.75 9 6.75C8.58579 6.75 8.25 6.41421 8.25 6V4C8.25 3.0335 9.0335 2.25 10 2.25H14C14.9665 2.25 15.75 3.0335 15.75 4V6C15.75 6.41421 15.4142 6.75 15 6.75C14.5858 6.75 14.25 6.41421 14.25 6V4C14.25 3.86193 14.1381 3.75 14 3.75H10Z'
        fill='inherit'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20 7.5H4C3.72386 7.5 3.5 7.72386 3.5 8V18C3.5 18.2761 3.72386 18.5 4 18.5H20C20.2761 18.5 20.5 18.2761 20.5 18V8C20.5 7.72386 20.2761 7.5 20 7.5ZM4 6C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H4Z'
        fill='inherit'
      />
    </svg>
  );
};

export default CustomerIcon;
