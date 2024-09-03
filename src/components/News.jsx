import React, { useState, useEffect } from 'react'
import NewsList from './NewsList'
import Loader from './utils/Loader.jsx';

import InfiniteScroll from "react-infinite-scroll-component";

const News = ({apiKey, category='general', country='us', setProgress, pageSize=10}) => {

    
    const [loading, setLoading] = useState(false);
    const [newsArticles, setNewsArticle] = useState({
        articles: [],
        loading: false,
        page:1,
        totalResults:0
    });

    const capitalizeFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }

    const updateNews = async () => {
        console.log("CHecking page no -- inside update news", newsArticles.page);
        setLoading(true);
        setProgress(40);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${Number(newsArticles.page)}&pageSize=${pageSize}`;
            
        const data= await fetch(url, {
                "method": "GET",
        }).then((d) => d.json());
        setProgress(70);
        console.log("daata", data);
        setNewsArticle({
            articles: data.articles,
            totalResults: data.totalResults,
            page:1    
        })
        setLoading(false);
         setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFunction(category)} - PNews Application`
        updateNews();    
    },[])
    

    const fetchMoreData = async() => {

        console.log("CHecking page no inside fetchMore data", newsArticles.page, newsArticles);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${Number(newsArticles.page)+1}&pageSize=${pageSize}`;            
        setLoading(true);
        const data = await fetch(url, {
                "method": "GET",
            }).then((d) => d.json());
    
        setLoading(false);
        
            setNewsArticle({
                articles: newsArticles.articles.concat(data.articles),
                totalResults: data.totalResults,
               page: Number(newsArticles.page)+ 1 
            })
    }



        return (    
            <>

                {loading ? <Loader/> :
             <>
                        <h2 className='text-center' style={{ margin: '35px 0px' }}>P News App - Top 
                             {capitalizeFunction(category)} Headlines
                        </h2>

                        <InfiniteScroll
                            dataLength={newsArticles.articles.length}
                            next={fetchMoreData}
                            hasMore={newsArticles.articles.length !== newsArticles.totalResults}
                            loader={<Loader/>}
                        >
                            <div className="container">
                                <div className="row">
                                {console.log('CHECKING THE API RES',newsArticles.articles)}
                                {newsArticles.articles.map((article) => (
                                    article.urlToImage ??
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


export default News;