import axios from 'axios'

const LAPTOP_API_BASE_URL = "http://localhost:8080/api/v1/laptops";

class LaptopService {
    getAllLaptops() {
        return axios.get(LAPTOP_API_BASE_URL);
    }
    // createLaptop(formdata) {
    //     return axios.post(LAPTOP_API_BASE_URL, formdata, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    // }
    createLaptop(laptop) {
        return axios.post(LAPTOP_API_BASE_URL, laptop);
    }
    getLaptops(id) {
        return axios.get(LAPTOP_API_BASE_URL + '/' + id);
    }
    // updateLaptop(Laptop, id) {
    //     return axios.put(LAPTOP_API_BASE_URL + '/' + id, Laptop, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    // }
    updateLaptop(Laptop, id) {
        return axios.put(LAPTOP_API_BASE_URL + '/' + id, Laptop);
    }
    deleteLaptop(id) {
        return axios.delete(LAPTOP_API_BASE_URL + '/' + id);
    }
}

export default new LaptopService()