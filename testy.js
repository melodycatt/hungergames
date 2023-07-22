for (let i = 0; i < 10; i++) {
   let a = [1,2,3]
   let b = [];
   let c = Math.random()
   let d = Math.round(c * a.length)
   b.push(a.splice(d, 1)[0]);
   console.log(a, b, c, d);
}