export function sendJSONResponse(res, statusCode, response) {
  res.writeHeaders(statusCode, { 'Content-type': 'applications/json' });
  res.end(JSON.stringify(response));
}