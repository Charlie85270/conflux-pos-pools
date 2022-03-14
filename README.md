# Conflux Pos Validators list

Conflux-pools is an application that lists the staking pools on the conflux network.
Conflux is a layer-1 blockchain, you can find all information about conflux here :
This application is not official and has not been created by the conflux team, but it has received a grant from them: https://forum.conflux.fun/t/conflux-pools-validators-list/13856/9

The code is open source and anyone can participate in improving it.
The purpose of this application is to centralise all the information concerning the different staking pools for securing the Conflux network.
Anyone can add their pool to the list, following the instructions below.

# Warning

This application is not affiliated with the pools and is therefore not responsible for lost/blocked tokens. As a reminder, here is a warning about staking on pools: https://forum.conflux.fun/t/pos-mining-pool-risk-warning/13760.
A check is made each time a pool is added to ensure that the information in the pool is correct, but we do not check the contracts.
Alerts are displayed on the application for pools whose contract has not been verified on conflux scan.
As a disclaimer, a verified contract does not mean that the contract is clean. We recommend that you read the contract yourself to be sure before you store your CFX on one of the pools.

## Install and run the project

To run the project you'll need NodeJS and yarn installed in your machine.

Install all dependencies

    yarn install

To run the report pool feature in local you'll need to create a github api khey with write right on a github project.
The report form directly create an issue on the repo with the information of the malicious pool.
_This is not mandatory to run the project_
Create a **.env** file at the root of the project with

    NEXT_PUBLIC_GITHUB_KEY={githubApiKeyWithWriteRight}
    NEXT_PUBLIC_GITHUB_OWNER={ownerOfTheRepo}
    NEXT_PUBLIC_GITHUB_REPO={nameOfTheRepo}

Start the project

    yarn dev

Then go to `localhost:3000` to see the app on your navigator

Build the project for production

    yarn build

## Add my pool

Anyone can add this pool, to do so you need to create a new pull request.
All static pools informations are in the **pools.json** file in.

The file contain a array with all existing pool, to add your pool you'll need 4 informations:

- The name of the pool
- The adress of the pool
- The image of the pool (icon display on the table, not mandatory)
- The link of the pool

Exemple :

    {
    "name": "Test Pool",
    "adress": "cfx:a77Hsb694ch9k2ppym6v68gzvy6yyUEYes3wndm7m",
    "image": "http://test-pools/favicon.ico",
    "link": "http://test-pools/"
    }

To add your pool you simply need to add your pools informations at the end of the file pools.json (in the array).
That's it !
All others informations (APY, STAKER, TVL, ....) are directly fetch from the blockchain !

Don't hesitate to contribute to improve this open source project.
