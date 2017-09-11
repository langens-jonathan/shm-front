import Ember from 'ember';

export default Ember.Controller.extend({
    payments: [],

    dataArray: [],

    dataArrayPruned: [],

    title: "All time",

    totalEarned: 0,

    /*
     formatMoney was taken from stack overflow:
     https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
    */
    formatMoney: function(n){
        // var c = isNaN(c = Math.abs(c)) ? 2 : c, 
        //     d = d == undefined ? "." : d, 
        //     t = t == undefined ? "," : t,
        var c = 2,
            d = ',',
            t = '.',
            s = n < 0 ? "-" : "", 
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },

    titleObserver: Ember.observer('title', function() {
        var title = this.get('title');
        var context = "FINANCIAL-" + title;

        this.send('changeContext', context);
    }),

    periodSelectedObserver: Ember.observer('periodSelected', function() {
        var year = this.get('periodSelected');
        var dataArray = this.get('dataArray');

        var formatMoney = Ember.get(this, 'formatMoney');

        Ember.set(this, 'title', year);

        if(year === "All Time") {
            Ember.set(this, 'dataArrayPruned', dataArray);
            var te = 0;
            dataArray.forEach(function(a) { te += a.data; });
            Ember.set(this, 'totalEarned', formatMoney(te) + " €");
        } else {
            var dataArrayPruned = dataArray.filter(function(a) {
                return a.year === year;
            });
            Ember.set(this, 'dataArrayPruned', dataArrayPruned);
            var te = 0;
            dataArrayPruned.forEach(function(a) { te += a.data; });
            Ember.set(this, 'totalEarned', formatMoney(te) + " €");
        }
    }),

    paymentsObserver: Ember.observer('payments', function() {
        Ember.run.later(function(_this) {
            return function() {
                var payments = Ember.get(_this, 'payments');
                var dataArray = Object.keys(payments).map(function(key) {
                    return {
                        label: key,
                        data: payments[key].paid,
                        year: payments[key].year,
                        month: payments[key].month
                    };
                });

                dataArray = dataArray.sort(function(a, b) {
                    if(a.year === b.year) {
                        return a.month - b.month;
                    }
                    return a.year - b.year;
                });

                Ember.set(_this, 'dataArray', dataArray);
                var periods = ["All Time"]
                Object.keys(payments).forEach(function(key) {
                    if(!periods.contains(Number(key.slice(0, 4)))) {
                        periods.push(Number(key.slice(0,4)));
                    }
                });
                periods = periods.sort();
                periods = periods.reverse();
                Ember.set(_this, 'periods', periods);
                Ember.set(_this, 'periodSelected', periods[1]);
                Ember.Logger.log(periods);
            }
        }(this), 3000);
    }),

    init() {
        const options = {
//            sort: ,
            page: {
                number: 0,
                size: 1000
            }};

        var paymentsPromise = this.get('store').query('payment', options);

        var months = ["january", "february", "march", "april", "may", "june",
                      "july", "august", "september", "october", "november", "december"];

        paymentsPromise.then((function(_this) {
            return function(result) {
                var payments, dataArray;
                Ember.Logger.log(result);
                dataArray = [];
                payments = {};
                return result.forEach(function(p) {
                    var amount = Number(Ember.get(p, "amount"));
                    var paidOn = Ember.get(p, "paidOn");
                    var pMonth = months[paidOn.getMonth()];
                    var pYear = paidOn.getYear() + 3800;
                    var alreadyPaid = 0;
                    if(payments[pYear + " " + pMonth] !== undefined) {
                        alreadyPaid = payments[pYear + " " + pMonth].paid;
                    }
                    alreadyPaid += amount;
                    payments[pYear + " " + pMonth] = {
                        paid: alreadyPaid,
                        year: pYear,
                        month: paidOn.getMonth()
                    };
                    _this.set('payments', payments);
                });
            };
        })(this));
    }
});
