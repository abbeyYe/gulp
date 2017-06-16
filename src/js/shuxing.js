// alert(1)
$(function() {
    var app = new Vue({
        el: '#app',
        data: {
            class1: true,
            ok: 1,
            msg: 'massage',
            di: 16,
            seen: true,
            url: 'http://www.baidu.com',
            math: Math.random(),
            mylist: {
                time: '08-09',
                name: 'tom',
                age: '77'
            },
            web: "baidu",
            activeClass: "active",
            changebac: "changebac",
            activeColor: "#fee",
            style: {
                color: '#ffe',
                fontSize: '14px',
                background: "#f30"
            }
        },
        methods: {
            change: function() {

            }
        },
        computed: {
            rev: function() {
                return this.msg.split('').reverse().join("")
            },
            link: {
                get: function() {
                    return this.web + ':' + this.url
                },
                set: function(newValue) {
                    var webs = newValue.split(' ');
                    this.web = webs[0];
                    this.url = webs[webs.length - 1]
                }
            }
        },
        filters: {
            capitalize: function(value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    });
    app.link = '菜鸟教程 http://www.runoob.com';
    /*document.write('web: ' + app.web);
    document.write('<br>');
    document.write('url: ' + app.url);*/
})