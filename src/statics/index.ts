const experience = "work-experience";
const featured = "featured";
const empty = "empty";

const storeURL = "http://config.junshiun.com/";
// const storeURL = "http://config.junshiun.com.s3-website-ap-southeast-1.amazonaws.com/";
const configFetch = {
  url: storeURL + "config.json",
  options: {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // next: { revalidate: 3600 },
    next: { revalidate: 0 }
  }
}

const Statics = {
  experience,
  featured,
  storeURL,
  empty,
  configFetch
};

export default Statics;
