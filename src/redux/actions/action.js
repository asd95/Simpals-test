const dataRequested = () => ({
  type: "FETCH_REQUEST"
});

const dataLoaded = data => ({
  type: "FETCH_SUCCESS",
  payload: data
});

const dataError = error => ({
  type: "FETCH_FAILURE",
  payload: error
});

const fetchData = (dispatch, testService) => () => {
  dispatch(dataRequested());
  testService
    .getData()
    .then(data => {
      setItemLocalStorage(data);
      dispatch(dataLoaded(data));
    })
    .catch(error => dispatch(dataError(error)));
};

const setItemLocalStorage = data => {
  localStorage.setItem("Posts", JSON.stringify(data));
};

export const addLocalStorageData = data => ({
  type: "ADD_LOCALSTORAGE_DATA",
  payload: data
});

export const deleteArticle = id => ({
  type: "ARTICLE_DELETE",
  payload: id
});

export const addArticle = dataForm => ({
  type: "ADD_ARTICLE",
  payload: dataForm
});

export { fetchData };
