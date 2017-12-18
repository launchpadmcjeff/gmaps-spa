#!/bin/sh

export STACK_NAME=gmaps

function getBooleanHss {
	echo "getBooleanHss [1/0y/n/Y/N]"
	echo $1
	read junk
	if [ $junk = "y" ]
	then
		return 0
	else
		return 1
	fi
}


function getBooleanHssOrDie {
	while :
	do
		echo "getBooleanHssOrDie [1/0y/n/Y/N]"
		echo $1
		read junk
		if [ $junk = "y" ]
		then
			break	
		fi
	done

}

function install {
	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-codecommit \
		--template-body file://codecommit-template.json
	
	getBooleanHssOrDie "Say y when the ${STACK_NAME}-codecommit stack is complete and the release is pushed..."

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-roles \
		--template-body file://service-roles-template.json --capabilities CAPABILITY_IAM

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-codebuild \
		--template-body file://codebuild-template.json

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-codedeploy \
		--template-body file://codedeploy-template.json 


	while :
	do
		getBooleanHss "Say y when the ${STACK_NAME}-codedeploy stack is complete..."
		if [ $? -eq 0 ]
		then
			break
		fi
	done

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-pipeline \
		--template-body file://pipeline-serverless-template.json \
		--parameters ParameterKey=Email,ParameterValue=launchpadmcjeff@gmail.com

}


function uninstall {
	aws cloudformation delete-stack --region $1 --stack-name ${STACK_NAME}-pipeline
	while :
	do
		getBooleanHss "Say y when the ${STACK_NAME}-pipeline stack is deleted..."
		if [ $? -eq 0 ]
		then
			break
		fi
	done
	aws cloudformation delete-stack --region $1 --stack-name ${STACK_NAME}-codedeploy

	aws cloudformation delete-stack --region $1 --stack-name ${STACK_NAME}-codebuild

	aws s3 rm s3://${STACK_NAME}-codepipeline-$1 --recursive
}



if [ "$1" = "install" ]
then
	echo "install needs repo and key"
	install $2
fi

if [ "$1" = "uninstall" ]
then
	echo "uninstalling..."
	uninstall $2
fi

echo "done $1"
