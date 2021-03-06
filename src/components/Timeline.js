import React, { Component } from 'react'
import Tweets from './Tweets'
import { createTweet, getTweets } from '../services/tweet'

const styles = {
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  newTweet: {
    display: 'flex',
    flex: 1
  },
  submit: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#38435a',
    color: '#fff',
    padding: '0.5rem'
  },
  refresh: {
    backgroundColor: '#ea454b',
    padding: '0.75rem',
    marginTop: 20,
    border: 0,
    color: '#fff',
    alignSelf: 'flex-end'
  }
}

export default class Timeline extends Component {
  state = {
    tweet: '',
    tweets: [],
    user: null,
    isLoading: true
  }

  async componentDidMount () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.setState({ user })
      this.loadTweets()
    } else {
      this.props.history.replace('/')
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { tweet, user, tweets } = this.state
    try {
      const res = await createTweet({ text: tweet, userId: user.id })
      this.setState({
        tweets: [res.data, ...tweets],
        tweet: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = e => {
    this.setState({ tweet: e.target.value })
  }

  loadTweets = async () => {
    this.setState({
      isLoading: true
    })
    const res = await getTweets()
    this.setState({ tweets: res.data, isLoading: false })
  }

  refresh = async () => {
    this.loadTweets()
  }

  render () {
    const { tweet, isLoading, tweets } = this.state

    return (
      <div style={styles.timeline}>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <textarea
            value={tweet}
            onChange={this.handleChange}
            style={styles.newTweet}
            name='newTweet'
            rows='10'
            placeholder='Escreva alguma coisa...'
          />
          <button disabled={!tweet} type='submit' style={styles.submit}>
            Tweet
          </button>
        </form>
        {isLoading ? (
          <h1>Carregando...</h1>
        ) : (
          <React.Fragment>
            <button onClick={this.refresh} style={styles.refresh}>
              Atualizar
            </button>
            <Tweets tweets={tweets} />
          </React.Fragment>
        )}
      </div>
    )
  }
}
