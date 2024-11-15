import "./style.css";
async function getData() {
  try {
    const response = await fetch(
      "https://coinlib.io/api/v1/global?key=XXX&pref=EUR"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      document.querySelector(
        "h1"
      ).textContent = `Global Market Cap: €${marketCap}, BTC Dominance: ${btcDominance}%`;
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find");
  }
}
getData();
