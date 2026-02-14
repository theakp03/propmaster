import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar: () => setSidebarOpen((prev) => !prev),
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
