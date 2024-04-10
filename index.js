const port = 8080;
const express = require('express');
const bodyParser = require('body-parser'); 
const AWS = require('aws-sdk');
const homeController = require('./controllers/homeController');

const app = express();
const waf = new AWS.WAF(); // Setting up AWS WAF client

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Middleware to check incoming requests against WAF rule
const checkWAF = async (req, res, next) => {
  try {
    const params = {
      WebACLId: 'your-web-acl-id', // need to replace with our Web ACL ID
      ResourceArn: 'arn:aws:elasticloadbalancing:your-region:your-account-id:loadbalancer/your-load-balancer-id' // Replace with your resource ARN
      // If not using ELB, replace the ARN with the ARN of the thing we're protecting (e.g., API Gateway, CloudFront distribution, etc.)
    };

    const result = await waf.getWebACLForResource(params).promise();

    if (result && result.WebACLSummary) {
      // WAF rule matched, block request or perform necessary action
      res.status(403).send('Access denied');
    } else {
      // WAF rule not matched, allow request to proceed
      next();
    }
  } catch (error) {
    console.error('Error checking WAF:', error);
    // Handle error
    res.status(500).send('Internal server error');
  }
};

// Apply WAF middleware to all routes
app.use(checkWAF);

app.get('/', homeController.login);
app.post("/", homeController.respondWithForm);

app.use((req, res, next) => {
    console.log(`Request received at: ${new Date()}`);
    next();
});

app.listen(port, () => {
    console.log(`Server running on website: http://localhost:${port}`);
});
