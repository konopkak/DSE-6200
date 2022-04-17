var doMapReduce = function(options, callback) {

    var map = function () {

        var dateKey = new Date(options.time.getTime());
        dateKey.setMinutes(0);
        dateKey.setSeconds(0);
        dateKey.setMilliseconds(0);

        var mapped = {
            manuf: this.manufacturer,
            mode: this.model,
            time: dateKey,
            value: this.salesInThds,
            weight: 1
        }

        var key = options.userEmail + ":" + options.device.uid + ":" + dateKey;

        emit(key, mapped);
    };

    var reduce = function (key, values) {
        var reduced = {
            manuf: values[0].manuf,
            mode: values[0].mode,
            time: values[0].hour,
            value: 0,
            weight: 0
        }

        var totalWeight = 0;
        var sum = 0;

        values.forEach(function(value) {

            sum += (value.value * value.weight);
            totalWeight += value.weight;

        });

        // TODO: average in finalize to spare CPU (?)
        reduced.value = sum/totalWeight;
        reduced.weight = totalWeight;

        return reduced;
    };

    var finalize = function(key, value) {
        return value;
    }

    //TODO: criteria on sensor and user
    var options = {
        query: {
            user : options.userEmail,
            type : options.device
        },
        out: {
            merge: "measure1hs" // lowercase and 's' appended b/c not using Mongoose here...
        },
        include_statistics: true,
        verbose: true
    };

    db.Measure.collection.mapReduce(map, reduce, options, function(err, collection, stats) {
        callback(err, stats);
    });
}