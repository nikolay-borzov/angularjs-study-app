export function extractData(response: ng.IHttpResponse<any>): any {
  return response ? response.data : null;
}
