
const AppConfig = {
    PROTOCOL: "ws:",
    HOST: "//localhost",
    PORT: ":8080",
    ENDPOINT: "/ChatRoom/chat"
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