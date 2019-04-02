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

var euclid = Math.sqrt(Math.pow(3.5 - 2.5, 2) + Math.pow(4.0 - 3.5, 2));
//1.118033989
//console.log(euclid);

var reuclid = 1 / (1 + euclid);
//console.log(reuclid);

//calculate the euclidean distance btw two item
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

function sim_distance(prefs, person1, person2) {
  var sumOfSquares = 0,
    matchItem = [];

  for (item in prefs[person1]) {
    if (item in prefs[person2]) {
      matchItem.push(item);
    }
  }

  if (matchItem.length == 0) return;

  matchItem.forEach(function(val) {
    sumOfSquares += Math.pow(prefs[person1][val] - prefs[person2][val], 2);
  });

  return 1 / (1 + Math.sqrt(sumOfSquares));
}

var score = euclidean_score(dataset, "Lisa Rose", "Jack Matthews");
//0.3405424265831667

console.log(score);

var score2 = sim_distance(dataset, "Lisa Rose", "Jack Matthews");

console.log(score2);

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

var ranking = similar_user(dataset, "Jack Matthews", 3, euclidean_score);
console.log(ranking);

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
  return [rank_lst, recommend];
};

var ranking2 = recommendation_eng(dataset, "Toby", euclidean_score);

console.log(ranking2);
