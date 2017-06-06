const foo = bar => bar
const upper = bar => bar.toUpperCase()

foo.upper = upper

console.log(foo('Hey'), foo.upper('Hey'))
