(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{141:function(e,t,a){e.exports=a(291)},149:function(e,t){},151:function(e,t){},188:function(e,t){},189:function(e,t){},277:function(e,t,a){},288:function(e,t,a){},291:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(53),l=a.n(o),i=a(12),s=a(13),c=a(15),u=a(14),m=a(16),d=a(134),h=a.n(d),f="IPL2021User",g="IPL2021Token",y="IPL2021Privilage";function v(){return localStorage.getItem([g])}function b(){try{return localStorage.getItem([y])}catch(e){return console.error(e),0}}function p(){return{headers:{Authorization:v()}}}var E=a(298),k=a(295),O=a(292),C=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:"",latitude:null,longitude:null},a.getLocation(),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"getLocation",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({latitude:t.coords.latitude,longitude:t.coords.longitude})},function(e){return alert("Location access required to login")})}},{key:"onLoginClick",value:function(e){this.props.onLogin(this.state.name,this.state.latitude,this.state.longitude),e.preventDefault()}},{key:"onInputChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{style:{height:"-webkit-fill-available"}},r.a.createElement(E.a,{style:{margin:"auto",width:"400px",top:"25%",bottom:"0"}},r.a.createElement(E.a.Header,null,"Login"),r.a.createElement(E.a.Body,null,r.a.createElement(k.a,{onSubmit:this.onLoginClick.bind(this)},r.a.createElement(k.a.Group,{controlId:"formNickName"},r.a.createElement(k.a.Label,null,"Nick Name"),r.a.createElement(k.a.Control,{type:"text",placeholder:"Enter your given NickName",onChange:this.onInputChange.bind(this)})),r.a.createElement(O.a,{variant:"primary",type:"submit"},"Submit"))),r.a.createElement(E.a.Footer,null,"Don't have a login ? Contact Parthiv")))}}]),t}(r.a.Component),S=a(297),P=a(296),T=a(9),I=a.n(T),A="/api",j=5e3,w=6e4,R=6e4,N=a(8),x=(a(277),function(e){return r.a.createElement(O.a,{variant:"outline-info",onClick:function(){confirm(e.warning)&&e.handler()}},e.buttonName)}),L=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isExtendedMenuOption:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"logOut",value:function(){localStorage.clear(),window.location.reload()}},{key:"componentWillUnmount",value:function(){localStorage.clear()}},{key:"startAuctionHandler",value:function(){this.startAuctionRequest().then(function(e){N.toast.success("Auction started. Enjoy the auction!!")},function(e){})}},{key:"startAuctionRequest",value:function(){return I.a.get(A+"/resetAuction",p())}},{key:"timerHandler",value:function(){I.a.get(A+"/toggleTimerEnabled",p()).then(function(e){N.toast.success(e.data)},function(e){})}},{key:"pauseTimerNow",value:function(){I.a.get(A+"/pauseTimer",p()).then(function(e){N.toast.success(e.data)},function(e){})}},{key:"startTimerNow",value:function(){I.a.get(A+"/startTimer",p()).then(function(e){N.toast.success(e.data)},function(e){})}},{key:"changeTimerWaitForSold",value:function(){I.a.post(A+"/changeTimerWaitForSold",{timeWait:1e3*this.inputText},p()).then(function(e){N.toast.success(e.data)},function(e){})}},{key:"changeTimerWaitForNextPlayer",value:function(){I.a.post(A+"/changeTimerWaitForNextPlayer",{timeWait:1e3*this.inputText},p()).then(function(e){N.toast.success(e.data)},function(e){})}},{key:"getStatus",value:function(){I.a.get(A+"/getStatus",p()).then(function(e){if(e.data)try{Object.keys(e.data).map(function(t){N.toast.info([t]+" : "+JSON.stringify(e.data[t],null,4).replace(/\,/g,"___").replace(/\:/g,"="),{autoClose:!1,className:"statusNotification",position:N.toast.POSITION.TOP_CENTER})})}catch(t){}N.toast.info(e.data,{autoClose:!1})},function(e){})}},{key:"tryTest",value:function(){var e={command:"specialPlayerId = ".concat(this.inputText)};I.a.post(A+"/eval",e,p()).then(function(e){N.toast.success(e.data)},function(e){})}},{key:"render",value:function(){var e=this,t=localStorage.getItem([f])||"User",a=b();return[r.a.createElement(S.a,{bg:"dark",variant:"dark"},r.a.createElement(S.a.Brand,{href:"#home"},"Hi ".concat(t)),r.a.createElement(P.a,{className:"mr-auto"}),r.a.createElement(O.a,{variant:"outline-info",onClick:this.logOut.bind(this)},"Log Out")),r.a.createElement(S.a,{bg:"dark",variant:"dark"},a>=3&&r.a.createElement(x,{warning:"You are about to restart the auction. Are you Sure?",handler:this.startAuctionHandler.bind(this),buttonName:"Start Auction"}),"\xa0",a>=3&&r.a.createElement(x,{warning:"You are about to toggle the timer. Are you Sure?",handler:this.timerHandler.bind(this),buttonName:"Enable / Disable Timer"}),"\xa0",a>3&&r.a.createElement("input",{onChange:function(t){e.inputText=parseInt(t.target.value)}}),"\xa0",a>3&&r.a.createElement(x,{warning:"You are Change Timer for marking player sold. Are you Sure?",handler:this.changeTimerWaitForSold.bind(this),buttonName:"Change Time to Sold"}),"\xa0",a>3&&r.a.createElement(x,{warning:"You are Change Timer for getiing next player. Are you Sure?",handler:this.changeTimerWaitForNextPlayer.bind(this),buttonName:"Change Time to Next player"}),"\xa0",a>3&&r.a.createElement(x,{warning:"You are about to get status. Are you Sure?",handler:this.getStatus.bind(this),buttonName:"Get Status"}),"\xa0",a>3&&r.a.createElement(O.a,{variant:"outline-info",onClick:function(){confirm("You are about to get test. Are you Sure?")||e.tryTest()}},"Test"))]}}]),t}(n.Component),H=a(293),B=a(136),D=a(294),q=a(24),F=a.n(q),W=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={currentAuctionInfo:null,bidAmt:5},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getLiveAuctionInfo(),this.interval=setInterval(function(){e.getLiveAuctionInfo()},j)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"getLiveAuctionInfo",value:function(){var e=this;I.a.get(A+"/liveAuctionInfo",p()).then(function(t){if(!F.a.isEqual(t.data,e.state.currentAuctionInfo)){var a=t.data.bids&&t.data.bids[0]&&t.data.bids[0].bidAmt+5||5;e.setState({currentAuctionInfo:t.data,bidAmt:a})}},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}},{key:"roundOff",value:function(e){var t=5*Math.ceil(parseInt(e.target.value)/5);this.setState({bidAmt:t})}},{key:"handleBidInputChange",value:function(e){this.setState({bidAmt:e.target.value})}},{key:"bid",value:function(){var e=this;if(this.state.bidAmt&&this.state.bidAmt>0){var t=localStorage.getItem([f])||"User",a=this.state.currentAuctionInfo.playerId;this.doBidRequest(a,this.state.bidAmt,t).then(function(t){e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}}},{key:"doBidRequest",value:function(e,t,a){return I.a.post(A+"/addBid",{playerId:e,bidAmt:t,bidBy:a},p())}},{key:"markPlayerSoldHandler",value:function(){var e=this;this.markPlayerSoldRequest(this.state.currentAuctionInfo.playerId).then(function(t){t.data&&t.data.message&&N.toast.success(t.data.message),e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}},{key:"markPlayerSoldRequest",value:function(e){return I.a.post(A+"/markAsSold",{playerId:e},p())}},{key:"bringNextPlayerHandler",value:function(){var e=this;this.bringNextPlayerRequest().then(function(t){e.getLiveAuctionInfo()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}},{key:"bringNextPlayerRequest",value:function(){return I.a.get(A+"/bringNextPlayer",p())}},{key:"onRefreshHandler",value:function(){this.getLiveAuctionInfo()}},{key:"render",value:function(){var e=localStorage.getItem([f])||"User",t=b(),a=this.state.currentAuctionInfo,n=!!(a&&a.bids&&a.bids.length&&a.bids.length>0)?"Mark as Sold":"Mark as Unsold";return a?r.a.createElement(E.a,null,r.a.createElement(E.a.Header,null,"Current/ Last Player",r.a.createElement(O.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(E.a.Body,null,r.a.createElement(H.a,{style:{margin:"0px"}},r.a.createElement(B.a,{sm:12},"PlayerId : ".concat(a.playerId)),r.a.createElement(B.a,{sm:12},"Player Name : ".concat(a.name)),r.a.createElement(B.a,{sm:12},"Team : ".concat(a.team)),r.a.createElement(B.a,{sm:12},"Grade : ".concat(a.grade)),r.a.createElement(B.a,{sm:12},"Time Left : ".concat(a.timeLeft?a.timeLeft/1e3-3:"null"," Seconds")),a.soldTo&&r.a.createElement("span",null,r.a.createElement(B.a,{sm:12},"Sold to : ".concat(a.soldTo)),r.a.createElement(B.a,{sm:12},"Sold for : ".concat(a.soldAt," points"))),!a.soldTo&&r.a.createElement(B.a,{sm:12},r.a.createElement("input",{style:{margin:"15px",marginLeft:"0px"},type:"number",step:"5",value:this.state.bidAmt,placeholder:"Bid Amount",onBlur:this.roundOff.bind(this),onChange:this.handleBidInputChange.bind(this)}),"readOnly"!=e&&r.a.createElement(O.a,{size:"sm",onClick:this.bid.bind(this)},"Bid")),!a.soldTo&&t>=3&&r.a.createElement(B.a,{sm:12},r.a.createElement(O.a,{size:"sm",variant:"danger",onClick:this.markPlayerSoldHandler.bind(this)},n)),a.soldTo&&t>=3&&r.a.createElement(B.a,{sm:12},r.a.createElement(O.a,{size:"sm",variant:"info",onClick:this.bringNextPlayerHandler.bind(this)},"Get Next Player")),r.a.createElement(B.a,{sm:12},M(a.bids))))):null}}]),t}(n.Component),M=function(e){return e&&e.length>0?r.a.createElement("div",null,r.a.createElement("h4",null,"Previous Bids:"),r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Bid By"),r.a.createElement("th",null,"Bid Amt"))),r.a.createElement("tbody",null,e.map(function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.bidBy),r.a.createElement("td",null,e.bidAmt))})))):r.a.createElement("div",null,"You Can Start Bidding")},U=W,Y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={points:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.remainingPointsRequest(),this.interval=setInterval(function(){e.remainingPointsRequest()},w)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"remainingPointsRequest",value:function(){var e=this;I.a.get(A+"/remaningPoints",p()).then(function(t){F.a.isEqual(t.data,e.state.points)||e.setState({points:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}},{key:"onRefreshHandler",value:function(){this.remainingPointsRequest()}},{key:"render",value:function(){var e=this.state.points;localStorage.getItem([f]);return e?r.a.createElement(E.a,null,r.a.createElement(E.a.Header,{as:"h5"},"Points Remaining",r.a.createElement(O.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(E.a.Body,null,r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Team Owner"),r.a.createElement("th",null,"Points"))),r.a.createElement("tbody",null,Object.keys(e).sort().map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,t),r.a.createElement("td",null,e[t]))}))))):null}}]),t}(r.a.Component),z=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={team:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getYourTeam(),this.interval=setInterval(function(){e.getYourTeam()},R)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"getYourTeam",value:function(){var e=this;I.a.get(A+"/myTeam",p()).then(function(t){F.a.isEqual(t.data,e.state.team)||e.setState({team:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}},{key:"onRefreshHandler",value:function(){this.getYourTeam()}},{key:"getTeamColour",value:function(e){return{CSK:"#fcce06",MI:"#004f91",KKR:"#3a225d",SRH:"#f7a721",RCB:"#d5152c",KXIP:"#ed1f27",DC:"#2561ae",RR:"#254aa5"}[e]}},{key:"getTeamTextColor",value:function(e){return{CSK:"#f25c19",MI:"#ffffff",KKR:"#f3c433",SRH:"#9a1c22",RCB:"#000000",KXIP:"#ffffff",DC:"#d71921",RR:"#ffffff"}[e]}},{key:"render",value:function(){var e=this,t=this.state.team;return t?r.a.createElement(E.a,null,r.a.createElement(E.a.Header,{as:"h5"},"My Team",r.a.createElement(O.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(E.a.Body,null,r.a.createElement(D.a,{bordered:"true",hover:"true",size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Sr."),r.a.createElement("th",null,"Player Name"),r.a.createElement("th",null,"Points"),r.a.createElement("th",null,"Team"))),r.a.createElement("tbody",null,t.map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,a+1),r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.soldAt),r.a.createElement("td",{style:{backgroundColor:"".concat(e.getTeamColour(t.team)),color:"".concat(e.getTeamTextColor(t.team))}},t.team))}))))):null}}]),t}(r.a.Component),K=a(140),G=a(139),_=a.n(G),J=(a(288),a(75)),X=a.n(J),$=(a(289),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(O.a,{onClick:function(){return e.props.onToggleFilter(e.abc)},style:{float:"right"}},"Filter"))}}]),t}(r.a.Component)),Q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).refreshDataHandler=function(){a.getAllPlayerData()},a.sortRows=function(e,t,a){return"NONE"===a?e:e.sort(function(e,n){return"ASC"===a?e[t]>n[t]?1:-1:"DESC"===a?e[t]<n[t]?1:-1:void 0})},a.handleFilterChange=function(e){var t=a.state.filters,n=e.column.key;return e.filterTerm?t[n]=e:delete t[n],t},a.state={players:[],dPlayers:[],sortedPlayers:[],filteredPlayers:[],filters:{}},a.columns=[{key:"srNo",name:"Sr. No"},{key:"playerId",name:"Player ID",sortable:!0,filterable:!0},{key:"name",name:"Player Name",sortable:!0,filterable:!0},{key:"grade",name:"Grade",sortable:!0,filterable:!0},{key:"team",name:"Team",sortable:!0,filterable:!0},{key:"soldTo",name:"Sold To",sortable:!0,filterable:!0},{key:"soldAt",name:"Price",sortable:!0}],a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getAllPlayerData()}},{key:"getAllPlayerData",value:function(){var e=this;I.a.get(A+"/allPlayers",p()).then(function(t){e.setState({players:t.data,dPlayers:t.data})},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.error(e)})}},{key:"download",value:function(){try{var e=new X.a,t=this.getRows(this.state.dPlayers,this.state.filters);e.autoTable({head:[["ID","Player Name","grade","Team","Sold At","Sold To","\r\n"]],body:t.map(function(e){return[e.playerId,e.name,e.grade,e.team,e.soldAt,e.soldTo]})}),e.save("summary.pdf")}catch(a){console.log(a)}}},{key:"downloadAsExcell",value:function(){try{var e=this.getRows(this.state.dPlayers,this.state.filters),t="Player Id,Name,grade,Team,Sold At,Sold To,Bids\r\n";e.forEach(function(e){for(var a in e)t+=JSON.stringify(e[a]).replace(/\,/g,"")+",";t+="\r\n"}),t="data:application/csv,"+encodeURIComponent(t);var a=document.createElement("A");a.setAttribute("href",t),a.setAttribute("download","WCauction1.csv"),document.body.appendChild(a),a.click()}catch(n){console.log(n)}}},{key:"setdPlayers",value:function(e){this.setState({dPlayers:e})}},{key:"getRows",value:function(e,t){var a=e;return Object.keys(t).map(function(e){var n=t[e].filterTerm;a=a.filter(function(t){return t[e]&&t[e].toString().toLowerCase().indexOf(n.toLowerCase())>-1})}),a}},{key:"setFilters",value:function(e){this.setState({filters:e})}},{key:"render",value:function(){var e=this,t=this.state.players,a=this.state.dPlayers,n=this.state.filters,o=this.getRows(a,n);return t&&t.length>0?r.a.createElement("div",null,r.a.createElement("h2",{style:{display:"inline-block"}},"All PLayers Data"),"\xa0",r.a.createElement(O.a,{variant:"info",style:{float:"right"},onClick:this.download.bind(this)},"Download PDF"),"\xa0",r.a.createElement("span",{style:{float:"right"}},"\xa0"),r.a.createElement(O.a,{variant:"info",style:{float:"right"},onClick:this.downloadAsExcell.bind(this)},"Download Excell"),r.a.createElement("span",{style:{float:"right"}},"\xa0"),r.a.createElement(O.a,{variant:"info",style:{float:"right"},onClick:this.refreshDataHandler.bind(this)},"Refresh Data"),r.a.createElement(_.a,{columns:this.columns,rowGetter:function(e){return Object(K.a)({srNo:e+1},o[e])},rowsCount:o.length,minHeight:500,toolbar:r.a.createElement($,null),onGridSort:function(a,n){return e.setdPlayers(e.sortRows(t,a,n))},onAddFilter:function(t){return e.setFilters(e.handleFilterChange(t))},onClearFilters:function(){return e.setFilters({})}})):null}}]),t}(r.a.Component),V=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={count:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.remainingPlayerRequest(),this.interval=setInterval(function(){e.remainingPlayerRequest()},w)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.interval)}},{key:"remainingPlayerRequest",value:function(){var e=this;I.a.get(A+"/getRemainingPlayersCount",p()).then(function(t){F.a.isEqual(t.data,e.state.points)||e.setState({count:t.data})},function(e){console.error(e)})}},{key:"onRefreshHandler",value:function(){this.remainingPlayerRequest()}},{key:"render",value:function(){var e=this.state.count;return e?r.a.createElement(E.a,null,r.a.createElement(E.a.Header,{as:"h5"},"Players Remaining",r.a.createElement(O.a,{variant:"dark",size:"sm",style:{float:"right"},onClick:this.onRefreshHandler.bind(this)},"Refresh")),r.a.createElement(E.a.Body,null,r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Type"),r.a.createElement("th",null,"Number of Players"))),r.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,t.replace("_"," ")),r.a.createElement("td",null,e[t]))}))))):null}}]),t}(r.a.Component),Z=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(L,null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(H.a,{style:{margin:"0px"}},r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(U,null)),r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(V,null)),r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(Y,null)),r.a.createElement(B.a,{sm:12,lg:3},r.a.createElement(z,null)),r.a.createElement(B.a,{sm:12},r.a.createElement("br",null)),r.a.createElement(B.a,{sm:12},r.a.createElement(Q,null))))}}]),t}(n.Component),ee=(a(290),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"login",value:function(e,t,a){var n=this;"geolocation"in navigator?I.a.post(A+"/login",{nickName:e,latitude:t,longitude:a}).then(function(e){!function(e){try{var t=h.a.decode(e);console.log(t),t&&(localStorage.setItem([g],e),localStorage.setItem([f],t.user),localStorage.setItem([y],t.privilage))}catch(a){console.error(a)}}(e.data.token),n.forceUpdate()},function(e){e&&e.response&&e.response.data&&e.response.data.message&&N.toast.error(e.response.data.message),console.log(e.response)}):N.toast.error("Location requirements not met")}},{key:"render",value:function(){var e=!!v();return r.a.createElement("div",null,e?r.a.createElement(Z,null):r.a.createElement(C,{onLogin:this.login.bind(this)}),r.a.createElement(N.ToastContainer,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[141,1,2]]]);
//# sourceMappingURL=main.fa71dc2c.chunk.js.map