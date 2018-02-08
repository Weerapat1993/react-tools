import React, { Component } from 'react'
import Case from 'case'
import { Timeline, Progress, List, Avatar, Row, Col } from 'antd'
import { Layouts, LinkConfirm } from '../../components'
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

const findPercent = (key) => {
  return data.filter(item => item.title === key)[0].percent
} 

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
  constructor() {
    super()

    this.state = {
      skills: {
        react: 0,
        reactNative: 0,
        redux: 0,
        laravel: 0,
        docker: 0,
        nodeJs: 0,
        photoshop: 0,
      }
    }
  }

  componentDidMount() {
    const arrMap = data.sort(sortFunc).map(item => Case.camel(item.title))
    arrMap.forEach((key, i) => {
      setTimeout(() => {
        const { skills } = this.state
        this.setState({
          skills: {
            ...skills,
            [key]: findPercent(Case.capital(key))
          }
        })
      }, 300 * (i + 1))
    })
  }

  render() {
    const { skills } = this.state
    return (
      <Layouts {...this.props}>
        
        <Row>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <h1>Skills</h1>
            <List
              itemLayout="horizontal"
              dataSource={data.sort(sortFunc)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={Skill[Case.camel(item.title)]} />}
                    title={<a onClick={() => linkUrl(item.title)} target='_blank'>{item.title}</a>}
                    description={<Progress {...item} percent={skills[Case.camel(item.title)]} />}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Layouts>
    )
  }
}

export default TimelinePage
