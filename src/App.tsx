import * as React from 'react';
import Info from './components/Info';

const App: React.FC = () => {
  return (
    <div className="flex flex-col">
      <nav className="fixed w-[100vw] bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">BotBloc</span>
        </div>
        <div className="space-x-4">
          <a href="#products" className="hover:text-gray-300">Products</a>
          <a href="#solutions" className="hover:text-gray-300">Solutions</a>
          <a href="#community" className="hover:text-gray-300">Community</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Sign in</button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded">Register</button>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center flex-col p-6 h-[500px] mt-[40px]">
        <h1 className="text-4xl font-bold text-center">Join the BotBloc community here</h1>
        <p className="text-center text-gray-600 mt-2">Customised solution of robots tailored to your needs</p>
      </div>
      <div className="flex-grow h-[500px] p-6 py-10">
        <Info />
      </div>
      <footer className="bg-gray-900 text-gray-400 p-4 text-center h-[250px]">
        <div className="flex flex-col justify-end h-[100%] pb-8">
          <div className="container mx-auto text-sm">
            <div className="flex flex-row justify-around">
              <p>© 2025 BotBloc, all rights reserved</p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:business@botbloc.com" className="hover:text-white">Email: business@botbloc.com</a>
                <a href="https://www.linkedin.com" className="hover:text-white">in</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;