const { play, instrument, scale } = require('repl').repl.context

const Rx = require('node-keyboard-rx')()

// the first 96 digits of PI
const PI = '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117'

module.exports = (key = 'c', scaleName = 'major') => {

    const cmaj = scale(`${key}3`, scaleName)

    const notes = cmaj.concat(scale(`${key}4`, scaleName))

    Rx.Observable.from(PI.split(''))
        .concatMap(d => Rx.Observable.of(d).delay(150))
        .do(d => process.stdout.write(d))
        .skip(2)
        .map(digit => notes[Number(digit)])
        .map(instrument('koto'))
        .subscribe(play)
}