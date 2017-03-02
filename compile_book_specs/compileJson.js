fs   = require('fs')
path = require('path')


const extractSpecs = (dir, path) => {
	info = JSON.parse(fs.readFileSync(path+'/bookInfo.json', 'utf8'));
	bubbles = JSON.parse(fs.readFileSync(path+'/bubbles.json', 'utf8'));
	return {[dir]: Object.assign({}, info, bubbles)}
}

const arrToObject = (arr) => {				
	return arr.reduce( (acc, cur, i) => (Object.assign({}, acc, cur)), {} )
}

const compileLanguage = (lang = 'en') => {
	const path = `./book_specs/${lang}/`
	return {[lang]: arrToObject( fs.readdirSync(path).map( d => extractSpecs(d, path+d)) )}
	
}

const en = compileLanguage('en')

const es = compileLanguage('es')
const done  = ({timeLastUpdated:Date.now(), specs: Object.assign({}, es, en)} )

fs.writeFileSync( './bookSpecs.json', JSON.stringify(done))
fs.writeFileSync( './fullBookList.json', JSON.stringify(Object.assign({}, es, en)))
