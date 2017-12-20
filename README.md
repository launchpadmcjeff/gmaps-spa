# gmaps-spa

## What is it
An experiment with Google Maps API

## Prerequisites
1. none

## Features
1. none


## Running
You must have the aws cli installed; try 'pip install aws'.  After that, just run
aws cloudformation create-stack --region us-west-1 --stack-name gmaps-spa --capabilities CAPABILITY_IAM --template-body file://gmaps-spa-template.yaml

## TODO
* AWS deployment pipeline

https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/