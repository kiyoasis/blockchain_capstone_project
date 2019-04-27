pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import './SquareVerifier.sol';


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    Verifier public verifier;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint tokenId;
        address addr;
    }


    // TODO define an array of the above struct
    Solution[] private solutionArray;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutions;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address addr, uint tokenId);

    constructor(address verifierAddress) public {
        verifier = Verifier(verifierAddress);
    }


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 key, address to, uint256 tokenId) internal {

        solutions[key].addr = to;
        solutions[key].tokenId = tokenId;

        emit SolutionAdded(to, tokenId);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintVerifiedTokenTo(address addr, uint256 tokenId,
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input
        ) public {

        require(verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Solution not valid");

        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        addSolution(key, addr, tokenId);

        super.mint(addr, tokenId);
    }
}