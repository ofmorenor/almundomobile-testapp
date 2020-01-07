// this file uses request http client library to make
// basic http request even easier and using promises.

'use strict';
const request = require('request');

exports.get = function(url){
  const options =  createRequestOptions('GET', url);
  return makeHttpRequest(options);
};

exports.post = function(url, dataObject){
  const options = createRequestOptions('POST', url, dataObject);
  return makeHttpRequest(options);
};

exports.put = function(url, dataObject){
  const options = createRequestOptions('PUT', url, dataObject);
  return makeHttpRequest(options);
};

exports.delete = function(url){
  const options = createRequestOptions('DELETE', url);
  return makeHttpRequest(options);
};

// =========================================================

function createRequestOptions(httpReqType, url, dataObject){
  const options = { method: httpReqType, url: url };

  if (dataObject) {
    options.headers = { 'Content-type': 'application/json' };
    options.body = JSON.stringify(dataObject);
  }

  return options;
}

function makeHttpRequest(requestOptions){
  return new Promise((resolve, reject) => {
    request(requestOptions, (err, res, body) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(body);
      }
    });
  });
}

