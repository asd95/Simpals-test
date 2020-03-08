import React from "react";
import "./posts.style.scss";
import Article from "../article";
import { connect } from "react-redux";
import { deleteArticle } from "../../redux/actions/action.js";

const Posts = ({ data, deleteArticle }) => {
  const itemsArticle = data.map(({ id, ...props }) => {
    return (
      <Article key={id} {...props} deleteArticle={() => deleteArticle(id)} />
    );
  });
  return <div className="posts card card-body bg-light">{itemsArticle}</div>;
};

const mapStateToProps = ({ posts: { data } }) => ({
  data
});

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: id => dispatch(deleteArticle(id))
  };
};

export default Posts; // Закоментируйте для работы REDUX

// Раскоментируйте для работы REDUX
// export default connect(mapStateToProps, mapDispatchToProps)(Posts);
