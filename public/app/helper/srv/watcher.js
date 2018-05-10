const fs = require('fs');
const { sep } = require('path');
const { Transform } = require('stream');

const { Server } = require('net');

const server = new Server();
server.listen(9997);

let socket = null;

server.on('connection', s => {
  socket = s;
});

const str = `HTTP/1.1 200 OK\r\nreload: truen\r\nAccess-Control-Allow-Origin: *\r\n\r\n`;

class ChangeHTML extends Transform {
  constructor(componentName) {
    super();
    this.sep = '##';
    this.componentName = `cmp-${componentName}-cmp-`;
    this.body = '';
  }
  _transform(chunk, encoding, cb) {
    if (chunk === null) {
      this.push(this.body);
      this.push(null);
      cb();
      return;
    }

    this.body += chunk;
    if (chunk[chunk.length - 1] === '#') {
      //
      cb();
    } else {
      while (this.body.indexOf(this.sep) !== -1) {
        this.body = this.body.replace(this.sep, this.componentName);
      }
      this.push(this.body);
      this.body = '';
      cb();
    }
  }
}

class ChangeCSS extends Transform {
  constructor(componentName) {
    super();
    this.sep = '##';
    this.componentName = `cmp-${componentName}-cmp-`;
    this.last = '';
  }
  _transform(chunk, encoding, cb) {
    let el = (this.last + chunk).split('\n');
    if (!el) {
      this.push(this.last);
      cb();
      return;
    }

    this.last = el.pop();

    el = el.map(l => {
      let m = l.match(/^\.[a-zA-Z\-_\s\>:<]+\{/);
      if (m) {
        m = m[0]
          .replace('.', '')
          .replace('{', '')
          .trim();
        m = l.replace(
          /^\.[a-zA-Z\-_\s\>:<]+\{/,
          `.${this.componentName}${m} {`,
        );
        console.log(m);
        return m;
      }
      return l;
    });

    el.forEach(e => this.push(`${e}\n`));

    cb();
  }
}

const fileChanged = {};

const dirToWatch = '../public/app/components';
const watcher = fs.watch(dirToWatch, { recursive: true });

watcher.on('change', (event, filePath) => {
  if (!filePath) return;
  const now = Number(Date.now());

  if (!fileChanged[filePath] || now - fileChanged[filePath] > 500) {
    fileChanged[filePath] = now;
  } else {
    return;
  }
  const nameArr = filePath.split(sep);
  const fileName = nameArr.pop();
  const componentName = nameArr[nameArr.length - 1];
  const fileNameArr = fileName.split('.');
  const extension = fileNameArr.pop();
  const type = fileNameArr.pop();

  if (type !== 'template' && (extension === 'html' || extension === 'css')) {
    // const  = pop();

    const createPath = (template, ext) =>
      `${[dirToWatch, ...nameArr, componentName].join('/')}${
        template ? template : ''
      }.${ext ? ext : '.html'}`;

    const classChangeHTML = new ChangeHTML(componentName);
    const classChangeCSS = new ChangeCSS(componentName);
    const writeStream = fs.createWriteStream(createPath('.template', 'html'));

    try {
      // const fileHTMLPath = `${[...nameArr, componentName].join(sep)}.html`;
      const fileHTML = fs.createReadStream(createPath('', 'html'));
      fileHTML.on('error', () => {});
      const fileCSS = fs.createReadStream(createPath('', 'css'));
      fileCSS.on('error', () => {});
      classChangeHTML.pipe(writeStream, { end: false });
      fileHTML.pipe(classChangeHTML, { end: false });
      fileHTML.on('end', () => {
        if (fileCSS) {
          classChangeHTML.pause();
          classChangeHTML.unpipe(writeStream);
          writeStream.write('\n\n\n\n');
          writeStream.write('<style>\n');
          classChangeCSS.pipe(writeStream, { end: false });
          fileCSS.pipe(classChangeCSS, { end: false });
          fileCSS.on('end', () => {
            writeStream.write('\n</style>');
            writeStream.close();
            if (socket) {
              socket.write(str);
            }
          });
        } else {
          writeStream.close();
          if (socket) {
            socket.write(str);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
    // try {
    //   const fileCSSPath = `${[...nameArr, componentName].join(sep)}.css`;
    //   const fileCSS = fs.createReadStream(fileCSSPath);
    // } catch (e) {}
    console.log('--------', event);
    console.log(fileName);
    console.log(componentName);
  }
});
