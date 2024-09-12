class AppUrl{
  static baseUrl = "http://127.0.0.1:8000";
  static imageUrl = "http://127.0.0.1:8000/storage/";
  static apiUrl = this.baseUrl+"/api";

  // client
  static register = this.apiUrl+"/client/register";
  static login = this.apiUrl+"/client/login";
  static check = this.apiUrl+"/client/check";
  static logout = this.apiUrl+"/client/logout";

  // categories
  static categories = this.apiUrl+"/categories";
  static category_products = this.apiUrl+"/category-products";

  // products
  static products = this.apiUrl+"/products";
  static set_favourite_products = this.apiUrl+"/set-favourite-product";

  // posts
  static posts = this.apiUrl+"/posts";
  static delete_post = this.apiUrl+"/delete-post";
}

export default AppUrl;
