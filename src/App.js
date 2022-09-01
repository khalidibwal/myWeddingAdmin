// routes
import React, {useState } from 'react'
import Router from './routes';
import { UserContext } from './contextProv/UserContext';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------
export default function App() {
  const [dataName, setdataname] = useState('data')
  return (
    <UserContext.Provider value='fs'>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
