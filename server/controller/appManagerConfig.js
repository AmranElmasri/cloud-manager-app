import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

let status = {
  terminated: {},
  running: {},
};

const appManagerConfig = async (req, res) => {
  const { resizeValue } = req.body;
  await describeInstances();
  if (resizeValue === "increase" && status.running.length === 8) {
   return res.status(400).json({ message: "the resize value is more than the maximum number of instances" });
  }
  if (resizeValue === "decrease" && status.running.length === 1) {
   return res.status(400).json({ message: "the resize value is less than the minimum number of instances" });
  }

  if(resizeValue === "increase"){
    await createInstance();
    await describeInstances();
    return res.status(200).json({ message: "cache resized successfully" , data: Object.keys(status.running).length });
  }
  if(resizeValue === "decrease"){
    await terminateInstance(status.running[Object.keys(status.running).pop()]);
    await describeInstances();
    return res.status(200).json({ message: "cache resized successfully", data: Object.keys(status.running).length });
  }

  // if(+resizeValue + status.running.length - 1 < 8){
  //   await createInstance(+resizeValue);
  //   return res.status(200).json({ message: "cache resized successfully" });
  // }
  // if(status.running.length - 1 > +resizeValue){
  //   const diff = (status.running.length - 1) - (+resizeValue);
  //   for(let i = 0; i < diff; i++){
  //     await terminateInstance(status.running[i]);
  //     return res.status(200).json({ message: "cache resized successfully" });
  //   }
  // }
}


const describeInstances = async () => {
  const params = {
    DryRun: false,
  };
  try {
    const ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });
    const data = await ec2.describeInstances(params).promise();
    data.Reservations.forEach((item, i) => {
      if (item.Instances[0].State.Code !== 80 && item.Instances[0].State.Name === "terminated") {
        status.terminated = { ...status.terminated, [i]: item.Instances[0].InstanceId };
      }else if (item.Instances[0].State.Code !== 80 && item.Instances[0].State.Name === "running") {
        status.running = { ...status.running, [i]: item.Instances[0].InstanceId };
      }
    });
    console.log(status);
  } catch (err) {
    console.log(err);
  }
};


const createInstance = async () => {
  const instanceParams = {
    ImageId: "ami-01aaadccdd11978eb",
    InstanceType: "t2.micro",
    KeyName: "iug_cloud",
    MinCount: 1,
    MaxCount: 1,
    SecurityGroupIds: ["sg-033401b9347dbdb61"],
  };
  try {
    const ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });
    const data = await ec2.runInstances(instanceParams).promise();
  } catch (err) {
    console.log(err);
  }
};

const terminateInstance = async (instanceId) => {
  const params = {
    InstanceIds: [instanceId],
  };
  try {
    const ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });
    const data = await ec2.terminateInstances(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export default appManagerConfig;

