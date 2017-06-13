// alert(1)
// console.log("hello world")
$(function() {
    var todolist = new Vue({
            el: '#todolist',
            data: {
                myData: [],
                username: "",
                age: "",
                nowIndex: -100,
                text: ""
            },
            methods: {
                add: function($event) {
                    // if (this.username != "" && this.age != "") {
                    this.myData.push({
                        name: this.username,
                        age: this.age
                    });
                    this.username = '',
                        this.age = ''
                        /*} else {
                            alert("请输入用户信息")
                        }*/
                },
                delMsg: function(n) {
                        if (n == -2) {
                            this.myData = []
                        } else {
                            this.myData.splice(n, 1)
                        }
                    }
                    /*add:function($event){
                    	this.myData.push({
                    		name:this.username,
                    		age:this.age
                    	});
                    	// $event.preventDefault()
                    	console.log($event)
                    },*/
            }
        })
        /*var demo = new Vue({
            el: '#demo',
            data: {
                msg: 'hello vue',
                arr: ["aaa", "bbb", "ccc", "ddd"],
                json: {
                    a: "aaa",
                    b: "bbb",
                    c: "ccc",
                    d: "ddd"
                },
                show: true
            },
            methods: {
                add: function() {
                    // alert(this.arr)
                    this.arr.push("eee")
                }

            }
        })*/
    var box = new Vue({
        el: "#box",
        data: {},
        methods: {
            get: function() {
                this.$http.get('../data/get.txt').then(function(res) {
                    console.log(res.data)
                    console.log(res.status)
                }, function(res) {
                    alert(res.status)
                })
            },
            get1: function() {
                this.$http.get('../data/get.php', {
                    a: 2,
                    b: 1
                }).then(function(res) {
                    console.log(res.data)
                    console.log(res.status)
                }, function(res) {
                    alert(res.status)
                })
            },
            post: function() {
                this.$http.post('?data', {
                    a: 2,
                    b: 1
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    console.log(res.data)
                    console.log(res.status)
                }, function(res) {
                    alert(res.status)
                })
            },
            jsonp: function() {
                this.$http.jsonp('https://sug.so.360.cn/suggest', {
                    word: 'a'
                }).then(function(res) {
                    console.log(res.data)
                    console.log(res.status)
                }, function(res) {
                    alert(res.status)
                })
            },
            jsonp1: function() {
                this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
                    wd: 'b'
                }, {
                    jsonp: 'cb' //callback名字，默认名字为“callback”
                }).then(function(res) {
                    console.log(res.data)
                    console.log(res.status)
                }, function(res) {
                    alert(res.status)
                })
            }
        }
    })
    var search = new Vue({
        el: '#search',
        data: {
            info: [],
            t1: '',
            now: -1
        },
        methods: {
            get: function(ev) {
                if (ev.keyCode == 38 || ev.keyCode == 40) return
                if (ev.keyCode == 13) {
                    window.open('https://hwww.baidu.com/s?wd=' + this.t1);
                    this.t1 = ''
                }
                this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
                    wd: this.t1
                        /*this.$http({
                            url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
                            data: {
                                wd: this.t1
                            }*/
                }, {
                    jsonp: 'cb'
                }).then(function(res) {
                    // console.log(res.data)
                    this.info = res.data.s
                }, function(res) {

                })
            },
            changeDown: function() {
                this.now++;
                if (this.now == this.info.length) {
                    this.now = -1
                };
                this.t1 = this.info[this.now]
            },
            changeUp: function() {
                this.now--;
                if (this.now == -2) {
                    this.now = this.info.length - 1
                };
                this.t1 = this.info[this.now]
            }
        }
    })
})