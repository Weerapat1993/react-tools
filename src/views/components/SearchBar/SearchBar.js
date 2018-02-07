import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete, Input, Icon, Modal } from 'antd';

const { confirm } = Modal

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ])
  }

  static defaultProps = {
    dataSource: [],
    style: {},
  }

  constructor() {
    super()

    this.state = {
      keyword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange(value) {
    this.setState({ keyword: value })
  }

  handleSelect(select) {
    this.setState({ keyword: select })
    const url = `https://github.com/${select}`
    confirm({
      title: 'Do you Want to open github website?',
      content: url,
      onOk() {
        window.open(url)
      },
      onCancel() {
        
      },
    });
  }

  handleReset = () => {
    const { keyword } = this.state
    if(keyword) {
      this.setState({ keyword: '' })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { keyword } = this.state
    this.props.onSubmit(keyword)
  }

  render() {
    const { dataSource, style } = this.props
    const { keyword } = this.state
    return (
      <form onSubmit={this.handleSubmit} style={style}>
        <AutoComplete
          style={{ width: 300 }}
          dataSource={dataSource}
          placeholder="Github Search"
          onSearch={this.handleChange}
          onSelect={this.handleSelect}
          value={keyword}
          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Input suffix={<Icon type="close" className="certain-category-icon" onClick={this.handleReset} />} />
        </AutoComplete>
      </form>
    )
  }
}

export default SearchBar