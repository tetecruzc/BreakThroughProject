
export function orderHeaderSecondary(headerPrimary: any, headerSecondary: any){
    let orderedHeaderSecondary: Array<any> = [];
    let pinedColumn : any = headerSecondary.find((el: { pined: any; }) => el.pined)
    if (pinedColumn) orderedHeaderSecondary.push(pinedColumn);
        headerPrimary.forEach((el: { children: any[]; }) =>{
                if (el.children){
                        el.children.forEach((children: any)  =>{
                                let element = headerSecondary.find((header: { key: any; }) => header.key === children.key)
                                if (element) orderedHeaderSecondary.push(element)
                        })  
                }
        })
    return orderedHeaderSecondary;
}