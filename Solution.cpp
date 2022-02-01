
#include<vector>
using namespace std;

class Solution {
    
    static const int ALPHABET = 26;
    static const int ASCII_SMALL_CASE_A = 97;
    static const int ASCII_SMALL_CASE_Z = 122;

    struct TrieNode {
        bool isEndOfSequence = false;
        vector<string> sequences;
        vector<shared_ptr<TrieNode>> branches {ALPHABET};
    };

public:

    vector<vector<string>> groupStrings(vector<string>& strings) {
        
        const shared_ptr<TrieNode> root(new TrieNode());
        fillTrieWithAllSequences(root, strings);

        vector<vector < string >> groups;
        shared_ptr<TrieNode> node = root;
        serachTrie(node, groups);

        return groups;
    }

    void fillTrieWithAllSequences(const shared_ptr<TrieNode> root, const vector<string>& strings) {
        for (const auto& sequence : strings) {
            addSequence(root, sequence);
        }
    }

    void serachTrie(shared_ptr<TrieNode> node, vector<vector<string>>&groups) {
        if (node == nullptr) {
            return;
        }
        if (node->isEndOfSequence) {
            groups.push_back(node->sequences);
        }

        for (int ascii_ch = ASCII_SMALL_CASE_A; ascii_ch <= ASCII_SMALL_CASE_Z; ascii_ch++) {
            if (node->branches[ascii_ch - ASCII_SMALL_CASE_A] != nullptr) {
                serachTrie(node->branches[ascii_ch - ASCII_SMALL_CASE_A], groups);
            }
        }
    }

    void addSequence(const shared_ptr<TrieNode> root, const string& sequence) {

        shared_ptr<TrieNode> current(root);
        const int shift = sequence[0] - ASCII_SMALL_CASE_A;

        for (const auto& character : sequence) {

            int index = getIndexForCharacterAfterShift(character, shift);

            if (current->branches[index] == nullptr) {
                current->branches[index] = shared_ptr<TrieNode>(new TrieNode());
            }
            current = current->branches[index];
        }

        current->isEndOfSequence = true;
        current->sequences.push_back(sequence);
    }

    int getIndexForCharacterAfterShift(int ascii_currentCharacter, int shift) {
        return (ascii_currentCharacter - ASCII_SMALL_CASE_A - shift + ALPHABET) % ALPHABET;
    }
};
