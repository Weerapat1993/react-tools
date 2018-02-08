import React, { Component } from 'react'
import Case from 'case'
import { Timeline, Progress, List, Avatar } from 'antd'
import { LinkConfirm } from '../../components'
import * as Skill from '../../assets/images/skills'

const data = [
  {
    title: 'React',
    percent: 90,
    status: 'active',
  },
  {
    title: 'React Native',
    percent: 70,
    status: 'active',
  },
  {
    title: 'Node Js',
    percent: 85,
    status: 'active',
  },
  {
    title: 'Photoshop',
    percent: 60,
    status: 'active',
  },
  {
    title: 'Laravel',
    percent: 80,
    status: 'active',
  },
  {
    title: 'Docker',
    percent: 60,
    status: 'active',
  },
  {
    title: 'Redux',
    percent: 90,
    status: 'active',
  },
  {
    title: 'My Sql',
    percent: 90,
    status: 'active',
  },
  {
    title: 'Mongo Db',
    percent: 80,
    status: 'active',
  }
]

const linkUrl = (keyword) => {
  const title = 'Do you want to Search Google?'
  const url = `https://www.google.com/search?q=${keyword.replace(' ', '+')}`
  LinkConfirm(title, url)
}

const sortFunc = (a,b) => {
  if(a.title < b.title) return -1;
  if(a.title > b.title) return 1;
  return 0;
}

class TimelinePage extends Component {
  render() {
    return (
      <div>
        <h1>Timeline</h1>
        <Timeline>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
        </Timeline>
        <h1>Skills</h1>
        <List
          itemLayout="horizontal"
          dataSource={data.sort(sortFunc)}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={Skill[Case.camel(item.title)]} />}
                title={<a onClick={() => linkUrl(item.title)} target='_blank'>{item.title}</a>}
                description={<Progress {...item} />}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default TimelinePage
