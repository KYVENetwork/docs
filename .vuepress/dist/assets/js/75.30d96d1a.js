(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{657:function(a,e,t){"use strict";t.r(e);var s=t(0),o=Object(s.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"slashing"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#slashing"}},[a._v("#")]),a._v(" Slashing")]),a._v(" "),t("p",[a._v('Slashing is a core mechanism in a Proof of Stake chain. In KYVE, we also use nodes having "Skin in the game" by letting their stake participate as a protocol node. Currently, there are three types of slashes a protocol node can experience:')]),a._v(" "),t("h2",{attrs:{id:"upload-slash"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#upload-slash"}},[a._v("#")]),a._v(" Upload slash")]),a._v(" "),t("p",[a._v("An upload slash is the harshest slash. If a protocol node encounters one, it loses 20% of its stake. To receive one, a majority of the validators in the pool have to vote against your bundle proposal.")]),a._v(" "),t("h2",{attrs:{id:"vote-slash"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vote-slash"}},[a._v("#")]),a._v(" Vote slash")]),a._v(" "),t("p",[a._v("A vote slash happens when you validate data incorrectly. Once a quorum is reached (> 50% voted valid or invalid), validators who voted the opposite of the majority receive a vote slash. When a node receives a vote slash\nit loses 10% of its stake.")]),a._v(" "),t("h2",{attrs:{id:"timeout-slash"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#timeout-slash"}},[a._v("#")]),a._v(" Timeout slash")]),a._v(" "),t("p",[a._v("A timeout slash happens when the protocol node is offline for longer. When a node is supposed to upload and submit\ndata, but it does not for any reason, other validators vote if the data source was available or not. If the data source was available, the node in question was probably offline and got slashed with usually 1%. If the data source is unavailable and it's not the node's fault that it did not upload the node, it does not get slashed.")])])}),[],!1,null,null,null);e.default=o.exports}}]);
