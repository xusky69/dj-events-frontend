export default function CheckImage(evt, thumbnail=false){
    try{   
        if (thumbnail){
            return evt.image.data.attributes.formats.thumbnail.url
        } else{
            return evt.image.data.attributes.formats.large.url
        }
        
    }catch(error){
        console.log(error)
        return '/images/event-default.png'
    }   
}
