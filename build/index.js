(()=>{"use strict";const e=window.React,o=window.wp.blocks,t=window.wp.i18n,l=window.wp.blockEditor,r=window.wp.components,a=JSON.parse('{"UU":"create-block/blog-card"}'),n=(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"undefined",height:"undefined",viewBox:"0 0 750 750"},(0,e.createElement)("path",{fill:"currentColor",d:"M718 1q10 0 17 6t6 17v510q0 10-6 16t-17 7H23q-10 0-16-7t-7-16V24Q0 14 7 7t16-6h695zM93 325h208v-69H93v69zm393 70H93v69h393v-69zM649 94h-70v69h70V94z"}));(0,o.registerBlockType)(a.UU,{save:function({attributes:o}){const{borderColor:t,borderWidth:l,borderRadius:r,newTab:a,url:n,title:c,description:d,og_image:i}=o;return(0,e.createElement)("a",{href:n||"/",target:a?"_blank":"_self",className:"blogCard",style:{borderColor:t,borderWidth:l+"px",borderRadius:r+"px"}},(0,e.createElement)("div",{className:"blogCard__thumbnail"},(0,e.createElement)("img",{className:"",src:i,alt:""})),(0,e.createElement)("dl",{className:"blogCard__text"},(0,e.createElement)("dt",{className:"blogCard__text-title"},c),(0,e.createElement)("dd",{className:"blogCard__text-description"},d)))},edit:function({attributes:o,setAttributes:a}){const{fontColor:n,backgroundColor:c,borderColor:d,borderWidth:i,borderRadius:m,newTab:s,url:g,title:b,description:C,og_image:u}=o,_=`${location.protocol}//${location.host}/wp-json/wp/custom/meta`;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.InspectorControls,null,(0,e.createElement)(r.PanelBody,{title:(0,t.__)("Meta","blog-card")},(0,e.createElement)(r.TextControl,{label:(0,t.__)("URL","blog-card"),value:g,onChange:e=>{var o;a({url:e}),a({url:(o=e)||""}),o&&URL.canParse(o)&&fetch(_,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:o})}).then((e=>{if(!e.ok)throw new Error("ネットワークエラーが発生しました");return e.json()})).then((e=>{console.log(e),a({title:e.title||"",description:e.description||"",og_image:e.image||""})})).catch((e=>{console.error("エラー:",e),alert("データの取得中にエラーが発生しました。")}))}}),(0,e.createElement)(r.TextControl,{label:(0,t.__)("Title","blog-card"),value:b,onChange:e=>a({title:b})}),(0,e.createElement)(r.TextControl,{label:(0,t.__)("Description","blog-card"),value:C,onChange:e=>a({description:C})}),(0,e.createElement)(r.TextControl,{label:(0,t.__)("OG Image","blog-card"),value:u,onChange:e=>a({og_image:e})})),(0,e.createElement)(r.PanelBody,{title:(0,t.__)("Settings","blog-card")},(0,e.createElement)(r.ToggleControl,{checked:!!s,label:(0,t.__)("Open in new tab","blog-card"),onChange:()=>a({newTab:!s})})),(0,e.createElement)(r.PanelBody,{title:(0,t.__)("Styles","blog-card")},(0,e.createElement)("p",null,"font Color"),(0,e.createElement)(r.ColorPalette,{colors:[{name:"テーマカラー",color:"#413d69"},{name:"ダークブルー",color:"#1A237E"},{name:"ダークグリーン",color:"#1B5E20"},{name:"ダークイエロー",color:"#F57F17"},{name:"ダークグレー",color:"#212121"},{name:"ブラック",color:"#000000"}],value:n,onChange:e=>a({fontColor:e})}),(0,e.createElement)("p",null,"Background Color"),(0,e.createElement)(r.ColorPalette,{colors:[{name:"テーマカラー",color:"#413d69"},{name:"ライトブルー",color:"rgba(33, 150, 243, 0.5)"},{name:"ライトグリーン",color:"rgba(76, 175, 80, 0.5)"},{name:"ライトイエロー",color:"rgba(255, 235, 59, 0.5)"},{name:"ライトグレー",color:"rgba(158, 158, 158, 0.5)"},{name:"ホワイト",color:"#fff"}],value:c,onChange:e=>a({backgroundColor:e})}),(0,e.createElement)("p",null,"Border Color"),(0,e.createElement)(r.ColorPalette,{colors:[{name:"テーマカラー",color:"#413d69"},{name:"ダークブルー",color:"#1A237E"},{name:"ダークグリーン",color:"#1B5E20"},{name:"ダークイエロー",color:"#F57F17"},{name:"ダークグレー",color:"#212121"},{name:"ブラック",color:"#000000"}],value:d,onChange:e=>a({borderColor:e})}),(0,e.createElement)(r.RangeControl,{label:"Border width",onChange:e=>{a({borderWidth:e})},value:i,min:0}),(0,e.createElement)(r.RangeControl,{label:"Border radius",onChange:e=>{a({borderRadius:e})},value:m,min:0}))),(0,e.createElement)("div",{...(0,l.useBlockProps)()},(0,e.createElement)("a",{href:g||"/",target:s?"_blank":"_self",className:"blogCard",onClick:e=>{e.preventDefault()},style:{color:n,backgroundColor:c,borderColor:d,borderWidth:i+"px",borderRadius:m+"px"}},(0,e.createElement)("div",{className:"blogCard__thumbnail"},(0,e.createElement)("img",{className:"",src:u,alt:""})),(0,e.createElement)("dl",{className:"blogCard__text"},(0,e.createElement)("dt",{className:"blogCard__text-title"},b),(0,e.createElement)("dd",{className:"blogCard__text-description"},C)))))},icon:n})})();