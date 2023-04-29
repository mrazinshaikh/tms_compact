import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineEventHandler(async (event) => {
    // const allDataFilePath = path.resolve( __dirname, "../../public/alldata.json" );
    const allDataFilePath = path.resolve( __dirname, "../public/alldata.json" );
    // const allDataFilePath = path.resolve("../public/alldata.json" );
    console.log('%cServer Event Handler', 'color: #00ff00;font-size: 20px;');
    console.log(allDataFilePath);
    console.log(__dirname);
    if(getQuery(event).test == 'true'){
      return {
        allDataFilePath,
        __dirname
      }
    }

    // if (event.req.method === 'GET') {
    //   return getAllData();
    // }

    if(event.node.req.method === 'POST'){
      const body = await readBody(event)
      const rsp = new Promise((resolve, reject) => {
        fs.writeFile(allDataFilePath, JSON.stringify(body, null, 2), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })

      rsp
      .then(() => {
        setResponseStatus(event, 202)
      })
      .catch((e) => {
        setResponseStatus(event, 202,e.message)
      })

      // Api route must return something to avoid 404 route not found error
      // return body;
    }

    return getAllData();
});


async function getAllData(){
  const allDataFilePath = path.resolve( __dirname, "../public/alldata.json" );
  return new Promise((resolve, reject) => {
    fs.readFile(allDataFilePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
