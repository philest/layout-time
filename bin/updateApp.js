const exec = require('child_process').execSync;

const spex = `${__dirname}/../compile_book_specs/outputs/fullBookList.json`
const curriculum = `${__dirname}/../compile_book_specs/outputs/curriculum.json`
const destination = `${__dirname}/../../stapp/app/data/user/books/data/`

// clear the fukin DS_Stores
const cmd1 =  `cp ${spex} ${destination}`;
const cmd2 =  `cp ${curriculum} ${destination}`;


try {
  exec(cmd1);
} catch (err) {
  console.log('specs cpy failed :(')
}

try {
  exec(cmd2);
} catch (err) {
  console.log('curriculum cpy failed :(')
}

