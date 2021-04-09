
export function orderHeaderSecondary(headerPrimary: any, headerSecondary: any){
    let orderedHeaderSecondary: Array<any> = [];
        headerPrimary.forEach((el: { children: any[]; }) =>{
                el.children.forEach((children: any)  =>{
                   let element = headerSecondary.find((header: { key: any; }) => header.key === children.key)
                   if (element) orderedHeaderSecondary.push(element)
                })  
        })
        return orderedHeaderSecondary;
}