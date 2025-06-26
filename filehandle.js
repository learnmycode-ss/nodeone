const fs = require("fs");
const sw = process.argv[2];
const input = process.argv;
const path = require("path");

let dirpath;
switch (sw) {
  case "1":
    if (input[3] == "add") {
      fs.writeFileSync(input[4], input[5]); // input 4 is the file name and input 5 is the content
    } else if (input[3] == "remove") {
      fs.unlinkSync(input[4]); //input 4 is the file name
    } else {
      console.log("Invalid option");
    }
    break;
  case "2":
    dirpath = path.join(__dirname, "file");
    const int = input[3];
    const int2 = input[4];
    for (i = 0; i < int2; i++) {
      fs.writeFileSync(
        path.join(dirpath, int + i + ".txt"),
        "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto voluptatibus sint itaque quos ex voluptatum quibusdam praesentium quam incidunt voluptate, quasi fuga eum, cum magni? Quisquam ex dicta perspiciatis autem praesentium enim aperiam laudantium assumenda. Deserunt recusandae reprehenderit, nesciunt debitis saepe quae, magnam dolore at officiis minus, provident hic!"
      ); //dirpath is the directory path and int+i is the file name
    }
    break;
  case "3":
    dirpath = path.join(__dirname, "file");
    fs.readdir(dirpath, (err, files) => {
      console.log(files);
      files.forEach((item) => {
        console.log(item);
      });
    });
    break;

    case '4':
    // crud fs
    dirpath = path.join(__dirname, "file");
    filePath = `${dirpath}/test.txt`;

    // create file
    fs.writeFileSync(filePath, "Hello, World!");

    fs.readFile(filePath,'utf-8',(e,data)=>{
        console.log(data);
    })
    fs.appendFile(filePath,'\n helo this is append',(e)=>{
        if(e) throw e;
        console.log("update file");
    });
    fs.rename(filePath,`file/test99.txt`,(e)=>{
        if(e) throw e;
        console.log("rename file");
        filePath = `file/test99.txt`;
    })

     fs.readFile(filePath,'utf-8',(e,data)=>{
        console.log("-----------------------------------------------");
        console.log(data);
    })
    fs.unlink(filePath,(e)=>{
        if(e) throw e;
        console.log("delete file");
    })


    break;

  default:
    console.log("invalid input");
}
