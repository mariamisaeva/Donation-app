import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextProps {
  page: number;
  setPage: (page: number) => void;
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  status: string | null;
  setStatus: (status: string | null) => void;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)


  return (
    <PageContext.Provider value={{ page, setPage, selectedAmount, setSelectedAmount, error, setError, status, setStatus}}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = (): PageContextProps => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

export default PageContext;
