import React from 'react'
import _ from 'lodash'
import { Tree } from 'antd'
import { Layouts } from '../../components'

const { TreeNode } = Tree

const treeData = {
  pubilc: [
    'index.html'
  ],
  src: {
    common: {
      FolderStructure: [
        'index.js',
        'FolderStructure.js',
      ]
    },
    views: [
      'endpoint.js',
      'api.js',
      'a',
      'b',
      'c',
    ],
    config: [
      'endpoint.js',
      'api.js',
      'a',
      'b',
      'c',
    ],
    features: {
      product: [
        'index.js'
      ]
    },
    'index.js': 'index.js'
  },
  'loadingFile': 'loadingFile',
  '.gitignore': '.gitignore',
  'package.json': 'package.json',
}

const renderTreeNodes = (data, name) => {
  const sortFunc = (a,b) => {
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
  }

  /**
   * Sort Tree
   * @param {Object} data 
   * @param {Array} arrData 
   * @param {string} name
   * @return {Component}
   */
  const sortTree = (data, arrData, name) => {
    return arrData.sort(sortFunc).map((key) => {
      let dataRef
      if(!name) {
        dataRef = {
          title: key,
          key,
        }
      } else {
        dataRef = {
          title: key,
          key: `${name}/${key}`,
        }
      }
      const dataCalculate = _.get(data, key)
      if(Array.isArray(dataCalculate)) {
        return (
          <TreeNode title={dataRef.title} key={dataRef.key} dataRef={dataRef}>
            {
              dataCalculate.sort(sortFunc).map(item => {
                const dataRefArray = {
                  title: item,
                  key: `${dataRef.key}/${item}`,
                }
                return <TreeNode {...dataRefArray} />
              })
            }
          </TreeNode>
        )
      }
      if (typeof dataCalculate === 'object') {
        return (
          <TreeNode title={dataRef.title} key={dataRef.key} dataRef={dataRef}>
            {renderTreeNodes(dataCalculate, dataRef.key)}
          </TreeNode>
        );
      }
      return <TreeNode {...dataRef} />;
    });
  } 

  if(typeof data === 'object') {
    const arrFile = Object.keys(data).sort(sortFunc).filter(key => typeof data[key] === 'string')
    const arrFolder = Object.keys(data).sort(sortFunc).filter(key => typeof data[key] === 'object')
    const dataFolder = sortTree(data, arrFile, name)
    const dataFile = sortTree(data, arrFolder, name)
    return dataFile.concat(dataFolder)
  }
  return <TreeNode title='Error' key='Error' />
}

const Contact = (props) => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  return (
    <Layouts {...props}>
      <h1>Contact</h1>
      <Tree
        showLine
        defaultExpandedKeys={['src']}
        onSelect={onSelect}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </Layouts>
  )
}

export default Contact
