import React from 'react'
import moment from 'moment'
import { List, Avatar } from 'antd'
import { connect } from 'react-redux'
import { Layouts, LinkConfirm, Loading } from '../../components'
import { store } from '../../../utils/store/store';

const Home = (props) => {
  const confirmUrl = (url) => {
    const title = 'Do you Want to open github website?'
    LinkConfirm(title, url)
  }

  const { github } = props
  return (
    <Layouts {...props}>
      <h1>Home</h1>
      <Loading 
        isLoading={github.isFetching}
        error={github.error}
      >
        <List
          itemLayout="horizontal"
          dataSource={github.data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.owner.avatar_url} />}
                title={<a onClick={() => confirmUrl(item.html_url)} target='_blank'>{item.full_name}</a>}
                description={item.description}
              />
              <div>{moment(item.updated_at, "YYYYMMDD").fromNow()}</div>
            </List.Item>
          )}
        />
      </Loading>
    </Layouts>
  )
}

const mapStateToProps = (state, ownProps) => ({
  github: store(state).github.search
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)

