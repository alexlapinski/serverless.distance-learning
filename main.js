const R = require('ramda');
const config = require('./config');
const fetcher = require('./page-fetcher');
const parser = require('./page-parser');

const levelToSpace = (level) => R.repeat(' ', 2 * level).join('');

const printListItem = (item, level = 0) => {
  
  if (item && item.link) {
    console.log(`${levelToSpace(level)}[${item.link.text}](${item.link.url})`);
  }

  if (item.children) {
    printList(item.children, level + 1);
  }
}

const printList = (list, level = 0) => list.forEach(item => printListItem(item, level));

const handler = (event, context, callback) => {

  const url = 'https://www.cbsd.org/Page/47195';

  return fetcher.getIndexPage(url)
    .then(parser.extractNavigation)
    .then(navigation => {

      printList(navigation);
      
      const response = {
        statusCode: 200,
        body: JSON.stringify(navigation),
      };
    
      callback(null, response);

    })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};




module.exports.handler

if (require.main === module) {
  handler(null, null, (_, res) => {
    console.log(JSON.stringify(res, null, 2));
  }).then(() => console.log('Done'));
}