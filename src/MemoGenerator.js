// MemoGenerator will be calling to an API and holding on to data - ckass
// Initialize state to save the following data
// top Text
// bottom Text
// random image - initialize with https://imgflip.com/i/49q2qq

import React, { Component } from 'react'

class MemoGenerator extends Component {
  constructor () {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: 'https://i.imgflip.com/49yao9.jpg',

      allMemeImage: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // return a promise
  componentDidMount () {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data
        console.log(memes)
        this.setState({
          allMemeImage: memes
        })
      })
  }

  handleChange (event) {
    const { name, value } = event.target
    console.log(value)
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const index = Math.floor(Math.random() * 100)
    const memeImg = this.state.allMemeImage[index].url
    this.setState({
      randomImage: memeImg
    })
  }

  render () {
    return (
      <div className='input-text'>
        <form onSubmit={this.handleSubmit}>
          <div>
            {/* toptex input */}
            <label>
              Top text
              <input
                name='topText'
                type='text'
                value={this.state.topText}
                placeholder='top text'
                onChange={this.handleChange}
              />
            </label>

            {/* toptex input */}
            <label>
              botom text
              <input
                name='bottomText'
                type='text'
                value={this.state.bottomText}
                placeholder='botom text'
                onChange={this.handleChange}
              />
            </label>

            {/* toptex input */}
            <input type='submit' value='Submit' />
          </div>

          <br />
        </form>

        {/* Bottom section */}
        <div>
          <img
            className='random-image'
            src={this.state.randomImage}
            alt='RandomImg'
            title='made at imgflip.com'
          />

          <h2 className='top-edit-line'> {this.state.topText}</h2>
          <h2 className='bottom-edit-line'> {this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemoGenerator
