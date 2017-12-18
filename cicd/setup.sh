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
	aws s3 mb s3://robowebi.com --region $1
    aws s3 website s3://robowebi.com --region $1 --index-document index.html --error-document error.html

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-codecommit \
		--template-body file://codecommit-template.json
	
	getBooleanHssOrDie "Say y when the ${STACK_NAME}-codecommit stack is complete and the release is pushed..."

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-roles \
		--template-body file://service-roles-template.json --capabilities CAPABILITY_IAM

    getBooleanHssOrDie "Say y when the ${STACK_NAME}-roles stack is complete..."

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-codebuild \
		--template-body file://codebuild-template.json

	while :
	do
		getBooleanHss "Say y when the ${STACK_NAME}-codebuild stack is complete..."
		if [ $? -eq 0 ]
		then
			break
		fi
	done

	aws cloudformation create-stack --region $1  --stack-name ${STACK_NAME}-pipeline \
        --capabilities CAPABILITY_IAM \
		--template-body file://pipeline-template.json \
		--parameters ParameterKey=Email,ParameterValue=launchpadmcjeff@gmail.com

}


function uninstall {
    aws s3 rm s3://${STACK_NAME}-pipeline-$1 --recursive

	aws cloudformation delete-stack --region $1 --stack-name ${STACK_NAME}-pipeline

	while :
	do
		getBooleanHss "Say y when the ${STACK_NAME}-pipeline stack is deleted..."
		if [ $? -eq 0 ]
		then
			break
		fi
	done

	aws cloudformation delete-stack --region $1 --stack-name ${STACK_NAME}-codebuild

    getBooleanHssOrDie "Say y when the ${STACK_NAME}-codebuild stack is deleted..."

    aws cloudformation delete-stack --region $1 --stack-name ${STACK_NAME}-roles

    getBooleanHssOrDie "Say y when the ${STACK_NAME}-roles stack is deleted..."
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
