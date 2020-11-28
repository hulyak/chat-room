export function getNameInitials(name) {
    const splitName = name.toUpperCase().split(' '); // array of words 
    if(splitName.length > 1){
        // get the initials of two words, first word first letter and second word first letter
        return splitName[0][0] + splitName[1][0]
    }
    return splitName[0][0];
}