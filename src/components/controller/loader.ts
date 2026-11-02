type QueryParams = {
    apiKey: string;
    sources?: string;
};
// type QueryParams = Record<string, string>;
type RequestOptions = {
    sources?: string;
};
type RequestConfig = {
    endpoint: string;
    options?: RequestOptions;
};
type ResponseCallback = (data: unknown) => void;

class Loader {
    private baseLink: string;
    private options: QueryParams;

    constructor(baseLink: string, options: QueryParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: QueryParams = { ...this.options, ...options };
        const url = `${this.baseLink}${endpoint}?`;
        const param = new URLSearchParams({
            apiKey: urlOptions.apiKey,
        });

        if (urlOptions.sources) {
            param.set('sources', urlOptions.sources);
        }

        return url + param.toString();
        // Object.keys(urlOptions).forEach((key) => {
        //     url += `${key}=${urlOptions[key]}&`;
        // });

        // return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: ResponseCallback, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
