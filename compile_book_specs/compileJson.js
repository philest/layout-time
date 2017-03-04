let fs   = require('fs')
let exec = require('child_process').execSync;

// clear the fukin DS_Stores
var cmd = 'rm .DS_Store  book_specs/.DS_Store book_specs/en/.DS_Store  book_specs/es/.DS_Store';

try {
  exec(cmd);
} catch (err) {
}

const extractSpecs = (booktitle, dir) => {
  const info = JSON.parse(fs.readFileSync(`${dir}/bookInfo.json`, 'utf8'));
  const bubbles = JSON.parse(fs.readFileSync(`${dir}/bubbles.json`, 'utf8'));
  return { [booktitle]: Object.assign({}, info, bubbles) }
}

const arrToObject = (arr) => {
  return arr.reduce( (acc, cur, i) => (Object.assign({}, acc, cur)), {} )
}

const compileLanguage = (lang = 'en') => {
  const dir =  `${__dirname}/book_specs/${lang}`
  return { [lang]: arrToObject(fs.readdirSync(dir).map(
    b => extractSpecs(b, `${dir}/${b}`)
  ))}
}

const en = compileLanguage('en')

const es = compileLanguage('es')
const done  = ({ timeLastUpdated: Date.now(), specs: Object.assign({}, es, en) })

try {
  fs.mkdirSync(`${__dirname}//outputs`)
} catch (err) {
  console.log('outputs folder already exists. All good!')
}

const curriculum = require("./curriculum")

// outputs for out own records
fs.writeFileSync(`${__dirname}/outputs/bookSpecs.json`, JSON.stringify(done))
fs.writeFileSync(`${__dirname}/outputs/fullBookList.json`, JSON.stringify(Object.assign({}, es, en)))
fs.writeFileSync(`${__dirname}/outputs/curriculum.json`, JSON.stringify(curriculum))

// update live version
fs.writeFileSync(`${__dirname}/../app/data/user/books/data/fullBookList.json`, JSON.stringify(Object.assign({}, es, en)))
fs.writeFileSync(`${__dirname}/../app/data/user/books/data/curriculum.json`, JSON.stringify(curriculum))

