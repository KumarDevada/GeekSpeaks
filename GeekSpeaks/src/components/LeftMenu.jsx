// LeftMenu.jsx
import React from 'react';

const LeftMenu = ({ articleHeadings , id, setId}) => {
  return (
    <div className="left-menu">
      <h2>List of Topics</h2>
      <ul>
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='item selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {/* {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))}
        {articleHeadings.map((heading, index) => (
            (index === id) ? 
                (<li key={index} ><button className='selected' onClick={() => setId(index)}>{heading}</button></li>) 
                : 
                (<li key={index}><button className='item' onClick={() => setId(index)}>{heading}</button></li>)
        ))} */}
      </ul>
    </div>
  );
};

export default LeftMenu;
