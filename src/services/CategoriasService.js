import Api from '@/services/Api'
const API_USER = "";
const API_URL = "/";

export default {

    getCategorias(credentials) {    
        return Api().get(API_URL + API_USER + "categorias?_limit=-1", credentials)
    },
 
  
}