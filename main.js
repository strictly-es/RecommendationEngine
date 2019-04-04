function clickBtnEuclidean() {
  const user = document.getElementById("user").value;
  const target = document.getElementById("target").value;

  var score = euclidean_score(dataset2, user, target);

  document.getElementById("span3").textContent = score;
  console.log(user);
  console.log(target);

  console.log(score);
}

function clickBtnPearson() {
  const user = document.getElementById("user").value;
  const target = document.getElementById("target").value;

  var score = pearson_correlation2(dataset2, user, target);

  document.getElementById("span3").textContent = score;
  console.log(user);
  console.log(target);

  console.log(score);
}

function clickBtn2() {
  const user = document.getElementById("user").value;
  const output = document.getElementById("output");
  output.innerHTML = "";
  var ranking = similar_user(dataset2, user, 3, euclidean_score);
  //console.log(ranking);
  var str = "自分と似た人ランキング";
  ranking.forEach(function(val) {
    console.log(val.val);
    console.log(val.p);
    str += `<div>`;
    str += `<div>${val.val}</div>`;
    str += `<div>${val.p}</div>`;
    str += `</div>`;
  });
  output.innerHTML += str;
}

function clickBtn3() {
  const user = document.getElementById("user").value;
  const output2 = document.getElementById("output2");
  output2.innerHTML = "";

  var ranking2 = recommendation_eng(dataset2, user, euclidean_score);
  //var ranking2 = recommendation_eng(dataset2, user, pearson_correlation);
  console.log(ranking2);

  var str2 = `${user}にオススメ映画`;
  ranking2.forEach(function(val) {
    str2 += `<div>`;
    str2 += `<div>${val}</div>`;
    str2 += `</div>`;
  });
  output2.innerHTML += str2;
}

var countUpKamakura = 0;
var countUpZushi = 0;
var countUpHayama = 0;
var countUpAkitu = 0;
var countUpEnoshima = 0;

function countUp2(area) {
  var dataset3 = {
    takayama: {
      Kamakura: 10,
      Hayama: 9,
      Zushi: 4,
      Akiya: 7,
      Kugenuma: 5
    },
    nakamura: {
      Kamakura: 7,
      Hayama: 5,
      Zushi: 8,
      Akiya: 7,
      Kugenuma: 6
    },
    tanaka: {
      Kamakura: 8,
      Hayama: 10,
      Zushi: 5,
      Akiya: 8,
      Kugenuma: 8
    },
    koike: {
      Kamakura: 3,
      Hayama: 8,
      Zushi: 10,
      Akiya: 6,
      Kugenuma: 10
    },
    shun: {
      Kamakura: countUpKamakura,
      Hayama: countUpHayama,
      Zushi: countUpZushi,
      Akiya: countUpAkitu,
      Kugenuma: countUpEnoshima
    }
  };

  if (area === "kamakura") {
    const output_kamakura = document.getElementById("output_kamakura");
    if (countUpKamakura >= 10) return;
    countUpKamakura++;
    output_kamakura.innerHTML = countUpKamakura;
  } else if (area === "zushi") {
    const output_zushi = document.getElementById("output_zushi");
    if (countUpZushi >= 10) return;
    countUpZushi++;
    output_zushi.innerHTML = countUpZushi;
  } else if (area === "hayama") {
    const output_hayama = document.getElementById("output_hayama");
    if (countUpHayama >= 10) return;
    countUpHayama++;
    output_hayama.innerHTML = countUpHayama;
  } else if (area === "akiya") {
    const output_akitu = document.getElementById("output_akitu");
    if (countUpAkitu >= 10) return;
    countUpAkitu++;
    output_akitu.innerHTML = countUpAkitu;
  } else if (area === "kugenuma") {
    const output_enoshima = document.getElementById("output_enoshima");
    if (countUpEnoshima >= 10) return;
    countUpEnoshima++;
    output_enoshima.innerHTML = countUpEnoshima;
  } else {
    return;
  }

  //var ranking2 = recommendation_eng(dataset3, "shun", euclidean_score);
  var ranking2 = recommendation_eng(dataset3, "shun", pearson_correlation);

  console.log(dataset3);
  console.log(ranking2);
  displayImage(ranking2);
  output_recommendation.innerHTML = ranking2;
}

