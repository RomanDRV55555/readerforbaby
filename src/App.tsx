import React, { useState } from 'react';
import './App.css';
import getSeparatedString from './components/getSeparatedString';

function App() {

  const [stringForSeparate, setStringForSeparate] = useState('');

  function GetArrWords(strForProcessing = '') {

    const newArrWords = [''];
    strForProcessing.split(' ').forEach(
      (el) => {
        getSeparatedString(el).split('-').forEach((els,j,curArr) => {
          newArrWords.push(els);
          if (j < (curArr.length -1)){
            newArrWords.push('-')
          }
        })
        newArrWords.push('  ');
      });
      

    // console.log(
    //   newArrWords.map(el => el.split('-')).flat().forEach((el, i) => {
    //     el = `<mark key={i}> {el} </mark>`
    //   })
    // );

    return (<p> 
      {newArrWords.map((element, i) => { return <b key={i} > {element} </b> })}
    </p>);

  };




  // <tbody>
  //                         {arrForDisp.map((element, i) => { return <Contact key={i} contact={element}> </Contact> })}
  //                     </tbody>

  //     return (
  //       <div>
  //         {
  //           `<p> ${strForProcessing.split(' ').forEach(
  //             (el) => {
  //               el = getSeparatedString(el);

  //             }
  //           )}
  //         </p>`}

  //       </div>
  //     );



  return (
    <div className="App">
      <div>
        <label>INPUT</label>
        <textarea onChange={event => {
          setStringForSeparate(event.target.value)
        }
        }></textarea>
      </div>

      <div style={{ display: "flex" }}>
        <label style={{ fontSize: "65px" }} >
          {
            GetArrWords(stringForSeparate)
          }
        </label>
      </div>
    </div>
  );
}

export default App;
