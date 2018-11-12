import React, { Component } from 'react';
export default class InfoItem extends Component {
    render () {
        const data = this.props.data
        if (!data) {
            return null
        }
        const {avatar, name ,age, single, face_value, descr} = data
        return (
            <div className='info-container' onClick={this.props.show}>
                <img src={avatar}/>
                <div className="info-detail">
                    <p className="info-item">
                        <span>名字:</span>
                        <span>{name}</span>
                    </p>
                    <p className="info-item">
                        <span>年龄:</span>
                        <span>{age}</span>
                    </p>
                    <p className="info-item">
                        <span>感情状态:</span>
                        <span>{single==1? '单身狗':'已配对'}</span>
                    </p>
                    <p className="info-item">
                        <span>颜值:</span>
                        <span> {`${face_value}颗星`}</span>
                    </p>
                    <p className="info-item">
                        <span>简介:</span>
                        <span className="des">{descr}</span>
                    </p>
                </div>
            </div>
        )
    }
}