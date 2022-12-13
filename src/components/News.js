import React, { Component } from 'react'
import Spinner from './Spinner';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component"



export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
  }
  static propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capatalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capatalise(this.props.category)}-NewsHunt`
  }

  handleNext = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2bf51d47564c92a84764aaf1e9f981&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults
      })
    }
  }
  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2bf51d47564c92a84764aaf1e9f981&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    })
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2bf51d47564c92a84764aaf1e9f981&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false, totalResults: parsedData.totalResults
    })
  }

  fetchMoreData = async() => {
   
      this.setState({
        page: this.state.page + 1

      });
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2bf51d47564c92a84764aaf1e9f981&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data =await fetch(url);
      let parsedData =await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading:false
      });
    

  }
  render() {
    return (
      <div>
        <div className="container my-2 " style={{ paddingLeft: '7%' }}>
          <h1 className="text-center my-4">NewsHunt-Top headline on {this.capatalise(this.props.category)} category </h1>
          {/* {this.state.loading && <Spinner />} */}
          {this.props.setProgress(100)}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className='container'>


              <div className="row">
                {this.state.articles.map((element) => {
                  return <div className="col-sm-12 col-md-6 col-lg-4 my-2 ">
                    <Newsitem key={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgurl={element.urlToImage} newsurl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-around">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
          <button disabled={this.state.page +1>Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}> Next &rarr;</button>

        </div> */}
      </div>
    )
  }
}
