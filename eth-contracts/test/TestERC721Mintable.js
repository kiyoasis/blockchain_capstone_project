var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    

    describe('match erc721 spec', function () {

        let tokenId = 1;

        //beforeEach(async function () {
        before(async function () {

            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            //console.log(Number(tokenId));
            try {
                await this.contract.mint(account_one, tokenId, {from: account_one});
            } catch (e) {
                console.log("mint failed");
            }
            tokenId ++;
            
            //console.log(Number(tokenId));
            try {
                await this.contract.mint(account_two, tokenId, {from: account_one});
            } catch (e) {
                console.log("mint failed");
            }
            tokenId ++;
        })
        

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call({from: account_one});
            //console.log(Number(result));
            assert.equal(Number(result), 2, "Total supply does not match");
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf.call(account_two, {from: account_one});
            assert.equal(Number(result), 1, "Balance not expected");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI.call(1, {from: account_one});
            //console.log(result);
            assert.equal(result, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "TokenURI not expected");
        })

        it('should transfer token from one owner to another', async function () { 
            
            let balanceOne = await this.contract.balanceOf.call(account_one, {from: account_one});
            let balanceTwo = await this.contract.balanceOf.call(account_two, {from: account_two});

            await this.contract.transferFrom(account_two, account_one, 2, {from: account_two});

            let updatedBalanceOne = await this.contract.balanceOf.call(account_one, {from: account_one});
            //console.log(Number(updatedBalanceOne));

            let updatedBalanceTwo = await this.contract.balanceOf.call(account_two, {from: account_two});
            //console.log(Number(updatedBalanceTwo));

            assert.equal(Number(updatedBalanceOne), Number(balanceOne) + 1, "Error in transferring token");

            assert.equal(Number(updatedBalanceTwo), Number(balanceTwo) - 1, "Error in transferring token");

        })
    });

    describe('have ownership properties', function () {

        let tokenId = 1;

        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let isFailed = false;
            
            try {
                await this.contract.mint(account_one, tokenId, {from: account_two});
            } catch (e) {
                isFailed = true;
            }

            assert.equal(isFailed, true, "Address must be the contract owner");
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract._owner.call({from: account_one});
            assert.equal(contractOwner, account_one, "Cannor call contract owner");
        })

    });
})