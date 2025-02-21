interface OrderIconProps {
  className?: string;
}

const OrderIcon = ({ className }: OrderIconProps) => {
    return (
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='white'
          className={className || 'fill-white'}
        >
          <path
            d='M4.625 18.3332C4.01736 18.3332 3.50087 18.1205 3.07552 17.6951C2.65017 17.2698 2.4375 16.7533 2.4375 16.1457V13.5415H5.08333V1.6665L6.32917 2.9165L7.575 1.6665L8.82083 2.9165L10.0667 1.6665L11.3125 2.9165L12.5625 1.6665L13.8125 2.9165L15.0625 1.6665L16.3125 2.9165L17.5625 1.6665V16.1457C17.5625 16.7533 17.3498 17.2698 16.9245 17.6951C16.4991 18.1205 15.9826 18.3332 15.375 18.3332H4.625ZM15.375 17.0832C15.6528 17.0832 15.8785 16.9964 16.0521 16.8228C16.2257 16.6491 16.3125 16.4234 16.3125 16.1457V3.74984H6.33333V13.5415H14.4375V16.1457C14.4375 16.4234 14.5243 16.6491 14.6979 16.8228C14.8715 16.9964 15.0972 17.0832 15.375 17.0832ZM7.4375 7.0415V5.7915H12.4375V7.0415H7.4375ZM7.4375 9.83317V8.58317H12.4375V9.83317H7.4375ZM14.375 7.0415C14.2083 7.0415 14.0625 6.979 13.9375 6.854C13.8125 6.729 13.75 6.58317 13.75 6.4165C13.75 6.24984 13.8125 6.104 13.9375 5.979C14.0625 5.854 14.2083 5.7915 14.375 5.7915C14.5417 5.7915 14.6875 5.854 14.8125 5.979C14.9375 6.104 15 6.24984 15 6.4165C15 6.58317 14.9375 6.729 14.8125 6.854C14.6875 6.979 14.5417 7.0415 14.375 7.0415ZM14.375 9.729C14.2083 9.729 14.0625 9.6665 13.9375 9.5415C13.8125 9.4165 13.75 9.27067 13.75 9.104C13.75 8.93734 13.8125 8.7915 13.9375 8.6665C14.0625 8.5415 14.2083 8.479 14.375 8.479C14.5417 8.479 14.6875 8.5415 14.8125 8.6665C14.9375 8.7915 15 8.93734 15 9.104C15 9.27067 14.9375 9.4165 14.8125 9.5415C14.6875 9.6665 14.5417 9.729 14.375 9.729ZM4.60417 17.0832H13.1875V14.7915H3.6875V16.1457C3.6875 16.4234 3.77535 16.6491 3.95104 16.8228C4.12674 16.9964 4.34444 17.0832 4.60417 17.0832Z'
            fill='#ffffff'
          />
        </svg>
      </div>
    );
  };
  
  export default OrderIcon;
  