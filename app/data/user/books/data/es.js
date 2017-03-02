// á, é, í, ó, ú, ü, ñ, ¿, ¡
export default bookList =  [
  {
    title: "Mi Cohete Mágico",
    awsKey: 'rocket',
    description: "Mom gets to come along on a space adventure",
    offset:0,
    numPages:5,
    timeRevealedAt: Date.now(),
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:200, y:177},
    bubbles: {
      2: [
        { x: 0.57, y:0.65, ang:'15deg', textArray: [
          "¿Qué tiene en el bolsillo?",
          "¿Por qué le gusta?",
          "¿Qué tiene en las paredes?",
        ]},
      ],
      3: [
        { x: 0.44, y:0.24, ang:'-20deg', textArray: [
          "¿Qué hace ella?",
          "¿Cómo llego allí?",
          "¿Donde quieres que se valla el cohete mágico?",
        ]}
      ],
      4: [
        { x: 0.40, y:0.5, ang:'-5deg', textArray: [
          "¿Qué hace mamá?",
          "¿Qué hace la niña?",
        ]}
      ],
      5: [
        { x: 0.39, y:0.75, ang:'10deg', textArray: [
          "¿Qué hacen los extraterrestres?",
          "¿Por qué la niña construyó el asiento extra?",
          "¿Cómo se siente mamá?",
        ]},
      ],
    },
  },
  {
    title: 'La Semilla',
    awsKey: 'seed',
    description: "A story about my magic seed!",
    offset:0,
    numPages:10,
    timeRevealedAt: Date.now(),
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:300, y:332},
    bubbles: {
      2: [
        { x: 0.6, y:0.75, ang:'20deg', textArray: [
          // "What did she find?",
          // "Where did she find it?",
          // "What polka dots did it have?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Qué encontró la niña?",
        ]},
      ],
      3: [
        { x: 0.42, y:0.71, ang:'-20deg', textArray: [
          // "What did the seed want?",
          // "What going on here?",
          // "What's that in the background?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Qué quiere la semilla?",
        ]}
      ],
      4: [
        { x: 0.05, y:0.34, ang:'-20deg', textArray: [
          // "What's she doing here?",
          // "Why did she plant the seed?"
          // "¿Por qué",
          "¿Por qué ella sembró la semilla?",
        ]
      }],
      5: [
        { x: 0.66, y:0.56, ang:'10deg', textArray: [
          // "Where is the seed?",
          // "Why does the seed look happy?",
          // "What do you think happens next?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Donde está la semilla?",
        ]},
      ],
      6: [
        { x: 0.2, y:0.62, ang:'20deg', textArray: [
          // "What happened to the seed?",
          // "What do you think those green things are?"
          // "¿Por qué",
          "¿Qué son esas cosas verdas?",
        ]},
      ],
      7: [
        { x: 0.6, y:0.25, ang:'20deg', textArray:  [
          // "What's that there?",
          // "What are the tree's pink leaves?",
          // "Would you want a cotton candy tree?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Te gustaría tener un árbol de algodón azucarado?",
        ]},
      ],
      8: [
        { x: 0.13, y:0.52, ang:'12deg', textArray: [
          // "Why did the birds come?",
          // "What's that bird doing?",
          // "Do the birds like the jelly beans?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Por qué vinieron las aves?",
        ]},
      ],
      9: [
        { x: 0.28, y:0.28, ang:'-5deg', textArray: [
          // "What did the tree do?",
          // "How is she feeling here?",
          // "How does the tree feel?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Cómo se siente el árbol?",
        ]},
      ],
    },
  },
  {
    title: "El Pajarito",
    awsKey: 'bird',
    description: "Un cuento del miedo de volar",
    offset:1,
    numPages: 9,
    timeRevealedAt: Date.now(),
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:124, y:129},
    bubbles: {
      2: [
        { x: 0.35, y:0.34, ang:'20deg', textArray: [
          "¿Cómo se siente el pájaro pequeño?",
          "¿Por qué se siente así?"
        ]},
      ],
      3: [
        { x: 0.53, y:0.24, ang:'-20deg', textArray: [
          "¿Quién está volando?",
          "¿Qué hace el pajarito?",
          "¿Por qué se siente triste?",
        ]}
      ],
      4: [
        { x: 0.45, y:0.26, ang:'10deg', textArray: [
          "¿Quién vino?",
          "¿La mamá qué quiere que haga el pajarito?"
        ]}
      ],
      5: [
        { x: 0.4, y:0.42, ang:'5deg', textArray: [
          "¿Qué pasa aquí?",
          "¿La mamá tiene confianza en el pajarito?"
        ]},
      ],
      6: [
        { x: 0.42, y:0.66, ang:'10deg', textArray:[
          "¿Por qué tiene confianza el pajarito?",
          "¿Donde se está parado?",
          "¿Qué tú piensas sucederá?"
        ]},
      ],
      7: [
        { x: 0.67, y:0.055, ang:'15deg', textArray:[
          "¿Ahora cómo se siente el pajarito?",
          "¿Qué crees va pasar al pajarito?",
          "¿Cómo crees que se siente la mamá?"
        ]},
      ],
    },
  },
  {
    title: 'Cena en el Zoológico',
    awsKey: 'cook',
    description: 'A story about animals that like to cook stuff',
    offset: 1,
    numPages: 11,
    timeRevealedAt: Date.now(),
    timeFirstRead: Date.now(),
    timeLastOpened: 0,
    coverDims: {x:266, y:309},
    bubbles: {
      2: [
        { x: 0.82, y:0.52,  ang:'20deg', textArray: [
          // "Who is he talking to?",
          // "What's he wearing?",
          // "What's that in the background?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Con quién habla?",
        ]},
      ],
      3: [
        { x: 0.5, y:0.28, ang:'-20deg', textArray: [
          // "What animal is that?",
          // "What's going on here?",
          // "What's that boy doing?"
          // "¿Por qué",
          // "¿Por qué",
          "¿Cual animal es ese?",
        ]}
      ],
      4: [
        { x: 0.02, y:0.39, ang:'20deg', textArray: [
          // "Who's that there?",
          // "What's that other elephant doing?",
          // "Why can't she cook?"
          // "¿Por qué",
          "¿Qué hacen los elefantes?",
          // "¿Por qué no puede cocinar?",
        ]}
      ],
      5: [
        { x: 0.37, y:0.33,  ang:'-25deg', textArray: [
          // "Who's that with the boy?",
          // "What does he want?",
          // "What does the boy think?",
          // "¿Por qué",
          // "¿Por qué",
          "¿Quién está con el niño?",
        ]}
      ],
      6: [
        { x: 0.76, y:0.24, ang:'20deg', textArray: [
          // "What animal is that?",
          // "What's he eating?",
          // "Who's that in the basket?",
          "¿Cual es ese animal?",
          "¿Qué se están comiendo",
          "¿Quién está en la canasta?",
        ]},
      ],
      7: [
        { x: 0.42, y:0.55, ang:'-25deg', textArray: [
          // "What is that boy feeling?",
          // "What's he hiding behind?",
          // "Why are they in the store?",
          // "¿Por qué",
          // "¿Por qué",
          "¿Dónde se esconde el niño?",
        ]},
      ],
      8: [
        { x: 0.15, y:0.43, ang:'-25deg', textArray: [
          // "Who are they?",
          // "What are they doing?",
          // "¿Por qué",
          "¿Quienes son ellos?",
        ]},
      ],
      9: [
        { x: 0.82, y:0.23, ang:'-25deg', textArray: [
          // "What are the kids doing?",
          // "Why did they let dog eat?",
          // "¿Por qué",
          "¿Qué quiere el perro?",
        ]},
      ],
    },
  },
  {
    title: "La Nave Espacial",
    awsKey: 'sam',
    description: "Sam adventures through space",
    offset:0,
    numPages:7,
    timeRevealedAt: Date.now(),
    timeFirstRead: 0,
    timeLastOpened: 0,
    bubbles: {
      2: [
        { x: 0.05, y:0.4, ang:'20deg', textArray: [
          "¿Dónde está Sam?",
          "¿Cómo juega Sam?",
        ]},
      ],
      3: [
        { x: 0.01, y:0.2,  ang:'-20deg', textArray: [
          "¿Qué tiene Sam?",
          "¿Quién está en el baño con Sam?",
        ]}
      ],
      4: [
        { x: 0.6, y:0.3, ang:'20deg', textArray: [
          "¿Cómo se siente Sam?",
          "¿Cómo sabes que Sam se siente así?",
        ]}
      ],
      5: [
        { x: 0.65, y:0.6,  ang:'-25deg', textArray: [
          "¿Cómo se siente Sam ahora?",
          "¿Qué hace mamá?",
          "¿Qué tú piensas sucederá?"
        ]},
      ],
      6: [
        { x: 0.08, y:0.3, ang:'20deg', textArray: [
          "¿Qué tiene mamá en la mano?",
          "¿Qué hace Sam?",
        ]},
      ],
      7: [
        { x: 0.65, y:0.35, ang:'-25deg', textArray: [
          "¿Cómo se siente Sam ahora?",
          "¿Por qué se siente así?",
        ]},
      ],
    },
    coverDims: {x:624, y:631},
  },
  {
    title: "The Ants!",
    awsKey: 'ants',
    description: "It's all about ants.",
    offset:0,
    numPages: 9,
    timeRevealedAt: 0,
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:333, y:495},
  },
  {
    title:'My Chores!',
    awsKey:'chores',
    description: "A story about helping",
    offset:0,
    numPages: 6,
    timeRevealedAt: 0,
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:348, y:495},
  },
  {
    title: "Dream",
    awsKey: "dream",
    description: "A story about where you'll go after you fall asleep",
    offset:0,
    numPages: 8,
    timeRevealedAt: 0,
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:333, y:495},
  },
  {
    title: 'Kitty',
    awsKey:'scratch',
    description: "A story about our cat",
    offset: 0,
    numPages:6,      awsKey:'scratch',
    description: "A story about our cat",
    offset: 0,
    numPages:6,
    timeRevealedAt: 0,
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:333, y:495},
  },
  {
    title: "Eli's Pets",
    awsKey: 'whale',
    description: "A story about kitchen swimming",
    offset:1,
    numPages:10,
    timeRevealedAt: 0,
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:333, y:495},
  },
  {
    title: "Rosie's Find",
    awsKey: 'coon',
    description: "A story about a racoon finding her family",
    offset:1,
    numPages: 10,
    timeRevealedAt: 0,
    timeFirstRead: 0,
    timeLastOpened: 0,
    coverDims: {x:333, y:495},
  },
]
