const imageThumbNail = require('image-thumbnail')

async function thumbs(){
    try{
        const result = await imageThumbNail('alert.jpeg')
         console.log(result)
    }
    catch(error){
        console.log(error)
    }
}
thumbs()