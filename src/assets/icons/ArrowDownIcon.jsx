const ArrowDownIcon = ({ className, onClick }) => {
  return (
    <svg
      width='10'
      height='14'
      viewBox='0 0 15 10'
      fill='inherit'
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.9782 0.922224C14.2973 1.18631 14.3419 1.65909 14.0778 1.9782L8.28467 8.9782C8.14504 9.14692 7.93863 9.24618 7.71966 9.24991C7.50068 9.25364 7.29101 9.16147 7.14571 8.99761L0.938813 1.99761C0.664003 1.68768 0.69247 1.21366 1.00239 0.938853C1.31232 0.664044 1.78634 0.69251 2.06115 1.00243L7.68723 7.34741L12.9222 1.02184C13.1863 0.702737 13.659 0.658135 13.9782 0.922224Z'
        fill='inherit'
      />
    </svg>
  );
};

export default ArrowDownIcon;
