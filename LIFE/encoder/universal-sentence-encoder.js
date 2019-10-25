/**
    * @license
    * Copyright 2019 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@tensorflow/tfjs-converter"),require("@tensorflow/tfjs-core")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs-converter","@tensorflow/tfjs-core"],n):n((e=e||self).use={},e.tf,e.tf)}(this,function(e,n,t){"use strict";function r(e,n,t,r){return new(t||(t=Promise))(function(o,i){function u(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(u,c)}s((r=r.apply(e,n||[])).next())})}function o(e,n){var t,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;u;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(e,u)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}var i=function(e){for(var n=[],t=0,r=e;t<r.length;t++){var o=r[t];n.push(o)}return n},u=function(){return function(){this.parent=null,this.children={},this.end=!1,this.word=[[],0,0]}}(),c=function(){function e(){this.root=new u}return e.prototype.insert=function(e,n,t){for(var r=this.root,o=i(e),c=0;c<o.length;c++)r.children[o[c]]||(r.children[o[c]]=new u,r.children[o[c]].parent=r,r.children[o[c]].word[0]=r.word[0].concat(o[c])),r=r.children[o[c]],c===o.length-1&&(r.end=!0,r.word[1]=n,r.word[2]=t)},e.prototype.commonPrefixSearch=function(e){for(var n=[],t=this.root.children[e[0]],r=0;r<e.length&&t;r++)t.end&&n.push(t.word),t=t.children[e[r+1]];return n.length||n.push([[e[0]],0,0]),n},e}(),s="▁";var l=6,a=function(){function e(e){this.vocabulary=e,this.trie=new c;for(var n=l;n<this.vocabulary.length;n++)this.trie.insert(this.vocabulary[n][0],this.vocabulary[n][1],n)}return e.prototype.encode=function(e){var n,t=[],r=[],o=[];n=e.normalize("NFKC"),e=s+n.replace(/ /g,s);for(var u=i(e),c=0;c<=u.length;c++)t.push({}),r.push(0),o.push(0);for(c=0;c<u.length;c++)for(var l=this.trie.commonPrefixSearch(u.slice(c)),a=0;a<l.length;a++){var f=l[a],h={key:f[0],score:f[1],index:f[2]};null==t[c+(d=f[0].length)][c]&&(t[c+d][c]=[]),t[c+d][c].push(h)}for(var d=0;d<=u.length;d++)for(var p in t[d]){var v=t[d][p];for(a=0;a<v.length;a++){var y=v[a],w=y.score+o[d-y.key.length];(0===o[d]||w>=o[d])&&(o[d]=w,r[d]=v[a].index)}}for(var b=[],g=r.length-1;g>0;)b.push(r[g]),g-=this.vocabulary[r[g]][0].length;var m=[],x=!1;for(c=0;c<b.length;c++){var j=b[c];x&&0===j||m.push(j),x=0===j}return m.reverse()},e}(),f="https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/";function h(e){return void 0===e&&(e=f+"vocab.json"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,t.util.fetch(e)];case 1:return[2,n.sent().json()]}})})}var d=function(){function e(){}return e.prototype.loadModel=function(){return r(this,void 0,void 0,function(){return o(this,function(e){return[2,n.loadGraphModel(f+"model.json")]})})},e.prototype.load=function(){return r(this,void 0,void 0,function(){var e,n,t;return o(this,function(r){switch(r.label){case 0:return[4,Promise.all([this.loadModel(),h()])];case 1:return e=r.sent(),n=e[0],t=e[1],this.model=n,this.tokenizer=new a(t),[2]}})})},e.prototype.embed=function(e){return r(this,void 0,void 0,function(){var n,r,i,u,c,s,l,a=this;return o(this,function(o){switch(o.label){case 0:for("string"==typeof e&&(e=[e]),n=e.map(function(e){return a.tokenizer.encode(e)}),r=n.map(function(e,n){return e.map(function(e,t){return[n,t]})}),i=[],u=0;u<r.length;u++)i=i.concat(r[u]);return c=t.tensor2d(i,[i.length,2],"int32"),s=t.tensor1d(t.util.flatten(n),"int32"),[4,this.model.executeAsync({indices:c,values:s})];case 1:return l=o.sent(),c.dispose(),s.dispose(),[2,l]}})})},e}();e.Tokenizer=a,e.UniversalSentenceEncoder=d,e.load=function(){return r(this,void 0,void 0,function(){var e;return o(this,function(n){switch(n.label){case 0:return[4,(e=new d).load()];case 1:return n.sent(),[2,e]}})})},e.loadTokenizer=function(e){return r(this,void 0,void 0,function(){var n;return o(this,function(t){switch(t.label){case 0:return[4,h(e)];case 1:return n=t.sent(),[2,new a(n)]}})})},Object.defineProperty(e,"__esModule",{value:!0})});
