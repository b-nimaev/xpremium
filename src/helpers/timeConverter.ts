export default function (timestmap: number) {
  let date = new Date(timestmap * 1000);
  let hours = "0" + date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let day = "0" + date.getDate();
  let month = "0" + (date.getMonth() + 1);
  let year = date.getFullYear();

  let result =
    day.substr(-2) +
    "/" +
    month.substr(-2) +
    "/" +
    year +
    " " +
    hours.substr(-2) +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);
    return result
}
