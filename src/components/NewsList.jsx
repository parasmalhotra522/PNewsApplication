import React, { Component } from 'react'



export default class NewsList extends Component {
   
    render() {
        const { title, description, imageUrl, url, source } = this.props;
        return (
            <div>            
                <div
                   className="card my-3" key={source.id} style={{ width: "22rem", height: "30rem" }}>
                        <img src={imageUrl} className="card-img-top" style={{ width: "100%", height: "50%" }} alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> {title}...</h5>
                        <p className="card-text">
                            {description}...
                        </p>
                        <a href={url}
                            target='_blank'
                            className="btn btn-dark btn-sm" rel="noreferrer">Read More</a>
                        </div>
                    </div>
            
           </div>
            
    
    )
  }
}
