import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete, Input, Icon, Modal, Spin } from 'antd';
import './styles.css'

const { Option, OptGroup } = AutoComplete;
const { confirm } = Modal

class SearchBar extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onClearData: PropTypes.func.isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    })),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ])
  }

  static defaultProps = {
    isFetching: false,
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
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange(value) {
    this.setState({ keyword: value })
  }

  handleSelect(select, option) {
    const { keyword } = this.state
    if(keyword === select) {
      this.props.onSubmit(keyword)
    } else {
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
  }

  handleReset = () => {
    const { keyword } = this.state
    if(keyword) {
      this.setState({ keyword: '' })
    }
  }

  handleClear() {
    this.handleReset()
    this.props.onClearData()
  }

  handleSubmit(e) {
    e.preventDefault();
    const { keyword } = this.state
    if(keyword) {
      this.props.onSubmit(keyword)
    }
  }

  renderTitle(title, keyword) {
    return (
      <span>
        {title}
        <a
          style={{ float: 'right' }}
          onClick={this.handleClear}
          rel="noopener noreferrer"
        >
          Clear
        </a>
      </span>
    )
  }

  render() {
    const { dataSource, style, isFetching } = this.props
    const { keyword } = this.state
    // Option -------------
    const options = dataSource.filter(item => keyword !== '').map(group => (
      <OptGroup
        key={group.title}
        label={this.renderTitle(group.title, keyword)}
      >
        <Option value={keyword}>
          {keyword}
        </Option>
        {group.children.map(item => (
          <Option key={item.id} value={item.full_name}>
            <img src={item.owner.avatar_url} alt='logo' className='auto-complete-logo' />
            {item.full_name}
          </Option>
        ))}
      </OptGroup>
    )).concat([
      <Option disabled key="all" className="show-all">
        <a
          href={`https://github.com/search?utf8=%E2%9C%93&q=${keyword}&type=`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all results
        </a>
      </Option>,
    ]);
    // ------------------------
    return (
      <form onSubmit={this.handleSubmit} style={style}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          optionLabelProp="value"
          style={{ width: 320 }}
          dataSource={keyword ? options : []}
          placeholder="Github Search"
          onSearch={this.handleChange}
          onSelect={this.handleSelect}
          value={keyword}
        >
          <Input 
            suffix={isFetching ? <Spin size='small' /> : <Icon type="close" className="certain-category-icon" onClick={this.handleReset} />}
          />
        </AutoComplete>
      </form>
    )
  }
}

export default SearchBar