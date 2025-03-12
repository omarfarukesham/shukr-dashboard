import loadingLogo from '@/assets/images/restoreit_circle.svg';
import { twMerge } from 'tailwind-merge';

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ className, text }: LoadingSpinnerProps) => {
  return (
    <div
      className={twMerge(
        'h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300',
        className,
      )}
    >
      <div className="relative">
        {/* Background pulse effect */}
        <div className="absolute inset-0 rounded-full bg-gray-200 opacity-30 animate-ping"></div>
        {/* Rotating logo */}
        <img
          src={loadingLogo}
          alt="Loading logo"
          className="w-14 h-14 animate-spin-slow"
        />
      </div>
      {text && (
        <span className="mt-4 text-sm text-gray-600 animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
