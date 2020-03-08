
export default class TestDataServices {
  getData = async () => {
    const res = await fetch("posts.json");
    if (!res.ok) {
      throw new Error(`Received ${res.status}`);
    }
    const data = await res.json();

    return new Promise((res) => {
      setInterval(() => {
        res(data);
      }, 2000);
    });
  };
}
