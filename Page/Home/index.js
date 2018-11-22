const Home = new Vue({
    el: '#Home',
    data: {
        welcome: 'hello tom!',
        family: [
            { id: 1, parent: 0, name: "一代" },
            { id: 11, parent: 1, name: "二代-1" },
            { id: 12, parent: 1, name: "二代-2" },
            { id: 13, parent: 1, name: "二代-3" },
            { id: 2, parent: 1, name: "二代-4" },
            { id: 21, parent: 2, name: "二代-4-1" },
            { id: 22, parent: 2, name: "二代-4-2" },
            { id: 23, parent: 2, name: "二代-4-3" },
            { id: 3, parent: 1, name: "二代-5" },
            { id: 31, parent: 3, name: "二代-5-1" },
            { id: 32, parent: 3, name: "二代-5-2" },
            { id: 33, parent: 3, name: "二代-5-3" },
            { id: 34, parent: 31, name: "三代-5-1-1" },
            { id: 35, parent: 31, name: "三代-5-1-2" },
            { id: 36, parent: 31, name: "三代-5-1-3" },
            { id: 37, parent: 36, name: "四代-5-1-3-1" },
            { id: 38, parent: 37, name: "五代-5-1-3-1-1" }
        ],
        peiou: [
            { id: 1, fid: 1, name: '配偶1' },
            { id: 2, fid: 1, name: '配偶2' },
            { id: 3, fid: 2, name: '配偶' },
            { id: 4, fid: 3, name: '配偶' },
        ],
        iwidth: 0
    },
    mounted: function () {
        this.$nextTick(function () {
            this.list();
            
            
        });
    },
    computed: {
        groups: function () {
            let tree = {};
            for (var i = 0; i < this.family.length; i++) {
                if (tree[this.family[i].parent]) {
                    tree[this.family[i].parent].push(this.family[i]);
                } else {
                    tree[this.family[i].parent] = [];
                    tree[this.family[i].parent].push(this.family[i]);
                }
            }
            //console.log(tree);
            return tree;
        },
        familyTree: function () {
            let html = this.createTree(this.groups[0]);
            //console.log(html);
            return html;
        }
    },
    methods: {
        //获取成员列表
        list: function () {
            axios.get('../Server/', { params: { module: 'Home', action: 'list' } })
                .then(response => {
                    //console.log(response.data);
                    this.family = response.data;
                    this.iwidth = this.family.length * 100;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        createTree: function (a) {
            //console.log();
            if (!a) { return ''; }
            let html = '\n<ul>\n';
            for (let i = 0; i < a.length; i++) {
                html += '<li><span>';
                html += '<button onclick="show(\'' + a[i].name + '\')"><i class="icon-male-avatar"></i><br/>' + a[i].name + '</button><br/>';
                html += this.getPeiou(a[i].id);
                html += '</span>';
                html += this.createTree(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        },
        getPeiou: function (fid) {
            let pdom = '';
            for (p of this.peiou) {
                if (p.fid == fid) {
                    pdom += '<button onclick="show(' + p.id + ')"><i class="icon-female-avatar"></i><br/>' + p.name + '</button>';
                }
            }
            //console.log(pdom);
            return pdom;
        },
        getName: function (name) {
            console.log('this is name :', name);
        }
    }
});

let show = function (name) {
    Home.getName(name);
};
