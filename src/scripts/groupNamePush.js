import fs from 'fs'

const BASE_URL = '../assets/data.json'
/**
 * Grabs the whole todo storage file. NOTE: might explore multi-file groupings
 * @returns returns data in a json format 
 * 
 */

function getTodoGroup() {

  // get data
  const data = fs.readFileSync('data.json');
  const formated_data = JSON.parse(data);
  console.log(formated_data)

  // return data
  return formated_data
}

/**
 * 
 * @param new_data - new todo group json data to be added
 */

export default function pushTodoGroup(new_data) {
  // start function
  console.log('starting data push')
  console.log('data: ', new_data)

  // get data - new function? 
  const old_data = getTodoGroup()
  console.log('old data: ', old_data)

  // combine old data with new data
  const combined_data = old_data.push(new_data)
  console.log('combined data: ', combined_data)

  // format
  const formated_new_data = JSON.stringify(myObject);

  // add data to file
  fs.writeFile(BASE_URL, formated_new_data, err => {
    // error checking
    if (err) throw err;

    console.log("New data added");
  });
}