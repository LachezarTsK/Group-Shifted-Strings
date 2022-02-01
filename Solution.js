
/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {

    this.ALPHABET = 26;
    this.ASCII_SMALL_CASE_A = 97;
    this.ASCII_SMALL_CASE_Z = 122;

    const root = new TrieNode();
    fillTrieWithAllSequences(root, strings);

    const groups = [];
    let node = root;
    serachTrie(node, groups);

    return groups;
};

function TrieNode() {
    this.ALPHABET = 26;
    this.isEndOfSequence = false;
    this.sequences = [];
    this.branches = new Array(this.ALPHABET).fill(null);
}

/**
 * @param {TrieNode} node
 * @param {string[][]} groups
 */
function serachTrie(node, groups) {
    if (node === null) {
        return;
    }
    if (node.isEndOfSequence) {
        groups.push(node.sequences);
    }

    for (let ascii_ch = this.ASCII_SMALL_CASE_A; ascii_ch <= this.ASCII_SMALL_CASE_Z; ascii_ch++) {
        if (node.branches[ascii_ch - this.ASCII_SMALL_CASE_A] !== null) {
            serachTrie(node.branches[ascii_ch - this.ASCII_SMALL_CASE_A], groups);
        }
    }
}

/**
 * @param {TrieNode} root
 * @param {string[]} strings
 */
function fillTrieWithAllSequences(root, strings) {
    for (let sequence of strings) {
        addSequence(root, sequence);
    }
}

/**
 * @param {TrieNode} root
 * @param {string} sequence
 */
function addSequence(root, sequence) {

    let current = root;
    const size = sequence.length;
    const shift = sequence.codePointAt(0) - this.ASCII_SMALL_CASE_A;

    for (let i = 0; i < size; i++) {

        let index = getIndexForCharacterAfterShift(sequence.codePointAt(i), shift);

        if (current.branches[index] === null) {
            current.branches[index] = new TrieNode();
        }
        current = current.branches[index];
    }

    current.isEndOfSequence = true;
    current.sequences.push(sequence);
}

/**
 * @param {number} ascii_currentCharacter
 * @param {number} shift
 * @return {number}
 */
function getIndexForCharacterAfterShift(ascii_currentCharacter, shift) {
    return (ascii_currentCharacter - this.ASCII_SMALL_CASE_A - shift + this.ALPHABET) % this.ALPHABET;
}
