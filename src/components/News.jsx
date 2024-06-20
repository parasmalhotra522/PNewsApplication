import React, { Component } from 'react'
import NewsList from './NewsList'
import Loader from './utils/Loader.jsx';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            disableNextBtn: false,
            totalResults:0,
        };
        document.title = `${this.capitalizeFunction(this.props.category)} - PNews Application`
    }

    async updateNews() {
        this.setState({ loading: true });
        this.props.setProgress(40);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            
        const data= await fetch(url, {
                "method": "GET",
        }).then((d) => d.json());
        this.props.setProgress(70);
            console.log("daata", data);
            this.setState({
                loading: false,
                articles: data.articles,
                totalResults:data.totalResults
            })
         this.props.setProgress(100);
    }
    
    async componentDidMount() {
      this.updateNews();    
    }
    

    // handleNextClick = async () => {
    //     this.setState({
    //              page: Number(this.state.page) + 1,
    //     })
    //     this.updateNews();
     
    //  }
    
    // handlePrevClick = async () => {
    //   this.setState({ page: Number(this.state.page) - 1})
    //     this.updateNews();

    // }


    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 });
        
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;            
        this.setState({ loading: true })
        console.log("URL__HIT", url);
        const data = await fetch(url, {
                "method": "GET",
            }).then((d) => d.json());
        console.log("API ///daata for ", this.state.page, data,

             Array.from(data.articles)
        );
       
       
            this.setState({
                loading: false,
                articles:this.state.articles.concat(Array.from(data.articles)),
                totalResults:data.totalResults
            })
        
    }


    render() {
        return (    
            <>

                {this.state.loading ? <Loader/> :
             <>
                        <h2 className='text-center' style={{ margin: '35px 0px' }}>P News App - Top 
                             {this.capitalizeFunction(this.props.category)} Headlines
                        </h2>

                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length !== this.totalResults}
                            loader={<Loader/>}
                        >
                            <div className="container">
                                <div className="row">
                                {console.log('CHECK',this.state.articles)}
                                {this.state.articles.map((article) => (
                                    article.urlToImage &&
                                    (<div className="col-md-4" key={article.url}>
                                        <NewsList
                                    
                                            title={article.title}
                                            description={article.description}
                                            url={article.url}
                                            imageUrl={article.urlToImage}
                                            source={article.source.name}
                                            author={article.author}
                                            publishedAt={article.publishedAt}
                                            
                                        />
                                    </div>)
                        
                                ))
                                }
                            
                                </div>
                            </div>
                    
                        </InfiniteScroll>
                    </>
                }
                {/* <div className="container d-flex justify-content-between flex-row">
                    <button className="btn btn-dark flex-start"
                        disabled={this.state.page<=1}
                    onClick={this.handlePrevClick}
                    >&larr; Previous</button>

                    <input type="number"
                        style={{width:"2rem", textAlign:"center", display:"flex", justifyContent:"center"}}
                        value={this.state.page} readOnly />
                    
                    <button className="btn btn-dark flex-end"
                        disabled={(this.state.page+1) > Math.ceil(this.state.totalResults/this.state.pageSize)}
                    onClick={this.handleNextClick}
                    > Next &rarr;</button>
                </div> */}
      </>
    )
  }
}
