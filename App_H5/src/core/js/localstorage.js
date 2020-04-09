import Vue from "vue";
class LocalList {
    constructor() {
        this.local = {};
        this.storage = window.localStorage;
    }
    getKeys(key) {
        let _keys = Object.keys(this.local);
        return _keys.includes(key);
    }
    setItem(key, value) {
        if (this.storage) {
            try {
                if (typeof value === "string") {
                    this.storage.setItem(key, value);
                }
                let _value = JSON.stringify(value);
                this.storage.setItem(key, _value);
            } catch (err) {
                console.log("缓存错误:" + err);
            }
        } else {
            try {
                this.local = {
                    ...this.local,
                    [key]: value
                };
            } catch (err) {
                console.log("缓存错误:" + err);
            }
        }
    }
    //取缓存1：单个key，2:[]多个key传数组
    getItem(keys) {
        if (Array.isArray(keys) && keys.length > 0) {
            let _saveList = {};
            if (this.storage) {
                keys.forEach(key => {
                    let _value = JSON.parse(this.storage.getItem(key));
                    if (typeof _value == "string") {
                        _saveList = { ..._saveList, [key]: _value };
                    } else {
                        _saveList = { ..._saveList, ..._value };
                    }
                });
            } else {
                keys.forEach(key => {
                    _saveList = { ..._saveList, ...this.local[key] };
                });
            }

            return _saveList;
        } else if (keys) {
            if (this.storage) {
                try {
                    let json = this.storage.getItem(keys);
                    return JSON.parse(json);
                } catch (err) {
                    console.log("读取数据错误:" + err);
                }
            } else if (this.getKeys(keys)) {
                return this.local[keys];
            }
            return "";
        }
    }
    //删除缓存1：单个key，2:[]多个key传数组
    clearItem(keys) {
        let _local = this.local;
        if (Array.isArray(keys) && keys.length > 0) {
            keys.forEach(key => {
                this.storage.removeItem(key);
                _local[key] ? delete _local[key] : "";
            });
        } else {
            this.storage && keys
                ? this.storage.removeItem(keys)
                : delete _local[keys];
        }
        this.local = this.local;
    }
    clearAll() {
        this.local = {};
        this.storage.clear();
    }
}

Vue.prototype.$localList = new LocalList();
