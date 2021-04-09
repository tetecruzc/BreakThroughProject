import { Module } from 'vuex';
import RequestsTypes from './methods/requests.methods';
import { RequestsStateInterface } from './interfaces/requests.state.interface';
import { REQUESTS_EMPTY_STATE } from './requests.state';
import { requestsRepository } from '@/modules/requests/repositories/requests.repository';
import { Table } from '../../modules/table/interfaces/table.interface'

// TODO ESTO SE DEBERIA TIPAR, ES DECIR, EN VEZ DE Array<any> = Requests[]
const requests: Module<RequestsStateInterface, any> = {
    namespaced: true,
    state: REQUESTS_EMPTY_STATE,
    getters: {
        [RequestsTypes.getters.GET_HEADER_PRIMARY](state): Array<any> {
            return state.tableRequests.headerPrimary;
        },
        [RequestsTypes.getters.GET_HEADER_SECONDARY](state): Array<any> {
            return state.tableRequests.headerSecondary;
        },
        [RequestsTypes.getters.GET_ITEMS](state): Array<any> {
            return state.tableRequests.items;
        },
        [RequestsTypes.getters.GET_VIEWS](state): Array<any> {
            return state.tableRequests.views;
        },
        [RequestsTypes.getters.GET_STANDARTS](state): Array<any> {
            return state.tableRequests.standarts;
        },
        [RequestsTypes.getters.GET_TOTAL_REQUESTS](state): number {
            return state.totalRequests;
        }
    },
    mutations:{
        [RequestsTypes.mutations.SET_REQUESTS](state, requests: Table): void {
           // state.tableRequests.headerPrimary = requests.headerPrimary
            //state.tableRequests.headerSecondary = requests.headerSecondary
            state.tableRequests.views = requests.views
            state.tableRequests.items = requests.items
            state.tableRequests.standarts = requests.standarts
        },
        [RequestsTypes.mutations.SET_REQUESTS_VIEWS](state, views: any): void { //cambiar tipo
            state.views = views;
        },
        [RequestsTypes.mutations.SET_TOTAL_REQUESTS](state, total_requests: number): void {
            state.totalRequests = total_requests;
        }
    },
    actions:{
        async [RequestsTypes.actions.FETCH_ALL_REQUESTS]({ commit }): Promise<boolean> {
            try {
               // const requests: any = await requestsRepository.getRequests(); 
                const requests : any ={
                    "views": [
                        {
                            name: "Vista Original",
                            "headerPrimary": [
                                {
                                    "name": null,
                                    "key": null,
                                    "shown": true,
                                    "children": [
                                        {
                                            "key": "responsable_de_ciclo"
                                        },
                                        {
                                            "key": "responsable_atc"
                                        },
                                        {
                                            "key": "pais"
                                        },
                                        {
                                            "key": "id"
                                        },
                                        {
                                            "key": "fecha_reg_cicloventa"
                                        },
                                        {
                                            "key": "banco"
                                        },
                                        {
                                            "key": "fiat"
                                        },
                                        {
                                            "key": "tasa"
                                        },
                                        {
                                            "key": "ves"
                                        },
                                        {
                                            "key": "banco_a_retirar"
                                        },
                                        {
                                            "key": "banco_y_beneficiario_"
                                        },
                                        {
                                            "key": "tipo_de_transferencia"
                                        },
                                        {
                                            "key": "verificacion"
                                        },
                                        {
                                            "key": "nombre_del_beneficiario"
                                        },
                                        {
                                            "key": "hora_y_fecha_de_verificacion"
                                        },
                                        {
                                            "key": "hora_y_fecha_de_venta"
                                        }
                                    ]
                                },
                                {
                                    "name": "Datos personales",
                                    "key": "datos_personales",
                                    "shown": true,
                                    "children":[
                                        {
                                            "key": "cliente"
                                        },
                                        {
                                            "key": "cedula"
                                        }
                                    ]
                                },
                                {
                                    "name": "Status",
                                    "key": "estatus",
                                    "shown": true,
                                    "children":[
                                        {
                                            "key": "estatus_de_transferencia"
                                        },
                                        {
                                            "key": "estatus_de_venta"
                                        }
                                    ]
                                }
                            ],
                            headerSecondary: [
                                {
                                    "name": "Responsable de Ciclo",
                                    "key": "responsable_de_ciclo",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Responsable ATC",
                                    "key": "responsable_atc",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Pais",
                                    "key": "pais",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "ID",
                                    "key": "id",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Fecha_Reg_CicloVenta",
                                    "key": "fecha_reg_cicloventa",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Banco",
                                    "key": "banco",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "FIAT",
                                    "key": "fiat",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "TASA",
                                    "key": "tasa",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "VES",
                                    "key": "ves",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Banco a Retirar",
                                    "key": "banco_a_retirar",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Banco y Beneficiario ",
                                    "key": "banco_y_beneficiario_",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Tipo de Transferencia",
                                    "key": "tipo_de_transferencia",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Verificación",
                                    "key": "verificacion",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Nombre del Beneficiario",
                                    "key": "nombre_del_beneficiario",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Hora y Fecha de Verificacion",
                                    "key": "hora_y_fecha_de_verificacion",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Estatus de venta",
                                    "key": "estatus_de_venta",
                                    "shown": true,
                                    "parent": "estatus"
                                },
                                {
                                    "name": "Estatus de transferencia",
                                    "key": "estatus_de_transferencia",
                                    "shown": true,
                                    "parent": "estatus"
                                },
                                {
                                    "name": "Cedula",
                                    "key": "cedula",
                                    "shown": true,
                                    "parent": "datos_personales"
                                },
                                {
                                    "name": "Hora y Fecha de Venta",
                                    "key": "hora_y_fecha_de_venta",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Cliente",
                                    "key": "cliente",
                                    "shown": true,
                                    "parent": "datos_personales"
                                }
                            ]
                        },
                        {
                            name: 'Vista 2',
                            headerPrimary: [
                                {
                                    "name": null,
                                    "key": null,
                                    "shown": true,
                                    "children": [
                                        {
                                            "key": "verificacion"
                                        },
                                        {
                                            "key": "nombre_del_beneficiario"
                                        }
                                    ]
                                },
                                // {
                                //     "name": "Status",
                                //     "key": "estatus",
                                //     "shown": false,
                                //     "children":[
                                //         {
                                //             "key": "estatus_de_transferencia"
                                //         },
                                //         {
                                //             "key": "estatus_de_venta"
                                //         }
                                //     ]
                                // }
                            ],
                            headerSecondary:[
                                {
                                    "name": "Verificación",
                                    "key": "verificacion",
                                    "shown": true,
                                    "parent": null
                                },
                                {
                                    "name": "Nombre del Beneficiario",
                                    "key": "nombre_del_beneficiario",
                                    "shown": true,
                                    "parent": null
                                },
                                // {
                                //     "name": "Estatus de venta",
                                //     "key": "estatus_de_venta",
                                //     "shown": false,
                                //     "parent": "estatus"
                                // },
                                // {
                                //     "name": "Estatus de transferencia",
                                //     "key": "estatus_de_transferencia",
                                //     "shown": false,
                                //     "parent": "estatus"
                                // },
                            ]
                        }
                    ],
                    "items": [
                        {
                            "responsable_de_ciclo": "Alejandro Brancaleoni",
                            "responsable_atc": "Joshua Pérez",
                            "pais": "ARGENTINA",
                            "cliente": "Zaida Coromoto Merchan Quintana",
                            "id": "516AR10051",
                            "fecha_reg_cicloventa": "2021-03-13T09:47:43.000Z",
                            "banco": "Brubank Sergio",
                            "fiat": 1500,
                            "tasa": 11850,
                            "ves": 17775000,
                            "banco_a_retirar": "Banco Mercantil",
                            "banco_y_beneficiario_": "Mercantil - CoinGroup",
                            "tipo_de_transferencia": "Mismo Banco",
                            "verificacion": "Verificado",
                            "nombre_del_beneficiario": "CARLOS RAFAEL TORO",
                            "hora_y_fecha_de_verificacion": "2021-03-13T10:40:14.000Z",
                            "cedula": 6404671,
                            "estatus_de_venta": "Dinero en Cuenta",
                            "estatus_de_transferencia": "Transferido",
                            "hora_y_fecha_de_venta": "2021-03-13T09:57:02.000Z"
                        },
                        {
                            "responsable_de_ciclo": "Alejandro Brancaleoni",
                            "responsable_atc": "David Álvarez",
                            "pais": "COLOMBIA",
                            "cliente": "Smailil Williamny Vasquez Ibarra",
                            "id": "115CO10185",
                            "fecha_reg_cicloventa": "2021-03-13T16:20:17.000Z",
                            "banco": "Bancolombia Simon",
                            "fiat": 57088,
                            "tasa": 0.00196,
                            "ves": 29126531,
                            "banco_a_retirar": "Banesco",
                            "banco_y_beneficiario_": "Banesco - Alfredo Romero",
                            "tipo_de_transferencia": "Mismo Banco",
                            "verificacion": "Verificado",
                            "nombre_del_beneficiario": "LUIS FERNANDO ALMERIDA OROPEZA",
                            "hora_y_fecha_de_verificacion": "2021-03-13T16:38:36.000Z",
                            "cedula": 25590390,
                            "estatus_de_venta": "Dinero en Cuenta",
                            "estatus_de_transferencia": "Transferido",
                            "hora_y_fecha_de_venta": "2021-03-13T16:48:31.000Z"
                        }
                    ],
                    "standarts": [
                        {
                            "key": "verificacion",
                            "colors": {
                                "Verificado": 3,
                                "No Verificado": 2
                            }
                        },
                        {
                            "key": "estatus_de_venta",
                            "colors": {
                                "Dinero en Cuenta": 3
                            }
                        },
                        {
                            "key": "estatus_de_transferencia",
                            "colors": {
                                "Transferido": 3,
                                "No Transferido": 1
                            }
                        }
                    ]
                }
                commit(RequestsTypes.mutations.SET_REQUESTS, requests);
              //commit(RequestsTypes.mutations.SET_TOTAL_REQUESTS, requests.items.length);         
                return true;
            } catch (e) {
                return false;
            }
        },
        async [RequestsTypes.actions.SAVE_REQUEST_VIEW]({ commit }, { userId , header }): Promise<boolean> {
            try {
                console.log(userId)
                console.log(header)
                return true;
            } catch (e) {
                return false;
            }
        },
        async [RequestsTypes.actions.FETCH_REQUEST_VIEWS]({ commit },userId): Promise<boolean> {
            try {
                //const views: any = await requestsRepository.getRequestsViews(userId); 
                let views = [
                    {name: 'Vista 1', headers: [
                        {name: 'Responsable atc', key: 'responsable_atc', shown: true, parent: null},
                        {name: 'Responsable De Ciclo', key: 'responsable_de_ciclo', shown: true, parent: null},
                        {name: 'Pais', key: 'pais', shown: true, parent: null}
                    ]},
                    {name: 'Vista 2', headers: [
                        {name: 'Responsable atc', key: 'responsable_atc', shown: true, parent: null},
                        {name: 'Responsable De Ciclo', key: 'responsable_de_ciclo', shown: true, parent: null}
                    ]}
                ]
                commit(RequestsTypes.mutations.SET_REQUESTS_VIEWS, views);
                return true
            } catch (e) {
                return false;
            }
        }
    }

}

export default requests;