import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // Default to true for desktop queries to prevent layout shift on initial load
  // This ensures the sidebar appears expanded immediately, preventing flash
  const defaultMatch = query.includes("min-width") ? true : false;
  const [matches, setMatches] = useState(defaultMatch);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    const media = window.matchMedia(query);
    
    // Set the actual match immediately
    setMatches(media.matches);
    
    // Create listener function
    const updateMatch = () => {
      setMatches(media.matches);
    };
    
    // Use modern API if available, fallback for older browsers
    if (media.addEventListener) {
      media.addEventListener("change", updateMatch);
      return () => media.removeEventListener("change", updateMatch);
    } else {
      // Fallback for older browsers (Safari < 14)
      media.addListener(updateMatch);
      return () => media.removeListener(updateMatch);
    }
  }, [query]);

  return matches;
}
