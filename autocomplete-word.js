class TrieNode {
  constructor() {
    this.childrens = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.head = new TrieNode();
  }

  insert(word) {
    let curr = this.head;

    for (let char of word) {
      if (!curr.childrens[char]) {
        curr.childrens[char] = new TrieNode();
      }
      curr = curr.childrens[char];
    }

    curr.isWord = true;
  }

  dfs(curr, prefix, result) {
    if (curr.isWord) {
      result.push(prefix);
    }
    if (!curr.childrens) {
      return;
    }

    for (let char in curr.childrens) {
      this.dfs(curr.childrens[char], prefix + char, result);
    }
  }

  autocomplete(prefix) {
    let curr = this.head;

    for (let char of prefix) {
      if (!curr.childrens[char]) {
        return [];
      }
      curr = curr.childrens[char];
    }

    const result = [];
    this.dfs(curr, prefix, result);
    return result;
  }
}

const wordsArray = [
  "Yak",
  "Yawn",
  "Yelling",
  "Yordle",
  "Yodle",
  "bananna",
  "blade",
];
const trie = new Trie();
for (let i = 0; i < wordsArray.length; i++) {
  trie.insert(wordsArray[i]);
}

console.log(trie.autocomplete("Y"));
