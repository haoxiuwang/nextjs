var ssmlCheck = require("ssml-check");
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech").v1beta1;
// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
async function speech(text, name) {
  var error = await ssmlCheck.check(text);
  console.log(error);
  //return
  const client = new textToSpeech.TextToSpeechClient();
  var request = {
    input: {
      ssml: text,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-E",
      ssmlGender: "FEMALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
    enableTimePointing: ["SSML_MARK"],
  };
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  console.log(response.timepoints);
  await writeFile(name + ".mp3", response.audioContent, "binary");
  await writeFile(name + ".json", JSON.stringify(response.timepoints));
  console.log("Audio content written to file: output.mp3");
}

function to(source, n) {
  var i = 0,
    ssml = "";
  while (i < source.length) {
    item = source[i];
    ssml += `<mark name="${i++}"/>${item.en}<break time="1s" />`;
  }
  ssml = `<speak>${ssml}</speak>`;
  console.log(ssml);
  speech(ssml, n);
}
var source = require("./source.json");
source.forEach((item, i) => to(item, i));
//to(source[5],'5')
