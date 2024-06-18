import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './pages/HomePage.js';
import { CreateStoryPage } from './pages/CreateStoryPage.js';

const App = () => {
  const [page, setPage] = useState('home');

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    setPage(page);
  };

  return (
    <div>
      {page === 'home' && <HomePage navigateTo={navigateTo} />}
      {page === 'create' && <CreateStoryPage navigateTo={navigateTo} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
