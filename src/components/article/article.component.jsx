import React from "react";
import "./article.style.scss";
import Tag from "../tag";
import CustomButton from "../custom-button";

const Article = ({ title, body: text, tags, deleteArticle }) => {
  const itemsTag = tags.map(tag => {
    return <Tag key={tag} tag={tag} />;
  });
  return (
    <div className="article ">
      <h3 className="title">{title}</h3>
      <p className="text">{text}</p>
      <div className="tags">{itemsTag}</div>
      <CustomButton claz="btn btn-danger btn-sm" onClick={deleteArticle}>
        Удалить
      </CustomButton>
    </div>
  );
};

export default Article;
