const SearchIcon = ({ className }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle
        cx='7.9999'
        cy='6.99999'
        r='3.97143'
        stroke='#484A56'
        strokeWidth='1.2'
      />
      <path
        d='M1.57573 12.6174C1.34141 12.8517 1.34142 13.2316 1.57573 13.4659C1.81004 13.7002 2.18994 13.7002 2.42426 13.4659L1.57573 12.6174ZM4.4981 9.695L1.57573 12.6174L2.42426 13.4659L5.34663 10.5435L4.4981 9.695Z'
        fill='#484A56'
      />
    </svg>
  );
};

export default SearchIcon;
