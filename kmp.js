let s = 'aabbababc'
let ss = 'abc'
let j = 0

const next = buildNext(ss)
console.log(next)
for(var i=0; i<s.length;i++){
    if(s[i]==ss[j]){
        j++
        if(j==ss.length){
            console.log(i-ss.length+1)
            break
        }
    }else{
        if(j>1){
            i--
            j = next[j-1]
        }else{
            j = 0
        }
    }
}


function buildNext(s) {
    let tmp = [0]
    let len = 0
    for (var i = 1; i < ss.length; i++) {
        if (ss[i] == ss[len]) {
            len++
            tmp.push(len)
        } else {
            if (len == 0) {
                tmp.push(0)
            } else {
                len = tmp[len - 1]
                i--
            }
        }

    }
    return tmp
}
