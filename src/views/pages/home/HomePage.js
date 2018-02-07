import React from 'react'
import moment from 'moment'
import { List, Avatar } from 'antd'
import { connect } from 'react-redux'
import { Layouts } from '../../components'
import { store } from '../../../utils/store/store';

const Home = (props) => {
  const { github } = props
  return (
    <Layouts {...props}>
      <h1>Home</h1>
      {
        github.isFetching ? (
          <div className='text-center'>
            <h3>Loading . . .</h3> 
          </div>
        ) : (
          !github.error ? (
            <List
              itemLayout="horizontal"
              dataSource={github.data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.owner.avatar_url} />}
                    title={<a href={item.html_url} target='_blank'>{item.full_name}</a>}
                    description={item.description}
                  />
                  <div>{moment(item.updated_at, "YYYYMMDD").fromNow()}</div>
                </List.Item>
              )}
            />
          ) : (
            <div className='text-center'>
              <h3>{github.error}</h3>
            </div>
          )
        )
      }
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

