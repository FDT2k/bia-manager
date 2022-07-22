//{lngs,ns,key,version:__APP_VERSION__,app:import.meta.env.VITE_I18N_COLLECTOR_APP_NAME}
export const postMissingTranslations = (data)=>{
    let collection_url = import.meta.env.VITE_I18N_COLLECTOR;
    let url = new URL(collection_url);
    const { net } = require('electron');
    var postData = JSON.stringify( {...data,version:__APP_VERSION__,app:import.meta.env.VITE_I18N_COLLECTOR_APP_NAME} );
    let response_body=''
    console.log(data);
    debugger;
        try {
        const request = net.request({
            method: "POST",
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port!="" ? url.port : "80",
            path: url.pathname,
          /*  headers: {
            "Content-Type": "application/json",
            "Content-Length": postData.length
            }*/
        });
        request.on('response', (response) => {
         //   console.log(response.statusCode);
            response.on('data', (chunk) => {
            //  console.log(`BODY: ${chunk}`)
            response_body += chunk.toString()
            })
            response.on('end', () => {
            console.log(`BODY: ${response_body}`)
            })
        });

        request.write(postData)
        request.end()
    }catch(e){
      //  console.error(e);
    }
}