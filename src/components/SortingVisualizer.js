import React from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useState,useEffect } from 'react';
import {getMergeSortAnimations,getBubbleSortAnimation} from './SortingAlgorithms.js';


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#f5aa3b';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'RED';
const SORTED_COLOR = 'GREEN';

const SortingVisualizer = () => {
    const [arr, setArr] = useState([]);
    const [type, setType] = useState('');
    const [size,setSize] = useState(50);
    const [started,setStarted] = useState(false);
    const randomize = () =>{
        if (started === true)
        {
          toast.error("Sorting already in progress");
            return;
        }
        createArray();
    }
    const merge_sort = () =>{
      if(started===false)
      {
        setStarted(true);
      }
        const animations = getMergeSortAnimations(arr);
    for (let i = 0; i < animations.length; i++) {
      if(i===animations.length-1)
      {
        setTimeout(()=>{
            const arrayBars = document.getElementsByClassName('bar');
            for(let i=0;i<arrayBars.length;i++)
            {
              arrayBars[i].style.backgroundColor=SORTED_COLOR;
            }
            setStarted(false);
            setType('');
            toast.success('Successfully Sorted!');
          },i*ANIMATION_SPEED_MS)
      }
      const arrayBars = document.getElementsByClassName('bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    }
    const bubble_sort = () =>{
      if(started===false)
      {
        setStarted(true);
      }
        const animations = getBubbleSortAnimation(arr);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      if(i===animations.length-1)
        {
          setTimeout(()=>{
              const arrayBars = document.getElementsByClassName('bar');
              for(let i=0;i<arrayBars.length;i++)
              {
                arrayBars[i].style.backgroundColor=SORTED_COLOR;
              }
              toast.success('Successfully Sorted!');
              setStarted(false);
              setType('');
            },i*ANIMATION_SPEED_MS)
        }
      const isColorChange = i % 4 !== 2 && i % 4 !== 3;
      if(animations[i][0]==null)
        continue;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // setStarted(false);
    }
    const createArray = () =>{
        if(started===true)
        {
            toast.error("Sorting already in progress");
            return;
        }
        const arrayBars = document.getElementsByClassName('bar');
        for(let i=0;i<arrayBars.length;i++)
        {
          arrayBars[i].style.backgroundColor=PRIMARY_COLOR;
        }
        const Array=[]
        for(let i=0;i<size;i++){
            Array.push(random(50,450));
        }
        setArr(Array)
        // console.log(arr)
    }
    const sort=()=>{
        if(started === true)
        {
            toast.error("Sorting already in progress")
            return;
        }
        if(type === '')
        {
          toast.error("Select an Algorithm");
          createArray();
          return;
        }
        else
        {
            // console.log(type);
            // console.log(started);
              setTimeout(() => {
                if(type==="merge_sort")
                merge_sort();
              else if(type==="bubble_sort")
                  bubble_sort();
              else
              {
                      toast('Implementation in process try other algorithms',
                      {
                        icon: '👾',
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          backdropFilter : 'blur(10px)',
                          color: '#fff',
                        },
                        position: "top-center",
                      }
                    );
            }
              }, 10);

        }
    }
    const changeType = (e) =>{
        if(started === true)
        {
            toast.error("Sorting already in progress")
            return;
        }
        setType(e.target.value);
    }
    const changeSize = (e) =>{
        if(started===true)
        {
            toast.error("Sorting already in progress")
            return;
        }
        setSize(e.target.value);
        createArray();

    }
    useEffect(()=>{
        createArray();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[size])
    return (<div>
        <div><Toaster
        position="top-left"
        reverseOrder={false}
        toastOptions={{
            duration: 1500,
          }}
        /></div>
        <center><h2 className="heading">Sorting Visualizer</h2></center>
      <div className="App">
          <label className="text">Size</label>
          <input className="range" value={size} type="range" min="30" max="80" step="10" onChange={(e)=>{changeSize(e);setSize(e.target.value)}}></input>
          <button className="random" onClick={randomize}><strong>Randomise</strong></button>
          <button id="slow" className="button" value={"bubble_sort"} onClick={(e)=>{changeType(e)}}> Bubble Sort</button>
          <button id="fast" className="button" value={"heap_sort"} onClick={(e)=>{changeType(e)}}> Heap Sort</button>
          <button id="slow" className="button" value={"insertion_sort"} onClick={(e)=>{changeType(e)}}> Insertion Sort</button>
          <button id="fast" className="button" value={"merge_sort"} onClick={(e)=>{changeType(e)}}> Merge Sort</button>
          <button id="fast" className="button" value={"quick_sort"} onClick={(e)=>{changeType(e)}}> Quick Sort</button>
          <button id="sort"className="sortbutton" onClick={sort}>Sort</button>
          <div id ="box"className="Box">
          {
                  arr.map((value,index) => {
                  return(
                        <div className="bar" style={{height:value,backgroundColor:PRIMARY_COLOR}} key={index} >
                        </div>
                  )
            })}
          </div>
      </div>
      </div>  );
}
function random(min,max) {
    return Math.floor(Math.random()* (max-min+1)+min);
}
export default SortingVisualizer;