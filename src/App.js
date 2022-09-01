// routes
import React, {useState } from 'react'
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------
export const UserContext = React.createContext();
export default function App() {
  const [dataName, setdataname] = useState('data')
  return (
    <UserContext.Provider value={{dataName, setdataname}}>
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
    </UserContext.Provider>
  );
}
