export function random(min,max) {
  return Math.floor(Math.random()* (max-min+1)+min);
}
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }

  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

export function getBubbleSortAnimation(array) {
  const animations = []
  let size = array.length;

  for(let i=0;i<size;i++)
  {
      let sorted = true;
      for(let j=0;j<size-i-1;j++)
      {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j+1]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j+1]);
          if(array[j]>array[j+1])
          {
            // Swapping the height of the original array
            animations.push([j, array[j+1]]);
            animations.push([j+1, array[j]]);
            let temp = array[j];
            array[j]=array[j+1];
            array[j+1]=temp;
            sorted = false;
          }
          else{
            animations.push([null,null]);
            animations.push([null,null]);
          }
      }
      if(sorted===true)
        break;
  }
  return animations;
}
export function getInsertionSortAnimation(array) {
  const animations = []
  let size = array.length;
  for(let i = 0;i<size;i++)
  {
     let key = array[i];
     let hasMoved = false;
     let notPlaced = true;
     for(let j=i-1;j>=0;j--)
     {
          // These are the values that we're comparing; we push them once
          // to change their color.
          animations.push([i, j]);

          // These are the values that we're comparing; we push them a second
          // time to revert their color.
          animations.push([i, j]);
          if(array[j]>key)
          {
              array[j+1]=array[j];
              // We overwrite the value at index j+1 in the original array with the
             // value at index j in the auxiliary array.
              animations.push([j+1, array[j]]);
              hasMoved = true;
          }
          else
          {
                array[j+1]=key;
                animations.push([j+1, key]);
                notPlaced = false;
                break;
          }
      }
      // edge case
      if(hasMoved===true && notPlaced===true)
      {
          animations.push([0, i]);
          animations.push([0, i]);
          animations.push([0, key]);
          array[0] = key;
      }
  }
  return animations;
}
export function getQuickSortAnimation(array) {
  const animations = []
  let size = array.length;
  quickSortHelper(array,0,size-1,animations)
  return animations;
}
function quickSortHelper(
      array,
      left,
      right,
      animations,
    ){
          if(left<right)
          {
              let pivot = partition(array,left,right,animations);
              quickSortHelper(array,left,pivot-1,animations);
              quickSortHelper(array,pivot+1,right,animations);
          }
}

function partition(
    array,
    left,
    right,
    animations,
    ){
          let pivot = array[right];
          let i = (left-1);
          for(let j=left;j<=right-1;j++)
          {
                if(array[j]<pivot)
                {
                    i++;
                    animations.push([j, right]);
                    animations.push([j, right]);
                    animations.push([i, array[j]]);
                    animations.push([j, array[i]]);
                    let temp = array[j];
                    array[j]=array[i];
                    array[i]=temp;
                }
                else
                {
                  animations.push([j, right]);
                  animations.push([j, right]);
                  animations.push([null,null]);
                  animations.push([null,null]);
                }
          }
          animations.push([i+1, right]);
          animations.push([i+1, right]);
          animations.push([i+1, array[right]]);
          animations.push([right, array[i+1]]);
          let temp = array[i+1];
          array[i+1]=array[right];
          array[right]=temp;
          return (i+1);
    }