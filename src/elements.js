// const img_volusen = require('img/ipad_ge_volusen_e8_interface_by_flavioespinoza-d55hng3.png')
// const img_volusen = require('img/ipad_ge_volusen_e8_interface_by_flavioespinoza-d55hng3.png')

const _ = require('lodash')
const log = require('ololog').configure({
  locate: false
})

let images_arr = [
  {
    id: 'medical_records',
    'title': 'iPad Medical Records App',
    'images': [
      'https://i.imgur.com/DLq0pgU.png',
      'https://i.imgur.com/Lq9PDrP.png',
      'https://i.imgur.com/voM8mAl.png',
      'https://i.imgur.com/BCOIphj.png',
      'https://i.imgur.com/dmqdISv.png',
      'https://i.imgur.com/kSSQ3ts.png',
      'https://i.imgur.com/o0LvGTz.png'
    ]
  },
  {
    id: 'street_fighter',
    'title': 'Street Fighter Crypto Trader',
    'images': [
      'https://i.imgur.com/8QVXafS.png',
      'https://i.imgur.com/GmGotAL.png',
      'https://i.imgur.com/DoE3wmr.png',
      'https://i.imgur.com/mYPzrWR.png',
      'https://i.imgur.com/piqumyn.png',
      'https://i.imgur.com/O2eyotP.png',
      'https://i.imgur.com/kgrF3IE.png'
    ]
  },
  {
    id: 'fluent',
    'title': 'Start to Fluent iPhone App',
    'images': [
      "https://i.imgur.com/MaEZG5q.png",
      "https://i.imgur.com/oZILF8Y.png",
      "https://i.imgur.com/4m0Rlkp.png",
      "https://i.imgur.com/Zy7rbxV.png",
      "https://i.imgur.com/xAdpSqt.png",
      "https://i.imgur.com/k2Nmnwf.png",
      "https://i.imgur.com/W6oUaj2.png",
      "https://i.imgur.com/v34sIuG.png",
      "https://i.imgur.com/399Fcgt.png",
      "https://i.imgur.com/nias0gx.png",
      "https://i.imgur.com/ZA7jmaD.png"
    ]
  },
  {
    id: 'power',
    'title': 'IOT Power Distribution Map',
    'images': [
      'https://i.imgur.com/gBk7CLE.png',
      'https://i.imgur.com/jbk7Q4M.png',
      'https://i.imgur.com/XsifqvD.png',
      'https://i.imgur.com/cIzKPw9.png',
      'https://i.imgur.com/BcGmzKs.png',
      'https://i.imgur.com/rnTH3CU.png'
    ]
  },
  {
    id: 'ui',
    'title': 'User Interface Designs',
    'images': [
      'https://i.imgur.com/qNwaIJY.png',
      'https://i.imgur.com/3D05WNu.png',
      'https://i.imgur.com/8vu5n3T.png',
      'https://i.imgur.com/44WAnGl.png',
      'https://i.imgur.com/kXNwmJI.png',
      'https://i.imgur.com/ffpQHKV.png',
      'https://i.imgur.com/Pxt3qK9.png'
    ]
  },
  {
    id: 'nike',
    'title': 'Nike Data Analytics',
    'images': [
      'https://i.imgur.com/zLq2bLW.png',
      'https://i.imgur.com/tmGLWRx.png',
      'https://i.imgur.com/qoZ2HQg.png',
      'https://i.imgur.com/9BgXocG.png'
    ]
  },
  {
    id: 'vivint',
    'title': 'Vivint Solar',
    'images': [
      'https://i.imgur.com/ViZBiHr.png',
      'https://i.imgur.com/HA82Fgi.png',
      'https://i.imgur.com/75gDq28.png',
      'https://i.imgur.com/qhE03fD.png',
      'https://i.imgur.com/FApjKn8.png',
      'https://i.imgur.com/9R8c4OC.png',
      'https://i.imgur.com/sDW4sWT.png'
    ]
  },
  {
    id: 'lcars',
    'title': 'iPad LCARS Interface',
    'images': [
      'https://i.imgur.com/RstCWqe.png',
      'https://i.imgur.com/i9cBHuj.png',
      'https://i.imgur.com/rW1Z2UA.png'
    ]
  },
  {
    id: 'elemental',
    'title': 'Elemental iPhone App',
    'images': [
      'https://i.imgur.com/BxdezDy.png',
      'https://i.imgur.com/ITtjjLy.png',
      'https://i.imgur.com/C2idg3h.png',
      'https://i.imgur.com/pq6oEEX.png'
    ]
  }
]

function create_element (id, classes, category, name, symbol, number, weight, img_url, images, title, text) {

  let project = _.find(images_arr, {id: id})

  if (project) {
    img_url = project.images[0]
    images = project.images
    if (project.id === 'fluent') {
      img_url = project.images[6]
    }
    if (project.id === 'medical_records') {
      img_url = project.images[6]
    }
  } else if (id === 'lighting') {
    project = _.find(images_arr, {id: 'ui'})
    img_url = project.images[6]
    images = [project.images[6]]
  } else if (id === 'relativity') {
    img_url = 'https://i.imgur.com/N54Ot9y.png'
    images = ['https://i.imgur.com/N54Ot9y.png']
  } else if (id === 'ebay') {
    project = _.find(images_arr, {id: 'ui'})
    img_url = project.images[3]
    images = [project.images[3]]
  } else if (id === 'forest_service') {
    project = _.find(images_arr, {id: 'ui'})
    img_url = project.images[0]
    images = [project.images[0]]
  } else if (id === 'voluson') {
    project = _.find(images_arr, {id: 'ui'})
    img_url = project.images[5]
    images = [project.images[5]]
  } else if (id === 'inter_arma') {
    project = _.find(images_arr, {id: 'ui'})
    img_url = project.images[4]
    images = [project.images[4]]
  }

  return {
    id: id,
    classes: classes,
    category: category,
    name: name,
    symbol: symbol,
    number: number,
    weight: weight,
    img_url: img_url,
    images: images,
    title: title,
    text: text
  }
}

