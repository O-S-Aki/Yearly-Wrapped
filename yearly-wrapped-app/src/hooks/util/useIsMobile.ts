import { useState, useEffect } from 'react'

export default function useIsMobile(): boolean {
  const mobileWidthPixels: number = 768;
  const [isMobile, setIsMobile] = useState<boolean>(window.matchMedia(`(max-width: ${mobileWidthPixels}px)`).matches);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${mobileWidthPixels}px)`);
    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
};