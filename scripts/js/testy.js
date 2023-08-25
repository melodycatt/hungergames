function useRegex(input) {
   return input.match(/(?<=\[)[^\[\]]+?(?=\])/g);
}

console.log(useRegex('[1] pee [aaaaa]'))
