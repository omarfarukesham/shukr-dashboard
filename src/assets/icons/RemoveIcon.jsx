const RemoveIcon = ({ className }) => {
  return (
    <>
      <svg
        width='14'
        height='16'
        viewBox='0 0 14 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className || 'fill-primary'}
      >
        <path
          d='M2.39741 15.6245C2.0023 15.6245 1.66612 15.4864 1.38889 15.2101C1.11165 14.9339 0.973034 14.5989 0.973034 14.2051V2.41482H0.0341797V0.995427H4.16508V0.280762H9.82947V0.995427H13.9653V2.41482H13.0265V14.2051C13.0265 14.5885 12.8853 14.9209 12.6028 15.2023C12.3204 15.4838 11.9868 15.6245 11.6021 15.6245H2.39741ZM11.6021 2.41482H2.39741V14.2051H11.6021V2.41482ZM4.58083 12.4533H5.91553V4.14082H4.58083V12.4533ZM8.08399 12.4533H9.42368V4.14082H8.08399V12.4533Z'
          fill='inherit'
        />
      </svg>
    </>
  );
};

export default RemoveIcon;
