//local-storage

export default {

    insert:
        function (table, item) {
//    insert items into database
            item.id = new Date().getTime()
            var arr = this.select(table);
            arr.push(item)
            localStorage.setItem(table, JSON.stringify(arr));
        },


    select:
        function (table) {
//   בחר/משוך select items from database
            var arr = localStorage.getItem(table);
            if (arr == null) {
                arr = '[]'
            }
            return JSON.parse(arr)
        },


    remove:
        function (table, id) {
            //select the relevant item from arr
            var arr = this.select(table);
            var foundIndex = this._searchIndexById(table, id);
            if (foundIndex == undefined) {
                return;
            }

            //remove the item from arr
            arr.splice(foundIndex, 1);

            localStorage.setItem(table, JSON.stringify(arr));
        },


    update:
        function (table, id, item) {
            // select the relevant item for arr
            var arr = this.select(table);
            var foundIndex = this._searchIndexById(table, id);
            if (foundIndex == undefined) {
                return;
            }
            //update the item in arr
            for (var key in item) {
                if (item[key]) {
                    var selectedItem = arr[foundIndex]
                    selectedItem[key] = item[key];

                }
            }
            // update the arr to local
            localStorage.setItem(table, JSON.stringify(arr));
        },

    getItemById: function (table, id) {
        var arr = this.select(table);
        return arr.find(function (item) {
            return item.id == id;
            //    כלומר האייטם יחזור רק במידה והid שווים
        })
    },


    _searchIndexById:
        function (table, id) {
            var arr = this.select(table);
            var foundIndex = undefined
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.id == id) {
                    foundIndex = i;
                    break;
                }

            }
            return foundIndex;
        }
}






