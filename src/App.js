import './index.css'
import avatar from './images/avatar.png'
import React from 'react'
import {v4 as uuid} from 'uuid'

// 时间格式化
function formatDate(time) {
    return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}

class App extends React.Component {
    state = {
        // hot: 热度排序  time: 时间排序
        tabs: [
            {
                id: 1,
                name: '热度',
                type: 'hot'
            },
            {
                id: 2,
                name: '时间',
                type: 'time'
            }
        ],
        active: 'hot',
        list: [
            {
                id: 1,
                author: '刘德华',
                comment: '给我一杯忘情水',
                time: new Date('2021-10-10 09:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '哎哟，不错哦',
                time: new Date('2021-10-11 09:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0
            },
            {
                id: 3,
                author: '五月天',
                comment: '不打扰，是我的温柔',
                time: new Date('2021-10-11 10:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1
            }
        ],
        comment: '评论在哪里' // LYDIA评论框内容
    }

    switchTab = (type) => {
      console.log(type, '点击动作')
      // LYDIA点谁把谁的type传给active
      this.setState({
        active: type
      })
    }
    // 拿到事件对象e
    textareaChange = (e) => {
        this.setState({
          comment: e.target.value
        })
      console.log(this.state.comment)
    }

    // 提交评论
    // 往state.list里加东西
    submitComment = () => {
        this.setState({
          list:[
              ...this.state.list,
            {
              id: uuid(),
              author: 'LYDIA',
              comment: this.state.comment,
              time: new Date(),
              // 1: 点赞 0：无态度 -1:踩
              attitude: 0
            }
          ]
        })
    }

    // LYDIA删除评论
    deleteComment = (id) => {
        // console.log(id)
        this.setState({
            list: this.state.list.filter(item => item.id !== id)
        })
    }
    // LYDIA 点赞
    toggleLike = (curItem) => {
        // console.log(curItem)
        // 需要修改attitude，通过id做标识
        const {attitude, id} = curItem
        this.setState({
            list: this.state.list.map(item => {
                // 如果item.id === id，把当前item attitude的属性修改一下
                if(item.id === id){
                    return{
                        ...item,
                        attitude: attitude === 1? 0:1
                    }
                } else{
                    return item
                }

            })
        })
    }

    // LYDIA 点踩
    toggleHate = (curItem) => {
        // console.log(curItem)
        // 需要修改attitude，通过id做标识
        const {attitude, id} = curItem
        this.setState({
            list: this.state.list.map(item => {
                // 如果item.id === id，把当前item attitude的属性修改一下
                if(item.id === id){
                    return{
                        ...item,
                        attitude: attitude === -1? 0:-1
                    }
                } else{
                    return item
                }

            })
        })
    }
    render() {
        return (
            <div className="App">
                <div className="comment-container">
                    {/* 评论数 */}
                    <div className="comment-head">
                        <span>5 评论</span>
                    </div>
                    {/* 排序 */}
                    <div className="tabs-order">
                        <ul className="sort-container">
                            {
                                this.state.tabs.map(tab => (
                                    <li
                                        onClick={()=>this.switchTab(tab.type)} // ?
                                        key={tab.id}
                                        className={tab.type === this.state.active ? 'on' : ''}
                                    >按{tab.name}排序</li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* 添加评论 */}
                    <div className="comment-send">
                        <div className="user-face">
                            <img className="user-head" src={avatar} alt=""/>
                        </div>
                        <div className="textarea-container">
                            {/*LYDIA输入框 受控组件*/}
                            <textarea
                                cols="80"
                                rows="5"
                                placeholder="发条友善的评论"
                                className="ipt-txt"
                                // LYDIA加一个输入框属性
                                value={this.state.comment}
                                // LYDIA受控组件回调
                                onChange={this.textareaChange}
                            />
                            <button className="comment-submit" onClick={this.submitComment}>发表评论</button>
                        </div>
                        <div className="comment-emoji">
                            <i className="face"></i>
                            <span className="text">表情</span>
                        </div>
                    </div>

                    {/* 评论列表 */}
                    <div className="comment-list">
                        {
                            this.state.list.map(item => (
                                <div className="list-item" key={item.id}>
                                    <div className="user-face">
                                        <img className="user-head" src={avatar} alt=""/>
                                    </div>
                                    <div className="comment">
                                        <div className="user">{item.author}</div>
                                        <p className="text">{item.comment}</p>
                                        <div className="info">
                                            <span className="time">{formatDate(item.time)}</span>
                                            <span
                                                onClick={() => this.toggleLike(item)}
                                                className={item.attitude === 1 ? 'like liked' : 'like'}>
                                              <i className="icon"/>
                                            </span>
                                            <span
                                                onClick={() => this.toggleHate(item)}
                                                className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                              <i className="icon"/>
                                            </span>
                                            <span className="reply btn-hover" onClick={()=>this.deleteComment(item.id)}>删除</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>)
    }
}


export default App
