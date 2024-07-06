import React, { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import CreateStoryPage from './pages/CreateStoryPage.jsx';

const App = () => {
  const [page, setPage] = useState('home');

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setPage(page);
  };

  return (
    <div className="container">
      {page === 'home' && <HomePage navigateTo={navigateTo} />}
      {page === 'create' && <CreateStoryPage navigateTo={navigateTo} />}
    </div>
  );
};


export default App;
