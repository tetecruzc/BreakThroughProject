export enum GENDER {
    FEMALE = 'Female',
    MALE = 'Male'
}

export function getGenderColor(gender: string): string {
        return gender === GENDER.FEMALE ? 'background-color:#e83e8c;' : 'background-color:#007bff;'
}


export function getNameInitials(name: string, lastname: string) : string{
    return name[0] + lastname[0];
  } 

