Mineables Network Test cases
---

Here are a few test cases that need to be certified by testers for the Mineables Token Network. There are three different modules that need to be tested during this process: the site/Dapp, the miner, and, to a lesser extent, the pool.

If you see any significant errors, bugs, or just have a commentary on useability flow please raise them as verbosely as possible as issues in their appropriate githubs:

For the Mineables site/Dapp:
https://github.com/0xMithril/site/issues

For the Miner:
https://github.com/0xMithril/COSMiC-v3-0xMTH/issues

For the Pool:
https://github.com/0xMithril/ERC918Pool/issues

At a minimum, for bugs, I would prefer to have the following format

```
Description:
	When I did this thing, the universe divided by zero.

Steps to Reproduce:
	1. Obtain trilithium from Klingon secret society.
	2. Pop that shit in a blender on high.
	3. ???
	4. Profit.

Results / side effects:
	Rip in spacetime continuum:
		- time flows backwards
	Obscured reality curve:
		- 42 is no longer a number
		- Roger Ver is the most interesting man in the world
```

Setup
---
1. Install Metamask - https://metamask.io/

2. We are currently deployed on the 'Sokol' test network. As such, you will have to update your Metamask to point to this network:
https://sokol.poa.network ( Under networks.. 'Custom RPC' )

3. Download and install the miner from github: https://github.com/0xMithril/COSMiC-v3-0xMTH/releases/tag/v1.0. 

4. Set up a new account in metamask, or in the miner ( ```account new``` ). Take note of public / private keys. Note: do not use your regular accounts in metamask, make sure you set up these test accounts.

5. Go to the Sokol Faucet and grab some testnet Ether. ( 0.5 should be plenty )  https://faucet-sokol.herokuapp.com/

