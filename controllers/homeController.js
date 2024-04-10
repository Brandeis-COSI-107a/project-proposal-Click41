const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.EC2MetadataCredentials({ httpOptions: { timeout: 5000 } });

const kms = new AWS.KMS();

const encryptData = async (plaintext) => {
  try {
    const params = {
      KeyId: 'your-cmk-id', // change this when have CMK ID or alias
      Plaintext: Buffer.from(plaintext) // Data to be encrypted
    };

    const { CiphertextBlob } = await kms.encrypt(params).promise();
    return CiphertextBlob;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

exports.login = (req, res) => {
  res.render("login");
};

exports.welcome = (req, res) => {
  let paramsName = req.params.myName;
  res.render("welcome", { name: paramsName });
};

exports.respondWithForm = async (req, res) => {
  try {
    const encryptedData = await encryptData(req.body.sensitiveData);

    res.status(200).send('Data encrypted and stored securely');
  } catch (error) {
    console.error('Error handling sensitive data:', error);
    res.status(500).send('Error encrypting and storing data');
  }
};