const elements = [

  create_element(
    'street_fighter',
    ['transition', 'design', 'react', 'development', 'street_fighter'],
    'transition',
    'Street Fighter',
    'Sf',
    '( f, p )',
    'Web',
    null,
    [],
    'Cryptocurrency trading platform.',
    'Crypto trading platform with singular tools for fast agile trading. Concept was to create a control system one would use playing a video game like Street Fighter.'
  ),

  create_element(
    'vivint',
    ['transition', 'design', 'interface', 'development', 'mobile', 'vivint'],
    'transition',
    'Vivint Solar',
    'Vs',
    '( ui, p )',
    'Web & Mobile',
    null,
    [],
    'Vivint Solar wireframe\'s and rapid prototyping.',
    'Vivint Solar wireframe\'s and rapid prototyping.'
  ),

  create_element(
    'fluent',
    ['transition', 'design', 'interface', 'development', 'mobile', 'fluent'],
    'transition',
    'Start to Fluent',
    'Fl',
    '( ui, p )',
    'Mobile',
    null,
    [],
    'Language learning app.',
    'Language learning app.'
  ),

  create_element(
    'nike',
    ['transition', 'design', 'interface', 'development', 'nike'],
    'transition',
    'Nike Analytics',
    'Nk',
    '( ui, p )',
    'Web',
    null,
    [],
    'Nike\'s limited re-release of Air Jordan\'s.',
    'Dashboard\'s of natural language processing analysis of consumer sentiment and top influencers based on live Twitter feeds during the re-release of certain Michael \'Air\' Jordan series footwear during the 2012 Christmas shopping season.'
  ),

  create_element(
    'relativity',
    ['transition', 'design', 'interface', 'development', 'relativity'],
    'transition',
    'Relativity Analytics',
    'Re',
    '( ui, p )',
    'Web',
    null,
    [],
    'Relativity sentiment analytic dashboard.',
    'Dashboard of natural language processing analysis of consumer sentiment and top influencers based on live Twitter feeds during the re-release of certain Michael \'Air\' Jordan series footwear during the 2012 Christmas shopping season.'
  ),

  create_element(
    'ebay',
    ['transition', 'design', 'interface', 'development', 'ebay'],
    'transition',
    'Ebay Analytics',
    'Eb',
    '( ui, p )',
    'Web',
    null,
    [],
    'Ebay influencers analytic dashboard.',
    'Dashboard of natural language processing analysis of consumer sentiment and top influencers based on live Twitter feeds during the re-release of certain Michael \'Air\' Jordan series footwear during the 2012 Christmas shopping season.'
  ),

  create_element(
    'forest_service',
    ['post-transition', 'design', 'interface', 'forest_service'],
    'post-transition',
    'Forest Service',
    'Fs',
    '( ui )',
    'Design',
    null,
    [],
    'Geographic Information System Interface.',
    'This was a concept I did for a job proposal. It is a web user interface that for GIS data.'
  ),

  create_element(
    'voluson',
    ['transition', 'design', 'interface', 'mobile', 'voluson'],
    'transition',
    'Voluson 8',
    'Vu',
    '( ui, m )',
    'Design & Mobile',
    null,
    [],
    'iPad GE Voluson E8 Interface',
    'This was a concept I put together for a job submission to GE Medical. I wanted to show them how I would redesign their existing interface for their Voluson E8 ultrasound machine.'
  ),

  create_element(
    'medical_records',
    ['post-transition', 'design', 'interface', 'mobile', 'medical_records'],
    'post-transition',
    'Medical Diagnostics',
    'Md',
    '( ui, m )',
    'Design & Mobile',
    null,
    [],
    'iPad Electronic Medial Records Interface',
    'This was another concept I put together for a job submission to GE Medical. I wanted to show them how I would design a Electronic Medial Records interface.'
  ),

  create_element(
    'elemental',
    ['post-transition', 'design', 'interface', 'mobile', 'elemental'],
    'post-transition',
    'Elemental',
    'El',
    '( ui, m )',
    'Design & Mobile',
    null,
    [],
    'iPhone Educational App',
    'iPhone App: Periodic Table of Elements - This is a retro stylized iPhone educational app geared towards High School and College Students.'
  ),

  create_element(
    'inter_arma',
    ['transition', 'design', 'interface', 'mobile', 'game', 'inter_arma'],
    'transition',
    'Inter Arma',
    'Ir',
    '( ui, m, g )',
    'Design & Mobile',
    null,
    [],
    'Star Trek Game',
    'iPad game concept based on the Star Trek Kelvin Timeline.'
  ),

  create_element(
    'lcars',
    ['post-transition', 'design', 'interface', 'mobile', 'lcars'],
    'post-transition',
    'Lcars',
    'Lc',
    '( ui, m )',
    'Design & Mobile',
    null,
    [],
    'iPad LCARS Medical Diagnostic Interface',
    'A medical diagnostic app inspired by the LCARS computer interface from Star Trek TNG'
  )

]

export function __all () {
  return elements
}

export function __modal (__id) {
  let filter = _.filter(elements, function (e) {
    return e.id === __id
  })
  return filter[0]
}

export function __filter (__class) {
  return _.filter(elements, function (e) {
    return _.includes(e.classes, __class)
  })
}