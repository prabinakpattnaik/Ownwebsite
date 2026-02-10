import { useEffect } from 'react';

export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | Netrivium Technologies` : 'Netrivium Technologies | Intelligent Connectivity Solutions';
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
