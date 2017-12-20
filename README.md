# gmaps-spa

## What is it
An experiment with Google Maps API

## Prerequisites
1. none

## Features
1. none


## Running
You must have the aws cli installed; try 'pip install aws'.  After that, just run
aws cloudformation create-stack --region us-west-1 --stack-name gmaps-spa-test \
--capabilities CAPABILITY_IAM \
--template-body file://gmaps-spa-template.yaml \
--parameters ParameterKey=SiteBucketName,ParameterValue=gmaps-spa-test \
ParameterKey=GitHubToken,ParameterValue=27beae1f8d1ed8c8b5deabba825144be13e8e0ac 
{
    "StackId": "arn:aws:cloudformation:us-west-1:737930803050:stack/gmaps-spa-test/7ee5e930-e53a-11e7-a1a8-500cadc9fe36"
}


## TODO
* AWS deployment pipeline

https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/