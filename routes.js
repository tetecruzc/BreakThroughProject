[
    {
        id_route: 1,
        name: "Resumen Principal",
        route: '/resumen'
    },
    {
        id_route: 2,
        name:"Actividades",
        route: null,
        subroutes: [
            {
                id_route: 3,
                name: "Actividad ATC",
                pending: 40,
                subroutes:[
                    {
                        name: "Home",
                        route: "atc_activity/home"
                    },
                    {
                        name: "Mis pendientes",
                        pending: 40,
                        subroutes:[
                            {
                                name: "ATC_Chile",
                                route: "atc_activity/pendings/atc_chile",
                                pending: 15
                            },
                            {
                                name: "ATC_Perú",
                                route: "atc_activity/pendings/atc_peru",
                                pending: 08
                            }
                        ]
                    }
                ]
            },
            {
                name: "Actividad 2",
                pending: 15
            }
        ]
    }
]