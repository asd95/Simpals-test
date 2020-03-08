const initialState = {
  data: [],
  spinner: true,
  error: false
};

const postsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        data: [],
        spinner: true,
        error: null
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        spinner: false,
        error: false
      };
    case "FETCH_FAILURE":
      return {
        data: [],
        spinner: false,
        error: action.payload
      };
    case "ADD_LOCALSTORAGE_DATA":
      return {
        data: action.payload,
        spinner: false,
        error: false
      };

    case "ARTICLE_DELETE":
      return deleteArticle(state, action.payload);

    case "ADD_ARTICLE":
      return addArticle(state, action.payload);
    default:
      return state;
  }
};

const deleteArticle = (state, id) => {
  const { data } = state;

  const index = findId(data, id);
  const newData = [...data.slice(0, index), ...data.slice(index + 1)];
  setItemLocalStorage(newData);
  return {
    ...state,
    data: newData
  };
};

const addArticle = (state, itemData) => {
  const { data } = state;
  const { title, body, tags } = itemData;
  let id = !data.length ? 1 : data[data.length - 1].id + 1;
  const newArticle = createItem(title, body, tags, id);

  const newData = [...data, newArticle];
  setItemLocalStorage(newData);
  return {
    ...state,
    data: newData
  };
};

const createItem = (title, body, tags, id) => {
  return {
    id,
    title,
    body,
    tags
  };
};

const findId = (data, id) => {
  return data.findIndex(item => item.id === id);
};
const setItemLocalStorage = data => {
  localStorage.setItem("Posts", JSON.stringify(data));
};

export default postsDataReducer;