6. Once you have created your account ping @lodge with your address on the test channel of our discord server ( https://discord.gg/m73tdwt ) and I'll send you some test 0xMithril that you will need to test purchasing virtual artifacts.

Test Case 1: Create a New Mineable Token - simple
---

	Go to 'Create' tab on Mineables.io and create a token without the advanced options.
		Verify the flow
		Verify the popup links to the correct txn
		Verify ensure the resulting popup directs you to the new token page


Test Case 2: Create a New Mineable Token - advanced
---
		Same as above, but with Advanced options:
			Blocks - 2048
			Difficulty - 1000000
			Block Time - 10

		Verify the flow
		Verify the popup links to the correct txn
		Verify ensure the resulting popup directs you to the new token page
		On the token page/registry, verify the new token attributes


Test Case 3: Market - vRig
---
	Navigate to the Market page -> VRIG MARKET tab
		Verify balance in Mithril in top right corner
		Purchase any Virtual Rig
		Verify the popup links to the correct txn
		Once completed, navigate to configure and confirm the vRig shows up under 'My Virtual Rigs'
			Click on your newly purchased vRig
			Confirm navigation to 'Virtual Rig Configuration' page
				Verify the statistics of the vRig ( noteably that vHash rate is 0 )
				Verify that there are no 'Available Components'

Test Case 4: Market - vGPU
---
	Navigate to the Market page -> VGOU MARKET tab
		Verify balance in Mithril in top right corner
		Purchase any Virtual Rig
		Once complete, navigate to configure and confirm the vGPU shows up under 'My Virtual GPUs'
			Click on your vGPU, note that it navigates to 'Virtual GPI Statistics' page
				Verify name, cycles and modifier ( pay attn to Virtual Hash Rate )

	Repeat process 2x giving you a total of 3 vGPUs

Test Case 5: Configuration
---
	Navigate to Configuration tab
		Verify 1 vRig and 3 vGPUs
		Click on your vRig to navigate to the configuration page
		On Configuration page, confirm that there are 3 available components for your account
		Alter configuration
			Drag a single vGPU up into the Virtual Rig section ( the blue area with dotted lines )
				Note that the 'vHash Rate (in MH/s)' has been updates in the table above - verify the hashrate is correct
			Drag another vGPU up into the vRig and verify the combined vHash rate
			Drag the third vGPU up into the vRig and verify the combined vHash rate
			Remove one and validate vHash
			Remove another and validate vHash
			Now that there is only one vGPU, commit the configuration by pressing the big green 'Commit Configuration' button below
			Verify the flow 
			Verify the resulting txn link on the block explorer works

Test Case 6: vRig Installation
---
	Navigate to the Mineable Tokens page (yes it's slow, still working on a caching mechanism)
		When the tokens are loaded, select the 'Advanced' token you created in the second step.
			Confirm that the Difficulty is 1000000
			On the far right hand side of the table is an 'update' button under Actions. Press it and select your vRig from the drop-down in the popup
				Verify the flow
				Verify the your vRig shows up under the 'vRig' column ( instead of the default 'none' option )
				Verify the adjusted difficulty with the following formula:

					(note: intervalSeconds should be 600 if you left it at 10 minutes)
					let intervalSeconds = 600
					let vRigTotalvHashRate = under configuration, the total vRig vHash amount in the table
					2^22 = 4194304

					vrigDifficulty = (intervalSeconds * vRigTotalvHashRate) / 2^22
					difficulty = 1000000 - vrigDifficulty

					example with 800 MH/s vRig:
						vrigDifficulty = (600 * 800000000) / 4194304
						(114440.91796875)
						diff = 1000000 - 114440.91796875
						diff = 885559 (rounded)
						(this is the value that should now show up in the 'Difficulty' column of the Token)



Test Case 7: Mining 0xMithril Individual
---
	Open up the miner
		node index.js
	set up an account ( this will feel familiar if you've used 0xbitcoin COSMic )
		account new
	And point to the testnet:
		config web3provider https://sokol.poa.network
	Verify the contract address of 0xMithril is '0xc83428ee60467cc3e39770f8ea1cb443c7ee3249'
		contract list
	Start mining 
		mine cuda
	Note submitted solutions and verify rewards with command
		account balance

Test Case 8: Mining 0xMithril Pool vardiff
---
	If the miner is running exit:
		exit
	Change the vardiff:
		config vardiff 4096
	Pool mine 0xMithril:
		pool mine cuda
			Verify the hashrate in the top left corner is '4096'
	Exit the miner:
		exit

Test Case 9: Mining 0xMithril Pool vardiff part 2
---
	Change the vardiff:
		config vardiff 65536
	Pool mine 0xMithril:
		pool mine cuda
			Verify the hashrate in the top left corner of the miner terminal is '65536'
			Wait until a few solutions go through
			Validate your balance with the pool by pointing to a browser: http://pool.mineables.io/account/0x...

Test Case 10: Mining Advanced Token Individual
---
	Point your miner to your new Advanced token (On the website, navigate to the 'Tokens' tab and click on your Advanced Token, it will navigate to your token page where you can see the contract address below the name):
		contract select 0x...
	Start mining
		mine cuda
			verify the difficulty matches your Token's difficulty on the website
	Exit the miner
		exit

Test Case 11: Mining Simple Token Individual
---
	Point your miner to your new Simple token (On the website, navigate to the 'Tokens' tab and click on your Simple Token, it will navigate to your token page where you can see the contract address below the name):
		contract select 0x...
	Start mining
		mine cuda
			verify the difficulty matches your Token's difficulty on the website
	Wait for a few solutions to come through and verify with next command
		account balance
    
Test Case 12: Mining Simple Token Pool
---
	Point your miner to your new Simple token (On the website, navigate to the 'Tokens' tab and click on your Simple Token, it will navigate to your token page where you can see the contract address below the name):
		contract select 0x...
	Start mining
		pool mine cuda
			verify the difficulty matches your Token's difficulty on the website
	Wait for a few solutions to come through and verify with next command
		account balance
    verify your balance with the pool by pointing to a browser: http://pool.mineables.io/account/0x...
Test Case X: General Comments on Useability, Interface and Flow
---
	This is a bit more abstract, but important still. 
	How does the application 'feel'?
	In what ways would you improve the User Interface of the website/dapp?
	In what ways would you improve the miner?
