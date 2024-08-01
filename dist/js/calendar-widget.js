export default function f({view:E="dayGridMonth",locale:h="en",firstDay:y=1,events:x=[],eventContent:l=null,selectable:b=!1,eventClickEnabled:p=!1,eventDragEnabled:c=!1,eventResizeEnabled:v=!1,noEventsClickEnabled:m=!1,dateSelectEnabled:s=!1,dateClickEnabled:u=!1,dayMaxEvents:S=!1,moreLinkContent:w=null,resources:C=[],hasDateClickContextMenu:D=!1,hasDateSelectContextMenu:d=!1,hasEventClickContextMenu:o=!1,hasNoEventsClickContextMenu:$=!1,options:k={}}){return{calendarEl:null,init:async function(){this.calendarEl=this.$el;let t=this,n={view:E,resources:C,eventSources:[{events:(e,a,r)=>this.$wire.getEventsJs(e)}],locale:h,firstDay:y,dayMaxEvents:S,selectable:d||s,eventStartEditable:c,eventDurationEditable:v};D&&!u&&(n.dateClick=e=>{t.$el.querySelector("[calendar-context-menu]").dispatchEvent(new CustomEvent("calendar--open-menu",{detail:{mountData:{date:e.date,dateStr:e.dateStr,allDay:e.allDay,view:e.view,resource:e.resource},jsEvent:e.jsEvent,dayEl:e.dayEl,context:"dateClick"}}))}),d&&!s&&(n.select=e=>{t.$el.querySelector("[calendar-context-menu]").dispatchEvent(new CustomEvent("calendar--open-menu",{detail:{mountData:{start:e.start,startStr:e.startStr,end:e.end,endStr:e.endStr,allDay:e.allDay,view:e.view,resource:e.resource},jsEvent:e.jsEvent,context:"dateSelect"}}))}),u&&!o&&(n.dateClick=e=>{this.$wire.onDateClick({date:e.date,dateStr:e.dateStr,allDay:e.allDay,view:e.view,resource:e.resource})}),s&&!d&&(n.select=e=>{this.$wire.onDateSelect({start:e.start,startStr:e.startStr,end:e.end,endStr:e.endStr,allDay:e.allDay,view:e.view,resource:e.resource})}),l!==null&&(n.eventContent=e=>{const a=t.getEventContent(e);if(a!==void 0)return{html:a}}),w!==null&&(n.moreLinkContent=e=>({html:t.getMoreLinkContent(e)})),p&&(n.eventClick=e=>{if(e.event.extendedProps.url){const a=e.event.extendedProps.url_target??"_blank";window.open(e.event.extendedProps.url,a)}else o?t.$el.querySelector("[calendar-context-menu]").dispatchEvent(new CustomEvent("calendar--open-menu",{detail:{mountData:{event:e.event,view:e.view},jsEvent:e.jsEvent,context:"eventClick"}})):this.$wire.onEventClick({event:e.event,view:e.view})}),m&&(n.noEventsClick=e=>{$?t.$el.querySelector("[calendar-context-menu]").dispatchEvent(new CustomEvent("calendar--open-menu",{detail:{mountData:{view:e.view},jsEvent:e.jsEvent,context:"noEventsClick"}})):this.$wire.onNoEventsClick({view:e.view})}),n.eventResize=async e=>{const a=e.event.durationEditable;let r=v;a!==void 0&&(r=a),r&&await this.$wire.onEventResize({event:e.event,oldEvent:e.oldEvent,endDelta:e.endDelta,view:e.view}).then(i=>{i===!1&&e.revert()})},n.eventDrop=async e=>{const a=e.event.startEditable;let r=c;a!==void 0&&(r=a),r&&await this.$wire.onEventDrop({event:e.event,oldEvent:e.oldEvent,oldResource:e.oldResource,newResource:e.newResource,delta:e.delta,view:e.view}).then(i=>{i===!1&&e.revert()})},n.eventAllUpdated=e=>{this.$wire.currentView=e.view},this.ec=new EventCalendar(this.$el.querySelector("div"),{...n,...k}),window.addEventListener("ec-add-event",this.addEvent),window.addEventListener("calendar--refresh",()=>this.ec.refetchEvents())},addEvent:function(t){this.ec.addEvent(t)},getEventContent:function(t){if(typeof l=="string")return this.wrapContent(l,t);if(typeof l=="object"){const n=t.event.extendedProps.model,e=l[n];return e===void 0?void 0:this.wrapContent(e,t)}},getMoreLinkContent:function(t){return this.wrapContent(w,t)},wrapContent:function(t,n){let e=document.createElement("div");return e.innerHTML=t,e.setAttribute("x-data",JSON.stringify(n)),e.classList.add("w-full"),e.outerHTML}}}
