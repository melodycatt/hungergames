let a = [1,2,3,4,5,6,7,8]

while (a[0]) {
   console.log(a[0])
   a.splice(0, 1)
}

/* 
<- eg output: 
   1
   [ 5 ]
   2
   [ 2 ]
   4
   [ 3 ]
   7a
   [ 1 ]
*/