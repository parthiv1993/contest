(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{155:function(e,t,a){e.exports=a(317)},163:function(e,t){},165:function(e,t){},202:function(e,t){},203:function(e,t){},291:function(e,t,a){},314:function(e,t,a){},317:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(30),i=a.n(l),o=a(14),s=a(15),c=a(18),u=a(16),m=a(17),d=a(147),h=a.n(d);function f(){return localStorage.getItem("token")}function y(){return{headers:{Authorization:f()}}}var g=a(324),v=a(320),p=a(150),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"onLoginClick",value:function(e){this.props.onLogin(this.state.name),e.preventDefault()}},{key:"onInputChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{style:{height:"-webkit-fill-available"}},r.a.createElement(g.a,{style:{margin:"auto",width:"400px",top:"25%",bottom:"0"}},r.a.createElement(g.a.Header,null,"Login"),r.a.createElement(g.a.Body,null,r.a.createElement(v.a,{onSubmit:this.onLoginClick.bind(this)},r.a.createElement(v.a.Group,{controlId:"formNickName"},r.a.createElement(v.a.Label,null,"Nick Name"),r.a.createElement(v.a.Control,{type:"text",placeholder:"Enter your given NickName",onChange:this.onInputChange.bind(this)})),r.a.createElement(p.a,{variant:"primary",type:"submit"},"Submit"))),r.a.createElement(g.a.Footer,null,"Don't have a login ? Contact Parthiv")))}}]),t}(r.a.Component),b=a(323),k=a(322),O=a(321),P=a(10),I=a.n(P),C="http://contest-ipl-contest-ipl.7e14.starter-us-west-2.openshiftapps.com/api",j=5e3,S=6e4,T=6e4,A=a(9),w=(a(291),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isExtendedMenuOption:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"logOut",value:function(){var e=this;"Parthiv"!=(localStorage.getItem("user")||"User")||this.state.isExtendedMenuOption?(localStorage.clear(),window.location.reload()):(this.setState({isExtendedMenuOption:!0}),setTimeout(function(){return e.setState({isExtendedMenuOption:!1})},1e4))}},{key:"startAuctionHandler",value:function(){this.startAuctionRequest().then(function(e){A.toast.success("Auction started. Enjoy the auction!!")},function(e){})}},{key:"startAuctionRequest",value:function(){return I.a.get(C+"/resetAuction",y())}},{key:"timerHandler",value:function(){I.a.get(C+"/toggleTimerEnabled",y()).then(function(e){A.toast.success(e.data)},function(e){})}},{key:"pauseTimerNow",value:function(){I.a.get(C+"/pauseTimer",y()).then(function(e){A.toast.success(e.data)},function(e){})}},{key:"startTimerNow",value:function(){I.a.get(C+"/startTimer",y()).then(function(e){A.toast.success(e.data)},function(e){})}},{key:"changeTimerWaitForSold",value:function(){I.a.post(C+"/changeTimerWaitForSold",{timeWait:1e3*this.inputText},y()).then(function(e){A.toast.success(e.data)},function(e){})}},{key:"changeTimerWaitForNextPlayer",value:function(){I.a.post(C+"/changeTimerWaitForNextPlayer",{timeWait:1e3*this.inputText},y()).then(function(e){A.toast.success(e.data)},function(e){})}},{key:"getStatus",value:function(){I.a.get(C+"/getStatus",y()).then(function(e){if(e.data)try{Object.keys(e.data).map(function(t){A.toast.info([t]+" : "+JSON.stringify(e.data[t],null,4).replace(/\,/g,"___").replace(/\:/g,"="),{autoClose:!1,className:"statusNotification",position:A.toast.POSITION.TOP_CENTER})})}catch(t){}A.toast.info(e.data,{autoClose:!1})},function(e){})}},{key:"renderOtherOptions",value:function(){return r.a.createElement("div",null,r.a.createElement(b.a,null,r.a.createElement(b.a.Toggle,{variant:"outline-info",id:"dropdown-basic"},"Other Options"),r.a.createElement(b.a.Menu,null,r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{size:"sm",variant:"outline-info",onClick:this.pauseTimerNow.bind(this)},"Pause Timer now")),r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{size:"sm",variant:"outline-info",onClick:this.startTimerNow.bind(this)},"Start Timer for current player")),r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{size:"sm",variant:"outline-info",onClick:this.timerHandler.bind(this)},"Enable / Disable Timer")),r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{size:"sm",variant:"outline-info",onClick:this.changeTimerWaitForSold.bind(this)},"Change Time to Sold")),r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{size:"sm",variant:"outline-info",onClick:this.changeTimerWaitForNextPlayer.bind(this)},"Change Time to Next player")),r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{size:"sm",variant:"outline-info",onClick:this.getStatus.bind(this)},"Get Status")))))}},{key:"render",value:function(){var e=this,t=localStorage.getItem("user")||"User";return r.a.createElement(k.a,{bg:"dark",variant:"dark"},r.a.createElement(k.a.Brand,{href:"#home"},"Hi ".concat(t)),r.a.createElement(O.a,{className:"mr-auto"}),"Parthiv"==t&&this.state.isExtendedMenuOption&&r.a.createElement("input",{onChange:function(t){e.inputText=parseInt(t.target.value)}}),"\xa0","Parthiv"==t&&this.state.isExtendedMenuOption&&this.renderOtherOptions(),"\xa0","Parthiv"==t&&r.a.createElement(p.a,{variant:"outline-info",onClick:this.startAuctionHandler.bind(this)},"Start Auction"),"\xa0",r.a.createElement(p.a,{variant:"outline-info",onClick:this.logOut.bind(this)},"Log Out"))}}]),t}(n.Component)),R=a(318),N=a(149),x=a(319),H=a(33),B=a.n(H),q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={currentAuctionInfo:null,bidAmt:5},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getLiveAuctionInfo(),this.interval=setInterval(function(){e.getLiveAuctionInfo()},j)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"getLiveAuctionInfo",value:function(){var e=this;I.a.get(C+"/liveAuctionInfo",y()).then(function(t){if(!B.a.isEqual(t.data,e.state.currentAuctionInfo)){var a=t.data.bids&&t.data.bids[0]&&t.data.bids[0].bidAmt+5||5;e.setState({currentAuctionInfo:t.data,bidAmt:a})}},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.error(e)})}},{key:"startAuction",value:function(e){e.preventDefault()}},{key:"roundOff",value:function(e){var t=5*Math.ceil(parseInt(e.target.value)/5);this.setState({bidAmt:t})}},{key:"handleBidInputChange",value:function(e){this.setState({bidAmt:e.target.value})}},{key:"bid",value:function(){var e=this;if(this.state.bidAmt&&this.state.bidAmt>0){var t=localStorage.getItem("user")||"User",a=this.state.currentAuctionInfo.playerId;this.doBidRequest(a,this.state.bidAmt,t).then(function(t){e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.error(e)})}}},{key:"doBidRequest",value:function(e,t,a){return I.a.post(C+"/addBid",{playerId:e,bidAmt:t,bidBy:a},y())}},{key:"markPlayerSoldHandler",value:function(){var e=this;this.markPlayerSoldRequest(this.state.currentAuctionInfo.playerId).then(function(t){t.data&&t.data.message&&A.toast.success(t.data.message),e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.error(e)})}},{key:"markPlayerSoldRequest",value:function(e){return I.a.post(C+"/markAsSold",{playerId:e},y())}},{key:"bringNextPlayerHandler",value:function(){var e=this;this.bringNextPlayerRequest().then(function(t){e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.err(e)})}},{key:"bringNextPlayerRequest",value:function(){return I.a.get(C+"/bringNextPlayer",y())}},{key:"onRefreshHandler",value:function(){this.getLiveAuctionInfo()}},{key:"render",value:function(){var e=localStorage.getItem("user")||"User",t=this.state.currentAuctionInfo,a=!!(t&&t.bids&&t.bids.length&&t.bids.length>0)?"Mark as Sold":"Mark as Unsold";return t?r.a.createElement(g.a,null,r.a.createElement(g.a.Header,null,"Current/ Last Player",r.a.createElement(p.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(g.a.Body,null,r.a.createElement(R.a,{style:{margin:"0px"}},r.a.createElement(N.a,{sm:12},"PlayerId : ".concat(t.playerId)),r.a.createElement(N.a,{sm:12},"Player Name : ".concat(t.name)),r.a.createElement(N.a,{sm:12},"Team : ".concat(t.team)),r.a.createElement(N.a,{sm:12},"Grade : ".concat(t.grade)),r.a.createElement(N.a,{sm:12},"Nationality : ".concat(t.nationality)),t.soldTo&&r.a.createElement("span",null,r.a.createElement(N.a,{sm:12},"Sold to : ".concat(t.soldTo)),r.a.createElement(N.a,{sm:12},"Sold for : ".concat(t.soldAt," points"))),!t.soldTo&&r.a.createElement(N.a,{sm:12},r.a.createElement("input",{style:{margin:"15px",marginLeft:"0px"},type:"number",step:"5",value:this.state.bidAmt,placeholder:"Bid Amount",onBlur:this.roundOff.bind(this),onChange:this.handleBidInputChange.bind(this)}),"readOnly"!=e&&r.a.createElement(p.a,{size:"sm",onClick:this.bid.bind(this)},"Bid")),!t.soldTo&&("Parthiv"===e||"Nikhil"===e)&&r.a.createElement(N.a,{sm:12},r.a.createElement(p.a,{size:"sm",variant:"danger",onClick:this.markPlayerSoldHandler.bind(this)},a)),t.soldTo&&r.a.createElement(N.a,{sm:12},r.a.createElement(p.a,{size:"sm",variant:"info",onClick:this.bringNextPlayerHandler.bind(this)},"Get Next Player")),r.a.createElement(N.a,{sm:12},D(t.bids))))):null}}]),t}(n.Component),D=function(e){return e&&e.length>0?r.a.createElement("div",null,r.a.createElement("h4",null,"Previous Bids:"),r.a.createElement(x.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Bid By"),r.a.createElement("th",null,"Bid Amt"))),r.a.createElement("tbody",null,e.map(function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.bidBy),r.a.createElement("td",null,e.bidAmt))})))):r.a.createElement("div",null,"You Can Start Bidding")},L=q,z=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={points:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.remainingPointsRequest(),this.interval=setInterval(function(){e.remainingPointsRequest()},S)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"remainingPointsRequest",value:function(){var e=this;I.a.get(C+"/remaningPoints",y()).then(function(t){B.a.isEqual(t.data,e.state.points)||e.setState({points:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.error(e)})}},{key:"onRefreshHandler",value:function(){this.remainingPointsRequest()}},{key:"render",value:function(){var e=this.state.points;localStorage.getItem("user");return e?r.a.createElement(g.a,null,r.a.createElement(g.a.Header,{as:"h5"},"Points Remaining",r.a.createElement(p.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(g.a.Body,null,r.a.createElement(x.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Team Owner"),r.a.createElement("th",null,"Points"))),r.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,t),r.a.createElement("td",null,e[t]))}))))):null}}]),t}(r.a.Component),F=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={team:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getYourTeam(),this.interval=setInterval(function(){e.getYourTeam()},T)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"getYourTeam",value:function(){var e=this;I.a.get(C+"/myTeam",y()).then(function(t){B.a.isEqual(t.data,e.state.team)||e.setState({team:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.error(e)})}},{key:"onRefreshHandler",value:function(){this.getYourTeam()}},{key:"render",value:function(){var e=this.state.team;return e?r.a.createElement(g.a,null,r.a.createElement(g.a.Header,{as:"h5"},"My Team",r.a.createElement(p.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(g.a.Body,null,r.a.createElement("div",{className:"legend"},r.a.createElement("ul",{style:{listStyle:"none"}},r.a.createElement("li",{style:{float:"left",marginRight:"10px"}},r.a.createElement("span",{style:{border:"1px solid #ccc",float:"left",width:"24px",height:"24px",margin:"2px",backgroundColor:"cornflowerblue"}}),r.a.createElement("span",null,"Indian")),r.a.createElement("li",{style:{float:"right",marginRight:"10px"}},r.a.createElement("span",{style:{border:"1px solid #ccc",float:"left",width:"24px",height:"24px",margin:"2px",backgroundColor:"palevioletred"}}),r.a.createElement("span",null,"Overseas")))),r.a.createElement(x.a,{bordered:"true",hover:"true",size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Sr."),r.a.createElement("th",null,"Player Name"),r.a.createElement("th",null,"Points"),r.a.createElement("th",null,"Team"))),r.a.createElement("tbody",null,e.map(function(e,t){return r.a.createElement("tr",{key:t,style:{backgroundColor:"Indian"==e.nationality?"cornflowerblue":"palevioletred"}},r.a.createElement("td",null,t+1),r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.soldAt),r.a.createElement("td",null,e.team))}))))):null}}]),t}(r.a.Component),M=a(154),W=a.n(M),U=(a(314),a(86)),G=a.n(U),Y=(a(315),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(p.a,{onClick:function(){return e.props.onToggleFilter(e.abc)},style:{float:"right"}},"Filter"))}}]),t}(r.a.Component)),_=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).refreshDataHandler=function(){a.getAllPlayerData()},a.sortRows=function(e,t,a){return"NONE"===a?e:e.sort(function(e,n){return"ASC"===a?e[t]>n[t]?1:-1:"DESC"===a?e[t]<n[t]?1:-1:void 0})},a.handleFilterChange=function(e){var t=a.state.filters,n=e.column.key;return e.filterTerm?t[n]=e:delete t[n],t},a.state={players:[],dPlayers:[],sortedPlayers:[],filteredPlayers:[],filters:{}},a.columns=[{key:"playerId",name:"Player ID",sortable:!0,filterable:!0},{key:"name",name:"Player Name",sortable:!0,filterable:!0},{key:"grade",name:"Grade",sortable:!0,filterable:!0},{key:"team",name:"IPL Team",sortable:!0,filterable:!0},{key:"soldTo",name:"Sold To",sortable:!0,filterable:!0},{key:"nationality",name:"Nationality",sortable:!0,filterable:!0},{key:"soldAt",name:"Price",sortable:!0}],a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getAllPlayerData()}},{key:"getAllPlayerData",value:function(){var e=this;I.a.get(C+"/allPlayers",y()).then(function(t){e.setState({players:t.data,dPlayers:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.error(e)})}},{key:"download",value:function(){try{var e=new G.a,t=this.getRows(this.state.dPlayers,this.state.filters);e.autoTable({head:[["ID","Player Name","Team","Sold At","Sold To","Grade","Nationality"]],body:t.map(function(e){return[e.playerId,e.name,e.team,e.soldAt,e.soldTo,e.grade,e.nationality]})}),e.save("summary.pdf")}catch(a){}}},{key:"setdPlayers",value:function(e){this.setState({dPlayers:e})}},{key:"getRows",value:function(e,t){var a=e;return Object.keys(t).map(function(e){var n=t[e].filterTerm;a=a.filter(function(t){return t[e]&&t[e].toString().indexOf(n)>-1})}),a}},{key:"setFilters",value:function(e){this.setState({filters:e})}},{key:"render",value:function(){var e=this,t=this.state.players,a=this.state.dPlayers,n=this.state.filters,l=this.getRows(a,n);return t&&t.length>0?r.a.createElement("div",null,r.a.createElement("h2",{style:{display:"inline-block"}},"All PLayers Data"),"\xa0",r.a.createElement(p.a,{variant:"info",style:{float:"right"},onClick:this.download.bind(this)},"Download Summary"),r.a.createElement("span",{style:{float:"right"}},"\xa0"),r.a.createElement(p.a,{variant:"info",style:{float:"right"},onClick:this.refreshDataHandler.bind(this)},"Refresh Data"),r.a.createElement(W.a,{columns:this.columns,rowGetter:function(e){return l[e]},rowsCount:l.length,minHeight:500,toolbar:r.a.createElement(Y,null),onGridSort:function(a,n){return e.setdPlayers(e.sortRows(t,a,n))},onAddFilter:function(t){return e.setFilters(e.handleFilterChange(t))},onClearFilters:function(){return e.setFilters({})}})):null}}]),t}(r.a.Component),J=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={count:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.remainingPlayerRequest(),this.interval=setInterval(function(){e.remainingPlayerRequest()},S)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"remainingPlayerRequest",value:function(){var e=this;I.a.get(C+"/getRemainingPlayersCount",y()).then(function(t){B.a.isEqual(t.data,e.state.points)||e.setState({count:t.data})},function(e){console.error(e)})}},{key:"onRefreshHandler",value:function(){this.remainingPlayerRequest()}},{key:"render",value:function(){var e=this.state.count;localStorage.getItem("user");return e?r.a.createElement(g.a,null,r.a.createElement(g.a.Header,{as:"h5"},"Players Remaining",r.a.createElement(p.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(g.a.Body,null,r.a.createElement(x.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Grade"),r.a.createElement("th",null,"Number of Players"))),r.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,t.replace("_"," ")),r.a.createElement("td",null,e[t]))}))))):null}}]),t}(r.a.Component),$=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(w,null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(R.a,{style:{margin:"0px"}},r.a.createElement(N.a,{sm:12,lg:3},r.a.createElement(L,null)),r.a.createElement(N.a,{sm:12,lg:3},r.a.createElement(J,null)),r.a.createElement(N.a,{sm:12,lg:3},r.a.createElement(z,null)),r.a.createElement(N.a,{sm:12,lg:3},r.a.createElement(F,null)),r.a.createElement(N.a,{sm:12},r.a.createElement("br",null)),r.a.createElement(N.a,{sm:12},r.a.createElement(_,null))))}}]),t}(n.Component),K=(a(316),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"login",value:function(e){var t=this;I.a.post(C+"/login",{nickName:e}).then(function(e){!function(e){try{var t=h.a.decode(e);t&&(localStorage.setItem("token",e),localStorage.setItem("user",t.user))}catch(a){console.error(a)}}(e.data.token),t.forceUpdate()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&A.toast.error(e.response.data.message),console.log(e.response)})}},{key:"render",value:function(){var e=!!f();return r.a.createElement("div",null,e?r.a.createElement($,null):r.a.createElement(E,{onLogin:this.login.bind(this)}),r.a.createElement(A.ToastContainer,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[155,1,2]]]);
//# sourceMappingURL=main.ae53adfd.chunk.js.map