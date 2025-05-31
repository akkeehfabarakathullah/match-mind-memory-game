import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Game />
      </main>
      <Footer />
    </div>
  );
}

export default App;