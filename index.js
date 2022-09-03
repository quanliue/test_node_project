const http = require('http');
var d = require('diskinfo');
var disks = require('fs-hard-drive')
const systemDisk = require('system-disk');
var usbDetect = require('usb-detection');
const child = require('child_process');

const request = require('superagent');
const admZip = require('adm-zip');
var unzipper = require('unzipper');

const fs = require('fs');
var axios= require('axios');

usbDetect.startMonitoring();

const hostname = '127.0.0.1';
const port = 4584;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

  // d.getDrives(function(err, aDrives) {

  //   for (var i = 0; i < aDrives.length; i++) {
  //         console.log('Drive ' + aDrives[i].filesystem);
  //         console.log('blocks ' + aDrives[i].blocks);
  //         console.log('used ' + aDrives[i].used);
  //         console.log('available ' + aDrives[i].available);
  //         console.log('capacity ' + aDrives[i].capacity);
  //         console.log('mounted ' + aDrives[i].mounted);
  //         console.log('-----------------------------------------');
  //   }
  // });

  // var logger = fs.createWriteStream('log.txt', {
  //   flags: 'a' // 'a' means appending (old data will be preserved)
  // })
  
  // logger.write('some data\r\n') // append string to your file
  // logger.write('more data\r\n') // again
  // logger.write('and more\r\n') // again

  // try {
  //   // read contents of the file
  //   const data = fs.readFileSync('log.txt', 'UTF-8');

  //   // split the contents by new line
  //   const lines = data.split(/\r?\n/);
  //   console.log("lines =>", lines);
  //   // print all lines
  //   lines.forEach((line) => {
  //       console.log("Line =>", line);
  //   });
  // } catch (err) {
  //     console.error(err);
  // }

  // let url = "https://www.github.com/mmjwatts/ConvexSC/blob/main/Software/Version.py?raw=true";
  // axios.get(url).then((res) => {
  //   console.log("REQ =>", res.data);
  // })
  const repoName = 'node-zip-download-sample';
  const href = `https://raw.githubusercontent.com/mmjwatts/ConvexSC/main/Software`;
  const zipFile = 'Software.zip';
  const source = `${href}/${zipFile}`;


  // TODO: change to the directory instead of the zip that you want to extract
  const extractEntryTo = `${repoName}-master/`;

  // TODO: change to the directory where you want to extract to
  const outputDir = `./${repoName}-master/`;

  request
    .get(source)
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(fs.createWriteStream(zipFile))
    .on('finish', function() {
        // add code below to here
        var zip = new admZip('./Software.zip');
        // zip.extractEntryTo("main/", outputDir, false, true);
        zip.extractAllToAsync(outputDir, true);
        // fs.createReadStream('zipFile').pipe(unzip.Extract({ path: outputDir }))
        // console.log("finish");
    });

});