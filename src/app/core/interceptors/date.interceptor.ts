function traverseObject(obj: any, transformValue: Function) {
  if (!obj) {
    return obj;
  }

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    let value = obj[key];
    if (typeof value === 'object') {
      obj[key] = traverseObject(value, transformValue);
    } else if (typeof value === 'string' && key.includes('date')) {
      obj[key] = transformValue(value);
    }
  }

  return obj;
}

export function dateInterceptor(): ng.IHttpInterceptor {
  return {
    response: function(response: ng.IHttpResponse<any>) {
      let data = response.data;

      response.data = traverseObject(data, (value: string) => new Date(value));

      return response;
    }
  };
}
