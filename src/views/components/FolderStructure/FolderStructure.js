import React from 'react'
import _ from 'lodash'
import { Tree } from 'antd'

const { TreeNode } = Tree

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

const FolderStructure = ({ data, defaultExpandedKeys }) => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  return (
    <Tree
      showLine
      defaultExpandedKeys={defaultExpandedKeys}
      onSelect={onSelect}
    >
      {renderTreeNodes(data)}
    </Tree>
  )
}

FolderStructure.defaultProps = {
  defaultExpandedKeys: []
}

export default FolderStructure
