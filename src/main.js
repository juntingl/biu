import registerCommands from './registerCommands';

async function run (argv) {
  try {
    await registerCommands();
  } catch (error) {

  }
}

export default run;
