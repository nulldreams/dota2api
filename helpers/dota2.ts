import axios, { AxiosInstance } from 'axios'

export class Dota2 {
  private DOTA_URL = 'http://www.dota2.com/heroes/?l=portuguese'
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      url: this.DOTA_URL,
    })
  }

  public heroes() {}
}