function displayImage(params) {
  document.getElementById("img2").innerHTML = "";
  for (const item of params) {
    if (item === "Kamakura") {
      document.getElementById("img2").innerHTML +=
        "<img width=128 height=128 src='./img2/kamakura.jpg'>";
    } else if (item === "Hayama") {
      document.getElementById("img2").innerHTML +=
        "<img width=128 height=128 src='./img2/hayama.jpg'>";
    } else if (item === "Zushi") {
      document.getElementById("img2").innerHTML +=
        "<img width=128 height=128 src='./img2/zushi.jpg'>";
    } else if (item === "Akiya") {
      document.getElementById("img2").innerHTML +=
        "<img width=128 height=128 src='./img2/akitu.jpg'>";
    } else if (item === "Kugenuma") {
      document.getElementById("img2").innerHTML +=
        "<img width=128 height=128 src='./img2/enoshima.jpg'>";
    }
  }
}

var dataset = {
  "Lisa Rose": {
    "Lady in the Water": 2.5,
    "Snakes on a Plane": 3.5,
    "Just My Luck": 3.0,
    "Superman Returns": 3.5,
    "You, Me and Dupree": 2.5,
    "The Night Listener": 3.0
  },
  "Gene Seymour": {
    "Lady in the Water": 3.0,
    "Snakes on a Plane": 3.5,
    "Just My Luck": 1.5,
    "Superman Returns": 5.0,
    "The Night Listener": 3.0,
    "You, Me and Dupree": 3.5
  },

  "Michael Phillips": {
    "Lady in the Water": 2.5,
    "Snakes on a Plane": 3.0,
    "Superman Returns": 3.5,
    "The Night Listener": 4.0
  },
  "Claudia Puig": {
    "Snakes on a Plane": 3.5,
    "Just My Luck": 3.0,
    "The Night Listener": 4.5,
    "Superman Returns": 4.0,
    "You, Me and Dupree": 2.5
  },

  "Mick LaSalle": {
    "Lady in the Water": 3.0,
    "Snakes on a Plane": 4.0,
    "Just My Luck": 2.0,
    "Superman Returns": 3.0,
    "The Night Listener": 3.0,
    "You, Me and Dupree": 2.0
  },

  "Jack Matthews": {
    "Lady in the Water": 3.0,
    "Snakes on a Plane": 4.0,
    "The Night Listener": 3.0,
    "Superman Returns": 5.0,
    "You, Me and Dupree": 3.5
  },
  Toby: {
    "Snakes on a Plane": 4.5,
    "You, Me and Dupree": 1.0,
    "Superman Returns": 4.0
  }
};

var dataset2 = {
  takayama: {
    Kamakura: 10,
    Hayama: 9,
    Zushi: 4,
    Shichirigahama: 7,
    Enoshima: 5
  },
  nakamura: {
    Kamakura: 7,
    Hayama: 5,
    Zushi: 8,
    Shichirigahama: 7,
    Enoshima: 6
  },
  tanaka: {
    Kamakura: 8,
    Hayama: 10,
    Zushi: 5,
    Shichirigahama: 8,
    Enoshima: 8
  },
  koike: {
    Kamakura: 3,
    Hayama: 8,
    Zushi: 10,
    Shichirigahama: 6,
    Enoshima: 10
  },
  shun: {
    Kamakura: 10,
    Hayama: 9,
    Zushi: 3,
    Shichirigahama: 7,
    Enoshima: 2
  }
};

var euclidean_score = function(dataset, p1, p2) {
  var existp1p2 = {}; //store item existing in both item
  //if dataset is in p1 and p2
  //store it in as one
  for (var key in dataset[p1]) {
    if (key in dataset[p2]) {
      existp1p2[key] = 1;
    }

    if (len(existp1p2) == 0) return 0; //check if it has a data
    var sum_of_euclidean_dist = []; //store the  euclidean distance

    //calculate the euclidean distance
    for (item in dataset[p1]) {
      if (item in dataset[p2]) {
        sum_of_euclidean_dist.push(
          Math.pow(dataset[p1][item] - dataset[p2][item], 2)
        );
      }
    }

    var sum = 0;
    for (var i = 0; i < sum_of_euclidean_dist.length; i++) {
      sum += sum_of_euclidean_dist[i]; //calculate the sum of the euclidean
    }
    //since the sum will be small for familiar user
    // and larger for non-familiar user
    //we make it exist btwn 0 and 1

    var sum_sqrt = 1 / (1 + Math.sqrt(sum));
    return sum_sqrt;
  }
};

