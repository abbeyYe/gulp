// alert(1)
$(function() {
    // 定义一个组件  全局组件
    var Aaa = Vue.component('runoob', { //组件名称   配置选项
        data() {
            return {
                msg: "标题标题"
            }
        },
        methods: {
            change() {
                this.msg = "change"
            }
        },
        template: '<h3 @click=change()>{{msg}}</h3>'
    })

    // 自定义指令
    /*Vue.directive('focus', {
        inserted: function(el) {
            el.focus()
        }
    })*/

    new Vue({
        el: "#dome",
        data: {
            a: 'aaa'
        },
        components: {
            'ruuoob': {
                data() {
                    return {
                        msg: "welcome",
                        arr: ['ddd', 'age', 'ddw2']
                    }
                },
                methods: {
                    show1() {
                        this.msg = 'hello world'
                    }
                },
                template: '#aaa'
            },
            'aaa': {
                template: '<h3>Aaa标题</h3>'
            },
            'bbb': {
                template: '<h5>bbb标题</h5>'
            }
        },
    })

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
            },
            counter: 0,
            msg1: 'lets!',
            msg2: '2',
            checkbox: false,
            checkoutname: [],
            picked: "fistRadio",
            food: ""
        },
        methods: {
            show: function(msg) {
                alert(msg)
            },
            keyCode: function(msg) {
                alert(msg)

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
        directives: {
            focus: {
                inserted: function(el) {
                    el.focus();
                }
            },
            alert1: {
                inserted: function() {
                    console.log('ddd')
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

    new Vue({
        el: "#dome",
        data: {
            a: 'aaa'
        },
        components: {
            'ruuoob': {
                data() {
                    return {
                        msg: "welcome",
                        arr: ['ddd', 'age', 'ddw2']
                    }
                },
                methods: {
                    show1() {
                        this.msg = 'hello world'
                    }
                },
                template: '#aaa'
            }
        },
    })

    new Vue({
        el: "#dome1",
        data: {
            a: 'aaa'
        },
        components: {
            'aaa': {
                template: '<h3>Aaa标题</h3>'
            },
            'bbb': {
                template: '<h5>bbb标题</h5>'
            }
        },
    })

    // 倒计时
    var vm = new Vue({
        el: '#example',
        data() {
            return {
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false
            }
        },
        methods: {
            send() {
                let me = this;
                me.sendMsgDisabled = true;
                let interval = window.setInterval(function() {
                    console.log(me.time)
                    if ((me.time--) <= 0) {
                        me.time = 60;
                        me.sendMsgDisabled = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
            }
        }
    })
})