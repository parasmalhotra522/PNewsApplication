import React from 'react'


const NewsList = ({title, description, imageUrl, url, source, author, publishedAt}) => {   
    return (                  
        <div
                    className="card my-3"
                    key={source?.id}
                    style={{
                        width:'100%',
                        height: "auto", 
                        display: 'flex',
                        flexDirection:'column'
                    }}>
                
                <div className="badge rounded-pill bg-danger"
                    style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0' }}
                >
                    {source}
                </div>
                        <img src={imageUrl} className="card-img-top" style={{ width: "100%", height: "50%" }} alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> {title}...</h5>
                        <p className="card-text">
                            {description}...
                    </p>
                    <p className="text-muted" style={{fontSize:'.7rem'}}>By { author ? author : 'Unknown' } on { new Date(publishedAt).toUTCString() }</p>

                </div>
                <div className="card-footer" style={{background:'none'}}>
                       <a href={url}
                            target='_blank'
                            className="btn btn-dark btn-sm" rel="noreferrer">Read More</a>
                     
                </div>
        </div>    
    
    )
}
  
export default NewsList;
