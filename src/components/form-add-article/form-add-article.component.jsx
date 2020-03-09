import React, { Component } from "react";
import "./form-add-article.style.scss";
import CustomButton from "../custom-button";
import { connect } from "react-redux";
import { addArticle } from "../../redux/actions/action.js";

//  Я думал использовать библиотеку form-redux для взаимодействия и хранения данных формы в отдельном store
//  чтоб полноценно использовать паттерн который дает нам redux. Но думаю что вы запутайтесь
//  в моих комментариях и загрузите себя лишней работой. Думаю достаточно того, что я показал и без этой библиотеки.
export class FormAddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      tags: ""
    };
  }

  onChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  // метод отправляющий данные вверх к компоненту App где мы можем использовать вводимые данные для создания поста.
  onSubmit = e => {
    e.preventDefault();

    const { title, body, tags } = this.state;
    if (title === "" || body === "" || tags === "") {
      return;
    }
    const arrTags = tags.split(",");

    // this.props.addArticle({title, body, arrTags}); для redux. Мне было удобней отправить объект. Раскомментируйте для работы redux
    this.props.addArticle(title, body, arrTags); // закоментируйте для работы с redux

    this.setState({
      title: "",
      body: "",
      tags: ""
    });
  };

  render() {
    const { title, body, tags } = this.state;

    return (
      <form onSubmit={this.onSubmit} className=" col-lg-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="заголовок"
            value={title} // привязываем вводимые данные к state для полного контроля
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="body"
            placeholder="запись"
            value={body}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="tags"
            placeholder="тег, еще тег"
            value={tags}
            onChange={this.onChange}
          />
        </div>
        <CustomButton type="submit" claz="btn btn-primary">
          Добавить
        </CustomButton>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addArticle: formData => dispatch(addArticle(formData))
  };
};

export default FormAddArticle;

// export default connect(null, mapDispatchToProps)(FormAddArticle);
