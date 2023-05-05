function findDuplicates(arr) {
  const counts = {};
  const duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    counts[num] = (counts[num] || 0) + 1;
  }

  for (const num in counts) {
    if (counts[num] > 1) {
      duplicates.push(Number(num));
    }
  }

  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 4, 5]));
console.log(findDuplicates([1, 2, 3, 3, 4, 5]));
console.log(findDuplicates([1, 1, 2, 3, 3, 4, 5]));
console.log(findDuplicates([1, 1, 1, 2, 3, 3, 3, 4, 5, 5]));
