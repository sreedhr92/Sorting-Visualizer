import React from 'react';
import { useState } from 'react';
const SortingVisualizer = () => {
    const [arr, setArr] = useState([]);
    const [type, setType] = useState('');
    const [size,setSize] = useState('');
    return (<div>
        <center><h2 className="heading">Sorting Visualizer</h2></center>
      <div className="App">
          <label className="text">Size</label>
          <input className="range" type="range" min="10" max="100" step="10"></input>
          <button className="random"><strong>Randomise</strong></button>
          <button id="slow" className="button"> Bubble Sort</button>
          <button id="fast" className="button"> Heap Sort</button>
          <button id="slow" className="button"> Insertion Sort</button>
          <button id="fast" className="button"> Merge Sort</button>
          <button id="fast" className="button"> Quick Sort</button>
          <button id="bubble"className="sortbutton">Sort</button>
          <div className="Box">
          </div>
      </div>
      </div>  );
}

export default SortingVisualizer;