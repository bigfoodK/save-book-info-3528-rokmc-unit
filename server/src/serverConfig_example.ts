type SercerConfig = {
    publicDirectory: string,
    http: {
        port: number,
    },
    corsAllows: string[],
    restAPI: {
        book: {
            apiKey: string,
        }
    },
};;

const config: SercerConfig = {
    publicDirectory: '../client/dist',
    http: {
        port: 8080,
    },
    corsAllows: [],
    restAPI: {
        book: {
            apiKey: 'your api key here',
        }
    },
};

export default config;
