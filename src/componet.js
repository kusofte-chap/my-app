import React, { Component } from 'react';

class Alert extends Component {
    render () {
        return (
            <div className="mask">
                <div className="alert">
                    <div className="btn-group">
                        <button onClick={this.props.edit}>Edit</button>
                        <button onClick={this.props.add}>Add</button>
                        <button onClick={this.props.delete}>Delete</button>
                    </div>
                    <a href="javascript:void(0)" className="close" onClick={this.props.close}>X</a>
                </div>
            </div>
        )
    }
}

class AlertFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleChange= (e,name)=>{
    let editParams = Object.assign({},this.props.editParams)
    if (name ==='single') {
      editParams[name]= e.target.name ==='single'? 1:0
    }else {
      editParams[name]= e.target.value
    }
    this.props.updateTopState({editParams})
  }
  render () {
    const {avatar,name, age, single, descr,face_value} = this.props.editParams

    return (
      <div className="mask">
          <div className="alert-from">
              <p className="from-item">
                  <span className="label">头像：</span>
                  <input type="text" value={avatar} onChange={(e)=>{this.handleChange(e,'avatar')}}/>
              </p>
              <p className="from-item">
                  <span className="label">名字：</span>
                  <input type="text" value={name} onChange={(e)=>{this.handleChange(e,'name')}}/>
              </p>
              <p className="from-item">
                  <span className="label">年龄：</span>
                  <input type="text"  value={age} onChange={(e)=>{this.handleChange(e,'age')}}/>
              </p>
              <p className="from-item radio">
                  <span className="label">单身：</span>
                  是<input type="radio" name="single" checked={!!single}onChange={(e)=>{this.handleChange(e,'single')}}/>
                  否<input type="radio" name="unsingle" checked={!single} onChange={(e)=>{this.handleChange(e,'single')}}/>
              </p>
              <p className="from-item">
                  <span className="label">颜值：</span>
                  <input type="text" value={face_value} onChange={(e)=>{this.handleChange(e,'face_value')}}/>
              </p>
              <p className="from-item">
                  <span className="label">简介：</span>
                  <textarea  type="test" value={descr} onChange={(e)=>{this.handleChange(e,'descr')}}/>
              </p>
              <button type="submit" onClick={this.props.submit}> Submit</button>
              <a href="javascript:void(0)" onClick={this.props.close} className="close">X</a>
          </div>
      </div>
    )
  }
}

class AlertFromAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleChange= (e,name)=>{
    let addParams = Object.assign({},this.props.addParams)
    if (name ==='single') {
      addParams[name]= e.target.name ==='single'? 1:0
    }else {
      addParams[name]= e.target.value
    }
    this.props.updateTopState({addParams})
  }
  render () {
    const {avatar,name, age, single, descr,face_value} = this.props.addParams

    return (
      <div className="mask">
          <div className="alert-from">
              <p className="from-item">
                  <span className="label">头像：</span>
                  <input type="text" value={avatar} onChange={(e)=>{this.handleChange(e,'avatar')}}/>
              </p>
              <p className="from-item">
                  <span className="label">名字：</span>
                  <input type="text" value={name} onChange={(e)=>{this.handleChange(e,'name')}}/>
              </p>
              <p className="from-item">
                  <span className="label">年龄：</span>
                  <input type="text"  value={age} onChange={(e)=>{this.handleChange(e,'age')}}/>
              </p>
              <p className="from-item radio">
                  <span className="label">单身：</span>
                  是<input type="radio" name="single" checked={!!single}onChange={(e)=>{this.handleChange(e,'single')}}/>
                  否<input type="radio" name="unsingle" checked={!single} onChange={(e)=>{this.handleChange(e,'single')}}/>
              </p>
              <p className="from-item">
                  <span className="label">颜值：</span>
                  <input type="text" value={face_value} onChange={(e)=>{this.handleChange(e,'face_value')}}/>
              </p>
              <p className="from-item">
                  <span className="label">简介：</span>
                  <textarea  type="test" value={descr} onChange={(e)=>{this.handleChange(e,'descr')}}/>
              </p>
              <button type="submit" onClick={this.props.addUser}> Submit</button>
              <a href="javascript:void(0)" onClick={this.props.close} className="close">X</a>
          </div>
      </div>
    )
  }
}

export {
    Alert,AlertFrom,AlertFromAdd
}