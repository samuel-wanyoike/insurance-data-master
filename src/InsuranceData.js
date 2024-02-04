
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const _ = require('lodash');



const readFileContentsLineByLine = (fileName, cb) => {
 

  
  let fileContents = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });

  rl.on('line',(line) => {
    fileContents.push(line)
    
  })

  rl.on('close', () => {
    cb(null, fileContents)
  })

}


const filterFemaleCandidates = (fileContents, cb) => {
  const filteredData = fileContents.filter((line) => {
    const [, gender, , , , region] = line.split(',');
    return gender.trim().toLowerCase() === 'female' && region.trim().toLowerCase() === 'southwest';
  });

  cb(null, filteredData);


  
}


const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
 
  
  fs.writeFile(outputFileName, filteredData.join('\n'), 'utf-8', (err) => {
    if(err) {
      cb(err, null)
    }
    else {
      cb(null, `Successfully wrote filtered data to ${outputFileName} file..!`);
    }
  })
  
}



const readFileContentsUsingStream = (fileName, cb) => {
  let fileContents = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });

  rl.on('line',(line) => {
    fileContents.push(line)
    
  })

  rl.on('close', () => {
    cb(null, fileContents.slice(1))
  })

}

const filterDataWithNoChildren = (fileContents, cb) => {
  let filteredData = _.filter(fileContents, (line) => {
    const [, , , children] = line.split(',');
    return parseInt(children) === 0;

  });

  cb(null, filteredData)
}




module.exports = {
  readFileContentsLineByLine,
  filterFemaleCandidates,
  readFileContentsUsingStream,
 }
