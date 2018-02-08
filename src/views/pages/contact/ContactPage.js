import React from 'react'
import { FolderStructure } from '../../components'

const constants = [
  'endpoint.js'
]

const language =  [
  'common.js',
  'index.js',
]

const utils = {
  'async-action-types': [
    'asyncActionTypes.js',
    'index.js',
  ],
  'index.js': 'index.js'
}

// My Project Structure
const myProjectStructure = {
  pubilc: [
    'index.html'
  ],
  src: {
    constants,
    utils,
    lang: language,
    redux: {
      auth: [
        'authActionTypes.js',
        'authActions.js',
        'authReducer.js',
        'index.js'
      ],
      'rootReducers.js': 'rootReducers.js',
      'index.js': 'index.js',
      'store.js': 'store.js'
    },
    views: [
      'endpoint.js',
      'api.js',
      'language.js',
    ],
    config: [
      'config.js',
    ],
    'index.js': 'index.js'
  },
  '.babelrc': '.babelrc',
  '.gitignore': '.gitignore',
  'package.json': 'package.json',
}

// Modular Structure
const modularStructure = {
  pubilc: [
    'index.html'
  ],
  src: {
    constants,
    utils,
    language,
    config: [
      'endpoint.js',
      'api.js',
    ],
    common: {
      Layouts: [
        'Layouts.js',
        'index.js'
      ],
      'index.js': 'index.js'
    },
    features: {
      product: [
        'index.js'
      ],
      'index.js': 'index.js',
    },
    'index.js': 'index.js',
  },
  '.babelrc': '.babelrc',
  '.gitignore': '.gitignore',
  'package.json': 'package.json',
}

const Contact = (props) => {
  return (
    <div>
      <h1>Contact</h1>

      <h3>My Project Folder Structure</h3>
      <FolderStructure data={myProjectStructure} />

      <h3>Modular Folder Structure</h3>
      <FolderStructure data={modularStructure} />
    </div>
  )
}

export default Contact
