// src/pages/ArticlesPage.js
import React, { useState, useEffect } from 'react';
import LeftMenu from '../components/LeftMenu';
import ArticleBox from '../components/ArticleBox';
import './articlemodal.css'

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [articleHeadings, setArticleHeadings] = useState([]);
  const [id, setId] = useState(0);
  const [filteredArticle, setfilteredArticle] = useState();

  

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterA(articles)
  },[id])

  const filterA = (data) => {
    // console.log('articles : ',articles);
    const temp = data.find((article, index) => index === id);
    // console.log('temp: ',temp);
    setfilteredArticle(temp);
    // console.log('filtered article :',filteredArticle);
  }

  const localapi = 'http://localhost:3000/article';
  const remoteapi = 'https://geekspeaks.onrender.com/article';

  const fetchArticles = () => {
    // Fetch articles from the backend API
    // Replace 'YOUR_ARTICLES_API_ENDPOINT' with the actual endpoint
    fetch(remoteapi)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setArticles(data);
        filterA(data)
        extractArticleHeadings(data);
      })
      .catch(error => console.error('Error fetching articles:', error));
  };

  const extractArticleHeadings = (articles) => {
    const headings = articles.map(article => article.heading);
    setArticleHeadings(headings);

  };

  const [open,setopen] = useState(false);
  const [userData, setuserdata] = useState(null)

  useEffect(() => {
      const data = JSON.parse(localStorage.getItem('user'));
      setuserdata(data);
      // console.log('User data from local storage:', userData);
  },[open])

  const fun = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    setuserdata(data);
  }

  const handleclick = () => {
    if(open)
      setopen((open) => !open);
    else {
      fun()
      console.log(userData);
      if(userData!==null) setopen((open) => !open);
      else alert('Please login to post Articles.')
    }
  }


  const ArticleModal = ({userData}) => {
    const [topic, settopic] = useState('');
    const [content, setcontent] = useState('');
    const [language, setlanguage] = useState('None');
    const [code, setcode] = useState('Code not provided.')

    const formatDate = (date) => {
      // Define an array of month names
      const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];
    
      // Get day, month, and year from the date object
      const day = date.getDate();
      const monthIndex = date.getMonth(); // Month index (0-indexed)
      const year = date.getFullYear();
    
      // Get the month name from the array using the month index
      const monthName = months[monthIndex];
    
      // Return formatted date string
      return `${day} ${monthName} ${year}`;
    };


    const localapipost = 'http://localhost:3000/article/new';
    const remoteapipost = 'https://geekspeaks.onrender.com/article/new';
    

    const handlesubmit = async () => {
      // heading, text, code, language, uid, uname, date
      const temp = {
        heading: topic,
        text: content,
        code: code,
        language: language,
        uid: userData._id,
        uname: userData.name,
        date: formatDate(new Date())
      }
      // console.log(temp);
      try {
        const response = await fetch(remoteapipost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(temp)
        });
        if (!response.ok) {
          throw new Error('Failed to post');
        }
        const data = await response.json();
        console.log(data);
        alert('Article posted successfully.')
        // Close the modal after successful posting
        setopen(false)
      } catch (error) {
        console.error('Error posting article:', error.message);
        setopen(false)
      }
    }

    return (
        <div className="Amodal-background">
            <div className="modal">
                <h2>Post Article</h2>
                <form>
                <label htmlFor="topic">Topic</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => settopic(e.target.value)}
                    required
                />
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    rows={20}
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                    required
                />
                <label htmlFor="language">Language</label>
                <input
                    type="text"
                    id="language"
                    value={language}
                    onChange={(e) => setlanguage(e.target.value)}
                    required
                />
                <label htmlFor="code">Code</label>
                <textarea
                    id="code"
                    rows={20}
                    value={code}
                    onChange={(e) => setcode(e.target.value)}
                    required
                />

                <div className='buttonbox'>
                <button className='.buttonL' type='button' onClick={handleclick}>cancel</button>
                <button className="close-button" type='button' onClick={handlesubmit}>Post</button>
                </div>
                
                </form>
                
            </div>
        </div>
    )
  }

  return (
    <div className="articles-page">
      <LeftMenu articleHeadings={articleHeadings} id={id} setId={setId} />
      {filteredArticle && <ArticleBox article={filteredArticle} />}
      <button className='postarticle' onClick={handleclick}>Post Article</button>

      {open && <ArticleModal userData={userData} />}
    </div>
  );
};

export default ArticlesPage;
