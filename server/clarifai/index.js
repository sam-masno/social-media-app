const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();

metadata.set("authorization", "Key " + process.env.CLARIFAI_API_KEY);

module.exports = async (imgBuffer) => {
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
            const { regions } = response.outputs[0].data;
            // const concepts = data.concepts.map(concept => concept.name);
            const allTagNames = regions.map(region => region.data.concepts[0].name)
            
            const trackNames = {};

            const tags = allTagNames.filter(tag => {
                if(trackNames[tag]) return false;
                trackNames[tag] = true;
                return true;
            })
            resolve({ tags, regions });
            // if (err) {
            //     console.log("Error: " + err);
            //     return;
            // }

            // if (response.status.code !== 10000) {
            //     console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            //     return;
            // }

            // console.log("Predicted concepts, with confidence values:")
            // for (const c of response.outputs[0].data.concepts) {
            //     console.log(c.name + ": " + c.value);
            // }
        })
    });
}