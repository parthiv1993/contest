(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{141:function(e,t,a){e.exports=a(291)},149:function(e,t){},151:function(e,t){},188:function(e,t){},189:function(e,t){},277:function(e,t,a){},288:function(e,t,a){},291:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(53),o=a.n(l),i=a(12),s=a(13),c=a(15),u=a(14),m=a(16),d=a(134),h=a.n(d),f="WCAuction3User",y="WCAuction3Token";function g(){return localStorage.getItem([y])}function v(){return{headers:{Authorization:g()}}}var b=a(298),p=a(295),E=a(292),k=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"onLoginClick",value:function(e){this.props.onLogin(this.state.name),e.preventDefault()}},{key:"onInputChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{style:{height:"-webkit-fill-available"}},r.a.createElement(b.a,{style:{margin:"auto",width:"400px",top:"25%",bottom:"0"}},r.a.createElement(b.a.Header,null,"Login"),r.a.createElement(b.a.Body,null,r.a.createElement(p.a,{onSubmit:this.onLoginClick.bind(this)},r.a.createElement(p.a.Group,{controlId:"formNickName"},r.a.createElement(p.a.Label,null,"Nick Name"),r.a.createElement(p.a.Control,{type:"text",placeholder:"Enter your given NickName",onChange:this.onInputChange.bind(this)})),r.a.createElement(E.a,{variant:"primary",type:"submit"},"Submit"))),r.a.createElement(b.a.Footer,null,"Don't have a login ? Contact Parthiv")))}}]),t}(r.a.Component),P=a(297),C=a(296),O=a(9),S=a.n(O),T="/api",A=5e3,j=6e4,I=6e4,w=a(8),R=(a(277),function(e){return r.a.createElement(E.a,{variant:"outline-info",onClick:function(){confirm(e.warning)&&e.handler()}},e.buttonName)}),N=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isExtendedMenuOption:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"logOut",value:function(){localStorage.clear(),window.location.reload()}},{key:"componentWillUnmount",value:function(){localStorage.clear()}},{key:"startAuctionHandler",value:function(){this.startAuctionRequest().then(function(e){w.toast.success("Auction started. Enjoy the auction!!")},function(e){})}},{key:"startAuctionRequest",value:function(){return S.a.get(T+"/resetAuction",v())}},{key:"timerHandler",value:function(){S.a.get(T+"/toggleTimerEnabled",v()).then(function(e){w.toast.success(e.data)},function(e){})}},{key:"pauseTimerNow",value:function(){S.a.get(T+"/pauseTimer",v()).then(function(e){w.toast.success(e.data)},function(e){})}},{key:"startTimerNow",value:function(){S.a.get(T+"/startTimer",v()).then(function(e){w.toast.success(e.data)},function(e){})}},{key:"changeTimerWaitForSold",value:function(){S.a.post(T+"/changeTimerWaitForSold",{timeWait:1e3*this.inputText},v()).then(function(e){w.toast.success(e.data)},function(e){})}},{key:"changeTimerWaitForNextPlayer",value:function(){S.a.post(T+"/changeTimerWaitForNextPlayer",{timeWait:1e3*this.inputText},v()).then(function(e){w.toast.success(e.data)},function(e){})}},{key:"getStatus",value:function(){S.a.get(T+"/getStatus",v()).then(function(e){if(e.data)try{Object.keys(e.data).map(function(t){w.toast.info([t]+" : "+JSON.stringify(e.data[t],null,4).replace(/\,/g,"___").replace(/\:/g,"="),{autoClose:!1,className:"statusNotification",position:w.toast.POSITION.TOP_CENTER})})}catch(t){}w.toast.info(e.data,{autoClose:!1})},function(e){})}},{key:"tryTest",value:function(){var e={command:"specialPlayerId = ".concat(this.inputText)};S.a.post(T+"/eval",e,v()).then(function(e){w.toast.success(e.data)},function(e){})}},{key:"render",value:function(){var e=this,t=localStorage.getItem([f])||"User";return[r.a.createElement(P.a,{bg:"dark",variant:"dark"},r.a.createElement(P.a.Brand,{href:"#home"},"Hi ".concat(t)),r.a.createElement(C.a,{className:"mr-auto"}),r.a.createElement(E.a,{variant:"outline-info",onClick:this.logOut.bind(this)},"Log Out")),r.a.createElement(P.a,{bg:"dark",variant:"dark"},("Parthiv"==t||"Nikhil"==t)&&r.a.createElement(R,{warning:"You are about to restart the auction. Are you Sure?",handler:this.startAuctionHandler.bind(this),buttonName:"Start Auction"}),"\xa0",("Parthiv"==t||"Nikhil"==t)&&r.a.createElement(R,{warning:"You are about to toggle the timer. Are you Sure?",handler:this.timerHandler.bind(this),buttonName:"Enable / Disable Timer"}),"\xa0","Parthiv"==t&&r.a.createElement("input",{onChange:function(t){e.inputText=parseInt(t.target.value)}}),"\xa0","Parthiv"==t&&r.a.createElement(R,{warning:"You are Change Timer for marking player sold. Are you Sure?",handler:this.changeTimerWaitForSold.bind(this),buttonName:"Change Time to Sold"}),"\xa0","Parthiv"==t&&r.a.createElement(R,{warning:"You are Change Timer for getiing next player. Are you Sure?",handler:this.changeTimerWaitForNextPlayer.bind(this),buttonName:"Change Time to Next player"}),"\xa0","Parthiv"==t&&r.a.createElement(R,{warning:"You are about to get status. Are you Sure?",handler:this.getStatus.bind(this),buttonName:"Get Status"}),"\xa0","Parthiv"==t&&r.a.createElement(E.a,{variant:"outline-info",onClick:function(){confirm("You are about to get test. Are you Sure?")||e.tryTest()}},"Test"))]}}]),t}(n.Component),x=a(293),B=a(136),H=a(294),D=a(24),L=a.n(D),q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={currentAuctionInfo:null,bidAmt:5},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getLiveAuctionInfo(),this.interval=setInterval(function(){e.getLiveAuctionInfo()},A)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"getLiveAuctionInfo",value:function(){var e=this;S.a.get(T+"/liveAuctionInfo",v()).then(function(t){if(!L.a.isEqual(t.data,e.state.currentAuctionInfo)){var a=t.data.bids&&t.data.bids[0]&&t.data.bids[0].bidAmt+5||5,n=t.data.basePrize,r=Math.max(n,a);e.setState({currentAuctionInfo:t.data,bidAmt:r})}},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.error(e)})}},{key:"roundOff",value:function(e){var t=5*Math.ceil(parseInt(e.target.value)/5);this.setState({bidAmt:t})}},{key:"handleBidInputChange",value:function(e){this.setState({bidAmt:e.target.value})}},{key:"bid",value:function(){var e=this;if(this.state.bidAmt&&this.state.bidAmt>0){var t=localStorage.getItem([f])||"User",a=this.state.currentAuctionInfo.playerId;this.doBidRequest(a,this.state.bidAmt,t).then(function(t){e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.error(e)})}}},{key:"doBidRequest",value:function(e,t,a){return S.a.post(T+"/addBid",{playerId:e,bidAmt:t,bidBy:a},v())}},{key:"markPlayerSoldHandler",value:function(){var e=this;this.markPlayerSoldRequest(this.state.currentAuctionInfo.playerId).then(function(t){t.data&&t.data.message&&w.toast.success(t.data.message),e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.error(e)})}},{key:"markPlayerSoldRequest",value:function(e){return S.a.post(T+"/markAsSold",{playerId:e},v())}},{key:"bringNextPlayerHandler",value:function(){var e=this;this.bringNextPlayerRequest().then(function(t){e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.err(e)})}},{key:"bringNextPlayerRequest",value:function(){return S.a.get(T+"/bringNextPlayer",v())}},{key:"onRefreshHandler",value:function(){this.getLiveAuctionInfo()}},{key:"render",value:function(){var e=localStorage.getItem([f])||"User",t=this.state.currentAuctionInfo,a=!!(t&&t.bids&&t.bids.length&&t.bids.length>0)?"Mark as Sold":"Mark as Unsold";return t?r.a.createElement(b.a,null,r.a.createElement(b.a.Header,null,"Current/ Last Player",r.a.createElement(E.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(b.a.Body,null,r.a.createElement(x.a,{style:{margin:"0px"}},r.a.createElement(B.a,{sm:12},"PlayerId : ".concat(t.playerId)),r.a.createElement(B.a,{sm:12},"Player Name : ".concat(t.name)),r.a.createElement(B.a,{sm:12},"Team : ".concat(t.team)),r.a.createElement(B.a,{sm:12},"Base Prize : ".concat(t.basePrize)),r.a.createElement(B.a,{sm:12},"Time Left : ".concat(t.timeLeft?t.timeLeft/1e3-3:"null"," Seconds")),t.soldTo&&r.a.createElement("span",null,r.a.createElement(B.a,{sm:12},"Sold to : ".concat(t.soldTo)),r.a.createElement(B.a,{sm:12},"Sold for : ".concat(t.soldAt," points"))),!t.soldTo&&r.a.createElement(B.a,{sm:12},r.a.createElement("input",{style:{margin:"15px",marginLeft:"0px"},type:"number",step:"5",value:this.state.bidAmt,placeholder:"Bid Amount",onBlur:this.roundOff.bind(this),onChange:this.handleBidInputChange.bind(this)}),"readOnly"!=e&&r.a.createElement(E.a,{size:"sm",onClick:this.bid.bind(this)},"Bid")),!t.soldTo&&("Parthiv"===e||"Nikhil"===e)&&r.a.createElement(B.a,{sm:12},r.a.createElement(E.a,{size:"sm",variant:"danger",onClick:this.markPlayerSoldHandler.bind(this)},a)),t.soldTo&&("Parthiv"===e||"Nikhil"===e)&&r.a.createElement(B.a,{sm:12},r.a.createElement(E.a,{size:"sm",variant:"info",onClick:this.bringNextPlayerHandler.bind(this)},"Get Next Player")),r.a.createElement(B.a,{sm:12},z(t.bids))))):null}}]),t}(n.Component),z=function(e){return e&&e.length>0?r.a.createElement("div",null,r.a.createElement("h4",null,"Previous Bids:"),r.a.createElement(H.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Bid By"),r.a.createElement("th",null,"Bid Amt"))),r.a.createElement("tbody",null,e.map(function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.bidBy),r.a.createElement("td",null,e.bidAmt))})))):r.a.createElement("div",null,"You Can Start Bidding")},W=q,F=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={points:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.remainingPointsRequest(),this.interval=setInterval(function(){e.remainingPointsRequest()},j)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"remainingPointsRequest",value:function(){var e=this;S.a.get(T+"/remaningPoints",v()).then(function(t){L.a.isEqual(t.data,e.state.points)||e.setState({points:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.error(e)})}},{key:"onRefreshHandler",value:function(){this.remainingPointsRequest()}},{key:"render",value:function(){var e=this.state.points;localStorage.getItem([f]);return e?r.a.createElement(b.a,null,r.a.createElement(b.a.Header,{as:"h5"},"Points Remaining",r.a.createElement(E.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(b.a.Body,null,r.a.createElement(H.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Team Owner"),r.a.createElement("th",null,"Points"))),r.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,t),r.a.createElement("td",null,e[t]))}))))):null}}]),t}(r.a.Component),M=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={team:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getYourTeam(),this.interval=setInterval(function(){e.getYourTeam()},I)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"getYourTeam",value:function(){var e=this;S.a.get(T+"/myTeam",v()).then(function(t){L.a.isEqual(t.data,e.state.team)||e.setState({team:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.error(e)})}},{key:"onRefreshHandler",value:function(){this.getYourTeam()}},{key:"getTeamColour",value:function(e){return{CSK:"#fcce06",MI:"#004f91",KKR:"#3a225d",SRH:"#f7a721",RCB:"#d5152c",KXIP:"#ed1f27",DC:"#2561ae",RR:"#254aa5"}[e]}},{key:"getTeamTextColor",value:function(e){return{CSK:"#f25c19",MI:"#ffffff",KKR:"#f3c433",SRH:"#9a1c22",RCB:"#000000",KXIP:"#ffffff",DC:"#d71921",RR:"#ffffff"}[e]}},{key:"render",value:function(){var e=this,t=this.state.team;return t?r.a.createElement(b.a,null,r.a.createElement(b.a.Header,{as:"h5"},"My Team",r.a.createElement(E.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(b.a.Body,null,r.a.createElement(H.a,{bordered:"true",hover:"true",size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Sr."),r.a.createElement("th",null,"Player Name"),r.a.createElement("th",null,"Points"),r.a.createElement("th",null,"Team"))),r.a.createElement("tbody",null,t.map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,a+1),r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.soldAt),r.a.createElement("td",{style:{backgroundColor:"".concat(e.getTeamColour(t.team)),color:"".concat(e.getTeamTextColor(t.team))}},t.team))}))))):null}}]),t}(r.a.Component),U=a(140),Y=a(139),K=a.n(Y),G=(a(288),a(75)),_=a.n(G),J=(a(289),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(E.a,{onClick:function(){return e.props.onToggleFilter(e.abc)},style:{float:"right"}},"Filter"))}}]),t}(r.a.Component)),X=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).refreshDataHandler=function(){a.getAllPlayerData()},a.sortRows=function(e,t,a){return"NONE"===a?e:e.sort(function(e,n){return"ASC"===a?e[t]>n[t]?1:-1:"DESC"===a?e[t]<n[t]?1:-1:void 0})},a.handleFilterChange=function(e){var t=a.state.filters,n=e.column.key;return e.filterTerm?t[n]=e:delete t[n],t},a.state={players:[],dPlayers:[],sortedPlayers:[],filteredPlayers:[],filters:{}},a.columns=[{key:"srNo",name:"Sr. No"},{key:"playerId",name:"Player ID",sortable:!0,filterable:!0},{key:"name",name:"Player Name",sortable:!0,filterable:!0},{key:"team",name:"Team",sortable:!0,filterable:!0},{key:"soldTo",name:"Sold To",sortable:!0,filterable:!0},{key:"soldAt",name:"Price",sortable:!0},{key:"basePrize",name:"BasePrize"}],a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getAllPlayerData()}},{key:"getAllPlayerData",value:function(){var e=this;S.a.get(T+"/allPlayers",v()).then(function(t){e.setState({players:t.data,dPlayers:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.error(e)})}},{key:"download",value:function(){try{var e=new _.a,t=this.getRows(this.state.dPlayers,this.state.filters);e.autoTable({head:[["ID","Player Name","Team","Sold At","Sold To","basePrize","\r\n"]],body:t.map(function(e){return[e.playerId,e.name,e.team,e.soldAt,e.soldTo,e.basePrize]})}),e.save("summary.pdf")}catch(a){console.log(a)}}},{key:"downloadAsExcell",value:function(){try{var e=this.getRows(this.state.dPlayers,this.state.filters),t="Player Id,Name,Team,Sold At,Sold To,basePrize,Bids\r\n";e.forEach(function(e){for(var a in e)t+=JSON.stringify(e[a]).replace(/\,/g,"")+",";t+="\r\n"}),t="data:application/csv,"+encodeURIComponent(t);var a=document.createElement("A");a.setAttribute("href",t),a.setAttribute("download","WCauction1.csv"),document.body.appendChild(a),a.click()}catch(n){console.log(n)}}},{key:"setdPlayers",value:function(e){this.setState({dPlayers:e})}},{key:"getRows",value:function(e,t){var a=e;return Object.keys(t).map(function(e){var n=t[e].filterTerm;a=a.filter(function(t){return t[e]&&t[e].toString().toLowerCase().indexOf(n.toLowerCase())>-1})}),a}},{key:"setFilters",value:function(e){this.setState({filters:e})}},{key:"render",value:function(){var e=this,t=this.state.players,a=this.state.dPlayers,n=this.state.filters,l=this.getRows(a,n);return t&&t.length>0?r.a.createElement("div",null,r.a.createElement("h2",{style:{display:"inline-block"}},"All PLayers Data"),"\xa0",r.a.createElement(E.a,{variant:"info",style:{float:"right"},onClick:this.download.bind(this)},"Download PDF"),"\xa0",r.a.createElement("span",{style:{float:"right"}},"\xa0"),r.a.createElement(E.a,{variant:"info",style:{float:"right"},onClick:this.downloadAsExcell.bind(this)},"Download Excell"),r.a.createElement("span",{style:{float:"right"}},"\xa0"),r.a.createElement(E.a,{variant:"info",style:{float:"right"},onClick:this.refreshDataHandler.bind(this)},"Refresh Data"),r.a.createElement(K.a,{columns:this.columns,rowGetter:function(e){return Object(U.a)({srNo:e+1},l[e])},rowsCount:l.length,minHeight:500,toolbar:r.a.createElement(J,null),onGridSort:function(a,n){return e.setdPlayers(e.sortRows(t,a,n))},onAddFilter:function(t){return e.setFilters(e.handleFilterChange(t))},onClearFilters:function(){return e.setFilters({})}})):null}}]),t}(r.a.Component),$=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={count:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.remainingPlayerRequest(),this.interval=setInterval(function(){e.remainingPlayerRequest()},j)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"remainingPlayerRequest",value:function(){var e=this;S.a.get(T+"/getRemainingPlayersCount",v()).then(function(t){L.a.isEqual(t.data,e.state.points)||e.setState({count:t.data})},function(e){console.error(e)})}},{key:"onRefreshHandler",value:function(){this.remainingPlayerRequest()}},{key:"render",value:function(){var e=this.state.count;return e?r.a.createElement(b.a,null,r.a.createElement(b.a.Header,{as:"h5"},"Players Remaining",r.a.createElement(E.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(b.a.Body,null,r.a.createElement(H.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Type"),r.a.createElement("th",null,"Number of Players"))),r.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,t.replace("_"," ")),r.a.createElement("td",null,e[t]))}))))):null}}]),t}(r.a.Component),Q=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(N,null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(x.a,{style:{margin:"0px"}},r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(W,null)),r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement($,null)),r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(F,null)),r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(M,null)),r.a.createElement(B.a,{sm:12},r.a.createElement("br",null)),r.a.createElement(B.a,{sm:12},r.a.createElement(X,null))))}}]),t}(n.Component),V=(a(290),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"login",value:function(e){var t=this;S.a.post(T+"/login",{nickName:e}).then(function(e){!function(e){try{var t=h.a.decode(e);t&&(localStorage.setItem([y],e),localStorage.setItem([f],t.user))}catch(a){console.error(a)}}(e.data.token),t.forceUpdate()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&w.toast.error(e.response.data.message),console.log(e.response)})}},{key:"render",value:function(){var e=!!g();return r.a.createElement("div",null,e?r.a.createElement(Q,null):r.a.createElement(k,{onLogin:this.login.bind(this)}),r.a.createElement(w.ToastContainer,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[141,1,2]]]);
//# sourceMappingURL=main.887b31e0.chunk.js.map