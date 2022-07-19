export async function addNotesAPI(title, note, severity){
    return await fetch('http://localhost:3000/addnote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'title': title,
            'notebody': note,  
            'noteimportance': severity
        }) 
    })
}

// API call for getting all notes in the database 
export async function getNotesAPI(){
    return await fetch('http://localhost:3000/getnotes',{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            }
        })
}