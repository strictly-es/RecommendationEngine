var dataset = {
  takayama: {
    "Dragon Quest": 10,
    "Super Mario": 9,
    Zelda: 4,
    "F-Zero": 7,
    "Final Fantasy": 5
  },
  nakamura: {
    "Dragon Quest": 7,
    "Super Mario": 5,
    Zelda: 8,
    "F-Zero": 7,
    "Final Fantasy": 6
  },
  tanaka: {
    "Dragon Quest": 8,
    "Super Mario": 10,
    Zelda: 5,
    "F-Zero": 8,
    "Final Fantasy": 8
  },
  koike: {
    "Dragon Quest": 3,
    "Super Mario": 8,
    Zelda: 10,
    "F-Zero": 6,
    "Final Fantasy": 10
  }
};

var distance = 1 / (1 + Math.sqrt(Math.pow(10 - 8, 2) + Math.pow(9 - 10, 2)));
console.log(distance);

var distance2 = 1 / (1 + Math.sqrt(Math.pow(10 - 3, 2) + Math.pow(9 - 8, 2)));
console.log(distance2);

var distance3 = 1 / (1 + Math.sqrt(Math.pow(10 - 10, 2) + Math.pow(4 - 4, 2)));
console.log(distance3);

function sim_distance(prefs, person1, person2) {
  var sumOfSquares = 0,
    matchItem = [];

  for (item in prefs[person1]) {
    if (item in prefs[person2]) {
      matchItem.push(item);
    }
  }

  // マッチするアイテムがない場合は処理しない。
  if (matchItem.length == 0) return;

  matchItem.forEach(function(val) {
    // sumOfSquares += Math.sqrt(
    //   Math.pow(prefs[person1][val] - prefs[person2][val], 2)
    // );
    sumOfSquares += Math.pow(prefs[person1][val] - prefs[person2][val], 2);
  });

  return 1 / (1 + Math.sqrt(sumOfSquares));
}

//console.log(sim_distance(dataset, "takayama", "tanaka"));

function sim_person2(prefs, person1, person2) {
  var matchItem = [];

  for (item in prefs[person1]) {
    if (item in prefs[person2]) {
      matchItem.push(item);
    }
  }

  if (matchItem.length == 0) return;

  var sum1 = 0,
    sum2 = 0,
    sum1Sq = 0,
    sum2Sq = 0,
    pSum = 0,
    n = matchItem.length,
    r = 0;

  matchItem.forEach(function(val) {
    // 評価点の合計
    sum1 += prefs[person1][val];
    sum2 += prefs[person2][val];

    // 平方を合計する
    sum1Sq += Math.pow(prefs[person1][val], 2);
    sum2Sq += Math.pow(prefs[person2][val], 2);

    // 積を合計する
    pSum += prefs[person1][val] * prefs[person2][val];
  });

  var num = pSum - (sum1 * sum2) / n;
  den = Math.sqrt(
    (sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n)
  );

  if (den == 0) return;

  r = num / den;
  return r;
}

console.log(sim_person2(dataset, "takayama", "tanaka"));
