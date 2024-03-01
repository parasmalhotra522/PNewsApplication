import React, { Component } from 'react'
import NewsList from './NewsList'


export default class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            disableNextBtn: false,
            totalResults:0,
        };
    }
    async componentDidMount() {
        this.setState({ loading: true });
        // console.log(this.state.url)
        const url = "https://newsapi.org/v2/everything?q=apple&from=2024-02-28&to=2024-02-28&sortBy=popularity&apiKey=b8734d49806a4ef7a7952780e9b56508&page=1&pageSize=20";
           
       const data= await fetch(url, {
            "method": "GET",
        }).then((d) => d.json());
        // console.log("daata", data);
        this.setState({
            loading: false,
            articles: data.articles,
            totalResults:data.totalResults
        })
        
    }
    
     handleNextClick = async () => {
     
         if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
             this.setState({ disableNextBtn: true });
         }
         else {
             const url = `https://newsapi.org/v2/everything?q=apple&from=2024-02-28&to=2024-02-28&sortBy=popularity&apiKey=b8734d49806a4ef7a7952780e9b56508&page=${this.state.page + 1}&pageSize=20`;
             const data = await fetch(url, {
                 "method": "GET",
             }).then((d) => d.json());
             console.log("daata", data);
             if (data.status !== 'ok') {
                 this.setState({
                     articles: [],
                     disableNextBtn:true
                 })
             } else {
                 
                 this.setState({
                     loading: false,
                     page: Number(this.state.page) + 1,
                     articles: data.articles
                 });
             }
         }
     }
    
    handlePrevClick = async () => {
      
        const url = `https://newsapi.org/v2/everything?q=apple&from=2024-02-28&to=2024-02-28&sortBy=popularity&apiKey=b8734d49806a4ef7a7952780e9b56508&page=${this.state.page-1}&pageSize=20`;
        const data= await fetch(url, {
           "method": "GET",
       }).then((d) => d.json());
       console.log("daata", data);
       this.setState({
           loading: false,
           page: Number(this.state.page) - 1,
           articles:data.articles
       })


    }


    render() {
        return (    
            <div className="container my-3">

                {this.state.loading ? 'loading.....' :
             <>
                        <h2>P News App - Top Headlines</h2>
                        <div className="row">
                            {this.state.articles.map((article, index) => (
                        
                                article.urlToImage &&
                                (<div className="col-md-4" key={index}>
                                    <NewsList
                                
                                        title={article.title}
                                        description={article.description}
                                        url={article.url}
                                        imageUrl={article.urlToImage}
                                        source={article.source}
                                    />
                                </div>)
                    
                            ))
                            }
                        
                        </div>
                    </>
                }
                <div className="d-flex justify-content-between my-4">
                    <button className="btn btn-dark"
                        disabled={this.state.page<=1}
                    onClick={this.handlePrevClick}
                    >&larr; Previous</button>

                    <input type="number" value={this.state.page} readOnly/>
                    
                    <button className="btn btn-dark"
                        disabled={this.state.disableNextBtn}
                    onClick={this.handleNextClick}
                    > Next &rarr;</button>
                </div>
      </div>
    )
  }
}
