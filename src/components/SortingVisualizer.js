import React from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useState,useEffect } from 'react';
import {random,getMergeSortAnimations,getBubbleSortAnimation,getInsertionSortAnimation,getQuickSortAnimation,getHeapSortAnimation} from './SortingAlgorithms.js';


// speed of the animations.
const ANIMATION_SPEED_MS = 10;

// main color of the array bars.
const PRIMARY_COLOR = '#f5aa3b';

// color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'rgb(177, 0, 0)';

// color of array bars after the array being sorted
const SORTED_COLOR = 'GREEN';

const SortingVisualizer = () => {
    const [arr, setArr] = useState([]);
    const [type, setType] = useState('');
    const [size,setSize] = useState(50);
    const [started,setStarted] = useState(false);



    const checkStarted =() =>{
      if (started === true)
      {
        toast('Sorting in process',
        {
          icon: '⏳',
          style: {
            borderRadius: '10px',
            background: '#333',
            backdropFilter : 'blur(10px)',
            color: '#fff',
          }
        }
      );
          return true;
      }
      return false;
    }

    const displaySuccess = ()=>{
      const arrayBars = document.getElementsByClassName('bar');
      for(let i=0;i<arrayBars.length;i++)
      {
        arrayBars[i].style.backgroundColor=SORTED_COLOR;
        arrayBars[i].style.boxShadow = "0 3px 10px -2px green";
      }
      const box = document.getElementById('box');
      box.style.boxShadow = "0 3px 30px -2px green";
      toast('Successfully Sorted',
        {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: '#333',
            backdropFilter : 'blur(10px)',
            color: '#fff',
          }
        }
      );
    }
    const randomize = () =>{
        if(checkStarted())return;
        setStarted(false);
        setType('');
        createArray();
    }

    const ovrewriteAnimations = (animations) =>{

      for (let i = 0; i < animations.length; i++) {
        if(i===animations.length-1)
        {
            setTimeout(()=>{
              setStarted(false);
               //  Removing this we can make sort the sorted array again to visualize the best case scenario
              setType('');
              displaySuccess();
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
            barOneStyle.boxShadow  = "0 3px 30px -2px "+color;
            barTwoStyle.backgroundColor = color;
            barTwoStyle.boxShadow  = "0 3px 30px -2px "+color;
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

    const swappingAnimations = (animations) =>{
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('bar');
        if(i===animations.length-1)
          {
            setTimeout(()=>{
                displaySuccess();
                setStarted(false);
                //  Removing this we can make sort the sorted array again to visualize the best case scenario
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
            barOneStyle.boxShadow  = "0 3px 30px -2px "+color;
            barTwoStyle.backgroundColor = color;
            barTwoStyle.boxShadow  = "0 3px 30px -2px "+color;
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
    const merge_sort = () =>{
      if(started===false)
        setStarted(true);
      const animations = getMergeSortAnimations(arr);
      ovrewriteAnimations(animations);

    }
    const bubble_sort = () =>{
      if(started===false)
          setStarted(true);
      const animations = getBubbleSortAnimation(arr);
      swappingAnimations(animations);
    }
    const quick_sort = () =>{
      if(started===false)
        setStarted(true);
      const animations = getQuickSortAnimation(arr);
      swappingAnimations(animations);

    }
    const insertion_sort = () =>{
      if(started===false)
        setStarted(true);
      const animations = getInsertionSortAnimation(arr);
      ovrewriteAnimations(animations);

    }
    const heap_sort = ()=>{
      if(started===false)
        setStarted(true);
      const animations = getHeapSortAnimation(arr);
      swappingAnimations(animations);
    }
    const createArray = () =>{
        if(checkStarted())return;
        const arrayBars = document.getElementsByClassName('bar');
        for(let i=0;i<arrayBars.length;i++)
        {
          arrayBars[i].style.backgroundColor=PRIMARY_COLOR;
          arrayBars[i].style.boxShadow = "0 3px 30px -2px rgb(216, 170, 72)";
        }
        const box = document.getElementById('box');
        box.style.boxShadow = "0 3px 30px -2px rgb(250, 250, 250)";
        const Array=[]
        for(let i=0;i<size;i++){
            Array.push(random(50,450));
        }
        setArr(Array)
        // console.log(arr)
    }

    const sort=()=>{
        if(checkStarted())return;
        if(type === '')
        {
          toast('Select an Algorithm',
          {
            icon: '❌',
            style: {
              borderRadius: '10px',
              background: '#333',
              backdropFilter : 'blur(10px)',
              color: '#fff',
            }
          });
          createArray();
          return;
        }
        else
        {
              setTimeout(() => {
              if(type==="merge_sort")
                  merge_sort();
              else if(type==="bubble_sort")
                    bubble_sort();
              else if(type==="insertion_sort")
                    insertion_sort();
              else if(type==="quick_sort")
                    quick_sort();
              else
                    heap_sort();
              }, 10);
        }
    }
    const changeType = (e) =>{
        if(checkStarted())return;
        setType(e.target.value);
    }
    const changeSize = (e) =>{

        if(checkStarted())return;
        setSize(e.target.value);
        createArray();
    }
    useEffect(()=>{
        createArray();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[size])

    return (
        <div>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div>
              <Toaster
            position="top-left"
            reverseOrder={false}
            toastOptions={{
                duration: 1500,
              }}
             />
          </div>
          <div className="title">
            <center><h2 className="heading">Sorting Visualizer</h2></center>
          </div>
          <div className="App">
              <label className="text">Size</label>
              <input className="range" value={size} type="range" min="30" max="80" step="10" onChange={(e)=>{changeSize(e)}}></input>
              <button className="random" onClick={randomize}><strong>Randomise</strong></button>
              <button id="slow" className="button" value={"bubble_sort"} onClick={(e)=>{changeType(e)}}> Bubble Sort</button>
              <button id="fast" className="button" value={"heap_sort"} onClick={(e)=>{changeType(e)}}> Heap Sort</button>
              <button id="slow" className="button" value={"insertion_sort"} onClick={(e)=>{changeType(e)}}> Insertion Sort</button>
              <button id="fast" className="button" value={"merge_sort"} onClick={(e)=>{changeType(e)}}> Merge Sort</button>
              <button id="fast" className="button" value={"quick_sort"} onClick={(e)=>{changeType(e)}}> Quick Sort</button>
              <button id="sort"className="sortbutton" onClick={sort}>Sort</button>
              <div id ="box"className="Box">{arr.map((value,index) => {return(<div className="bar" style={{height:value}} key={index}></div>)})}</div>
          </div>
          <p style={{color:"rgb(143, 138, 138)",paddingLeft:"1150px",paddingRight:"10px"}}>Made with 💜 by Sreedhar
              <a href="https://github.com/sreedhr92/Sorting-Visualizer" class="fa fa-github"> </a>
          </p>
      </div>  );
}

export default SortingVisualizer;