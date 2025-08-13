import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6 ,
    category: "general" ,
  }
  static propTypes = {
    country: PropTypes.string ,
    pageSize: PropTypes.number ,
    category: PropTypes.string ,
  }

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }

  }

  async componentDidMount() {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73b1ee2cfe248b78e6e40d0068bf0c2&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true}) ;
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults ,
      loading: false ,
     })

  }

  handlePrevbtn = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73b1ee2cfe248b78e6e40d0068bf0c2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true}) ;
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false ,
    })

  }

  handleNextbtn = async () => {

    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73b1ee2cfe248b78e6e40d0068bf0c2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true}) ;
      let data = await fetch(url)
      let parsedData = await data.json()

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false ,
      })
    }

  }

  render() {
    return (
      <div className="container my-2">
        <h1 style={{margin:' 35px 0px' }}>NewsMonkey - Top Headline</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevbtn}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextbtn}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
