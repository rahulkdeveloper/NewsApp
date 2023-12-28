import React from "react";

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" >
        <img src={imageUrl ? imageUrl : "https://play-lh.googleusercontent.com/8LYEbSl48gJoUVGDUyqO5A0xKlcbm2b39S32xvm_h-8BueclJnZlspfkZmrXNFX2XQ"} class="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title.length !== 44 ? title : title + "..."}</h5>
          <div>
            <h6 className="my-2">source - <span class="badge bg-success">{source}</span></h6>
          </div>
          <p class="card-text">
            {description}...
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read more
          </a>
          <p className="card-text my-2"><small className="text-muted">by {author ? author : "unkown"} on {date}</small></p>
        </div>
      </div>
    </div>
  );

}

export default NewsItem;

