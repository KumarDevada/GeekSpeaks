// src/pages/QuestionsPage.js
import React, { useState, useEffect } from 'react';
import './questionspage.css'
import QuestionBox from '../components/QuestionBox';


const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userData, setuserdata] = useState(null);
  // const [sopen, setSopne] = useState(false);

  // const closeS = () => {
  //   setSopne((sopen) => !sopen)
  // }

  useEffect(() => {
    fetchQuestions();
    const temp = JSON.parse(localStorage.getItem('user'))
    if(temp) setuserdata(temp);
  }, []);

  const localapiget = 'http://localhost:3000/question';
  const remoteapiget = 'https://geekspeaks.onrender.com/question';

  const fetchQuestions = () => {
    fetch(remoteapiget)
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };


  const [open,setopen] = useState(false);

  const handleclick =  () => {
    setopen((open) => !open)
  }



  const QuestionModal = () => {
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
    
    const localapi = 'http://localhost:3000/question/new';
    const remoteapi = 'https://geekspeaks.onrender.com/question/new';

    const handlesubmit = async () => {
      // heading, text, code, language, uid, uname, date
      const temp = {
        text: content,
        code: code,
        language: language,
        date: formatDate(new Date())
      }
      // console.log(temp);
      try {
        const response = await fetch(remoteapi, {
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
        alert('Question posted successfully.')
        // Close the modal after successful posting
        fetchQuestions();
        handleclick();
      } catch (error) {
        console.error('Error posting Question:', error.message);
        handleclick();
      }
    }


    return (
      <div className="modal-background">
          <div className="modal">
              <h2>Post Question</h2>
              <form>
              
              <label htmlFor="content">Question</label>
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
    <div className="questions-page"> {/* Add a class for styling */}
      {open && <QuestionModal />}
      
      <h2>Recently posted Questions</h2>
      <button className='pqbtn' onClick={handleclick}>post question</button>
      <div className="questions-container"> {/* Container for questions */}
        {questions.map((question,index) => (
          <div className='qb'>
          <h1>{index+1}</h1>
          <QuestionBox question={question} userData={userData} />
          </div>
          
          
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
