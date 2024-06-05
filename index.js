
const myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));