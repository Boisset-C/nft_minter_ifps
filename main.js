/** Connect to Moralis server */
const serverUrl = "https://xhnui3akghdj.usemoralis.com:2053/server";
const appId = "2lBPMPKzcecpMpkitk3HJBSllTLr0nIDFG0fL9ZK";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: "gimme gimme!" });
      initApp();
    } catch (error) {
      console.log(error);
    }
  } else {
    initApp();
  }
}

function initApp() {
  document.querySelector("#app").style.display = "block";
  document.querySelector("#submit_button").onclick = submit;
}

async function submit() {
  //Get image data
  const input = document.querySelector("#input_image");
  let data = input.files[0];

  //Upload image to IPFS
  //data.name takes name from image we've uploaded and create a new file object
  const imageFile = new Moralis.File(data.name, data);
  await imageFile.saveIPFS();
  let imageHash = imageFile.hash();
  console.log(imageFile.ipfs());

  //Create metadata with image hash & data
  let metadata = {
    name: document.querySelector("#input_name").value,
    description: document.querySelector("#input_description").value,
    image: "/ipfs/" + imageHash,
  };
  //Upload Metadata to IPFS
  const jsonFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await jsonFile.saveIPFS();
  let metadataHash = jsonFile.hash();
  console.log(metadataHash);
  //Upload to Rarible (plugin)
}

//called as soon as page is loaded
login();
