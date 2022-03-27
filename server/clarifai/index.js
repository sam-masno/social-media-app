const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();

metadata.set("authorization", "Key " + process.env.CLARIFAI_API_KEY);

module.exports = async (imgBuffer) => {
    // promisify clarify function
    return new Promise((resolve, reject) => {
        stub.PostModelOutputs(
        {
        model_id: "general-image-detection",
            inputs: [
                {data: {image: { base64: imgBuffer } } }
            ]
        },
        metadata,
        (err, response) => {
            if(err) reject(err);
            else if (response.status.code !== 10000) {
                reject(new Error(response.status.description));
            }  

            // get image regions and tag names while removing duplicates
            const { regions } = response.outputs[0].data;

            const allTagNames = regions.map(region => region.data.concepts[0].name.toLowerCase())
            
            const trackNames = {};

            const tags = allTagNames.filter(tag => {
                if(trackNames[tag]) return false;
                trackNames[tag] = true;
                return true;
            })
            resolve({ tags, regions });
        })
    });
}