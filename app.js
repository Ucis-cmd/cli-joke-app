const { program } = require("commander");
const axios = require("axios");

const tellJoke = async (options) => {

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  if(!options.both && !options.single && !options.twopart){
    console.log("Please select joke type");
    return;
  }

  let link = "https://v2.jokeapi.dev/joke/Any?safe-mode";                                
  if (options.single) link += "&type=single";
  if (options.twopart) link += "&type=twopart";

  try {
    const res = await axios.get(link);
    const joke = res.data;
    if (joke.type === "single") {
      console.log(joke.joke);
    } else {
      console.log(joke.setup);
      await delay(5000);
      console.log(joke.delivery);
    }
  } catch (err) {
    console.log(err);
  }
};

program.version("1.0.0").description("A simple CLI app");

program
  .command("joke")
  .description("Tells you a joke.")
  .option("-s, --single", "Joke type: single joke")
  .option("-t, --twopart", "Joke type: two part")
  .option("-b, --both", "Select both joke types")
  .action((options) => {
    tellJoke(options);
  });

program.parse(process.argv);
