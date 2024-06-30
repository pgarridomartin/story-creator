import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './pages/HomePage';
import { CreateStoryPage } from './pages/CreateStoryPage';

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

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
