import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";

function App() {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  const toggle = (url) => {
    if (favoriteArticles.some((article) => article.url === url)) {
      setFavoriteArticles(
        favoriteArticles.filter((article) => article.url !== url)
      );
    } else {
      const favoriteArticle = news.find((article) => article.url === url);
      setFavoriteArticles([...favoriteArticles, favoriteArticle]);
    }
  };
  const apiKey = "b1bab72cbe064f68bf9a69092098db50";
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("everything");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Articles = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`
        );
        const article = await res.json();
        console.log(article.articles);
        setNews(article.articles);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    Articles();
  }, [search]);
  return (
    <>
      <div className="banner">
        <div className="heading">
          <h1 className="element">My News Application</h1>
          <Search searchText={(searchQuery) => setSearch(searchQuery)} />
        </div>
      </div>

      {loading ? (
        <h2 className="load">Loading...</h2>
      ) : (
        <section className="card">
          {news.map((info) => {
            const { title, description, publishedAt, author, url } = info;
            const isFavorite = favoriteArticles.some(
              (article) => article.url === url
            );

            return (
              <article className="cards">
                <div
                  className={`star ${isFavorite ? "favorite" : ""}`}
                  onClick={() => toggle(url)}
                >
                  ★
                </div>
                <h2 className="title">{title}</h2>
                <p>{description}</p>

                <ul className="list">
                  <li>{author}</li>
                  <li>{publishedAt}</li>
                </ul>
                <a href={url} target="_blank" className="link">
                  Detail Resource
                </a>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}

export default App;
