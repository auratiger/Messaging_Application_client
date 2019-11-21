// class WebSocketClient {
        
//     constructor(protocol, hostname, port, endpoint) {
        
//         this.webSocket = null;
        
//         this.protocol = protocol;
//         this.hostname = hostname;
//         this.port     = port;
//         this.endpoint = endpoint;
//     }
    
//     getServerUrl() {
//         return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint;
//     }
    
//     connect() {
//         try {
//             this.webSocket = new WebSocket(this.getServerUrl());
//             console.log(this.getServerUrl())
            
//             // 
//             // Implement WebSocket event handlers!
//             //
//             this.webSocket.onopen = function(event) {
//                 console.log('onopen::' + JSON.stringify(event, null, 4));
//             }
            
//             this.webSocket.onmessage = function(event) {
//                 var msg = event.data;
//                 console.log('onmessage::' + JSON.stringify(msg, null, 4));
//                 //add switch handler for 
//             }
//             this.webSocket.onclose = function(event) {
//                 console.log('onclose::' + JSON.stringify(event, null, 4));                
//             }
//             this.webSocket.onerror = function(event) {
//                 console.log('onerror::' + JSON.stringify(event, null, 4));
//             }
            
//         } catch (exception) {
//             console.error(exception);
//         }
//     }
    
//     getStatus() {
//         return this.webSocket.readyState;
//     }
//     send(message) {
//         if (this.webSocket.readyState === WebSocket.OPEN) {
//             this.webSocket.send(message);
            
//         } else {
//             console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
//         }
//     }
//     disconnect() {
//         if (this.webSocket.readyState === WebSocket.OPEN) {
//             this.webSocket.close();
            
//         } else {
//             console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
//         }
//     }
// }

// export default WebSocketClient;

const AppConfig = {
    PROTOCOL: "ws:",
    HOST: "//localhost",
    PORT: ":8080",
    ENDPOINT: "/WebSocket/server"
}

const Singleton = (function(){
    let instance;

    const getServerUrl = () => {
        return AppConfig.PROTOCOL + AppConfig.HOST + AppConfig.PORT + AppConfig.ENDPOINT;
    }

    function createInstance(){
        const socket = new WebSocket(getServerUrl())
        console.log(getServerUrl())

        socket.onopen = (event) => {
            console.log("connected: " + JSON.stringify(event, null, 4))
        }

        socket.onmessage = (event) => {
            console.log(event.data);
        }

        socket.onclose = (event) => {
            console.log("connection closed: " + JSON.stringify(event, null, 4))
        }

        socket.onerror = (event) => {
            console.log("error: " + JSON.stringify(event, null, 4))
        }

        return socket;
    }

    return {
        getInstance: function(){
            if (!instance){
                instance = createInstance();
            }
            return instance;
        }
    }
})();

export default Singleton;