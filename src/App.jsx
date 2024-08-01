import  { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching the quote', error);
    }
  };

  const saveQuote = () => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
      <h1 className='text-3xl font-semibold my-2 '>Quote Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-4 w-4/5 md:w-1/2 lg:w-1/3">
        <p className="text-lg text-center font-bold">{quote}</p>
        <div className="mt-4 flex justify-center">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={fetchRandomQuote}
          >
            New Quote
          </button>
          <button 
            className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            onClick={saveQuote}
          >
            Save Quote
          </button>
        </div>
      </div>
      <div className="w-4/5 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-semibold mb-2">Saved Quotes</h2>
        {savedQuotes.map((q, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md mb-2">
            <p className="text-sm">{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
