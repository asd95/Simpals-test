import React, { Component } from "react";
import Header from "../header";
import Posts from "../posts";
import FormAddArticle from "../form-add-article";
import Spinner from "../spinner";

//  Библиотека Redux предназначена для управления состоянием.
//  Чем больше наше приложение, тем хуже мы контролируем процесс написания кода и его сложней поддерживать.
//  В нашем случае мы вполне можем обойтись без неё и не бояться так называемого prop drilling.
//  Но я решил показать для наглядности работу с этой библиотекой.
import { connect } from "react-redux";
import { withTestService } from "../hoc";
import { compose } from "../../utils/";
import { fetchData, addLocalStorageData } from "../../redux/actions/action.js";

import TestDataService from "../../services/test.services";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.testDataService = new TestDataService(); //  создаем объект, который отдельно дает все необходимое для получение данных с
    // сервера. В данном случае у нас есть файл json.

    this.state = {
      data: null,
      spinner: true,
      // решил иммитировать загрузку данных с сервера при получении данных из json-файла и для лучшего UX использовал индикатор загрузки.
      // сделано для того чтобы пользователь понимал, что ничего не сломано, все работает, нужно просто подождать.
      error: false
    };
  }

  componentDidMount() {
    // ----> именно в этой функции жизненного цикла компонентов мы загружаем данные с фэйк сервера и помещаем их в наш state.

    //  получаем массив объектов из json-файла, помещаем в state и LocalStorage
    if (
      localStorage.getItem("Posts") == null ||
      localStorage.getItem("Posts") === "[]"
    ) {
      this.testDataService
        .getData()
        .then(data => {
          this.setState({ data, spinner: false });
          this.setItemLocalStorage(data);
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: true });
        });
      return;
    }

    //  в случае если наше приложение до этого работало с LocalStorage, то те данные что сохранили в нем помещаем в state.
    //  при следующией перезагрузки страницы, наш браузер при рендеринге не будет запрашивать данные у стороннего API.
    //  это означает что не будет большой нагрузки на страницу. В нашем случае не будет видно, но при большом объеме данных может помочь.
    const data = JSON.parse(localStorage.getItem("Posts"));
    this.setState({ data, spinner: false });
  }

  onDelete = id => {
    //  -----> Функция удаляющая выбранный пост. Тут важно отметить один нюанс. В react-е нельзя изменять старый state напрямую. Связано это с тем, что
    //  он может использоваться другими компонентами.

    this.setState(({ data }) => {
      const index = this.findId(data, id);
      const newData = [...data.slice(0, index), ...data.slice(index + 1)];
      this.setItemLocalStorage(newData);
      return {
        data: newData
      };
    });
  };

  addArticle = (title, body, tags) => {
    // -----> Функция добавляет пост. здесь так же мы не можем изменять наш state напрямую. Как и везде в react приложениях.

    const { data } = this.state;
    let id = !data.length ? 1 : data[data.length - 1].id + 1;
    const newArticle = this.createItem(title, body, tags, id);

    this.setState(({ data }) => {
      const newData = [...data, newArticle];
      this.setItemLocalStorage(newData);
      return {
        data: newData
      };
    });
  };

  //  ----> находит элемент по индексу
  findId(data, id) {
    return data.findIndex(item => item.id === id);
  }

  //  Отдельно создали функцию возвращающая объект из переданных в параметры данных
  createItem(title, body, tags, id) {
    return {
      id,
      title,
      body,
      tags
    };
  }

  // функция работающая с LocalStorage
  setItemLocalStorage(data) {
    localStorage.setItem("Posts", JSON.stringify(data));
  }

  render() {
    const { data, spinner, error } = this.state;

    if (error) {
      return <h1>Ошибка сервера. Попробуйте позже </h1>;
    }

    const posts = spinner ? (
      <Spinner />
    ) : (
      <Posts data={data} deleteArticle={this.onDelete} />
    );

    return (
      <div className="container app">
        <Header />
        <FormAddArticle addArticle={this.addArticle} />
        {posts}
      </div>
    );
  }
}

// /////////////////////////////// РАБОТА С REDUX. Раскомментируйте этот код, и добавьте в комментарий предыдущий чтоб заработало
// class App extends Component {
//   componentDidMount() {
//     if (
//       localStorage.getItem("Posts") == null ||
//       localStorage.getItem("Posts") === "[]"
//     ) {
//       this.props.fetchData();
//       return;
//     }
//     const data = JSON.parse(localStorage.getItem("Posts"));
//     this.props.addLocalStorageData(data);
//   }

//   render() {
//     const { spinner, error } = this.props;

//     if (error) {
//       return <h1> Ошибка сервера. Попробуйте позже </h1>;
//     }

//     const posts = spinner ? <Spinner /> : <Posts />;

//     return (
//       <div className="container app">
//         <Header />
//         <FormAddArticle />
//         {posts}
//       </div>
//     );
//   }
// }

// // получаем данные из нашего STORE
// const mapStateToProps = ({ posts: { data, spinner, error } }) => {
//   return {
//     data,
//     spinner,
//     error
//   };
// };

// // Диспатчим экшены в наш редюсер и менаем за счет них state
// const mapDispatchToProps = (dispatch, { testService }) => {
//   return {
//     fetchData: fetchData(dispatch, testService),
//     addLocalStorageData: data => dispatch(addLocalStorageData(data))
//   };
// };

// // ну а тут я сделал некую композицию из коннэкта к стору и соединение с нашим сервисом, который предоставляет доступ для работы
// // с различными API-ми
// export default compose(
//   withTestService(),
//   connect(mapStateToProps, mapDispatchToProps)
// )(App);
