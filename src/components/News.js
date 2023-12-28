import React, { Component, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {

    let [articles, setArticles] = useState([]);
    let [loading, setLoading] = useState(true)
    let [page, setPage] = useState(1)
    // let [isDisable, setIsDisable] = useState(false)
    let [totalArticles, setTotalArticles] = useState(0)



    const updateData = async () => {
        props.setProgress(10)
        const { category, countryName, pageSize } = props;
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${countryName}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`;

        setLoading({ loading: true });
        const data = await fetch(url);
        const pasredJson = await data.json();
        props.setProgress(10);
        setPage(page)
        setArticles(pasredJson.articles)
        setTotalArticles(pasredJson.totalResults)
        setLoading(false)



        props.setProgress(100)




    }
    const fetchMoreData = async () => {

        console.log("page====", page);

        const { category, countryName, pageSize } = props;

        const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${countryName}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${pageSize}`;




        const data = await fetch(url);
        const pasredJson = await data.json();

        setArticles([...articles, ...pasredJson.articles])
        setPage(page + 1);

        setTotalArticles(pasredJson.totalResults)





    }

    useEffect(() => {
        updateData()
        document.title = `${props.category} -NewsMonkey`
        // eslint-disable-next-line
    }, [])


    // async componentDidMount() {
    //     console.log("123456789");
    //     // const { category, countryName, pageSize } = props;
    //     // const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${countryName}&apiKey=551b91c8158344f0a21ae6c49d6598ae&page=${page}&pageSize=${pageSize}`;
    //     // this.setState({ loading: true });
    //     // const data = await fetch(url);
    //     // const pasredJson = await data.json();
    //     // this.setState({
    //     //     articles: pasredJson.articles,
    //     //     totalArticles: pasredJson.totalResults,
    //     //     loading: false,
    //     // });
    //     await this.updateData()
    // }

    const handlePrevious = async () => {
        setPage(page - 1)
        return await this.updateData();
    };
    const handleNext = async () => {
        const pageCount = Math.ceil(this.state.totalArticles / props.pageSize);
        if (!(page + 1 > pageCount)) {
            setPage(page + 1)

            return await this.updateData();
        }
    };



    return (
        <>
            <div className="container my-3">
                <h2 className="text-center" style={{ marginTop: "90px" }}>{props.category} - Top Headlines</h2>
                {/* {loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalArticles}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {!loading &&
                                articles.map((item, index) => {
                                    return (
                                        <div className="col-md-3" key={item.url + index}>
                                            <NewsItem
                                                title={item.title?.slice(0, 44)}
                                                description={item.description?.slice(0, 88)}
                                                imageUrl={item.urlToImage}
                                                newsUrl={item.url}
                                                author={item.author}
                                                date={item.publishedAt}
                                                source={item.source.name}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between my-2">
                    <button
                        disabled={page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevious}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={
                            page + 1 >
                            Math.ceil(this.state.totalArticles / props.pageSize)
                        }
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNext}
                    >
                        Next &#8594;
                    </button>
                </div> */}
            </div>
        </>
    );

}

News.defaultProps = {
    countryName: "in",
    pageSize: 8,
    category: "general",
}

export default News;
