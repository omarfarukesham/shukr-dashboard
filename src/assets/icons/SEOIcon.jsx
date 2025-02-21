const SEOIcon = ({ className }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || 'stroke-primary'}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13 17.5C16.5899 17.5 19.5 14.5899 19.5 11C19.5 7.41015 16.5899 4.5 13 4.5C9.41015 4.5 6.5 7.41015 6.5 11C6.5 14.5899 9.41015 17.5 13 17.5ZM13 19C17.4183 19 21 15.4183 21 11C21 6.58172 17.4183 3 13 3C8.58172 3 5 6.58172 5 11C5 15.4183 8.58172 19 13 19Z'
        fill='inherit'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.46963 20.5321L7.44556 15.5562L8.50622 16.6168L3.53029 21.5927C3.2374 21.8856 2.76253 21.8856 2.46963 21.5927C2.17674 21.2999 2.17674 20.825 2.46963 20.5321Z'
        fill='inherit'
      />
    </svg>
  );
};

export default SEOIcon;
