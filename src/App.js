import React, { Component } from 'react'

import './App.css'
import fetch from './fetch'
import InfoItem from './infoItem'
import { Alert, AlertFrom,AlertFromAdd } from './componet'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      layout: 0,
      editParams: null,
      curData: null,
      defaultValue:0,
      addParams: {
        age: '',
        avatar: '',
        descr: '',
        face_value: '',
        name: "",
        single: 1
      }
    }
  }

  componentDidMount () {
    fetch('list').then(res => {
      this.setState({
        list: res.data
      })
    })
  }

  updateTopState = (params) => {
    this.setState({...params})
  }
  returnLayout = (layout) => {

    switch (layout) {
      case 1:
        return <Alert
          edit={this.edit}
          add={this.add}
          close={this.close}
          delete={this.delete}/>
      case 2:
        const {editParams} = this.state
        return <AlertFrom
          submit={this.submit}
          editParams={editParams}
          close={this.close}
          updateTopState={this.updateTopState}
        />
      case 3:
        const {addParams} = this.state
        return <AlertFromAdd
          addUser={this.addUser}
          addParams={addParams}
          close={this.close}
          updateTopState={this.updateTopState}
        />
      default:
        return null
    }
  }
  handleChange = (e) => {
    if (e.target.value==0){
      this.setState({curData:null, defaultValue: 0})
      return
    }
    let curData = this.state.list.find((el => ( el.id == e.target.value)))
    this.setState({curData, defaultValue: curData.id})
  }
  show = () => {
    this.setState({layout: 1})
  }
  close = () => {
    this.setState({layout: 0})
  }
  edit = () => {
    let editParams = this.state.curData
    this.setState({layout: 2, editParams})
  }
  add = () => {
    this.setState({layout: 3})
  }
  submit = () => {
    let editParams = this.state.editParams

    if (!editParams || Object.keys(editParams).length === 0) {
      return
    }
    if (this.lock) {
      return
    }
    this.lock = true
    fetch('update', {
      method: 'post',
      body: editParams
    }).then(res => {
      this.lock = false

      if (res.state === 0) {
        let list = [...this.state.list]
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i]['id'] == editParams['id']) {
              list[i] = editParams
            break
          }
        }
        this.setState({list, layout: 0, curData: editParams})
      }
    })
  }
  delete =()=> {
    if (this.lock) {
      return
    }
    this.lock = true
    const id = this.state.curData.id
    fetch('delete', {
      method: 'post',
      body: {id: this.state.curData.id}
    }).then(res => {
      this.lock = false

      if (res.state === 0) {
        let list = [...this.state.list]
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i]['id'] == id) {
            list.splice(i, 1)
            break
          }
        }
        this.setState({list, layout: 0, curData: null,defaultValue:0})
      }
    })
  }
  addUser =()=>{
    let addParams = this.state.addParams

    if (!addParams || Object.keys(addParams).length === 0) {
      return
    }
    if (this.lock) {
      return
    }
    this.lock = true

    fetch('add', {
      method: 'post',
      body: addParams
    }).then(res => {
      this.lock = false

      if (res.state === 0) {
        let list = [...this.state.list]
        addParams.id = res.data.insertId
        list.unshift(addParams)
        this.setState({list, layout: 0, curData: addParams,defaultValue: addParams.id},()=>{
          let _addParams = Object.assign({}, addParams)
          for(let key in _addParams) {
            if (key ==='single') {
              _addParams[key] = 1
            }else{
              _addParams[key] = ''
            }
          }
          this.setState({addParams:_addParams})
        })
        return
      }
      alert('添加失败')
    })
  }
  render () {
    const {list, layout, curData, defaultValue} = this.state
    return (
      <div className="App">
        <div className="select-panel">
          <div className="select-action">
            <p className="label">查询成员信息</p>
            <select onChange={this.handleChange} value={defaultValue}>
              {
                (list && list.length > 0) && list.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              }
              <option value='0'>None</option>
            </select>
            {
              curData && <p className="tips">(tips:其他操作请点击头像)</p>
            }
          </div>
          <div className="show-panel">
            <InfoItem show={this.show} data={curData}/>
          </div>
        </div>
        {
          this.returnLayout(layout)
        }
      </div>
    )
  }
}

export default App
