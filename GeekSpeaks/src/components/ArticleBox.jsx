// ArticleBox.js
import React, { useEffect } from 'react';

const ArticleBox = ({ article}) => {

  return (
    <div className="article-box">
      
        
            <h1>{article.heading}</h1>
            <p>posted by &#128100;{article.uname} on {article.date}.</p>
            <pre className='text'>{article.text}</pre>
            <span>{article.language}</span>
            <pre className='code'>{article.code}</pre>
        
      
    </div>
  );
};

export default ArticleBox;
