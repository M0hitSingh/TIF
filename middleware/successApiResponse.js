class successApiResponse {
    constructor() {
        this.status = true;
        this.content = {
            data:{},
            meta:{}
        };
    }
    status;
    content;
}

const sendSuccessApiResponse = (data,metadata) => {
    const newApiResponse = new successApiResponse();
    newApiResponse.content.data = data;
    newApiResponse.content.meta = metadata
    return newApiResponse;
};

module.exports = { sendSuccessApiResponse, successApiResponse };
