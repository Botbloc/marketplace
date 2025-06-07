import React from 'react';
import {useContext, useEffect,useState} from "react";


const Search = () =>  {
    const [query, setQuery] = useState('');
    const [items] = useState([
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Elderberry',
      'Fig',
      'Grapes'
    ]);
  
    const handleSearch = (e) => {
      setQuery(e.target.value);
    };
  
    const filteredItems = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    let flag = false;

    try {
      return (
          <div>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="What's in your mind"
              
            />
            {flag && <ul className="mt-4">
              {filteredItems.map((item, index) => (
                <li key={index} className="p-1 border-b">
                  {item}
                </li>
              ))}
            </ul>}
        </div>
      );
    
    }
    catch(err){
      console.log("error: ", err);
    }
}

export default Search;