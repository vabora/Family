const Home = new Vue({
    el: '#Home',
    data: {
        welcome: 'hello tom!',
        family: [
            { id: 1, pId: 0, name: "一代" },
            { id: 11, pId: 1, name: "二代-1" },
            { id: 12, pId: 1, name: "二代-2" },
            { id: 13, pId: 1, name: "二代-3" },
            { id: 2, pId: 1, name: "二代-4" },
            { id: 21, pId: 2, name: "二代-4-1" },
            { id: 22, pId: 2, name: "二代-4-2" },
            { id: 23, pId: 2, name: "二代-4-3" },
            { id: 3, pId: 1, name: "二代-5" },
            { id: 31, pId: 3, name: "二代-5-1" },
            { id: 32, pId: 3, name: "二代-5-2" },
            { id: 33, pId: 3, name: "二代-5-3" },
            { id: 34, pId: 31, name: "三代-5-1-1" },
            { id: 35, pId: 31, name: "三代-5-1-2" },
            { id: 36, pId: 31, name: "三代-5-1-3" },
            { id: 37, pId: 36, name: "四代-5-1-3-1" },
            { id: 38, pId: 37, name: "五代-5-1-3-1-1" }
        ],
        peiou:[
            {id:1,fid:1,name:'配偶1'},
            {id:2,fid:1,name:'配偶2'},
            {id:3,fid:2,name:'配偶'},
            {id:4,fid:3,name:'配偶'},
        ],
        iwidth:0
    },
    mounted: function () {
        this.$nextTick(function () {
          this.iwidth = this.family.length*100;
        });
    },
    computed: {
        groups: function () {
            let tree = {};
            for (var i = 0; i < this.family.length; i++) {
                if (tree[this.family[i].pId]) {
                    tree[this.family[i].pId].push(this.family[i]);
                } else {
                    tree[this.family[i].pId] = [];
                    tree[this.family[i].pId].push(this.family[i]);
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
        createTree: function (a) {
            //console.log();
            if (!a) { return '' ;}
            let html = '\n<ul>\n';
            for (let i = 0; i < a.length; i++) {
                html += '<li><span>';
                html += '<button onclick="show(\''+a[i].name+'\')"><i class="icon-male-avatar"></i><br/>' + a[i].name + '</button><br/>';
                html += this.getPeiou(a[i].id);
                html += '</span>';
                html += this.createTree(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        },
        getPeiou:function(fid){
            let pdom = '';
            for(p of this.peiou){
                if(p.fid==fid){
                    pdom+='<button onclick="show('+p.id+')"><i class="icon-female-avatar"></i><br/>'+p.name+'</button>';
                }
            }
            //console.log(pdom);
            return pdom;
        },
        getName:function(name){
            console.log('this is name :',name);
        }
    }
});

let show = function(name){
    Home.getName(name);
};
