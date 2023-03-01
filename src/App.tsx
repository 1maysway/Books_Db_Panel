import React from 'react';
import {Route, Routes}from'react-router-dom'
import MainLayout from './Layouts/MainLayout';
import AddAuthor from './Pages/AddAuthor';
import AddBook from './Pages/AddBook';
import AddGenre from './Pages/AddGenre';
import AddPublisher from './Pages/AddPublisher';
import Authors from './Pages/Authors';
import Books from './Pages/Books';
import Genres from './Pages/Genres';
import Main from './Pages/Main';
import OneAuthor from './Pages/OneAuthor';
import OneBook from './Pages/OneBook';
import OneGenre from './Pages/OneGenre';
import OnePublisher from './Pages/OnePublisher';
import Publishers from './Pages/Publishers';


function App() {
  return (
    <Routes >
      <Route path="/" element={<MainLayout />} >
        <Route path="" element={<Main/>} />
        <Route path="books" element={<Books/>} />
        <Route path="books/:id" element={<OneBook/>} />
        <Route path="books/add" element={<AddBook/>} />
        <Route path="authors" element={<Authors/>} />
        <Route path="authors/:id" element={<OneAuthor/>} />
        <Route path="authors/add" element={<AddAuthor/>} />
        <Route path="genres" element={<Genres/>} />
        <Route path="genres/:id" element={<OneGenre/>} />
        <Route path="genres/add" element={<AddGenre/>} />
        <Route path="publishers" element={<Publishers/>} />
        <Route path="publishers/:id" element={<OnePublisher/>} />
        <Route path="publishers/add" element={<AddPublisher/>} />
        <Route path="*" element={<div>BAD URL</div>} />
      </Route>
    </Routes>
  );
}

export default App;
