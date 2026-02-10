/* 
server ko start karna hai.
*/


app = require('./src/app')  /* app ko import  kiya */

app.listen(3000,() =>{
    console.log(' server is running on port 3000');
    
})