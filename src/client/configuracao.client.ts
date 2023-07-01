import axios, { AxiosInstance } from "axios";

import { Configuracao } from "@/model/configuracao";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

class ConfiguracaoClient {
    
    private axiosClient : AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081/configuracao',
            headers: {'Content-Type' : 'application/json'}
        });
    }

    public async findById(id : number) : Promise<Configuracao> {
        try {
            return (await this.axiosClient.get<Configuracao>(`/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Configuracao[]> {
        try {
            return (await this.axiosClient.get<Configuracao[]>(`/findAll`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(configuracao : Configuracao) : Promise<string> {
        try {
            return (await this.axiosClient.post<string>('', configuracao)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }


    public async editar(id: number, configuracao : Configuracao) : Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`${id}`, configuracao)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest : PageRequest) : Promise<PageResponse<Configuracao>> {
        try {
            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField}, ${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Configuracao>>(requestPath, {params : {filtros : pageRequest.filter} })).data
        } catch (error : any) {
            return Promise.reject(error.response)
        } 
    }

    // public async obterConfiguracao(): Promise<Configuracao> {
    //     try {
    //       const response = await this.axiosClient.get<Configuracao>('/');
    //       return response.data;
    //     } catch (error) {
    //       throw new Error('Erro ao obter a configuração: ' + error.message);
    //     }
    //   }
    
}

export default new ConfiguracaoClient();