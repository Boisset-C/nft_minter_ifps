/** Connect to Moralis server */
const serverUrl = "https://xhnui3akghdj.usemoralis.com:2053/server";
const appId = "2lBPMPKzcecpMpkitk3HJBSllTLr0nIDFG0fL9ZK";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" });
      console.log(user);
      console.log(user.get("ethAddress"));
    } catch (error) {
      console.log(error);
    }
  }
}

//called as soon as page is loaded
login();
