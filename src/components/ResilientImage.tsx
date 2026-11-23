import {useState} from 'react';
import {HeartHandshake} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  width?: number;
  height?: number;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = "L'Empreinte du Cœur",
  width,
  height,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F4EFE0] to-[#E6DFC8] text-[#14451F] p-6 text-center ${className}`}
      >
        <HeartHandshake className="w-10 h-10 text-[#1E6B30]" aria-hidden="true" />
        <span className="font-display text-sm font-semibold">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
