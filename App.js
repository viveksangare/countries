import React from 'react'
import Header from './components/Header';
import { ThemeProvider } from '@mui/material/styles';
import CountryCard from './components/CountryCard';
import { DataProvider } from './contexts/DataContext';
import { Outlet } from 'react-router-dom';
import "./assets/styles/style.css"
import Footer from './components/Footer';


export default function App() {
  return (
    <DataProvider>
      <Header />
      <Outlet/>
      <Footer />
    </DataProvider>
  )
}
