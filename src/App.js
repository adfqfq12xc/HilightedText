import './App.css';
import React,{useState,} from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const articles = [
  { id: 1, title: "How to Use CSS Grid for Layouts", content: "CSS Grid makes it super easy to build complex web layouts. You can arrange items in rows and columns without too much hassle." },
  { id: 2, title: "Handling Async JavaScript the Easy Way", content: "Dealing with asynchronous code can be tricky, but once you understand promises and async/await, it becomes much more straightforward." },
  { id: 3, title: "What Are Web Components?", content: "Web components let you create your own HTML elements, which can be reused across different parts of your website or even shared with others." },
  { id: 4, title: "Why You Should Learn TypeScript", content: "TypeScript is a version of JavaScript that includes types. It helps catch errors early and makes your code more reliable." }
];
function App() {
  const [search,setsearch]=useState('')
  const [filteredsearch,setfilteredsearch]=useState(articles);
  const hilightedtext=(text,search)=>{
    if(!search)return text;
    const regex=new RegExp(`(${search})`,'gi')
    return text.split(regex).map((part)=>{
    return  regex.test(part)?<mark>{part}</mark>:part
    })

  }
  const handlesearch=(e)=>{
    const value=e.target.value|| '';   
    setsearch(value)

    const filtered=articles.filter((filter)=>{
    return   filter.title.toLowerCase().includes(value.toLowerCase())|| filter.content.toLowerCase().includes(value.toLowerCase())
    })
    setfilteredsearch(filtered)
  }
  const clearSearch = () => {
    setsearch('');
    setfilteredsearch(articles);  
  };
  return (
    <div className="App">
      <h1>Search</h1>
      <div className="search-container">
      <input onChange={handlesearch} value={search} placeholder='Search...' type='text'/>
      <FontAwesomeIcon icon={faTrash} size='1px' onClick={()=>clearSearch()} size='xs' className='search-icon'/>     </div>
      
      {filteredsearch.length===0?(
         <div>No Search Found ...</div>  ):
        
        (  <div>
          {search &&    <h3>{filteredsearch.length} posts found</h3>}
       
  {filteredsearch.map((article) => (
          <div key={article.id}>
            <h2>{hilightedtext(article.title, search)}</h2>
            <p>{hilightedtext(article.content, search)}</p>
          </div>
        ))} 
        </div>
    )}
    </div>
  );
}

export default App;
