class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // outros métodos para trabalhar com a API
}

export const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "8820b1e8-7480-43fe-bdac-7de878a9d067",
    "Content-Type": "application/json",
  },
});
