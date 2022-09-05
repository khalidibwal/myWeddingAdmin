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
  const [dataName, setdataname] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [myweddingid, setmyweddingid] = useState(null)
  const [userid, setuserid] = useState(null)
  return (
    <UserContext.Provider value={{dataName, setdataname, userEmail, setUserEmail, myweddingid, setmyweddingid, userid, setuserid}}>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
