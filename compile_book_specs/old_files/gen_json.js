fs   = require('fs')
path = require('path')

const old_en_ = require('./en_original')
const old_es_ = require('./es_original')

const keyName = (obj) => {
    return Object.keys(obj)[0]
}

const rmdirR = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        rmdirR(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


const es_ = old_es_.map((old_es)=>({
	  title: old_es.title,
      awsKey: old_es.awsKey,
      description: old_es.description,
      offset: old_es.offset,
      numPages: old_es.numPages,
      coverDims: old_es.coverDims,
      bubbles: old_es.bubbles
}))

const en_ = old_en_.map((old_en)=>({
	  title: old_en.title,
      awsKey: old_en.awsKey,
      description: old_en.description,
      offset: old_en.offset,
      numPages: old_en.numPages,
      coverDims: old_en.coverDims,
      bubbles: old_en.bubbles
}))

// convert array into object indexed by awsKey
const es = Object.assign(...es_.map(d=>({[d.awsKey]:d})))
const en = Object.assign(...en_.map(d=>({[d.awsKey]:d})))



const makeDir = (fname, err) => {
    try {   
        fs.mkdirSync(fname)
    } catch (err) {
        console.log(`somefin went wrong ${err}...`)
    }
}




fs.writeFileSync( './fullBookList.json', JSON.stringify({es:es, en:en}, null, 2))

[{en:en}, {es:es}].map((lang)=>{
    const langNom = keyName(lang) 
    
    // delete old gen'd stuff
    try { 
        rmdirR(`./${langNom}`) 
    } catch (err) {
        console.log("don't worry, we'll try making a new dir called " + langNom)
    }

    makeDir(langNom, `making lang folder ${langNom}`)

    lang[langNom].map((s)=>{



        const bookDir = path.join('./', langNom, s.awsKey)
        makeDir(bookDir, `making bookdir for ${s.awsKey}`)
        
        // write the basic specs
        const bookInfoPath = path.join(bookDir,'bookInfo.json')
        const specs =  Object.assign( {}, {
            title: s.title,
            awsKey: s.awsKey,
            description: s.description,
            offset: s.offset,
            numPages: s.numPages,
            coverDims: s.coverDims })
        fs.writeFileSync( bookInfoPath, JSON.stringify(specs, null, 2 ) )

        // write the bubbles
        const bubblesPath = path.join(bookDir,'bubbles.json')
        let bubbles = {}
        if (s.bubbles) {
            bubbles = Object.assign( {}, {
                bubbles: s.bubbles
            })
        } else {
            for (let i = s.offset; i < s.numPages; i++) {
                bubbles[i] = [{
                    x: 0.5, y:0.5, ang: (i%2?'-15deg':'15deg'), 
                    textArray: [`TEXT FOR BUBBLE #1 ON PAGE ${i}`]
                }]
            }
        }
        fs.writeFileSync( bubblesPath, JSON.stringify(bubbles, null, 2 ) )  
    })
})
