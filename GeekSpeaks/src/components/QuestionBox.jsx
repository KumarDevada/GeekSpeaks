import { WidthFull } from '@mui/icons-material';
import React, { useState } from 'react'

const QuestionBox = ({question,userData}) => {
    const [sopen, setSopen] = useState(false);

  const closeS = () => {
    setSopen((sopen) => !sopen)
  }

    // Solution model
  const SolutionModal = ({userData, question}) => {
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
    
    const localapi = `http://localhost:3000/solution/${question._id}`;
    const remoteapi = `https://geekspeaks.onrender.com/solution/${question._id}`;

    const handlesubmit = async () => {
      // heading, text, code, language, uid, uname, date
      const temp = {
        text: content,
        code: code,
        language: language,
        uname: userData.name,
        uid: userData._id,
        date: formatDate(new Date())
      }
      console.log(temp);
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
        alert('Solution posted successfully.')
        // Close the modal after successful posting
        closeS()
      } catch (error) {
        console.error('Error posting Question:', error.message);
        closeS()
      }
    }


    return (
      <div className="modal-background">
          <div className="modal" style={{width:'600px'}}>
              <h2>Post Solution</h2>
              <form>
              
              <label htmlFor="content">Solution</label>
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
              <button className='.buttonL' type='button' onClick={closeS}>cancel</button>
              <button className="close-button" type='button' onClick={handlesubmit}>Post solution</button>
              </div>
              
              </form>
              
          </div>
      </div>
    )
  }

  const handleSolution = ()  => {
    if(!userData) {
        alert('Please login to post solutions.')
    }
    else {
        setSopen((sopen) => !sopen)
        
    }
  }


  return (
    <div key={question._id} className="question-card"> {/* Styling for individual question */}
            {sopen && <SolutionModal userData={userData} question={question} />}
            <p  className='text'>{question.text}</p>
            <p className='date'>posted on {question.date}</p>
            <span>{question.language}</span>
            <pre className='code'>{question.code}</pre>
            
            <br />
            <div className="solutions-container"> {/* Container for solutions */}
              <h2>Solutions</h2>
              <button className='btn' onClick={handleSolution}>post solution</button>
              <br />
              <br />
              {question.solutions.map(solution => (
                <div key={solution._id} className="solution-card"> {/* Styling for individual solution */}
                  <p className='text'>{solution.text}</p>
                  <p className='date'>posted by {solution.uname} on {solution.date}</p>
                  <span>{solution.language}</span>
                  <pre className='code'>{solution.code}</pre><br />
                  
                </div>
              ))}
            </div>
          </div>
  )
}

export default QuestionBox