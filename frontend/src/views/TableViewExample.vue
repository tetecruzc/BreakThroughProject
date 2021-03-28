<template>
  <div class="home">
    <b-row class="my-4 " align-h="around">
            <b-col >
                <Box title="Filtros">
                        <b-row>
                            <b-col>
                                <div class="form-group">
                                    <b-dropdown :text="perPage.toString()" variant="outline" >
                                    <b-dropdown-item  href="#" v-for="(quantity,i) in [2,3,4]" :key="i" @click="perPage = quantity">{{quantity}}</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </b-col>
                            <b-col>
                                    <div class="form-group">
                                        <b-dropdown :text="currentFilter.name" variant="outline" >
                                        <b-dropdown-item  href="#" v-for="(header,i) in headerFilters" :key="i" @click="changeFilter(header)">{{header.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                    <div class="form-group">
                                        <b-icon icon="search" class="icon-dark b-icon--input" aria-hidden="true" ></b-icon>
                                        <div class="form_group--input field">
                                            <input type="input" class="form__field" placeholder="Ingrese filtro" name="filter" id='filter' required v-model="textFilter"/>
                                            <label for="name" class="form__label">Ingrese filtro</label>
                                        </div>
                                    </div>
                            </b-col>
                            <b-col>
                                <!--
                                    <div class="form-group">
                                        <b-dropdown :text="currentOrderFilter.name" variant="outline" >
                                            <b-dropdown-item  href="#" v-for="(header,i) in headerFilters" :key="i" @click="changeOrderFilter(header)">{{header.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                -->
                                 <FormTag :options="headerFilters" @setTags="setOrderFilters"/>
                            </b-col>
                            <b-col>
                                    <div class="form-group">
                                        <b-dropdown :text="currentView.name" variant="outline" >
                                            <b-dropdown-item  href="#" v-for="(view,i) in views" :key="i" @click="changeView(view)">{{view.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                    <b-button class="button-primary my-3 " block @click="saveView">Añadir vista actual</b-button>
                            </b-col>
                        </b-row>
                </Box>
            </b-col>
        </b-row> 
    <TableTest :addColumnButton="true" :header1="header1" :header2="header2" :items="items" :perPage="perPage" :currentFilter="currentFilter" :currentOrderFilter="currentOrderFilter" :textFilter="textFilter" @sendHeaders="getHeaderFilters"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import UsersTable from '../modules/users/components/UsersTable.vue'; // @ is an alias to /src
import TableTest from '../components/TableTest.vue'
import Box from '../components/utilities/Box.vue'
import FormTag from '../components/utilities/FormTag.vue'
import {users,profiles} from '../store/namespaces';
import UsersMethods from '../store/users/methods/users.methods';
import ProfilesMethods from '../store/profiles/methods/profiles.methods';
import { User } from '../modules/users/interfaces/users.interface';
@Component({
  components: {
    UsersTable,
    TableTest,
    Box,
    FormTag
  },
})
export default class TableViewExample extends Vue {
    perPage : number = 3;
    textFilter : string = ''
    currentFilter : any = {}
        views =[
        {name: 'Vista 1'},
        {name: 'Vista 2'}
    ]
    currentOrderFilter : Array<any> = []
    currentView : any = this.views[0]
    headerFilters: Array<any> = []
header1 = [{name: null, key:null, shown: true, children: [{key: "responsable_de_ciclo"},{ key: "responsable_atc"},{ key: "pais"},{key:"cliente"},{key:"id"},{key:"fecha_reg_cicloventa"},{key:"banco"},{key:"fiat"}, {key:"tasa"}, {key:"tes"}, {key:"banco_a_retirar"},{key:"banco_y_beneficiario_"},{key:"tipo_de_transferencia"},{key:"verificacion_"},{key:"nombre_del_beneficiario"},{key:"hora_y_fecha_de_verificacion"},{key:"cedula"},{key:"estatus_de_venta"},{key:"estatus_de_transferencia"},{key:"hora_y_fecha_de_venta"}]}];
header2= [
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
"name": "Cliente",
"key": "cliente",
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
"name": "Verificación ",
"key": "verificacion_",
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
"name": "Cedula",
"key": "cedula",
"shown": true,
"parent": null
},
{
"name": "Estatus de venta",
"key": "estatus_de_venta",
"shown": true,
"parent": null
},
{
"name": "Estatus de transferencia",
"key": "estatus_de_transferencia",
"shown": true,
"parent": null
},
{
"name": "Hora y Fecha de Venta",
"key": "hora_y_fecha_de_venta",
"shown": true,
"parent": null
},
{
"name": "Hora y Fecha de Transferencia",
"key": "hora_y_fecha_de_transferencia",
"shown": true,
"parent": null
},
{
"name": "Tiempo de Verificacion",
"key": "tiempo_de_verificacion",
"shown": true,
"parent": null
},
{
"name": "Tiempo de Venta",
"key": "tiempo_de_venta",
"shown": true,
"parent": null
},
{
"name": "Tiempo por Transferir",
"key": "tiempo_por_transferir",
"shown": true,
"parent": null
},
{
"name": "Comision",
"key": "comision",
"shown": true,
"parent": null
},
{
"name": "Monto Pago Movil",
"key": "monto_pago_movil",
"shown": true,
"parent": null
},
{
"name": "Bancos_fuera_Pool",
"key": "bancos_fuera_pool",
"shown": true,
"parent": null
},
{
"name": "Responsable_Transferencia",
"key": "responsable_transferencia",
"shown": true,
"parent": null
},
{
"name": "Responsable_Ventas",
"key": "responsable_ventas",
"shown": true,
"parent": null
},
{
"name": "Tiempo Total",
"key": "tiempo_total",
"shown": true,
"parent": null
}
]
items= [
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
"verificacion_": "Verificado",
"nombre_del_beneficiario": "CARLOS RAFAEL TORO",
"hora_y_fecha_de_verificacion": "2021-03-13T10:40:14.000Z",
"cedula": 6404671,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T09:57:02.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T10:51:41.000Z",
"tiempo_de_verificacion": "00:52:31",
"tiempo_de_venta": "00:09:19",
"tiempo_por_transferir": "00:11:27",
"comision": 500,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Jose Morales",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "01:03:58"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "Joshua Pérez",
"pais": "COLOMBIA",
"cliente": "Jenifer Alejandra Suarez Delgado",
"id": "571CO10326",
"fecha_reg_cicloventa": "2021-03-13T09:48:21.000Z",
"banco": "Bancolombia Samuel",
"fiat": 140000,
"tasa": 0.00198,
"ves": 70707071,
"banco_a_retirar": "Banesco",
"banco_y_beneficiario_": "Banesco - Alfredo Romero",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "YASENIA DELGADO VALERO",
"hora_y_fecha_de_verificacion": "2021-03-13T10:53:30.000Z",
"cedula": 13487418,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T09:57:46.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T10:57:00.000Z",
"tiempo_de_verificacion": "01:05:09",
"tiempo_de_venta": "00:09:25",
"tiempo_por_transferir": "00:03:30",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Gabriel Bello",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "01:08:39"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "Alison Ramírez",
"pais": "CHILE",
"cliente": "Nurvia Carolina Padrino Goudet",
"id": "301CL11951",
"fecha_reg_cicloventa": "2021-03-13T09:49:45.000Z",
"banco": "Banco Estado Empresa",
"fiat": 15000,
"tasa": 2380,
"ves": 35700000,
"banco_a_retirar": "Banco Mercantil",
"banco_y_beneficiario_": "Mercantil - CoinGroup",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "NURVIA CAROLINA PADRINO GOUDET",
"hora_y_fecha_de_verificacion": "2021-03-13T09:49:47.000Z",
"cedula": 17541734,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T09:57:14.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T10:07:29.000Z",
"tiempo_de_verificacion": "00:00:02",
"tiempo_de_venta": "00:07:29",
"tiempo_por_transferir": "00:10:15",
"comision": 500,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Jose Morales",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:17:44"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "Alison Ramírez",
"pais": "CHILE",
"cliente": "Vanesa Cristina Espitia Barraco",
"id": "655CL11256",
"fecha_reg_cicloventa": "2021-03-13T09:49:24.000Z",
"banco": "Banco Estado Empresa",
"fiat": 20000,
"tasa": 2380,
"ves": 47600000,
"banco_a_retirar": "Banesco",
"banco_y_beneficiario_": "Banesco - Alfredo Romero",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "FREDDY ESPITIA",
"hora_y_fecha_de_verificacion": "2021-03-13T09:52:11.000Z",
"cedula": 4348608,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T10:03:08.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T10:03:16.000Z",
"tiempo_de_verificacion": "00:02:47",
"tiempo_de_venta": "00:13:44",
"tiempo_por_transferir": "00:00:08",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Gabriel Bello",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:13:52"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "Alison Ramírez",
"pais": "CHILE",
"cliente": "Catherine Corredor",
"id": "283CL11750",
"fecha_reg_cicloventa": "2021-03-13T09:50:04.000Z",
"banco": "Banco Estado Empresa",
"fiat": 30000,
"tasa": 2380,
"ves": 71400000,
"banco_a_retirar": "Banco de Venezuela",
"banco_y_beneficiario_": "Banco de Venezuela - Eduardo Requena",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "LUZ YOLANDA CORREDOR ROMERO",
"hora_y_fecha_de_verificacion": "2021-03-13T09:52:12.000Z",
"cedula": 786258,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T11:20:05.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T11:20:38.000Z",
"tiempo_de_verificacion": "00:02:08",
"tiempo_de_venta": "01:30:01",
"tiempo_por_transferir": "00:00:33",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Jose Morales",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "01:30:34"
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
"verificacion_": "Verificado",
"nombre_del_beneficiario": "LUIS FERNANDO ALMERIDA OROPEZA",
"hora_y_fecha_de_verificacion": "2021-03-13T16:38:36.000Z",
"cedula": 25590390,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T16:48:31.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T16:49:39.000Z",
"tiempo_de_verificacion": "00:18:19",
"tiempo_de_venta": "00:28:14",
"tiempo_por_transferir": "00:01:08",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Gabriel Bello",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:29:22"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "David Álvarez",
"pais": "COLOMBIA",
"cliente": "Smailil Williamny Vasquez Ibarra",
"id": "115CO10185",
"fecha_reg_cicloventa": "2021-03-13T16:21:41.000Z",
"banco": "Bancolombia Simon",
"fiat": 57088,
"tasa": 0.00196,
"ves": 29126531,
"banco_a_retirar": "Banco de Venezuela",
"banco_y_beneficiario_": "Banco de Venezuela - Eduardo Requena",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "JOSE JESUS MUJICA GIL",
"hora_y_fecha_de_verificacion": "2021-03-13T16:38:37.000Z",
"cedula": 16037197,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T16:52:45.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T16:52:46.000Z",
"tiempo_de_verificacion": "00:16:56",
"tiempo_de_venta": "00:31:04",
"tiempo_por_transferir": "00:00:01",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Jose Morales",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:31:05"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "David Álvarez",
"pais": "COLOMBIA",
"cliente": "Leandro Antonio Bardallo Ordoñez",
"id": "806CO10456",
"fecha_reg_cicloventa": "2021-03-13T16:23:15.000Z",
"banco": "Bancolombia Reinaldo",
"fiat": 44000,
"tasa": 0.00196,
"ves": 22448980,
"banco_a_retirar": "Banco de Venezuela",
"banco_y_beneficiario_": "Banco de Venezuela - Eduardo Requena",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "LUIS RAMON FLORES BETANCOURT",
"hora_y_fecha_de_verificacion": "2021-03-13T16:32:40.000Z",
"cedula": 13206111,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T16:38:12.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T16:38:14.000Z",
"tiempo_de_verificacion": "00:09:25",
"tiempo_de_venta": "00:14:57",
"tiempo_por_transferir": "00:00:02",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Jose Morales",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:14:59"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "David Álvarez",
"pais": "COLOMBIA",
"cliente": "Leandro Antonio Bardallo Ordoñez",
"id": "806CO10456",
"fecha_reg_cicloventa": "2021-03-13T16:23:50.000Z",
"banco": "Bancolombia Reinaldo",
"fiat": 89000,
"tasa": 0.00196,
"ves": 45408163,
"banco_a_retirar": "Banco de Venezuela",
"banco_y_beneficiario_": "Banco de Venezuela - Eduardo Requena",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "YHONNY ANTONIO FLORES BENTANCOURTH",
"hora_y_fecha_de_verificacion": "2021-03-13T16:32:40.000Z",
"cedula": 11612069,
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T16:38:13.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T16:38:15.000Z",
"tiempo_de_verificacion": "00:08:50",
"tiempo_de_venta": "00:14:23",
"tiempo_por_transferir": "00:00:02",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Jose Morales",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:14:25"
},
{
"responsable_de_ciclo": "Alejandro Brancaleoni",
"responsable_atc": "David Álvarez",
"pais": "COLOMBIA",
"cliente": "Smailil Williamny Vasquez Ibarra",
"id": "115CO10185",
"fecha_reg_cicloventa": "2021-03-13T16:30:08.000Z",
"banco": "Bancolombia Simon",
"fiat": 95145,
"tasa": 0.00196,
"ves": 48543367,
"banco_a_retirar": "Banesco",
"banco_y_beneficiario_": "Banesco - Alfredo Romero",
"tipo_de_transferencia": "Mismo Banco",
"verificacion_": "Verificado",
"nombre_del_beneficiario": "REPUESTOS Y REFRIGERACION 3JT-GAS",
"hora_y_fecha_de_verificacion": "2021-03-13T16:38:51.000Z",
"cedula": "J406351717",
"estatus_de_venta": "Dinero en Cuenta",
"estatus_de_transferencia": "Transferido",
"hora_y_fecha_de_venta": "2021-03-13T16:48:31.000Z",
"hora_y_fecha_de_transferencia": "2021-03-13T16:51:40.000Z",
"tiempo_de_verificacion": "00:08:43",
"tiempo_de_venta": "00:18:23",
"tiempo_por_transferir": "00:03:09",
"comision": 0,
"monto_pago_movil": null,
"bancos_fuera_pool": null,
"responsable_transferencia": "Gabriel Bello",
"responsable_ventas": "Guillermo Marin",
"tiempo_total": "00:21:32"
}
]
    /*
  //  header1= [{name:'Region',key:'region',sticky: true,children:[{key: 'country'},{key: 'city'}], shown: true},
            {name:'Clothes',key:'clothes',sticky:true, children:[{key:'trousers'}, {key:'skirts'}, {key: 'dresses'}], shown: true},
            {name:'Accesories',key:'accesories', children:[{key:'bracelets'}, {key: 'rings'}], shown: true},
            {name:'Categoria1',key:'prueba', children:[{key:'prueba1'}], shown: true},
            {name:'Categoria2',key:'categoria', shown: false},
            {name: null, key:null, shown: false}];
   // header2= [{name: 'Country', key: 'country', parent: 'region', shown: true},
            {name: 'City',key:'city', parent: 'region', shown: true},
            {name: 'Trousers', key:'trousers', parent: 'clothes', shown: true},
            {name: 'Skirts', key:'skirts', parent:'clothes', shown: true},
            {name: 'Dresses', key:'dresses', parent: 'clothes', shown: true},
            {name: 'Bracelets', key:'bracelets', parent: 'accesories', shown: true},
            {name: 'Rings', key: 'rings', parent: 'accesories', shown: true},
            {name: 'Prueba1', key: 'prueba1', parent: 'prueba', shown: true},
            {name: 'Prueba2', key: 'prueba2', parent: 'prueba', shown: false},
            {name: 'Primerhijo', key: 'firstchild', parent: 'ctagoria', shown: false},
            {name: 'Segundohijo', key: 'secondchild', parent: 'ctagoria', shown: false},
            {name: 'Sin padre 1', key: 'sinpadre1', parent: null, shown: false}]
   //   items= [{country: 'Antwerp', city: 'Ddsaf', trousers: 24, skirts: 43, dresses: 54, bracelets: 23, rings:33,prueba1:22,prueba2:54},
            {country: 'Antwerp2', city: 'ewrew', trousers: 23, skirts: 44, dresses: 55, bracelets: 24, rings:34,prueba1:22,prueba2:54},
            {country: 'Antwerp3', city: 'feverg', trousers: 22, skirts: 45, dresses: 56, bracelets: 25, rings:35,prueba1:22,prueba2:54},
            {country: 'Antwerp4', city: 'ewtj', trousers: 25, skirts: 46, dresses: 57, bracelets: 26, rings:36,prueba1:22,prueba2:54},
            {country: 'Antwerp5', city: 'sdcsg', trousers: 26, skirts: 47, dresses: 58, bracelets: 27, rings:37,prueba1:22,prueba2:54},
            {country: 'Antwerp6', city: 'oiu', trousers: 27, skirts: 48, dresses: 59, bracelets: 28, rings:38,prueba1:22,prueba2:54}]
    */
    mounted(){
        if (this.headerFilters){ 
            this.currentFilter = this.headerFilters[0]
           // this.currentOrderFilter = this.headerFilters[0]
        }
    }

    saveView(){
        /* ENVIAMOS VISTA AL BACK */
    }

    changeFilter(header: any){
        this.currentFilter = header;
    }

    changeView(view : any){
        this.currentView = view
    }

    getHeaderFilters(newVal: any){
        this.headerFilters = newVal;
    }
/*
    changeOrderFilter(header: any){
        this.currentOrderFilter = header;
    }
    */
    setOrderFilters(newVal: any){
       this.currentOrderFilter = newVal;
    }
   /* @users.Action(UsersMethods.actions.FETCH_ALL_USERS)
    fetchUsers!: () => boolean; */
}

</script>


