// Not in use until we use TypeScript, because we change return type
export function extractDataInterceptor(): ng.IHttpInterceptor {
  return {
    response: function(response: ng.IHttpResponse<any>) {
      if (response.data) {
        return response.data;
      }

      return response;
    }
  };
}
