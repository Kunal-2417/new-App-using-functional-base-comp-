import React, { Component } from 'react'

export default class Newsitem extends Component {
    
  render() {
    let { title, description, imgurl, newsurl, publishedAt, author ,source} =this.props;
    return (
      <div>
            <div className="card" style={{width:'18rem'}}>
          <img src={imgurl ? imgurl : "https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
            <h5 className="card-title">{title}
              <span class="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{display:'flex',justifyContent:'flex-start', zIndex:'1',left:'25%' }}>
              {source}
            </span></h5>
                        <p className="card-text">{description}...</p>
                        
                        <p className="card-text"><small class="text-muted">By {author ? author: 'NDTV'} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsurl} target=" blank" className="btn btn-sm btn-danger">Read more</a>
                    </div>
            </div>
      </div>
    )
  }
}
