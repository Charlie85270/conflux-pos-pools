# Conflux Pos Validators list

![banner](https://user-images.githubusercontent.com/34569321/165640430-18e91628-9aa1-42f2-9baf-582a0ea762e4.png)


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

Example :

    {
    "name": "Test Pool",
    "adress": "cfx:a77Hsb694ch9k2ppym6v68gzvy6yyUEYes3wndm7m",
    "image": "http://test-pools/favicon.ico",
    "link": "http://test-pools/"
    }

To add your pool you simply need to add your pools informations at the end of the file pools.json (in the array). If your pool is trsuted by the conflux team (the team will verify this information) you can add **"trusted": true** on the declaration of the configuration of your node.
That's it !
All others informations (APY, STAKER, TVL, ....) are directly fetch from the blockchain !


## Add a custom pool

Most pools use the basic contracts provided by the Conflux team and are therefore automatically supported by the application. It can happen that some pools use custom contracts, like for example Nucleon (Liquid Staking). 
In these cases, in order for the application to display correctly the data of your pool, it is necessary to add the custom implementation of the pool in order to find the data on and off chain. 

1) add the `customContract` field to your pool in the pools.json file, with the ID of your pool. For example here for Nucleon : 
  

Example :

    {
    "name": "Nucleon",
    "adress": "cfx:accvn0sakfx8zv2r0192au3khy7bh9c5f2w5cp18mt",
    "image": "https://www.nucleon.space/static/yuan.4ce4912b.png",
    "link": "https://www.nucleon.space/",
    "customContract": "Nucleon",
    "posAddress": "0x92ba044ffdf81232b5ac4ae8f2bfefe45c1607d896d81ac4a354d66c32c773a4"
    }

As you can see, we can add other values if needed (here the PoS address of the pool which is not recoverable onchain). 


2) Create a new folder (named with the ID previously added on the pools.json) on the `customAbi` folder.

3) Create a file on the new created folder and name it `abi.ts`. Inside the file export a const named `abi` which contain the abi of your Pool contract (you can follow the Nucleon exemple here `customAbi/Nucleon/abi.ts`)  

4) in the file `utils/contractInfos.ts`, you will find the implementation of the data on and off chain recuperation for each pool. 
The `getGenericPoolInfos` function retrieves all the informations for pools which use the contracts provided by Conflux.
You will need to create a custom function, called `get${NameOfYourPool}PoolInfos`, for exemple for Nucleon the function is `getNucleonPoolInfos`

This custom function will manage the data recuperation of your pool. One thing is important, the function must return an object containing the following fields: 

- owner (the address of the owner of the pool)
- isZero (if the owner of the pool is the zero address)
- fees (the fees of the pool in %)
- verified (if the contract if verified on conflux scan)
- posAddress (The PoS address of the pool)
- account (The account linked to the pool)
- status (The status of the pool)
- totalRevenue (Total rewards of the pool)
- totalLocked (Total CFX locked on the pool)
- apy (The APY of the Pool in %)
- poolSummary (Summary of the pool)
- staker (The number of staker on the pool)

These informations will be displayed on the home page of the application

You can follow the example already present for the Nucleon pool  (function `getNucleonPoolInfos`). 

The last thing to do is to call your function in the `getPoolsInfos` method, adding a case in the swtich, indicating the ID of your pool previously added in the pools.json file.

Example for Nucleon :

    case "Nucleon":
      data = await getNucleonPoolInfos(pool, contract, conflux);
      break;


The implementation in your custom method is free, you can do what you want (Call API, onChain retrieval, ...).




Don't hesitate to contribute to improve this open source project.
