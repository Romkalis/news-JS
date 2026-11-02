type QueryParams = {
    apiKey: string;
    sources?: string;
};
type RequestOptions = {
    sources?: string;
};
type RequestConfig = {
    endpoint: string;
    options?: RequestOptions;
};
type ResponseCallback = (data: unknown) => void;

class Loader {
    private readonly baseLink: string;
    private readonly options: QueryParams;

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
    }

    load(method: string, endpoint: string, callback: ResponseCallback, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<unknown> => res.json())
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
