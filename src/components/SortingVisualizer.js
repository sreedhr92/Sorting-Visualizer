import React from 'react';
import { useState,useEffect } from 'react';
const SortingVisualizer = () => {
    const [arr, setArr] = useState([143, 362, 380, 396, 81, 100, 281, 70, 107, 213, 136, 306, 160, 383, 238, 370, 366, 174, 89, 241, 390, 441, 419, 286, 377, 331, 264, 51, 111, 156, 248, 357, 354, 237, 132, 321, 412, 60, 425, 440, 150, 235, 298, 133, 88, 273, 392, 295, 341, 370]);
    const [type, setType] = useState('merge_sort');
    const [size,setSize] = useState(50);
    const [started,setStarted] = useState(false);
    const randomize = () =>{
        if (started === true)
        {
            alert("Sorting already on process");
            return;
        }
        createArray();
    }
    const merge_sort = () =>{
        

    }
    const bubble_sort = () =>{
            for(let i=0;i<size;i++)
            {
                for(let j=0;j<size-i;j++)
                {
                    if(arr[j]>arr[j+1])
                    {
                        let temp = arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=temp;
                    }
                }

            }
            // setInterval(() => {
            //     document.getElementById("box").style.boxShadow="0 3px 20px -2px rgb(39, 126, 61)";
            //     document.getElementById("box").style.boxShadow=" 0 3px 30px -2px rgb(250, 250, 250)";
            // }, 20);
    }
    const createArray = () =>{
        const Array=[]
        for(let i=0;i<size;i++){
            Array.push(random(50,450));
        }
        setArr(Array)
        // console.log(arr)
    }
    const sort=()=>{
        if(started === true)
            return;
        console.log(type);
        setStarted(true);
        if(type==="merge_sort")
            merge_sort();
        else if(type==="bubble_sort")
            bubble_sort();
        setStarted(false);
    }
    const changeType = (e) =>{
        if(started === true)
            return;
        setType(e.target.value);
    }
    const changeSize = (e) =>{
        if(started===true)
        {
            alert("Sorting already on process");
            return;
        }
        setSize(e.target.value);
        createArray();

    }
    useEffect(()=>{
    },[size],[arr])
    return (<div>
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
                        <div className="bar" style={{height:value}} key={index} >
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