var len = function(obj) {
  var len = 0;
  for (var i in obj) {
    len++;
  }
  return len;
};

var similar_user = function(dataset, person, num_user, distance) {
  var scores = [];
  for (var others in dataset) {
    if (others != person && typeof dataset[others] != "function") {
      var val = distance(dataset, person, others);
      var p = others;
      scores.push({ val: val, p: p });
    }
  }
  scores.sort(function(a, b) {
    return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
  });
  var score = [];
  for (var i = 0; i < num_user; i++) {
    score.push(scores[i]);
  }
  return score;
};

// var ranking = similar_user(dataset, "Jack Matthews", 3, euclidean_score);
// console.log(ranking);

var recommendation_eng = function(dataset, person, distance) {
  var totals = {
      //you can avoid creating a setter function
      //like this in the object you found them
      //since it just check if the object has the property if not create
      //and add the value to it.
      //and  because of this setter that why a function property
      // is created in the dataset, when we transform them.
      setDefault: function(props, value) {
        if (!this[props]) {
          this[props] = 0;
        }
        this[props] += value;
      }
    },
    simsum = {
      setDefault: function(props, value) {
        if (!this[props]) {
          this[props] = 0;
        }

        this[props] += value;
      }
    },
    rank_lst = [];
  for (var other in dataset) {
    if (other === person) continue;
    var similar = distance(dataset, person, other);

    if (similar <= 0) continue;
    for (var item in dataset[other]) {
      if (!(item in dataset[person]) || dataset[person][item] == 0) {
        //the setter help to make this look nice.
        totals.setDefault(item, dataset[other][item] * similar);
        simsum.setDefault(item, similar);
      }
    }
  }

  for (var item in totals) {
    //this what the setter function does
    //so we have to find a way to avoid the function in the object
    if (typeof totals[item] != "function") {
      var val = totals[item] / simsum[item];

      rank_lst.push({ val: val, items: item });
    }
  }

  rank_lst.sort(function(a, b) {
    return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
  });

  var recommend = [];
  for (var i in rank_lst) {
    recommend.push(rank_lst[i].items);
  }
  //return [rank_lst, recommend];
  return recommend;
};

// var ranking2 = recommendation_eng(dataset, "Toby", euclidean_score);

// console.log(ranking2);

function pearson_correlation(prefs, person1, person2) {
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

var pearson_correlation2 = function(dataset, p1, p2) {
  var existp1p2 = {};
  for (item in dataset[p1]) {
    if (item in dataset[p2]) {
      existp1p2[item] = 1;
    }
  }
  var num_existence = len(existp1p2);
  if (num_existence == 0) return 0;
  //store the sum and the square sum of both p1 and p2
  //store the product of both
  var p1_sum = 0,
    p2_sum = 0,
    p1_sq_sum = 0,
    p2_sq_sum = 0,
    prod_p1p2 = 0;
  //calculate the sum and square sum of each data point
  //and also the product of both point
  for (var item in existp1p2) {
    p1_sum += dataset[p1][item];
    p2_sum += dataset[p2][item];
    p1_sq_sum += Math.pow(dataset[p1][item], 2);
    p2_sq_sum += Math.pow(dataset[p2][item], 2);
    prod_p1p2 += dataset[p1][item] * dataset[p2][item];
  }
  var numerator = prod_p1p2 - (p1_sum * p2_sum) / num_existence;
  var st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
  var st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
  var denominator = Math.sqrt(st1 * st2);
  if (denominator == 0) return 0;
  else {
    var val = numerator / denominator;
    return val;
  }
};

//var score = pearson_correlation(dataset, "Lisa Rose", "Jack Matthews");
// console.log("pearson" + score);
