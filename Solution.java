
import java.util.List;
import java.util.ArrayList;

public class Solution {

    static final int ALPHABET = 26;
    static final int ASCII_SMALL_CASE_A = 97;
    static final int ASCII_SMALL_CASE_Z = 122;

    class TrieNode {

        boolean isEndOfSequence = false;
        List<String> sequences = new ArrayList<>();
        TrieNode[] branches = new TrieNode[ALPHABET];
    }

    public List<List<String>> groupStrings(String[] strings) {

        final TrieNode root = new TrieNode();
        fillTrieWithAllSequences(root, strings);

        List<List<String>> groups = new ArrayList<>();
        TrieNode node = root;
        serachTrie(node, groups);

        return groups;
    }

    public void serachTrie(TrieNode node, List<List<String>> groups) {
        if (node == null) {
            return;
        }
        if (node.isEndOfSequence) {
            groups.add(node.sequences);
        }

        for (int ascii_ch = ASCII_SMALL_CASE_A; ascii_ch <= ASCII_SMALL_CASE_Z; ascii_ch++) {
            if (node.branches[ascii_ch - ASCII_SMALL_CASE_A] != null) {
                serachTrie(node.branches[ascii_ch - ASCII_SMALL_CASE_A], groups);
            }
        }
    }

    public void fillTrieWithAllSequences(TrieNode root, String[] strings) {
        for (String sequence : strings) {
            addSequence(root, sequence);
        }
    }

    public void addSequence(TrieNode root, String sequence) {

        TrieNode current = root;
        final int size = sequence.length();
        final int shift = sequence.codePointAt(0) - ASCII_SMALL_CASE_A;

        for (int i = 0; i < size; i++) {

            int index = getIndexForCharacterAfterShift(sequence.codePointAt(i), shift);

            if (current.branches[index] == null) {
                current.branches[index] = new TrieNode();
            }
            current = current.branches[index];
        }

        current.isEndOfSequence = true;
        current.sequences.add(sequence);
    }

    public int getIndexForCharacterAfterShift(int ascii_currentCharacter, int shift) {
        return (ascii_currentCharacter - ASCII_SMALL_CASE_A - shift + ALPHABET) % ALPHABET;
    }
}
